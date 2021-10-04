import React, { useState, useEffect } from "react";
import axios from "axios";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import Members from "../components/Members";
import Choose from "../components/Choose";
import initStripe from "stripe";

export const getStaticProps = async () => {
  const stripe = initStripe(process.env.STRIPE_SECRET_KEY);
  const { data: prices } = await stripe.prices.list();
  const { data: products } = await stripe.products.list();
  const plans = [];
  const annualDetails = {
    increment: "yr",
    feature: "Save 10% over the year",
  };
  const monthlyDetails = {
    increment: "mo",
    feature: "Our no commitment plan",
  };

  await prices.forEach((price) => {
    const product = products.find((item) => item.id === price.product);
    if (!price.active) return;
    let details;
    switch (product.metadata.increment) {
      case "annual":
        details = annualDetails;
        break;
      case "monthly":
        details = monthlyDetails;
        break;
      default:
        break;
    }
    plans.push({
      name: product.name,
      price: price.unit_amount / 100,
      id: price.id,
      feature: details.feature,
      increment: details.increment,
    });
  });

  return {
    props: {
      plans,
    },
  };
};

export default withPageAuthRequired(function MembersPage({ plans }) {
  const [subscribed, setSubscribed] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(async () => {
    const { data: user } = await axios.get("/api/get-user");
    user.is_subscribed ? setSubscribed(true) : setSubscribed(false);
    setLoading(false);
  }, []);
  return (
    <div>
      {loading && (
        <div className="h-screen grid place-content-center">
          <div className="lds-grid">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      )}
      {subscribed && !loading && <Members />}
      {!subscribed && !loading && <Choose plans={plans} />}
    </div>
  );
});
