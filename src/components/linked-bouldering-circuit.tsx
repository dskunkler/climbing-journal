import React, { useState } from "react";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { type InfoModalChildrenProps } from "./info-modal";
import Time from "./time";
import Grade from "./grade-component";
import Set from "./set";
import Note from "./note";

type LinkedBoulderingCircuitType = {
  pace: number;
  climbs: Array<string>;
  sets: number;
  note: string;
};
const LinkedBoulderingCircuit = (props: InfoModalChildrenProps) => {
  const { info, setInfo } = props;
  const infoJson = JSON.parse(info) as LinkedBoulderingCircuitType;
  const [pace, setPace] = useState(infoJson.pace);
  // Should difficulty be maybe an array of moves or should we just keep it string and have it be a note or something?
  // I'm thinking leave difficulty as a grade and peopel can just aim for around that. But does that make it less trackable?

  const [climbs, setClimbs] = useState(infoJson.climbs ?? []);
  const [sets, setSets] = useState(infoJson.sets);
  const [note, setNote] = useState(infoJson.note);

  return (
    <>
      <Time
        time={pace}
        showSeconds={false}
        handleChange={(pace: number) => {
          setPace(pace);
          setInfo(JSON.stringify({ pace, climbs, sets, note }));
        }}
      />
      <Set
        sets={sets}
        handleChange={(sets) => {
          setSets(sets);
          setInfo(JSON.stringify({ pace, sets, climbs, note }));
        }}
      />
      <Note
        title="Note"
        note={note}
        handleChange={(note) => {
          setNote(note);
          setInfo(JSON.stringify({ note, climbs, sets, pace }));
        }}
      />
      Climbs:
      <ul>
        {climbs.map((grade, index) => (
          <li key={`grade-${index}`}>
            <Grade
              grade={grade}
              setSelectedGrade={(newClimb) => {
                const newClimbs = climbs.map((oldClimb, i) => {
                  if (i === index) {
                    return newClimb;
                  }
                  return oldClimb;
                });

                setClimbs(newClimbs);
                setInfo(
                  JSON.stringify({ climbs: newClimbs, pace, sets, note })
                );
              }}
            />
          </li>
        ))}
      </ul>
      <AddCircleOutlineOutlinedIcon
        onClick={() => {
          setClimbs([...climbs, ""]);
        }}
      />
    </>
  );
};

export default LinkedBoulderingCircuit;
