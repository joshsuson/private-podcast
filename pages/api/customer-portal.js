import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";
import initStripe from "stripe";
import Airtable from "airtable";

Airtable.configure({
  endpointUrl: "https://api.airtable.com",
  apiKey: process.env.AIRTABLE_API_KEY,
});

const stripe = initStripe(process.env.STRIPE_SECRET_KEY);

module.exports = withApiAuthRequired(async (req, res) => {
  const {
    user: { sub },
  } = getSession(req, res);
  const base = Airtable.base("appRGUPY0qUZE0Dcj");
  const records = await base("users").select().all();
  const user = records
    .map((record) => {
      return { ...record.fields, record_id: record.id };
    })
    .find((record) => record.auth0_id === sub);

  const session = await stripe.billingPortal.sessions.create({
    customer: user.stripe_id,
    return_url: process.env.CLIENT_URL,
  });

  res.send({
    url: session.url,
  });
});
