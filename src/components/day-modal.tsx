import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { type CycleEvent } from "./macro-cycle";
import EventModal from "./event-modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

type DayModalProps = {
  open: boolean;
  handleClose: () => void;
  events: CycleEvent[];
};

const DayModal = (props: DayModalProps) => {
  const { open, handleClose, events } = props;
  return (
    <div onClick={(e) => e.stopPropagation()}>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={"bg-slate-800"} sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Events
          </Typography>
          <EventModal />
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <ul>
              {events.map((event, index) => (
                <li
                  key={`event_${index}_${event.day.toISOString()}`}
                  id={`event_${index}_${event.day.toISOString()}`}
                >
                  {event.description}
                </li>
              ))}
            </ul>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default DayModal;
