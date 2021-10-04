import React, { useEffect, useState } from "react";
import initStripe from "stripe";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import Plans from "../components/Plans";
import FAQ from "../components/FAQ";

export const getStaticProps = async () => {
  const stripe = initStripe(process.env.STRIPE_SECRET_KEY);
  const { data: prices } = await stripe.prices.list();
  const { data: products } = await stripe.products.list();
  const plans = [];
  const features = {
    annual: [
      "Access to all exclusive member content",
      "Save 10%",
      "Guarantees a year of access",
    ],
    monthly: [
      "Access to all exclusive member content",
      "Flexibility to come and go as you need",
      "No long term commitment",
    ],
  };

  await prices.forEach((price) => {
    const product = products.find((item) => item.id === price.product);
    if (!price.active) return;
    let featureSet;
    switch (product.metadata.increment) {
      case "annual":
        featureSet = features.annual;
        break;
      case "monthly":
        featureSet = features.monthly;
        break;
      default:
        break;
    }
    plans.push({
      name: product.name,
      price: price.unit_amount / 100,
      id: price.id,
      features: featureSet,
    });
  });

  return {
    props: {
      plans,
    },
  };
};

export default function Pricing({ plans }) {
  const processSubscription = async (priceId) => {
    const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);
    const { data } = await axios.get(`/api/subscription/${priceId}`);
    await stripe.redirectToCheckout({ sessionId: data.id });
  };

  return (
    <div>
      <Plans plans={plans} />
      <FAQ />
    </div>
  );
}
