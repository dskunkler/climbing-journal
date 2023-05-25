import Calendar from "react-calendar";
import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import MacroCycle from "./macro-cycle";

export const CalendarWizard = () => {
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
export default CalendarWizard;
