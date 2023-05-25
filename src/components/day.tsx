import React from "react";
import { type CycleEvent } from "./macro-cycle";

export type DayProps = { date: Date; events: CycleEvent[] };

export const Day = (props: DayProps) => {
  const { date, events } = props;
  const newDate = new Date(date);

  const dayNum = newDate.getDate();
  return (
    <div className="relative p-2">
      <div className="absolute bottom-0 right-1">
        {dayNum == 1 ? `${newDate.getUTCMonth() + 1}/${dayNum}` : `${dayNum}`}
      </div>
      {events.map((event, index) => (
        <ul
          key={`event_${index}_${event.day.toISOString()}`}
          id={`event_${index}_${event.day.toISOString()}`}
        >
          {event.description}
        </ul>
      ))}
    </div>
  );
};

export default Day;
