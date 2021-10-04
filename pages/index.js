import Link from "next/link";

export default function Home() {
  return (
    <div className="xl:h-screen py-10 lg:px-12 grid place-content-center">
      <div className="bg-red-400 max-w-5xl text-center py-24 px-12 md:px-48 md:py-48 rounded-lg">
        <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
          <span className="block">{`Don't miss our exclusive content`}</span>
          <span className="block">Sign up for our membership today.</span>
        </h2>
        <p className="mt-4 text-lg leading-6 text-red-100">
          {`We can guarantee that it's going to be the best decision of your life.
          You'll hear things you'd never thought you'd hear.`}
        </p>
        <Link href="/api/signup">
          <a className="mt-8 w-full inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-red-500 bg-white hover:bg-indigo-50 sm:w-auto">
            Join Today
          </a>
        </Link>
      </div>
    </div>
  );
}
