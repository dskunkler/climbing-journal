import React from "react";
import { type CycleEvent } from "./macro-cycle";
import DayModal from "./day-modal";
import { EXERCISES } from "~/utils/helper";

export type DayProps = { date: Date; events: CycleEvent[] };

export const Day = (props: DayProps) => {
  const { date, events } = props;
  console.log("~events in day", events);
  const newDate = new Date(date);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const dayNum = newDate.getDate();
  return (
    <div
      className="container flex h-full w-full flex-col justify-start rounded-full"
      onClick={handleOpen}
    >
      <div className="flex justify-end pr-1 pt-1">
        {dayNum == 1 ? `${newDate.getUTCMonth() + 1}/${dayNum}` : `${dayNum}`}
      </div>
      <div className="min-h-fit shrink-0">
        {events.map((event) => (
          <div key={event.name}>{EXERCISES[event.name]}</div>
        ))}
      </div>
      {/**I think we want to maybe add some sort of event name list here and then show more details in the day Modal?
       * Book has it so theres like an abreviated name which I think is decent and then inside the day modal we can have more informations
       * Maybe we can even make it so the Events have a modal with more info....
       */}
      <DayModal
        events={events}
        handleClose={handleClose}
        open={open}
        date={date}
      />
    </div>
  );
};

export default Day;
