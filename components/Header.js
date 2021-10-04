import React from "react";
import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

export default function Header() {
  const { user } = useUser();

  const loadPortal = async () => {
    const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);
    const { data } = await axios.get("/api/customer-portal");
    window.location.href = data.url;
  };

  return (
    <div className="bg-white shadow py-5 px-3">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row justify-between items-center">
        <div className="flex flex-col md:flex-row items-center gap-3">
          <div>
            <Link href="/">
              <a className="uppercase font-bold text-2xl">Private Podcast</a>
            </Link>
          </div>
          <nav className="mb-6 md:mb-0">
            <Link href="/about">
              <a className="uppercase hover:text-red-400 mr-3">About</a>
            </Link>
            <Link href="/pricing">
              <a className="uppercase hover:text-red-400 mr-3">Pricing</a>
            </Link>
            {user && (
              <Link href="/members">
                <a className="uppercase hover:text-red-400 mr-3">Members</a>
              </Link>
            )}
          </nav>
        </div>
        <div className="mt-4 lg:mt-0">
          {!user && (
            <div className="flex">
              <a
                href="/api/auth/login"
                className="block rounded p-3 mr-3 border-2 border-red-400 text-red-400 hover:border-red-100 hover:bg-red-100 hover:text-red-600"
              >
                Login
              </a>
              <a
                href="/api/signup?returnTo=/members"
                className="block bg-red-400 hover:bg-red-100 border-2 border-red-400 hover:border-red-100 hover:text-red-600 text-white p-3 rounded"
              >
                Become a Member
              </a>
            </div>
          )}
          {user && (
            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-0">
              <p className="mr-3 text-xl">{user.name}</p>
              <button
                className="rounded w-full p-3 md:mr-3 text-center border-2 border-red-400 text-red-400 hover:border-red-100 hover:bg-red-100 hover:text-red-600"
                onClick={loadPortal}
              >
                Manage Membership
              </button>
              <a
                href="/api/auth/logout"
                className="bg-red-400 block w-full text-center md:inline md:w-auto hover:bg-red-100 border-2 border-red-400 hover:border-red-100 hover:text-red-600 text-white p-3 rounded"
              >
                Logout
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
