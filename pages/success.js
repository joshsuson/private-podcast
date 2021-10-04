import React from "react";
import Link from "next/link";

export default function Success() {
  return (
    <div className="max-w-6xl mx-auto md:h-screen px-4">
      <h1 className="text-center text-5xl font-bold mt-16">
        Yay!! <span className="mr-4 ml-2">🙌 </span>You are officially
        subscribed!
      </h1>
      <h2 className="text-center text-3xl mt-6 text-gray-800">
        What are you waiting for?? Get to your exclusive content!
      </h2>
      <Link href="/members">
        <a className="my-12 rounded lg:w-1/2 text-center mx-auto block shadow-lg bg-red-400 hover:bg-red-100 transition-all hover:text-red-600 text-gray-50 text-xl py-4">
          Access Members Page
        </a>
      </Link>
    </div>
  );
}
