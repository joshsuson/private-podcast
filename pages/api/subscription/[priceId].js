import initStripe from "stripe";
import Airtable from "airtable";
import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";

Airtable.configure({
  endpointUrl: "https://api.airtable.com",
  apiKey: process.env.AIRTABLE_API_KEY,
});

const base = Airtable.base("appRGUPY0qUZE0Dcj");
const stripe = initStripe(process.env.STRIPE_SECRET_KEY);

module.exports = withApiAuthRequired(async (req, res) => {
  const { priceId } = req.query;
  const {
    user: { sub },
  } = getSession(req, res);

  const records = await base("users").select().all();
  const user = records
    .map((record) => record.fields)
    .find((record) => record.auth0_id === sub);

  const lineItems = [
    {
      price: priceId,
      quantity: 1,
    },
  ];

  const session = await stripe.checkout.sessions.create({
    customer: user.stripe_id,
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: lineItems,
    success_url: `${process.env.CLIENT_URL}/success`,
    cancel_url: `${process.env.CLIENT_URL}/cancelled`,
    metadata: {
      userId: user.auth0_id,
    },
  });

  res.json({ id: session.id });
});
