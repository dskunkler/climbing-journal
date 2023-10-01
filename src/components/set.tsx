import React from "react";

type SetProps = {
  sets: number;
  handleChange: (sets: number) => void;
};

const Set = (props: SetProps) => {
  const { sets, handleChange } = props;
  return (
    <>
      Set:
      <input
        name="sets"
        value={sets}
        type="number"
        min={1}
        max={120}
        className="m-3 resize rounded-md bg-slate-800 text-red-500 outline-dashed outline-stone-900"
        onChange={(e) => handleChange(+e.target.value)}
      />
    </>
  );
};

export default Set;
