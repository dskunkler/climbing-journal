import React, {
  type Dispatch,
  type SetStateAction,
  useEffect,
  useState,
} from "react";

export type Technique = {
  name: string;
  time: number;
  note: string;
};

export type TechniqueProps = Technique & {
  index: number;
  setTech: (technique: Technique) => void;
};
const Technique = (props: TechniqueProps) => {
  const { name, time, note, setTech } = props;
  const [nameState, setNameState] = useState(name);
  const [timeState, setTimeState] = useState(time);
  const [noteState, setNoteState] = useState(note);

  useEffect(() => {
    setTech({ name: nameState, time: timeState, note: noteState });
  }, [nameState, timeState, noteState, setTech]);
  // maybe have edit button, if editing, have save button, maybe just have these be editable and on change we setTech?
  return (
    <div>
      <div className="flex items-center">
        Name:
        <textarea
          name="skill-name"
          value={nameState}
          rows={1}
          cols={nameState.length}
          className="m-3 resize rounded-md bg-slate-800 text-red-500 outline-dashed outline-stone-900"
          onChange={(e) => setNameState(e.target.value)}
        />
      </div>
      <div className="flex items-center">
        Time:
        <textarea
          name="skill-time"
          value={timeState}
          rows={1}
          cols={4}
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
