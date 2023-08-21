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
  const [info, setInfo] = React.useState(event?.info ?? "");
  const mutate = () => console.log("mutate");
  if (!event) {
    return <></>;
  }
  return (
    <div onClick={(e) => e.stopPropagation()}>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="info-modal-title"
        aria-describedby="info-modal-description"
      >
        <Box className={"bg-slate-800"} sx={modalStyle}>
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
          <div id="info-modal-description">
            <textarea
              name="eventInfo"
              placeholder={"Event Info"}
              value={info}
              rows={4}
              cols={40}
              className="resize rounded-md bg-slate-800 text-red-500 outline-dashed outline-stone-900"
              onChange={(e) => setInfo(e.target.value)}
            />

            <button type="submit" onClick={mutate}>
              Save
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default InfoModal;
