import React from "react";

export default function Members() {
  return (
    <div className="max-w-6xl mx-auto mt-16 px-4">
      <h1 className="text-center font-bold text-5xl">
        Welcome to your membership!
      </h1>
      <div className="mt-10">
        <h2 className="text-center text-3xl">
          You should have received an invite to Transistor.fm.
        </h2>
        <h3 className="text-center text-2xl mt-2">
          {`This is how you'll access exclusive and early episodes in your
          favorite podcasting app`}
        </h3>
        <p className="text-center mt-2 text-lg">
          {`If for some reason you didn't get that invite. Contact us through the
          button below so that we can sort it out.`}
        </p>
        <a
          className="my-12 rounded lg:w-1/2 text-center mx-auto block shadow-lg bg-red-400 hover:bg-red-100 transition-all hover:text-red-600 text-gray-50 text-xl py-4"
          href="mailto: josh.suson@gmail.com"
        >
          Contact Us
        </a>
      </div>
      <div className="my-16">
        <h2 className="text-center text-3xl">
          {`Don't miss out on our member community.`}
        </h2>
        <a
          className="my-12 rounded lg:w-1/2 text-center mx-auto block shadow-lg bg-red-400 hover:bg-red-100 transition-all hover:text-red-600 text-gray-50 text-xl py-4"
          href="#"
        >
          Join Now
        </a>
      </div>
    </div>
  );
}
