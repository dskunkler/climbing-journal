import React, {
  type Dispatch,
  type SetStateAction,
  useEffect,
  useState,
} from "react";
import Technique, { type Technique as Tech } from "./technique";

export type SkillAcquisition = {
  techniques: Array<Tech>;
};

const SkillAcquisition = (prop: {
  info: string;
  setInfo: Dispatch<SetStateAction<string>>;
}) => {
  const { info, setInfo } = prop;
  console.log("~~info", info);
  const infoJson = JSON.parse(info) as SkillAcquisition;
  const [techniques, setTechniques] = useState(infoJson.techniques);
  return (
    <div>
      <ul>
        {techniques.map((technique, index) => (
          <li
            key={`technique-${technique.name}-${index}`}
            className="m-5 border-separate border-spacing-1 border border-amber-600"
          >
            <Technique
              {...technique}
              index={index}
              setTech={(tech: Tech) => {
                const newTechniques = techniques.map((technique, i) => {
                  if (i === index) {
                    return tech;
                  }
                  return technique;
                });
                setTechniques(newTechniques);
              }}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SkillAcquisition;
