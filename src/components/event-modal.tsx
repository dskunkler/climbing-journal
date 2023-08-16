import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { api } from "../utils/api";
import { EXERCISES } from "~/utils/helper";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};
type EventModalProps = {
  date: Date;
};

const eventsList = Object.keys(EXERCISES);

export const AddEventModal = (props: EventModalProps) => {
  const { date } = props;
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const ctx = api.useContext();
  const { mutate, isLoading: isPostingMacro } =
    api.macroCycles.addEvent.useMutation({
      onSuccess: () => {
        void ctx.macroCycles.invalidate();
      },
    });

  return (
    <>
      <Button onClick={handleOpen}>+ Add Event</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box className={"bg-slate-800"} sx={{ ...style, width: 200 }}>
          <h2 id="child-modal-title">Select an event:</h2>
          <div>
            <ul className="list-disc">
              {eventsList.map((event) => (
                <li
                  className=" cursor-pointer hover:bg-violet-600"
                  key={event}
                  onClick={() => {
                    mutate({ event: { date, name: event } });
                    handleClose();
                  }}
                >
                  {event}
                </li>
              ))}
            </ul>
          </div>
          <Button onClick={handleClose}>Close Child Modal</Button>
        </Box>
      </Modal>
    </>
  );
};

export default AddEventModal;
