import React, { useState } from "react";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { type InfoModalChildrenProps } from "./info-modal";
import Time from "./time";
import Grade from "./grade-component";

type WarmUpBoulderLadderType = {
  time: number;
  climbs: Array<string>;
};
const WarmUpBoulderLadder = (props: InfoModalChildrenProps) => {
  const { info, setInfo } = props;
  const infoJson = JSON.parse(info) as WarmUpBoulderLadderType;
  const [timeState, setTimeState] = useState(infoJson.time);
  const [climbs, setClimbs] = useState(infoJson.climbs ?? []);

  return (
    <>
      <Time
        time={timeState}
        showSeconds={false}
        handleChange={(time: number) => {
          setTimeState(time);
          setInfo(JSON.stringify({ time, climbs }));
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
                setInfo(JSON.stringify({ climbs: newClimbs, time: timeState }));
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

export default WarmUpBoulderLadder;
