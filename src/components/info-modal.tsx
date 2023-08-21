import React from "react";
import { CycleEvent } from "./macro-cycle";
import { Box, Modal, Typography } from "@mui/material";
import { modalStyle } from "./event-modal";

type InfoModalProps = {
  event: CycleEvent | null;
  open: boolean;
  handleClose: () => void;
};

const InfoModal = (props: InfoModalProps) => {
  const { event, handleClose, open } = props;
  console.log("hiiiii");

  if (!event) {
    console.log("NO EVENT PASSED");
    return <></>;
  }
  console.log("returning something...");
  return (
    <div onClick={(e) => e.stopPropagation()}>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="info-modal-title"
        aria-describedby="info-modal-description"
        sx={modalStyle}
      >
        <Box className={"bg-slate-800"}>
          <div className="flex justify-between">
            <div>
              <Typography id="info-modal-title" variant="h6" component="h2">
                Details
              </Typography>
            </div>
            <div
              className="cursor-pointer hover:text-red-500"
              onClick={() => handleClose()}
            >
              X
            </div>
          </div>
          <div id="info-modal-description"></div>
        </Box>
      </Modal>
    </div>
  );
};

export default InfoModal;
