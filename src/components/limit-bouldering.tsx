import React, { useState } from "react";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { type InfoModalChildrenProps } from "./info-modal";
import Time from "./time";
import Note from "./note";

type LimitBoulderingType = {
  duration: number;
  moves: Array<string>;
};
const LimitBouldering = (props: InfoModalChildrenProps) => {
  const { info, setInfo } = props;
  const infoJson = JSON.parse(info) as LimitBoulderingType;
  const [timeState, setTimeState] = useState(infoJson.duration);
  const [moves, setMoves] = useState(infoJson.moves);

  return (
    <>
      <Time
        time={timeState}
        showSeconds={false}
        handleChange={(duration: number) => {
          setTimeState(duration);
          setInfo(JSON.stringify({ duration, moves }));
        }}
      />
      Moves:
      <ul>
        {moves.map((move, index) => (
          <li key={`move-${index}`}>
            <Note
              note={move}
              handleChange={(newMove) => {
                const newMoves = moves.map((oldMove, i) => {
                  if (i === index) {
                    return newMove;
                  }
                  return oldMove;
                });

                setMoves(newMoves);
                setInfo(
                  JSON.stringify({ moves: newMoves, duration: timeState })
                );
              }}
            />
          </li>
        ))}
      </ul>
      <AddCircleOutlineOutlinedIcon
        onClick={() => {
          setMoves([...moves, ""]);
        }}
      />
    </>
  );
};

export default LimitBouldering;
