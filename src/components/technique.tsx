import React, { useState } from "react";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import Time from "./time";
import Note from "./note";

export type Technique = {
  name: string;
  time: number;
  note: string;
};

export type TechniqueProps = Technique & {
  index: number;
  setTech: (technique: Technique) => void;
  deleteTechnique: () => void;
};
const Technique = (props: TechniqueProps) => {
  const { name, time, note, setTech, deleteTechnique } = props;
  const [nameState, setNameState] = useState(name);
  const [timeState, setTimeState] = useState(time);
  const [noteState, setNoteState] = useState(note);

  return (
    <div>
      <span className="flex items-center justify-between">
        Name:
        <textarea
          name="skill-name"
          value={nameState}
          rows={1}
          cols={nameState.length + 4}
          className="m-3 resize rounded-md bg-slate-800 text-red-500 outline-dashed outline-stone-900"
          onChange={(e) => {
            setNameState(e.target.value);
            setTech({
              name: e.target.value,
              time: timeState,
              note: noteState,
            });
          }}
        />
        <DeleteOutlinedIcon onClick={() => deleteTechnique()} />
      </span>
      <Time
        time={timeState}
        showSeconds={false}
        handleChange={(seconds: number) => {
          setTimeState(seconds);
          setTech({
            name: nameState,
            time: seconds,
            note: noteState,
          });
        }}
      />
      <Note
        note={noteState}
        title="Note:"
        handleChange={(n) => {
          setNoteState(n);
          setTech({
            name: nameState,
            time: timeState,
            note: n,
          });
        }}
      />
    </div>
  );
};

export default Technique;
