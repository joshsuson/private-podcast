import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <div className="bg-gray-700 pt-12 grid place-content-center">
      <div>
        <nav className="flex justify-center gap-4">
          <Link href="/about">
            <a className="uppercase text-gray-50 hover:text-red-400">About</a>
          </Link>
          <Link href="/pricing">
            <a className="uppercase text-gray-50 hover:text-red-400">Pricing</a>
          </Link>
        </nav>
      </div>
      <div className="text-gray-50 mt-4 mb-4">
        © Copyright Josh Suson | All rights reserved 2021
      </div>
    </div>
  );
}
