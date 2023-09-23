import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { api } from "../utils/api";
import { EXERCISES } from "~/utils/helper";
import Typography from "@mui/material/Typography";

export const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  maxHeight: "90%",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 4,
  px: 4,
  overflow: "auto",
  pb: 4,
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
        <div
          className={
            "absolute left-1/2 top-1/2 max-h-screen w-96 -translate-x-1/2 -translate-y-1/2 overflow-auto border-2 border-black bg-slate-800 pb-4"
          }
        >
          <div className="flex justify-between px-8 pb-6 pt-6">
            <div>
              <Typography id="info-modal-title" variant="h6" component="h2">
                Select an event...
              </Typography>
            </div>
            <div
              className="cursor-pointer hover:text-red-500"
              onClick={() => handleClose()}
            >
              X
            </div>
          </div>
          <ul className="mb-2 list-none lg:w-96">
            {eventsList.map((event) => (
              <li
                className="cursor-pointer px-8 py-2 hover:bg-violet-600"
                key={`${event}${date.toISOString()}`}
                onClick={() => {
                  mutate({ event: { date, name: event, info: "" } });
                  handleClose();
                }}
              >
                {event}
              </li>
            ))}
          </ul>
        </div>
      </Modal>
    </>
  );
};

export default AddEventModal;
