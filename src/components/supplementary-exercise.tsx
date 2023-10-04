import React, { useState } from "react";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { type InfoModalChildrenProps } from "./info-modal";
import Exercise, { type ExerciseType } from "./exercise";

type SupplementaryExerciseType = {
  exercises: Array<ExerciseType>;
  note: string;
};

const SupplementaryExercise = (props: InfoModalChildrenProps) => {
  const { info, setInfo } = props;
  const infoJson = JSON.parse(info) as SupplementaryExerciseType;
  const [exercises, setExercises] = useState(infoJson.exercises ?? []);

  return (
    <div>
      <ul>
        {exercises.map((exercise, index) => (
          <li
            key={`exercise-${index}`}
            className="m-5 border-separate border-spacing-1 border border-amber-600 p-5"
          >
            <Exercise
              {...exercise}
              key={`exercise-component-${index}`}
              // index={index}
              setExercise={(ex: ExerciseType) => {
                const newExercises = exercises.map((exercise, i) => {
                  if (i === index) {
                    return ex;
                  }
                  return exercise;
                });
                setExercises(newExercises);
                const newInfo = JSON.stringify({ exercises: newExercises });
                setInfo(newInfo);
              }}
              deleteExercise={() => {
                const newExercises = exercises.filter((t, i) => {
                  return i != index;
                });

                setExercises(newExercises);
                setInfo(JSON.stringify({ exercises: newExercises }));
              }}
            />
          </li>
        ))}
      </ul>
      <AddCircleOutlineOutlinedIcon
        onClick={() => {
          setExercises([...exercises, { name: "", sets: 1, reps: 1 }]);
        }}
      />
    </div>
  );
};

export default SupplementaryExercise;
