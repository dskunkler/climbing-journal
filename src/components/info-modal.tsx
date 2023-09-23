import React from "react";
import { type CycleEvent } from "./macro-cycle";
import { Box, Modal, Typography } from "@mui/material";
import { modalStyle } from "./event-modal";
import { api } from "~/utils/api";
import LoadingSpinner from "./loading-spinner";
import OutdoorMileageComponent from "./outdoor-mileage";
import { CONSTANTS } from "~/utils/helper";
import SkillAcquisition from "./skill-acquisition";

type InfoModalProps = {
  event: CycleEvent;
  open: boolean;
  handleClose: () => void;
};

const InfoModal = (props: InfoModalProps) => {
  const { event, handleClose, open } = props;
  const [info, setInfo] = React.useState(event.info);
  // console.log(event.info, "from info modal");

  // // console.log("~~~", event.name);
  // React.useEffect(() => {
  //   console.log("~~INFO UPDATED", info);

  //   mutate({ event, newInfo: info });
  // }, [info]);

  const ctx = api.useContext();
  const { mutate, isLoading: isEditingInfo } =
    api.macroCycles.editEventInfo.useMutation({
      onSuccess: () => {
        console.log("success~!~!");
        void ctx.macroCycles.invalidate();
      },
    });
  if (!event) {
    return <></>;
  }
  if (isEditingInfo) {
    return <LoadingSpinner />;
  }
  return (
    <div onClick={(e) => e.stopPropagation()} className="overflow-auto">
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
            {/*  Switch on the things here */}
            {event.name == CONSTANTS.OM && (
              <OutdoorMileageComponent info={event.info} setInfo={setInfo} />
            )}
            {event.name == CONSTANTS.SK && (
              <SkillAcquisition info={event.info} setInfo={setInfo} />
            )}
            {/* <textarea
              name="eventInfo"
              placeholder={"Event Info"}
              value={info}
              rows={4}
              cols={40}
              className="resize rounded-md bg-slate-800 text-red-500 outline-dashed outline-stone-900"
              onChange={(e) => setInfo(e.target.value)}
            /> */}

            <button
              type="submit"
              className="hover:text-amber-500"
              onClick={() => {
                if (!event.id) {
                  throw new Error("Missing Event id in mutation");
                } else {
                  console.log("mutating with", info);
                  mutate({ event, newInfo: info });
                  handleClose();
                }
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

export default InfoModal;
