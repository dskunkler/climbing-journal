import React, { useEffect, useState } from "react";
import PitchComponent from "./pitch";
import { type InfoModalChildrenProps } from "./info-modal";

export type OutdoorMileage<G> = {
  goal: string;
  pitches: Array<G>;
};

const OutdoorMileageComponent = (prop: InfoModalChildrenProps) => {
  const { info, setInfo } = prop;
  const infoJson = JSON.parse(info) as OutdoorMileage<string>;
  const [goal, setGoal] = useState(infoJson.goal);
  const [pitches, setPitches] = useState(infoJson.pitches);
  useEffect(() => {
    setInfo(JSON.stringify({ goal, pitches }));
  }, [goal, pitches, setInfo]);
  // TODO: YOU NEED TO FIGURE OUT WHY ITS NOT KEEPING THE INFO HERE... MY HACKEY WORKAROUND IS TO JUST CLOSE BUT I DONT LOVE THAT
  return (
    <div key={info}>
      Goal:
      <textarea
        name="eventInfo"
        placeholder={"Event Info"}
        value={goal}
        rows={4}
        cols={40}
        className="resize rounded-md bg-slate-800 text-red-500 outline-dashed outline-stone-900"
        onChange={(e) => setGoal(e.target.value)}
      />
      <PitchComponent pitches={pitches} setPitches={setPitches} />
    </div>
  );
};

export default OutdoorMileageComponent;
