import { useEffect, useState } from "react";
import dayjs from "dayjs";
import Day from "./day";
import { type RouterOutputs } from "~/utils/api";
import { type Prisma } from "@prisma/client";

export type PrismaMacroCycle = RouterOutputs["macroCycles"]["getMostRecent"];

export type MacroCycle = {
  id?: string;
  start: Date;
  end: Date;
  goal: string;
  userId?: string;
  microCycles: MicroCycle[];
  events: CycleEvent[];
};

type MicroCycle = {
  start: Date;
  end: Date;
  duration: number; // Number of days
  name: string;
};
export type CycleEvent = {
  id?: string | undefined;
  // info: Prisma.JsonValue; I want this to be a json object but the typing is driving me insane https://github.com/dskunkler/climbing-journal/issues/54
  info: string | null | undefined;
  date: Date;
  name: string;
};

type MicroCycleShape = {
  name: string;
  duration: number;
  color: string;
};

type MacroCycleProps = {
  startDate?: Date;
  setMacro?: (val: MacroCycle) => void;
  macroCycle?: PrismaMacroCycle;
  events?: CycleEvent[];
  userGoal?: string;
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
  const { setMacro, macroCycle: macroCycleProp, userGoal = "" } = props;
  const startDate = macroCycleProp ? macroCycleProp.start : props.startDate;
  if (!startDate) {
    throw new Error("Start dating missing in MacroCycle");
  }

  const today = new Date(startDate);
  const [phases, setPhases] = useState<MicroCycleShape[]>(macroArray);
  const [goal, setGoal] = useState(
    macroCycleProp ? macroCycleProp.goal : userGoal
  );
  const [macroCycle, setMacroCycle] = useState<MacroCycle>({
    start: today,
    goal,
    events: [],
    microCycles: [
      {
        name: "Base Fitness",
        duration: 28,
        start: today,
        end: dayjs().add(28, "day").toDate(),
      },
      {
        name: "Strength",
        duration: 21,
        start: dayjs().add(28, "day").toDate(),
        end: dayjs()
          .add(21 + 28, "day")
          .toDate(),
      },
      {
        name: "Power",
        duration: 15,
        start: dayjs().add(49, "day").toDate(),
        end: dayjs()
          .add(15 + 49, "day")
          .toDate(),
      },
      {
        name: "Power Endurance",
        duration: 21,
        start: dayjs().add(64, "day").toDate(),
        end: dayjs()
          .add(21 + 64, "day")
          .toDate(),
      },
      {
        name: "Performance",
        duration: 22,
        start: dayjs().add(85, "day").toDate(),
        end: dayjs()
          .add(22 + 85, "day")
          .toDate(),
      },
      {
        name: "Rest",
        duration: 14,
        start: dayjs().add(107, "day").toDate(),
        end: dayjs()
          .add(14 + 107, "day")
          .toDate(),
      },
    ],
    end: dayjs()
      .add(14 + 107, "day")
      .toDate(),
  });
  useEffect(() => {
    setMacro && setMacro(macroCycle);
  }, [macroCycle, setMacro]);

  const events = macroCycleProp?.events ?? (props.events || []);

  // This will likely need to be a mutation
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

  const renderTableHeader = () => {
    const daysOfWeek = ["Sun", "Mon", "Tues", "Wed", "Thu", "Fri", "Sat"];
    return daysOfWeek.map((day) => (
      <th
        className="border-separate border-spacing-1 border border-slate-500"
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
          className="border border-slate-500 bg-emerald-500 align-top "
        />
      );
    }
    // Go through each phase
    const currDay = new Date(startDate);
    for (const phase of phases) {
      // Add the phase day to the curr week
      for (let i = 0; i < phase.duration; i++) {
        const filteredEvents = events.filter(
          (event) => event.date.toDateString() == currDay.toDateString()
        );
        currWeek.push(
          <td
            key={currDay.toISOString()}
            className={`${phase.color} border border-slate-500 align-top`}
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
        <td className={"border border-slate-500 text-center"}>{index}</td>
        {week}
      </tr>
    ));
  };

  const renderTable = () => {
    const tableRows = [];

    tableRows.push(renderTableWeek());

    return (
      <div className="w-full">
        <div className="flex pb-2">
          Goal:
          <div className="pl-1 font-semibold text-amber-500">{goal}</div>
        </div>
        <table className="w-full table-fixed border-separate border-spacing-1 rounded-lg border border-slate-500 align-top ">
          <thead>
            <tr className="sm:text-sm">
              <th className="border-separate border-spacing-1 border border-slate-500">
                Wk
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
    <>
      {renderTable()}
      {/* <button onClick={() => handlePhaseDurationChange(0, phases[0].duration + 1)}>Add day</button>
      <button onClick={() => handlePhaseDurationChange(0, phases[0].duration -1)}> Remove day</button> */}
    </>
  );
};

export default MacroCycle;
