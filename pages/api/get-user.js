import Airtable from "airtable";
import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";

module.exports = withApiAuthRequired(async (req, res) => {
  Airtable.configure({
    endpointUrl: "https://api.airtable.com",
    apiKey: process.env.AIRTABLE_API_KEY,
  });

  const {
    user: { sub },
  } = getSession(req, res);

  const base = Airtable.base("appRGUPY0qUZE0Dcj");
  const records = await base("users").select().all();
  const user = records
    .map((record) => record.fields)
    .find((record) => record.auth0_id === sub);

  res.json(user);
});
