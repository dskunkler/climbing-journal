import React, { useState } from "react";

type NameProps = {
  name: string;
  onChange: (name: string) => void;
};

const Name = (props: NameProps) => {
  const { name, onChange } = props;
  const [nameState, setNameState] = useState(name);
  return (
    <>
      Name:
      <textarea
        name="name"
        value={nameState}
        rows={1}
        cols={nameState.length + 4}
        className="m-3 resize rounded-md bg-slate-800 text-red-500 outline-dashed outline-stone-900"
        onChange={(e) => {
          setNameState(e.target.value);
          onChange(e.target.value);
        }}
      />
    </>
  );
};

export default Name;
