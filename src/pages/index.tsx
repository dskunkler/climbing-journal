import { type NextPage } from "next";
import Head from "next/head";

import { type RouterOutputs, api } from "~/utils/api";
import { SignInButton, useUser, UserButton } from "@clerk/nextjs";
import Calendar from "react-calendar";
import { useState, useEffect } from "react";
import { LoadingPage } from "./components/loading-spinner";
import Image from "next/image";
type MicroCycle = {
  name: string;
  duration: number;
  color: string;
};

type Event = {
  day: Date;
  description: string;
};

type MacroCycleProps = {
  startDate: Date;
};

const MacroCycle = (props: MacroCycleProps) => {
  const { startDate } = props;
  const [phases, setPhases] = useState<MicroCycle[]>([
    { name: "Base Fitness", duration: 28, color: "bg-violet-400" },
    { name: "Strength", duration: 21, color: "bg-violet-500" },
    { name: "Power", duration: 15, color: "bg-fuchsia-800" },
    { name: "Power Endurance", duration: 21, color: "bg-rose-600" },
    { name: "Performance", duration: 22, color: "bg-orange-300" },
    { name: "Rest", duration: 14, color: "bg-emerald-500" },
  ]);

  const [events, setEvents] = useState<Event[]>([]);

  const handlePhaseDurationChange = (index: number, newDuration: number) => {
    if (index < 0 || index >= phases.length) {
      throw new Error("Index out of phase range");
    }
    setPhases(() => {
      const newPhases = phases;
      const phase = newPhases[index];
      if (!phase) {
        throw new Error(`Phase ${index} is undefined`);
      }
      phase.duration = newDuration;
      return newPhases;
    });
  };
  const handleAddEvent = (day: Date, description: string) => {
    setEvents((prevEvents) => [...prevEvents, { day, description }]);
  };

  const renderTableHeader = () => {
    const daysOfWeek = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
    return daysOfWeek.map((day) => (
      <th
        className="macro-header border-separate border-spacing-1 border border-slate-500"
        key={day}
      >
        {day}
      </th>
    ));
  };

  // Go through the days... for each day of the week,
  const renderTableRow = () => {
    // let weekNum = 1;
    const weeks = [];
    let currWeek = [];
    // Add all the empty days before our start
    for (let i = 0; i < startDate.getDay(); i++) {
      currWeek.push(
        <td
          key={`rest__${i}`}
          className="border border-slate-500 bg-emerald-500 "
        />
      );
    }
    // Go through each phase
    const currDay = new Date(startDate);
    for (const phase of phases) {
      // Add the phase day to the curr week
      for (let i = 0; i < phase.duration; i++) {
        const filteredEvents = events.filter(
          (event) => event.day.toDateString() == currDay.toDateString()
        );
        currWeek.push(
          <td
            key={currDay.toISOString()}
            className={`${phase.color} border border-slate-500`}
          >
            {filteredEvents.map((event, ind) => (
              <div
                key={`event_${ind}_${event.day.toISOString()}`}
                id={`event_${ind}_${event.day.toISOString()}`}
              >
                {event.description}
              </div>
            ))}
          </td>
        );
        if (currWeek.length === 7) {
          weeks.push(currWeek);
          currWeek = [];
        }
        currDay.setDate(currDay.getDate() + 1);
      }
    }
    return weeks.map((week, index) => (
      <tr key={index}>
        <td className={"week-number border border-slate-500 text-center"}>
          {index}
        </td>
        {week}
      </tr>
    ));
  };

  const renderTable = () => {
    const tableRows = [];
    const currentDate = new Date(startDate);

    tableRows.push(renderTableRow());

    return (
      <div className="w-full overflow-x-auto">
        <table className="macro-table w-full table-fixed border-separate border-spacing-1 rounded-lg border border-slate-500 ">
          <thead>
            <tr className="sm:text-sm">
              <th className="macro-header border-separate border-spacing-1 border border-slate-500">
                Week
              </th>
              {renderTableHeader()}
            </tr>
          </thead>
          <tbody>{tableRows}</tbody>
        </table>
      </div>
    );
  };

  return (
    <div>
      {renderTable()}
      {/* <button onClick={() => handlePhaseDurationChange(0, phases[0].duration + 1)}>Add day</button>
      <button onClick={() => handlePhaseDurationChange(0, phases[0].duration -1)}> Remove day</button> */}
    </div>
  );
};

const CalendarWizard = () => {
  const { user } = useUser();
  const [date, setDate] = useState<undefined | Date>();
  useEffect(() => {
    console.log("selected: ", date);
  }, [date]);
  if (!user) return null;
  return (
    <div>
      <Calendar
        onChange={(event) => {
          if (event) setDate(event as Date);
        }}
        value={date}
        calendarType="US"
        className={"react-calendar"}
      />
      {date && <MacroCycle startDate={date} />}
    </div>
  );
};

type PostWithUsers = RouterOutputs["posts"]["getAll"][number];
const PostPage = () => {
  const { data, isLoading } = api.posts.getAll.useQuery();
  const [input, setInput] = useState("");
  const ctx = api.useContext();
  const { mutate, isLoading: isPosting } = api.posts.create.useMutation({
    onSuccess: () => {
      setInput("");
      void ctx.posts.invalidate();
    },
  });

  if (isLoading) return <LoadingPage />;
  if (!data) return <div>Error loading...</div>;
  return (
    <>
      <input
        placeholder="Test"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        disabled={isPosting}
      />
      <button onClick={() => mutate({ content: input })}>Submit</button>

      <div>
        {data?.map((fullPost) => (
          <PostView {...fullPost} key={fullPost.post.id} />
        ))}
      </div>
    </>
  );
};
const PostView = (props: PostWithUsers) => {
  const { post, author } = props;
  return (
    <>
      <div key={post.id} className="flex justify-center gap-3">
        <Image
          src={author.profileImageUrl}
          alt={`${author.username || "Authors"} Image`}
          className="rounded-full"
          width={56}
          height={56}
        />
        {post.content}
      </div>
    </>
  );
};

const Home: NextPage = () => {
  // This is for learning purposes can remove later
  api.posts.getAll.useQuery();

  const [showCalendar, setShowCalendar] = useState(false);

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
            {!showCalendar && (
              <button
                onClick={() => setShowCalendar(true)}
                className="rounded-full border border-purple-200 px-4 py-1 text-sm font-semibold text-purple-600 hover:border-transparent hover:bg-purple-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
              >
                Get Started
              </button>
            )}
            {showCalendar && <CalendarWizard />}
            <PostPage />
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
