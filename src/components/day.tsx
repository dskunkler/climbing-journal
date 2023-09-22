import React from "react";
import { type CycleEvent } from "./macro-cycle";
import DayModal from "./day-modal";
import { EXERCISES } from "~/utils/helper";

export type DayProps = { date: Date; events: CycleEvent[] };

export const Day = (props: DayProps) => {
  const { date, events } = props;
  const newDate = new Date(date);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const dayNum = newDate.getDate();
  return (
    <div
      className="h-full cursor-pointer"
      onClick={handleOpen}
    >
      <div className="flex justify-end pr-1">
        {dayNum == 1 ? `${newDate.getUTCMonth() + 1}/${dayNum}` : `${dayNum}`}
      </div>
      <div className="min-h-fit shrink-0">
        {events.map((event) => (
          <div className="pl-0.5" key={event.name}>
            {EXERCISES[event.name]}
          </div>
        ))}
      </div>
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
