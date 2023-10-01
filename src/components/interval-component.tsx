import React, { useState } from "react";
import { InfoModalChildrenProps } from "./info-modal";
import Grades from "./grade-component";
import Time from "./time";

type Interval = {
  difficulty: string;
  sets: number;
  pace: number;
  note: string;
};

const IntervalComponent = (props: InfoModalChildrenProps) => {
  const { info, setInfo } = props;
  const { difficulty, sets, pace, note } = JSON.parse(info) as Interval;

  const [selectedGrade, setSelectedGrade] = useState(difficulty);
  const [setsState, setSetsState] = useState(sets);
  const [paceState, setPaceState] = useState(pace);
  const [noteState, setNoteState] = useState(note);

  return (
    <>
      <Grades
        grade={difficulty}
        setSelectedGrade={(grade) => {
          setSelectedGrade(grade);
          setInfo(
            JSON.stringify({
              difficulty: grade,
              sets: setsState,
              pace: paceState,
              note: noteState,
            })
          );
        }}
      />
      <div className="flex items-center">
        <div className="mr-2 font-bold">Pace: </div>
        <Time
          time={pace}
          handleChange={(seconds) => {
            setPaceState(seconds);
            setInfo(
              JSON.stringify({
                difficulty: selectedGrade,
                sets: setsState,
                pace: seconds,
                note: noteState,
              })
            );
          }}
        />
      </div>
    </>
  );
};

export default IntervalComponent;
