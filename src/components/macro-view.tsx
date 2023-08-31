import React from "react";
import { api } from "~/utils/api";
import { CalendarWizard } from "../components/calendar-wizard";
import { useEffect, useState } from "react";
import { LoadingPage } from "../components/loading-spinner";
import MacroCycleComponent from "../components/macro-cycle";

const MacroView = () => {
  api.posts.getAll.useQuery();

  const { data: latestMacroData, isLoading: isLoadingCycles } =
    api.macroCycles.getMostRecent.useQuery();

  useEffect(() => {
    // console.log("latest?: ", latestMacroData);
  }, [latestMacroData]);

  const [showCalendar, setShowCalendar] = useState(false);

  return (
    <>
      {latestMacroData ? (
        <MacroCycleComponent macroCycle={latestMacroData} />
      ) : showCalendar ? (
        <CalendarWizard closeCal={() => setShowCalendar(false)} />
      ) : (
        <button
          onClick={() => setShowCalendar(true)}
          className="rounded-full border border-purple-200 px-4 py-1 text-sm font-semibold text-purple-600 hover:border-transparent hover:bg-purple-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
        >
          Get Started
        </button>
      )}
    </>
  );
};

export default MacroView;
