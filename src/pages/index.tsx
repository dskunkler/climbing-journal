import { type NextPage } from "next";
import Head from "next/head";
import { SignInButton, useUser, UserButton } from "@clerk/nextjs";
import MacroView from "~/components/macro-view";

const Home: NextPage = () => {
  // This is for learning purposes can remove later

  const user = useUser();

  return (
    <>
      <Head>
        <title>Climbing Journal</title>
        <meta name="description" content="Climbing Journal header" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            Climb <span className="text-[hsl(280,100%,70%)]">HARDER</span>{" "}
          </h1>
          <div className="flex w-full flex-col items-center gap-2">
            {user.isSignedIn && <MacroView />}
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
