import Airtable from "airtable";
import initStripe from "stripe";

const stripe = initStripe(process.env.STRIPE_SECRET_KEY);

module.exports = async (req, res) => {
  try {
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

      console.log(data);
      console.log(base("users").list());

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
    } else {
      console.log("You didn't send your secret");
    }
  } catch (err) {
    console.error(err);
  }
  res.status(200).send("User logged!");
};
