import React, { Dispatch, SetStateAction } from "react";
import { type CycleEvent } from "./macro-cycle";
import { Box, Modal, Typography } from "@mui/material";
import { modalStyle } from "./event-modal";
import { api } from "~/utils/api";
import LoadingSpinner from "./loading-spinner";

type GoalModalProps = {
  goal: string;
  open: boolean;
  handleClose: () => void;
  setGoal: Dispatch<SetStateAction<string>>;
};
const GoalModal = (props: GoalModalProps) => {
  const { goal, handleClose, open, setGoal } = props;
  const [currentGoal, setCurrentGoal] = React.useState(goal);

  return (
    <div onClick={(e) => e.stopPropagation()}>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="goal-modal-title"
        aria-describedby="goal-modal-description"
      >
        <Box className={"bg-slate-800"} sx={modalStyle}>
          <div className="flex justify-between">
            <div>
              <Typography id="goal-modal-title" variant="h6" component="h2">
                Enter your Goals for this cycle, be detailed!
              </Typography>
            </div>
            <div
              className="cursor-pointer hover:text-red-500"
              onClick={() => handleClose()}
            >
              X
            </div>
          </div>
          <div id="goal-modal-description">
            <textarea
              name="eventInfo"
              placeholder={"Event Info"}
              value={currentGoal}
              rows={4}
              cols={40}
              className="resize rounded-md bg-slate-800 text-red-500 outline-dashed outline-stone-900"
              onChange={(e) => setCurrentGoal(e.target.value)}
            />

            <button
              type="submit"
              className="hover:text-amber-500"
              onClick={() => {
                console.log("click BOOM");
                setGoal(currentGoal);
                handleClose();
              }}
            >
              Save
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default GoalModal;
