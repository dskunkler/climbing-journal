import Calendar from "react-calendar";
import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { type RouterOutputs, api } from "~/utils/api";
import MacroCycleComponent, { MacroKey, type MacroCycle } from "./macro-cycle";
import { LoadingPage } from "../components/loading-spinner";
import isBetween from "dayjs/plugin/isBetween";
import dayjs from "dayjs";
dayjs.extend(isBetween);

export const CalendarWizard = () => {
  // auth
  const { user } = useUser();
  // calendar date
  const [date, setDate] = useState<undefined | Date>();
  // MacroObject
  const [macroData, setMacroData] = useState<MacroCycle>();

  const ctx = api.useContext();
  const { mutate, isLoading: isPostingMacro } =
    api.macroCycles.create.useMutation({
      onSuccess: () => {
        void ctx.macroCycles.invalidate();
      },
    });

  // Looking at macro Data we're getting from passing the setter prop
  useEffect(() => {
    console.log("~~", macroData);
  }, [macroData]);

  // Just looking at the calendar date with this for testing
  useEffect(() => {
    console.log("selected: ", date);
  }, [date]);

  if (!user) return null;
  // if (isLoadingCycles) return <LoadingPage />;
  return (
    <div>
      <div className="flex justify-center">
        <Calendar
          onChange={(event) => {
            if (event) setDate(event as Date);
          }}
          value={date}
          calendarType="US"
          className={"react-calendar"}
        />
        {date && <MacroKey />}
      </div>
      {date && <MacroCycleComponent startDate={date} setMacro={setMacroData} />}
      <div className="flex justify-center">
        {date && macroData && macroData.microCycles && (
          <button onClick={() => mutate({ ...macroData })}>Submit</button>
        )}
      </div>
    </div>
  );
};
export default CalendarWizard;
