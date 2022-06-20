import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import CustomBox from "../CustomBox";
import { useFormik } from "formik";
import * as yup from "yup";
import Typography from "@mui/material/Typography";
import ModalAvatar from "../ModalAvatar";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useSelector, useDispatch } from "react-redux";
import { addCVBasicInfo, uploadPhotoCVBasicInfo } from "../../store/action";
import { useTranslation } from "react-i18next";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import "yup-phone";
import { useLocation } from "react-router-dom";
import Personal from "../personal/Personal";
import Avatar from "../Avatar";
export default function CurrentCVBasic({ id, next }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.id);
  const data = useSelector((state) => state.cvBasicInfo);

  return (
    <>
      <Typography variant="h4" component="h1" sx={styles.title}>
        {t("cvSection.personal")}
      </Typography>

      <CustomBox>
        <Avatar data={data} />
        <Personal urlId={id} />
      </CustomBox>
      <Button sx={styles.next} onClick={() => next("exp")}>
        {t("buttons.next")}
      </Button>
    </>
  );
}
const styles = {
  title: {
    textAlign: "center",
    marginBottom: "20px",
    marginTop: "25px",
  },
  inputBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "20px",
    height: "100%",
    width: "calc(100% - 20px)",
  },
  next: {
    marginTop: 1,
    marginBottom: 1,
  },
};
