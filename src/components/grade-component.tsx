import React, { useState } from "react";
import { YosemiteGrades } from "~/utils/guards";

export type GradeProps = {
  grade: string;
  setSelectedGrade: (grade: string) => void;
};
const Grades = (props: GradeProps) => {
  const { grade, setSelectedGrade } = props;
  const selectedGrade = grade || YosemiteGrades[0];

  return (
    <div className="grade-component font-bold">
      <label htmlFor="grade-select">Select your grade: </label>
      <select
        name="grade-select"
        id="grade-select"
        defaultValue={selectedGrade}
        className="bg-inherit text-red-500"
        onChange={(e) => setSelectedGrade(e.target.value)}
      >
        {YosemiteGrades.map((grade, index) => {
          return (
            <option
              className="bg-inherit text-red-500"
              key={`${grade}-${index}`}
            >
              {grade}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default Grades;
