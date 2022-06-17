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
import { addCVWorkExp } from "../../../../store/action";
import ModalWork from "../ModalWork";
import Form from "./Form";
export default function WorkForm() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.cvWork);
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
      type: addCVWorkExp,
      payload: {
        ...values,
        id: data.length === 0 ? 0 : data[data.length - 1].id + 1,
      },
    });
  }
  return (
    <>
      <Box sx={styles.inputBox}>
        {data.length === 0 ? (
          <>
            <Form func={saveData} />
          </>
        ) : (
          <Button variant="contained" onClick={() => setModalAdd(true)}>
            Add
          </Button>
        )}
        <ModalWork
          open={modalAdd}
          handleConfirm={saveDataModal}
          handleCancele={closeModalAdd}
          title="Add Work Experience"
        />
      </Box>
    </>
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
