import React from "react";
import { type CycleEvent } from "./macro-cycle";
import DayModal from "./day-modal";

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
      className="relative h-full w-full rounded-full p-2"
      onClick={handleOpen}
    >
      <div className="absolute bottom-0 right-1">
        {dayNum == 1 ? `${newDate.getUTCMonth() + 1}/${dayNum}` : `${dayNum}`}
      </div>
      <DayModal events={events} handleClose={handleClose} open={open} />
    </div>
  );
};

export default Day;
