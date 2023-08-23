import Calendar from "react-calendar";
import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { type RouterOutputs, api } from "~/utils/api";
import MacroCycleComponent, { MacroKey, type MacroCycle } from "./macro-cycle";
import { LoadingPage } from "../components/loading-spinner";
import isBetween from "dayjs/plugin/isBetween";
import dayjs from "dayjs";
import GoalModal from "./goal-modal";
dayjs.extend(isBetween);

type CalendarProps = {
  closeCal: () => void;
};

export const CalendarWizard = (props: CalendarProps) => {
  const { closeCal } = props;
  // auth
  const { user } = useUser();
  // calendar date
  const [date, setDate] = useState<undefined | Date>();
  // MacroObject
  const [macroData, setMacroData] = useState<MacroCycle>();

  const [showGoalModal, setShowGoalModal] = useState(true);
  const [userGoal, setUserGoal] = useState("");

  const ctx = api.useContext();
  const { mutate, isLoading: isPostingMacro } =
    api.macroCycles.create.useMutation({
      onSuccess: () => {
        void ctx.macroCycles.invalidate();
      },
    });

  // Looking at macro Data we're getting from passing the setter prop
  useEffect(() => {
    // console.log("~~", macroData);
  }, [macroData]);

  // Just looking at the calendar date with this for testing
  useEffect(() => {
    // console.log("selected: ", date);
  }, [date]);

  if (!user) return null;
  // if (isLoadingCycles) return <LoadingPage />;
  return (
    <div className="w-full">
      <div className="mb-1.5 flex justify-center">
        {showGoalModal ? (
          <GoalModal
            open={showGoalModal}
            handleClose={() => setShowGoalModal(false)}
            goal={userGoal}
            setGoal={setUserGoal}
          />
        ) : (
          <Calendar
            onChange={(event) => {
              if (event) setDate(event as Date);
            }}
            value={date}
            calendarType="US"
            className={"react-calendar"}
          />
        )}
        {date && <MacroKey />}
      </div>
      {date && <MacroCycleComponent startDate={date} setMacro={setMacroData} />}
      <div className="flex justify-center">
        {date && macroData && macroData.microCycles && (
          <button
            className="m-1.5 rounded-full border-solid p-1.5 ring-2 ring-amber-300"
            onClick={() => {
              mutate({ ...macroData, goal: userGoal });
              closeCal();
            }}
          >
            Submit
          </button>
        )}
      </div>
    </div>
  );
};
export default CalendarWizard;
