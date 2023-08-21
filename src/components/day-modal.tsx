import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { type CycleEvent } from "./macro-cycle";
import AddEventModal from "./event-modal";
import InfoModal from "./info-modal";

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
  const [isOpen, setIsOpen] = React.useState(false);
  const [currentEvent, setCurrentEvent] = React.useState<CycleEvent | null>(
    null
  );
  return (
    <div onClick={(e) => e.stopPropagation()}>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="day-modal-title"
        aria-describedby="day-modal-description"
      >
        <Box className={"bg-slate-800"} sx={style}>
          <div className="flex flex-row justify-between">
            <Typography id="day-modal-title" variant="h6" component="h2">
              Events {date.toLocaleDateString()}
            </Typography>
            <AddEventModal date={date} />
          </div>
          <div id="day-modal-description">
            <ul>
              {events.map((event, index) => (
                <li
                  key={`event_${index}_${event.date.toISOString()}`}
                  id={`event_${index}_${event.date.toISOString()}`}
                  className="hover:text-purple-600"
                  onClick={() => {
                    console.log("Open Info Modal ", event);
                    setCurrentEvent(event);
                    setIsOpen(true);
                  }}
                >
                  {event.name}
                </li>
              ))}
            </ul>
            <InfoModal
              open={isOpen}
              event={currentEvent}
              handleClose={() => {
                setIsOpen(false);
              }}
            />
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default DayModal;
