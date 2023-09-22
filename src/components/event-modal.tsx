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
  border: "2px solid #000",
  boxShadow: 24,
  pt: 4,
  px: 4,
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
        <div className={"bg-slate-800 border-2 border-black max-h-screen w-96 pb-4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-auto"}>
          <div className="flex justify-between px-8 pt-6 pb-6">
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
          <ul className="list-none lg:w-96 mb-2">
            {eventsList.map((event) => (
              <li
                className="cursor-pointer hover:bg-violet-600 py-2 px-8"
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
