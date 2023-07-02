import { useEffect, useState } from "react";
import dayjs from "dayjs";
import Day from "./day";
import { type RouterOutputs } from "~/utils/api";

export type PrismaMacroCycle = RouterOutputs["macroCycles"]["getMostRecent"];
export type MacroCycle = {
  start: Date;
  end: Date;
  goal: string;
  microCycles: MicroCycle[];
};

type MicroCycle = {
  start: Date;
  end: Date;
  duration: number; // Number of days
  name: string;
  events: Event[];
};
type Event = {
  date: Date;
  name: string;

  info: { [k: string]: unknown }; // This will likely be different each type of event and hold its specific data.
};

type MicroCycleShape = {
  name: string;
  duration: number;
  color: string;
};

export type CycleEvent = {
  day: Date;
  description: string;
};

type MacroCycleProps = {
  startDate?: Date;
  setMacro?: (val: MacroCycle) => void;
  macroCycle?: PrismaMacroCycle;
};

const macroArray = [
  { name: "Base Fitness", duration: 28, color: "bg-violet-400" },
  { name: "Strength", duration: 21, color: "bg-violet-500" },
  { name: "Power", duration: 15, color: "bg-fuchsia-800" },
  { name: "Power Endurance", duration: 21, color: "bg-rose-600" },
  { name: "Performance", duration: 22, color: "bg-orange-300" },
  { name: "Rest", duration: 14, color: "bg-emerald-500" },
];

export const MacroKey = () => {
  return (
    <>
      <div className="flex-col items-center justify-center">
        {macroArray.map((item, index) => (
          <div
            key={index}
            className={`flex ${item.color} p-.5 m-2 justify-center rounded-lg`}
          >
            {item.name}
          </div>
        ))}
      </div>
    </>
  );
};

export const MacroCycle = (props: MacroCycleProps) => {
  const { setMacro, macroCycle: macroCycleProp } = props;
  const startDate = macroCycleProp ? macroCycleProp.start : props.startDate;
  if (!startDate) {
    throw new Error("Start dating missing in MacroCycle");
  }

  const today = new Date(startDate);
  const [phases, setPhases] = useState<MicroCycleShape[]>(macroArray);
  const [goal, setGoal] = useState(
    macroCycleProp ? macroCycleProp.goal : "Get Yoked"
  );
  const [macroCycle, setMacroCycle] = useState<MacroCycle>({
    start: today,
    goal,
    microCycles: [
      {
        name: "Base Fitness",
        duration: 28,
        start: today,
        end: dayjs().add(28, "day").toDate(),
        events: [],
      },
      {
        name: "Strength",
        duration: 21,
        start: dayjs().add(28, "day").toDate(),
        end: dayjs()
          .add(21 + 28, "day")
          .toDate(),
        events: [],
      },
      {
        name: "Power",
        duration: 15,
        start: dayjs().add(49, "day").toDate(),
        end: dayjs()
          .add(15 + 49, "day")
          .toDate(),
        events: [],
      },
      {
        name: "Power Endurance",
        duration: 21,
        start: dayjs().add(64, "day").toDate(),
        end: dayjs()
          .add(21 + 64, "day")
          .toDate(),
        events: [],
      },
      {
        name: "Performance",
        duration: 22,
        start: dayjs().add(85, "day").toDate(),
        end: dayjs()
          .add(22 + 85, "day")
          .toDate(),
        events: [],
      },
      {
        name: "Rest",
        duration: 14,
        start: dayjs().add(107, "day").toDate(),
        end: dayjs()
          .add(14 + 107, "day")
          .toDate(),
        events: [],
      },
    ],
    end: dayjs()
      .add(14 + 107, "day")
      .toDate(),
  });
  useEffect(() => {
    setMacro && setMacro(macroCycle);
  }, [macroCycle, setMacro]);

  const [events, setEvents] = useState<CycleEvent[]>([]);

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

  const renderTableWeek = () => {
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
            <Day date={new Date(currDay)} events={filteredEvents} />
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

    tableRows.push(renderTableWeek());

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

export default MacroCycle;
