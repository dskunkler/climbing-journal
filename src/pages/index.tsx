import { type NextPage } from "next";
import Head from "next/head";

import { type RouterOutputs, api } from "~/utils/api";
import { SignInButton, useUser, UserButton } from "@clerk/nextjs";
import { CalendarWizard } from "../components/calendar-wizard";
import { useEffect, useState } from "react";
import { LoadingPage } from "../components/loading-spinner";
import MacroCycleComponent from "../components/macro-cycle";
import Image from "next/image";

// type PostWithUsers = RouterOutputs["posts"]["getAll"][number];
// const PostPage = () => {
//   const { data, isLoading } = api.posts.getAll.useQuery();
//   const [input, setInput] = useState("");
//   const ctx = api.useContext();
//   const { mutate, isLoading: isPosting } = api.posts.create.useMutation({
//     onSuccess: () => {
//       setInput("");
//       void ctx.posts.invalidate();
//     },
//   });

//   if (isLoading) return <LoadingPage />;
//   if (!data) return <div>Error loading...</div>;
//   return (
//     <>
//       <input
//         placeholder="Test"
//         value={input}
//         onChange={(e) => setInput(e.target.value)}
//         disabled={isPosting}
//       />
//       <button onClick={() => mutate({ content: input })}>Submit</button>

//       <div>
//         {data?.map((fullPost) => (
//           <PostView {...fullPost} key={fullPost.post.id} />
//         ))}
//       </div>
//     </>
//   );
// };
// const PostView = (props: PostWithUsers) => {
//   const { post, author } = props;
//   return (
//     <>
//       <div key={post.id} className="flex justify-center gap-3">
//         <Image
//           src={author.profileImageUrl}
//           alt={`${author.username || "Authors"} Image`}
//           className="rounded-full"
//           width={56}
//           height={56}
//         />
//         {post.content}
//       </div>
//     </>
//   );
// };

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

  // TODO Add boolean to see if we have data, if so just show the microcycle

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
          <AuthShowcase />
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            Climb <span className="text-[hsl(280,100%,70%)]">HARDER</span>{" "}
          </h1>
          <div className="flex flex-col items-center gap-2">
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

const AuthShowcase: React.FC = () => {
  // const { data: sessionData } = useSession();
  const user = useUser();

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
