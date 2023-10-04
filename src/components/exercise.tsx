import React, { useState } from "react";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import Name from "./name";
import Sets from "./set";

export type ExerciseType = {
  name: string;
  reps: number;
  sets: number;
};

type ExerciseProps = ExerciseType & {
  setExercise: (ex: ExerciseType) => void;
  deleteExercise: () => void;
};
const Exercise = (props: ExerciseProps) => {
  const { name, reps, sets, setExercise, deleteExercise } = props;
  const [nameState, setNameState] = useState(name);
  const [repState, setRepState] = useState(reps);
  const [setState, setSetState] = useState(sets);
  return (
    <>
      <span className="flex items-center justify-between">
        <Name
          name={nameState}
          onChange={(name) => {
            setNameState(name);
            setExercise({
              name,
              reps: repState,
              sets: setState,
            });
          }}
        />
        <DeleteOutlinedIcon onClick={() => deleteExercise()} />
      </span>

      <span className="flex items-center justify-between">
        <Sets
          sets={setState}
          handleChange={(sets) => {
            setSetState(sets);
            setExercise({
              name: nameState,
              sets,
              reps: repState,
            });
          }}
        />
        {/* Reusing this component for reps as well */}
        <Sets
          name="Reps"
          sets={repState}
          handleChange={(reps) => {
            setRepState(reps);
            setExercise({
              name: nameState,
              sets: setState,
              reps,
            });
          }}
        />
      </span>
    </>
  );
};

export default Exercise;
