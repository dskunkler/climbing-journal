import React, { useState } from "react";

type TimeProps = {
  handleChange: (seconds: number) => void;
  time: number;
  showSeconds?: boolean;
};
const Time = (props: TimeProps) => {
  const { handleChange, time, showSeconds = true } = props;
  const [minutes, setMinutes] = useState(Math.floor(time / 60));
  const [seconds, setSeconds] = useState(time % 60);

  return (
    <div className="flex items-center">
      Min:
      <input
        name="skill-time"
        value={minutes}
        type="number"
        min={0}
        max={120}
        className="m-3 resize rounded-md bg-slate-800 text-red-500 outline-dashed outline-stone-900"
        onChange={(e) => {
          setMinutes(+e.target.value);
          handleChange(+e.target.value * 60 + seconds);
        }}
      />
      {showSeconds && (
        <div>
          Sec:
          <input
            name="skill-time"
            value={seconds}
            type="number"
            min={1}
            max={120}
            className="m-3 resize rounded-md bg-slate-800 text-red-500 outline-dashed outline-stone-900"
            onChange={(e) => {
              setSeconds(+e.target.value);
              handleChange(minutes * 60 + +e.target.value);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Time;
