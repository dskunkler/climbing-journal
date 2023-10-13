import React from "react";

type NoteProps = {
  note: string;
  title?: string;
  handleChange: (note: string) => void;
};

const Note = (props: NoteProps) => {
  const { note = "", handleChange, title } = props;
  return (
    <div className="flex w-fit items-center">
      {title}
      <textarea
        name="skill-note"
        value={note}
        rows={1}
        className="m-3 w-full resize rounded-md bg-slate-800 text-red-500 outline-dashed outline-stone-900"
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  );
};

export default Note;
