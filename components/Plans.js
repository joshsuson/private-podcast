import React from "react";
import { CheckIcon } from "@heroicons/react/outline";
import Link from "next/link";

export default function Plans({ plans }) {
  return (
    <div className="bg-gray-900">
      <div className="pt-12 sm:pt-16 lg:pt-24">
        <div className="max-w-7xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto space-y-2 lg:max-w-none">
            <h2 className="text-lg leading-6 font-semibold text-gray-300 uppercase tracking-wider">
              Pricing
            </h2>
            <p className="text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">
              Two plans, but not one wrong choice
            </p>
            <p className="text-xl text-gray-300">
              {`Trust me when I tell you, "You won't regret subscribing"`}
            </p>
          </div>
        </div>
      </div>
      <div className="mt-8 pb-12 bg-gray-50 sm:mt-12 sm:pb-16 lg:mt-16 lg:pb-24">
        <div className="relative">
          <div className="relative inset-0 h-3/4 bg-gray-900">
            <div className=" relative inset-y-12 z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-md mx-auto space-y-4 lg:max-w-5xl lg:grid lg:grid-cols-2 lg:gap-5 lg:space-y-0">
                {plans.map((plan) => (
                  <div
                    className="flex flex-col rounded-lg shadow-lg overflow-hidden"
                    key={plan.id}
                  >
                    <div className="px-6 py-8 bg-white sm:p-10 sm:pb-6">
                      <div>
                        <h3 className="inline-flex px-4 py-1 rounded-full text-sm font-semibold tracking-wide uppercase bg-red-100 text-red-600">
                          {plan.name}
                        </h3>
                      </div>
                      <div className="mt-4 flex items-baseline text-6xl font-extrabold">
                        ${plan.price}
                      </div>
                    </div>
                    <div className="flex-1 flex flex-col justify-between px-6 pt-6 pb-8 bg-gray-50 space-y-6 sm:p-10 sm:pt-6">
                      <ul role="list" className="space-y-4">
                        {plan.features.map((feature) => (
                          <li className="flex items-start" key={feature}>
                            <div className="flex-shrink-0">
                              <CheckIcon
                                className="h-6 w-6 text-green-500"
                                aria-hidden="true"
                              />
                            </div>
                            <p className="ml-3 text-base text-gray-700">
                              {feature}
                            </p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="px-4 bg-white mb-24 pt-12">
        <Link href="/api/signup">
          <a className="rounded lg:w-1/2 text-center mx-auto block shadow-lg bg-red-400 hover:bg-red-100 transition-all hover:text-red-600 text-gray-50 text-xl py-4">
            Become a member today
          </a>
        </Link>
      </div>
    </div>
  );
}
