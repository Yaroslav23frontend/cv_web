import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { addCVskills } from "../../../store/action";
import Form from "./Form";
import ModalSkills from "../ModalSkills";
const validationSchema = yup.object({
  skill: yup
    .string("Entre Skill")
    .max(100, "Max length 100 symbols")
    .required("Enter Skill"),
});

export default function SkillsForm({ func }) {
  const data = useSelector((state) => state.cvSkills);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [modalAdd, setModalAdd] = useState(false);
  function closeModalAdd() {
    setModalAdd(false);
  }
  function saveDataModal(valuse) {
    saveData(valuse);
    closeModalAdd();
  }
  function saveData(values) {
    dispatch({
      type: addCVskills,
      payload: {
        ...values,
        id: data.length === 0 ? 0 : data[data.length - 1].id + 1,
      },
    });
  }
  function openAddModal() {
    setModalAdd(true);
  }
  return (
    <Box sx={styles.inputBox}>
      {data.length === 0 ? (
        <Form func={saveData} />
      ) : (
        <Button variant="contained" onClick={openAddModal}>
          Add
        </Button>
      )}
      <ModalSkills
        open={modalAdd}
        handleConfirm={saveDataModal}
        handleCancele={closeModalAdd}
      />
    </Box>
  );
}
const styles = {
  inputBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "20px",
    height: "100%",
    width: "calc(100% - 100px)",
  },
};
