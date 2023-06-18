import Calendar from "react-calendar";
import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { type RouterOutputs, api } from "~/utils/api";
import MacroCycleComponent, { MacroKey, type MacroCycle } from "./macro-cycle";

export const CalendarWizard = () => {
  const { user } = useUser();
  const [date, setDate] = useState<undefined | Date>();
  const [macroData, setMacroData] = useState<MacroCycle>();
  const { data, isLoading } = api.macroCycles.getAll.useQuery();
  const ctx = api.useContext();
  const { mutate, isLoading: isPostingMacro } =
    api.macroCycles.create.useMutation({
      onSuccess: () => {
        void ctx.macroCycles.invalidate();
      },
    });
  useEffect(() => {
    console.log("~~", macroData);
  }, [macroData]);
  useEffect(() => {
    console.log("selected: ", date);
  }, [date]);
  if (!user) return null;
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
        {date && macroData && macroData.microCycles && (
          <button onClick={() => mutate({ ...macroData })}>Submit</button>
        )}
      </div>
      {date && <MacroCycleComponent startDate={date} setMacro={setMacroData} />}
    </div>
  );
};
export default CalendarWizard;
