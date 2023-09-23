import React, {
  type Dispatch,
  type SetStateAction,
  useEffect,
  useState,
} from "react";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
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
            className="m-5 border-separate border-spacing-1 border border-amber-600 p-5"
          >
            <Technique
              {...technique}
              index={index}
              setTech={(tech: Tech) => {
                console.log("~~newTech", tech);
                const newTechniques = techniques.map((technique, i) => {
                  if (i === index) {
                    console.log("index = i");
                    return tech;
                  }
                  return technique;
                });
                console.log("newTechniques", newTechniques);
                setTechniques(newTechniques);
                const newInfo = JSON.stringify({ techniques: newTechniques });
                console.log("~", newInfo);
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

export default SkillAcquisition;
