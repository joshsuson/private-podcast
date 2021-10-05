# Private Podcast Mock Site

This is a podcasting membership platform I've built as a showcase of connected technologies. The idea is for someone to be able to subscribe to a podcast and once subscribed be given access to a private podcast and exclusive content.

## Links

[Live Site](https://private-podcast.netlify.app)

## Tech Used

- NextJS - I wanted the app to mostly be JAMstack. So I'm using Next and it's api functionality to build the frotend/backend
- TailwindCSS - I went with tailwind so I could quickly build out a beautiful ui
- Auth0 - I used auth0 as authentication and to manage logging in/out of the site.
- Stripe - Using stripe to manage payments and subscriptions
- Airtable - Using airtable as a database to connect auth0 users with stripe customers
- Transistor.fm - Transistor is the actual private podcasting service. They have a simple API that allowed me to automatically add/remove subscribers as people changed their subscription status through stripe.
- Netlify - Deployed site to netlify using serveless functions for the backend.

## Testing Site

The site operates in test mode for stripe so you can use the card details below to subscribe:

4242 4242 4242 4242  
12/25  
123  
Any Zip Code
