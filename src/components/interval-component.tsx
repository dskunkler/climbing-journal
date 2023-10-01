import React, { useState } from "react";
import { InfoModalChildrenProps } from "./info-modal";
import Grades from "./grade-component";
import Time from "./time";
import Set from "./set";
import Note from "./note";

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
        setSelectedGrade={(difficulty) => {
          setSelectedGrade(difficulty);
          setInfo(
            JSON.stringify({
              difficulty,
              sets: setsState,
              pace: paceState,
              note: noteState,
            })
          );
        }}
      />
      <Set
        sets={setsState}
        handleChange={(sets) => {
          setSetsState(sets);
          setInfo(
            JSON.stringify({
              difficulty: selectedGrade,
              sets,
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
          handleChange={(pace) => {
            setPaceState(pace);
            setInfo(
              JSON.stringify({
                difficulty: selectedGrade,
                sets: setsState,
                pace,
                note: noteState,
              })
            );
          }}
        />
      </div>
      <Note
        note={noteState}
        handleChange={(note) => {
          setNoteState(note);
          setInfo(
            JSON.stringify({
              difficulty: selectedGrade,
              sets: setsState,
              pace: paceState,
              note,
            })
          );
        }}
      />
    </>
  );
};

export default IntervalComponent;
