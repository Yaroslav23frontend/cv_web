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
import update from "../../../../utilites/update";
export default function WorkForm({ urlId }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.cvWork);
  const user = useSelector((state) => state.user.id);
  const [modalAdd, setModalAdd] = useState(false);
  function closeModalAdd() {
    setModalAdd(false);
  }
  function saveDataModal(valuse) {
    saveData(valuse);
    closeModalAdd();
  }
  console.log(urlId);
  function saveData(values) {
    const id = data.length === 0 ? 0 : data[data.length - 1].id + 1;

    dispatch({
      type: addCVWorkExp,
      payload: {
        ...values,
        id: id,
      },
    });
    update(user, urlId, values, id, data, false, "cvWork");
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
            {t("buttons.add")}
          </Button>
        )}
        <ModalWork
          open={modalAdd}
          handleConfirm={saveDataModal}
          handleCancele={closeModalAdd}
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
    width: "calc(100% - 20px)",
  },
};
