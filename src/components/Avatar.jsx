import React, { useEffect, useState, useRef } from "react";
import Button from "@mui/material/Button";
import ModalAvatar from "./ModalAvatar";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useDispatch } from "react-redux";
import { uploadPhotoCVBasicInfo } from "../store/action";
import { useTranslation } from "react-i18next";
import { Box } from "@mui/material";
export default function Avatar({ data }) {
  const { t } = useTranslation();
  const [modalAvatar, setModalAvatar] = useState(false);
  const dispatch = useDispatch();
  function closeModalAvatar() {
    setModalAvatar(false);
  }
  function confirmModalAvatar(img) {
    dispatch({ type: uploadPhotoCVBasicInfo, payload: img });
    setModalAvatar(false);
  }
  return (
    <Box sx={styles.boxAvatar}>
      {data.photo !== "" ? (
        <img src={data.photo} alt={"avatar"} style={{ borderRadius: "50%" }} />
      ) : (
        <AccountCircleIcon sx={{ width: "100px", height: "100px" }} />
      )}

      <Button
        sx={styles.button}
        variant="contained"
        component="label"
        onClick={() => {
          confirmModalAvatar("");
          setModalAvatar(true);
        }}
      >
        {t("buttons.uploadPhoto")}
      </Button>
      <ModalAvatar
        handleConfirm={confirmModalAvatar}
        handleCancele={closeModalAvatar}
        open={modalAvatar}
      />
    </Box>
  );
}
const styles = {
  boxAvatar: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 1,
  },
  button: {
    marginBottom: 1,
  },
};
