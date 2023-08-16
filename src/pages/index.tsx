import { type NextPage } from "next";
import Head from "next/head";

import { api } from "~/utils/api";
import { SignInButton, useUser, UserButton } from "@clerk/nextjs";
import { CalendarWizard } from "../components/calendar-wizard";
import { useEffect, useState } from "react";
import { LoadingPage } from "../components/loading-spinner";
import MacroCycleComponent from "../components/macro-cycle";

const Home: NextPage = () => {
  // This is for learning purposes can remove later

  api.posts.getAll.useQuery();
  const user = useUser();

  const { data: latestMacroData, isLoading: isLoadingCycles } =
    api.macroCycles.getMostRecent.useQuery();

  useEffect(() => {
    console.log("latest?: ", latestMacroData);
  }, [latestMacroData]);

  const [showCalendar, setShowCalendar] = useState(false);

  if (isLoadingCycles) return <LoadingPage />;

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
            {user.isSignedIn &&
              !showCalendar &&
              (latestMacroData ? (
                <MacroCycleComponent macroCycle={latestMacroData} />
              ) : (
                <button
                  onClick={() => setShowCalendar(true)}
                  className="rounded-full border border-purple-200 px-4 py-1 text-sm font-semibold text-purple-600 hover:border-transparent hover:bg-purple-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
                >
                  Get Started
                </button>
              ))}
            {showCalendar && <CalendarWizard />}
            {/* <PostPage /> */}
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
