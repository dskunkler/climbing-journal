import React, {
  type Dispatch,
  type SetStateAction,
  useEffect,
  useState,
  useRef,
} from "react";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";

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

  useEffect(() => {
    console.log("info changed....");
  }, [nameState, timeState, noteState]);

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
          onChange={(e) => setNameState(e.target.value)}
        />
        <DeleteOutlinedIcon onClick={() => deleteTechnique()} />
      </span>
      <div className="flex items-center">
        Time:
        <input
          name="skill-time"
          value={timeState}
          type="number"
          min={1}
          max={120}
          className="m-3 resize rounded-md bg-slate-800 text-red-500 outline-dashed outline-stone-900"
          onChange={(e) => setTimeState(+e.target.value)}
        />
      </div>
      <div className="flex items-center">
        Note:
        <textarea
          name="skill-note"
          value={noteState}
          rows={1}
          cols={noteState.length}
          className="m-3 resize rounded-md bg-slate-800 text-red-500 outline-dashed outline-stone-900"
          onChange={(e) => setNoteState(e.target.value)}
        />
      </div>
    </div>
  );
};

export default Technique;
