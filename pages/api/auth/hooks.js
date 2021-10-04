import Airtable from "airtable";
import initStripe from "stripe";

const stripe = initStripe(process.env.STRIPE_SECRET_KEY);

module.exports = async (req, res) => {
  Airtable.configure({
    endpointUrl: "https://api.airtable.com",
    apiKey: process.env.AIRTABLE_API_KEY,
  });

  const base = Airtable.base("appRGUPY0qUZE0Dcj");

  const { name, email, id, secret } = req.body;

  if (secret === process.env.AUTH0_HOOK_SECRET) {
    const customer = await stripe.customers.create({
      name,
      email,
    });

    const data = {
      Name: name,
      Email: email,
      auth0_id: id,
      stripe_id: customer.id,
    };

    base("users").create(
      [
        {
          fields: data,
        },
      ],
      (err, records) => {
        if (err) {
          console.error(err);
          return;
        }
        records.forEach((record) => {
          console.log(record.getId());
        });
      }
    );
  }
  res.status(200).send("User logged!");
};
