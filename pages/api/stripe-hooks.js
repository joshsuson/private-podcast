import initStripe from "stripe";
import { buffer } from "micro";
import Airtable from "airtable";
import axios from "axios";

const stripe = initStripe(process.env.STRIPE_SECRET_KEY);

export const config = { api: { bodyParser: false } };

export default async (req, res) => {
  const reqBuffer = await buffer(req);
  const signature = req.headers["stripe-signature"];
  const signingSecret = process.env.STRIPE_SIGNING_SECRET;

  Airtable.configure({
    endpointUrl: "https://api.airtable.com",
    apiKey: process.env.AIRTABLE_API_KEY,
  });

  const base = Airtable.base("appRGUPY0qUZE0Dcj");
  const records = await base("users").select().all();
  let event;

  try {
    event = stripe.webhooks.constructEvent(reqBuffer, signature, signingSecret);
  } catch (err) {
    console.error(err);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  const stripeId = event.data.object.customer;

  switch (event.type) {
    case "customer.subscription.created":
      if (stripeId) {
        const user = records
          .map((record) => ({ ...record.fields, recordId: record.id }))
          .find((newRecord) => newRecord.stripe_id === stripeId);
        const userRecord = await base("users").find(user.recordId);

        await axios.post(
          `https://api.transistor.fm/v1/subscribers/?show_id=${process.env.TRANSISTOR_SHOW_ID}`,
          { email: user.Email },
          {
            headers: {
              "x-api-key": process.env.TRANSISTOR_API_KEY,
            },
          }
        );

        await base("users").update(userRecord.id, {
          is_subscribed: true,
        });
      }
      break;
    case "customer.subscription.deleted":
      if (stripeId) {
        const user = records
          .map((record) => ({ ...record.fields, recordId: record.id }))
          .find((newRecord) => newRecord.stripe_id === stripeId);
        const userRecord = await base("users").find(user.recordId);

        await axios.delete(
          `https://api.transistor.fm/v1/subscribers/?show_id=${process.env.TRANSISTOR_SHOW_ID}`,
          {
            headers: {
              "x-api-key": process.env.TRANSISTOR_API_KEY,
            },
            data: {
              email: user.Email,
            },
          }
        );

        await base("users").update(userRecord.id, {
          is_subscribed: false,
        });
      }
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.send({ received: true });
};
