import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import React, { useState, type Dispatch, type SetStateAction } from "react";
import { YosemiteGrades as YG, type YosemiteGrade } from "~/utils/guards";

type PitchProps = {
  setPitches: Dispatch<SetStateAction<string[]>>;
  pitches: Array<string>;
};
const PitchComponent = (props: PitchProps) => {
  const { setPitches, pitches } = props;
  const [grade, setGrade] = useState<string>(YG[0] ?? "Impossible");
  const handleChange = (event: SelectChangeEvent) => {
    setGrade(event.target.value);
  };

  return (
    <>
      Pitches:
      <ul>
        {pitches.map((pitch, index) => (
          <li key={`${index}${pitch}`}>{pitch}</li>
        ))}
      </ul>
      <FormControl fullWidth className="text-red-500">
        <InputLabel id="grade-label">grade</InputLabel>
        <Select
          labelId="grade-label"
          id="grade"
          value={grade}
          label="Grade"
          sx={{ color: "red", minWidth: 120 }}
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={"5.5"}> 5.5</MenuItem>
          <MenuItem value={"5.6"}>5.6</MenuItem>
          <MenuItem value={"5.7"}>5.7</MenuItem>
          <MenuItem value={"5.8"}>5.8</MenuItem>
          <MenuItem value={"5.9"}>5.9</MenuItem>
          <MenuItem value={"5.10a"}>5.10a</MenuItem>
          <MenuItem value={"5.10b"}>5.10b</MenuItem>
          <MenuItem value={"5.10c"}>5.10c</MenuItem>
          <MenuItem value={"5.10d"}>5.10d</MenuItem>
          <MenuItem value={"5.11a"}>5.11a</MenuItem>
          <MenuItem value={"5.11b"}>5.11b</MenuItem>
          <MenuItem value={"5.11c"}>5.11c</MenuItem>
          <MenuItem value={"5.11d"}>5.11d</MenuItem>
          <MenuItem value={"5.12a"}>5.12a</MenuItem>
          <MenuItem value={"5.12b"}>5.12b</MenuItem>
          <MenuItem value={"5.12c"}>5.12c</MenuItem>
          <MenuItem value={"5.12d"}>5.12d</MenuItem>
          <MenuItem value={"5.13a"}>5.13a</MenuItem>
          <MenuItem value={"5.13b"}>5.13b</MenuItem>
          <MenuItem value={"5.13c"}>5.13c</MenuItem>
          <MenuItem value={"5.13d"}>5.13d</MenuItem>
          <MenuItem value={"5.14a"}>5.14a</MenuItem>
          <MenuItem value={"5.14b"}>5.14b</MenuItem>
          <MenuItem value={"5.14c"}>5.14c</MenuItem>
          <MenuItem value={"5.14d"}>5.14d</MenuItem>
        </Select>
      </FormControl>
      <div
        className="cursor-pointer"
        onClick={() => setPitches([...pitches, grade])}
      >
        Add Climb
      </div>
    </>
  );
};

export default PitchComponent;
