import React from "react";
import Link from "next/link";

export default function Cancelled() {
  return (
    <div className="max-w-6xl mx-auto md:h-screen px-4">
      <h1 className="text-center font-bold mt-16 text-5xl">
        Oh no. You cancelled your subscription
      </h1>
      <h3 className="text-center mt-4 text-2xl italic mb-12">
        If you did this by mistake click the button below to choose your plan
        and subscribe.
      </h3>
      <Link href="/members">
        <a className="mb-12 rounded lg:w-1/2 text-center mx-auto block shadow-lg bg-red-400 hover:bg-red-100 transition-all hover:text-red-600 text-gray-50 text-xl py-4">
          Choose Your Plan
        </a>
      </Link>
      <p className="text-xl mb-12 text-center">
        {`If this wasn't done by mistake, we are sorry to see you decided not to
        subscribe. Would you mind`}{" "}
        <a
          className="text-red-400 hover:text-red-600 hover:underline"
          href="mailto: josh.suson@gmail.com"
        >
          emailing us
        </a>{" "}
        and let us know what changed your mind?
      </p>
    </div>
  );
}
