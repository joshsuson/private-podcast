import Airtable from "airtable";
import initStripe from "stripe";
import axios from "axios";

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

      await axios
        .post(
          `https://api.airtable.com/v0/appRGUPY0qUZE0Dcj/users`,
          { fields: data },
          {
            headers: {
              Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}`,
              "Content-Type": "application/json",
            },
          }
        )
        .then((data) => console.log(data))
        .catch((err) => console.error(err));

      // base("users").create(
      //   {
      //     fields: {
      //       Name: name,
      //       Email: email,
      //       auth0_id: id,
      //       stripe_id: customer.id,
      //     },
      //   },

      //   (err, record) => {
      //     if (err) {
      //       console.error(err.message);
      //       return;
      //     }
      //     console.log(record.getId());
      //   }
      // );
    } else {
      console.log("You didn't send your secret");
    }
  } catch (err) {
    console.error(err);
  }
  res.status(200).send("User logged!");
};
