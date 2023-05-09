import { type NextPage } from "next";
import Head from "next/head";
// import "react-calendar/dist/Calendar.css";

import { api } from "~/utils/api";
import { SignInButton, useUser, UserButton } from "@clerk/nextjs";
import Calendar from "react-calendar";
import { useState } from "react";

const CalendarWizard = () => {
  const { user } = useUser();
  const [date, setDate] = useState(new Date());
  if (!user) return null;
  return (
    <div>
      <Calendar
        onChange={(event) => {
          if (event) setDate(event as Date);
        }}
        value={date}
        className={"react-calendar"}
      />
    </div>
  );
};

const Home: NextPage = () => {
  const { data, isLoading } = api.posts.getAll.useQuery();
  if (isLoading) return <div>Loading...</div>;
  if (!data) return <div>Error loading...</div>;

  return (
    <>
      <Head>
        <title>Climbing Journal</title>
        <meta name="description" content="Climbing Journal header" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <AuthShowcase />
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            Climb <span className="text-[hsl(280,100%,70%)]">HARDER</span>{" "}
          </h1>
          <div className="flex flex-col items-center gap-2">
            <CalendarWizard />
            <div>
              {data?.map((post) => (
                <div key={post.id}>{post.content}</div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;

const AuthShowcase: React.FC = () => {
  // const { data: sessionData } = useSession();
  const user = useUser();
  console.log("user", user.isSignedIn);

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      {!user.isSignedIn && (
        <SignInButton mode="modal">
          <button className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20">
            Sign in
          </button>
        </SignInButton>
      )}
      {user.isSignedIn && <UserButton />}
    </div>
  );
};
