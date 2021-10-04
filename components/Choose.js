import React, { useState } from "react";
import { CheckIcon } from "@heroicons/react/outline";
import { RadioGroup } from "@headlessui/react";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

const perks = [
  "Exclusive member episodes",
  "Access to extra content on regular episodes",
  "Access to exclusive member community",
  "Join in on member chats with some of our guests",
  "Listen to all the episodes early",
  "Support your favorite podcast",
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Choose({ plans }) {
  const [selected, setSelected] = useState(plans[0]);

  const processSubscription = async (priceId) => {
    const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);
    const { data } = await axios.get(`/api/subscription/${priceId}`);
    await stripe.redirectToCheckout({ sessionId: data.id });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 xl:h-screen">
      <div className="mt-10">
        <h1 className="text-center text-5xl font-bold">Choose Your Plan</h1>
        <h3 className="text-center text-2xl text-red-400 mt-2">
          Get access to all this great stuff
        </h3>
        <ul className="mt-10 grid grid-cols-1 md:grid-cols-2 justify-center items-center gap-y-4 max-w-4xl mx-auto">
          {perks.map((perk) => (
            <li className="flex items-start" key={perk}>
              <div className="flex-shrink-0">
                <CheckIcon
                  className="h-6 w-6 text-green-500"
                  aria-hidden="true"
                />
              </div>
              <p className="ml-3 text-base text-gray-700">{perk}</p>
            </li>
          ))}
        </ul>
      </div>
      <div className="my-16 max-w-4xl mx-auto">
        <RadioGroup value={selected} onChange={setSelected}>
          <RadioGroup.Label className="sr-only">Plan</RadioGroup.Label>
          <div className="space-y-4">
            {plans.map((plan) => (
              <RadioGroup.Option
                key={plan.id}
                value={plan}
                className={({ active }) =>
                  classNames(
                    active ? "ring-1 ring-offset-2 ring-red-500" : "",
                    "relative block rounded-lg border border-gray-300 bg-white shadow-sm px-6 py-4 cursor-pointer hover:border-gray-400 sm:flex sm:justify-between focus:outline-none"
                  )
                }
              >
                {({ checked }) => (
                  <>
                    <div className="flex items-center">
                      <div className="text-sm">
                        <RadioGroup.Label
                          as="p"
                          className="font-medium text-gray-900"
                        >
                          {plan.name}
                        </RadioGroup.Label>
                        <RadioGroup.Description
                          as="div"
                          className="text-gray-500"
                        >
                          <p className="sm:inline">{plan.feature}</p>
                        </RadioGroup.Description>
                      </div>
                    </div>
                    <RadioGroup.Description
                      as="div"
                      className="mt-2 flex text-sm sm:mt-0 sm:block sm:ml-4 sm:text-right"
                    >
                      <div className="font-medium text-gray-900">
                        ${plan.price}.00
                      </div>
                      <div className="ml-1 text-gray-500 sm:ml-0">
                        /{plan.increment}
                      </div>
                    </RadioGroup.Description>
                    <div
                      className={classNames(
                        checked ? "border-red-500" : "border-transparent",
                        "absolute -inset-px rounded-lg border-2 pointer-events-none"
                      )}
                      aria-hidden="true"
                    />
                  </>
                )}
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>
      </div>
      <div className="my-16 px-4">
        <button
          onClick={() => processSubscription(selected.id)}
          className="rounded w-3/4 lg:w-1/2 text-center mx-auto block shadow-lg bg-red-400 hover:bg-red-100 transition-all hover:text-red-600 text-gray-50 text-xl py-4"
        >
          Subscribe
        </button>
      </div>
    </div>
  );
}
