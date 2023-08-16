import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { type CycleEvent } from "./macro-cycle";
import AddEventModal from "./event-modal";

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
  date: Date;
};

const DayModal = (props: DayModalProps) => {
  const { open, handleClose, events, date } = props;
  return (
    <div onClick={(e) => e.stopPropagation()}>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={"bg-slate-800"} sx={style}>
          <div className="inline-flex space-x-40">
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Events
            </Typography>
            <AddEventModal date={date} />
          </div>
          <div id="modal-modal-description">
            <ul>
              {events.map((event, index) => (
                <li
                  key={`event_${index}_${event.date.toISOString()}`}
                  id={`event_${index}_${event.date.toISOString()}`}
                >
                  {event.name}
                </li>
              ))}
            </ul>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default DayModal;
