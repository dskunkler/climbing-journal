import React, { type Dispatch, type SetStateAction, useState } from "react";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import Technique, { type Technique as Tech } from "./technique";

export type ExerciseByTime = {
  techniques: Array<Tech>;
};

const ExerciseByTime = (prop: {
  info: string;
  setInfo: Dispatch<SetStateAction<string>>;
}) => {
  const { info, setInfo } = prop;
  const infoJson = JSON.parse(info) as ExerciseByTime;
  const [techniques, setTechniques] = useState(infoJson.techniques || []);

  return (
    <div>
      <ul>
        {techniques.map((technique, index) => (
          <li
            key={`technique-${index}`}
            className="m-5 border-separate border-spacing-1 border border-amber-600 p-5"
          >
            <Technique
              {...technique}
              key={`technique-component-${index}`}
              index={index}
              setTech={(tech: Tech) => {
                const newTechniques = techniques.map((technique, i) => {
                  if (i === index) {
                    return tech;
                  }
                  return technique;
                });
                setTechniques(newTechniques);
                const newInfo = JSON.stringify({ techniques: newTechniques });
                setInfo(newInfo);
              }}
              deleteTechnique={() => {
                const newTechniques = techniques.filter((t, i) => {
                  return i != index;
                });

                setTechniques(newTechniques);
                setInfo(JSON.stringify({ techniques: newTechniques }));
              }}
            />
          </li>
        ))}
      </ul>
      <AddCircleOutlineOutlinedIcon
        onClick={() => {
          setTechniques([...techniques, { name: "", time: 1, note: "" }]);
        }}
      />
    </div>
  );
};

export default ExerciseByTime;
