import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
// import { signIn, signOut, useSession } from "next-auth/react";

import { api } from "~/utils/api";
import {
  SignIn,
  SignInButton,
  UserProfile,
  useUser,
  UserButton,
} from "@clerk/nextjs";

const Home: NextPage = () => {
  const hello = api.example.hello.useQuery({
    text: "from training for climbing",
  });

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
          <div className="flex flex-col items-center gap-2">
            <p className="text-2xl text-white">
              {hello.data ? hello.data.greeting : "Loading tRPC query..."}
            </p>
            <AuthShowcase />
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

  const { data: secretMessage } = api.example.getSecretMessage.useQuery(
    undefined, // no input
    // { enabled: sessionData?.user !== undefined }
    { enabled: user.isSignedIn }
  );

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-white">
        {/* {!!user.user && <span>Logged in as {user.user}</span>} */}
        {secretMessage && <span> - {secretMessage}</span>}
      </p>
      {/* {!user.isSignedIn ? user : "WHO ARE YOU?!"} */}
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
