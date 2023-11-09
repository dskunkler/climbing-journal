import React, { useState } from "react";
import { type InfoModalChildrenProps } from "./info-modal";
import Time from "./time";
import Note from "./note";
import Set from "./set";
import Grade from "./grade-component";

type ARCType = {
  grade: string;
  duration: number;
  sets: number;
  note: string;
};
const ARC = (props: InfoModalChildrenProps) => {
  const { info, setInfo } = props;
  const infoJson = JSON.parse(info) as ARCType;
  const [timeState, setTimeState] = useState(infoJson.duration);
  const [grade, setGrade] = useState(infoJson.grade);
  const [sets, setSets] = useState(infoJson.sets);
  const [note, setNote] = useState(infoJson.note);

  return (
    <>
      <Grade
        grade={grade}
        setSelectedGrade={(grade) => {
          setGrade(grade);
          setInfo(JSON.stringify({ grade, duration: timeState, sets, note }));
        }}
      />
      <Time
        time={timeState}
        showSeconds={false}
        handleChange={(duration: number) => {
          setTimeState(duration);
          setInfo(JSON.stringify({ grade, duration, sets, note }));
        }}
      />
      <Set
        sets={sets}
        handleChange={(sets) => {
          setSets(sets);
          setInfo(JSON.stringify({ grade, duration: timeState, sets, note }));
        }}
      />
      <Note
        note={note}
        handleChange={(note) => {
          setNote(note);
          setInfo(JSON.stringify({ grade, duration: timeState, sets, note }));
        }}
      />
    </>
  );
};

export default ARC;
