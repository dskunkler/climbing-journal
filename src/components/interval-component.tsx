import React, { useState } from "react";
import { InfoModalChildrenProps } from "./info-modal";
import Grades from "./grade-component";

type Interval = {
  difficulty: string;
  sets: number;
  pace: string;
  note: string;
};

const IntervalComponent = (props: InfoModalChildrenProps) => {
  console.log("IntervalComponent loaded");
  const { info, setInfo } = props;
  const { difficulty, sets, pace, note } = JSON.parse(info) as Interval;

  const [selectedGrade, setSelectedGrade] = useState(difficulty);
  const [setsState, setSetsState] = useState(sets);
  const [paceState, setPaceState] = useState(pace);
  const [noteState, setNoteState] = useState(note);

  return (
    <>
      <div className="text-white-500">Interval</div>
      <Grades
        grade={difficulty}
        setSelectedGrade={(grade) => {
          setSelectedGrade(grade);
          setInfo(
            JSON.stringify({
              difficulty: grade,
              setsState,
              paceState,
              noteState,
            })
          );
        }}
      />
    </>
  );
};

export default IntervalComponent;
