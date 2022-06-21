import React, { useEffect, useState, useRef } from "react";
import Button from "@mui/material/Button";
import ModalAvatar from "./ModalAvatar";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useDispatch, useSelector } from "react-redux";
import { uploadPhotoCVBasicInfo } from "../store/action";
import { useTranslation } from "react-i18next";
import { Box } from "@mui/material";
import CustomButton from "./ui/button/CustomButton";
import update from "../utilites/update";
export default function Avatar({ urlId, data }) {
  const { t } = useTranslation();
  const [modalAvatar, setModalAvatar] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.id);
  function closeModalAvatar() {
    setModalAvatar(false);
  }
  function confirmModalAvatar(img) {
    dispatch({ type: uploadPhotoCVBasicInfo, payload: img });
    const newData = { ...data, photo: img };
    update(user, urlId, "", "", newData, true, "cvBasicInfo");
    setModalAvatar(false);
  }
  return (
    <Box sx={styles.boxAvatar}>
      {data.photo !== "" ? (
        <img src={data.photo} alt={"avatar"} style={{ borderRadius: "50%" }} />
      ) : (
        <AccountCircleIcon sx={{ width: "100px", height: "100px" }} />
      )}

      <CustomButton
        func={() => {
          confirmModalAvatar("");
          setModalAvatar(true);
        }}
      >
        {t("buttons.uploadPhoto")}
      </CustomButton>
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
