import React, { useState } from "react";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { addCVdescription } from "../../../../store/action";
import Form from "./Form";

export default function DescriptionForm() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.cvDescription);
  const [modalAdd, setModalAdd] = useState(false);
  function closeModalAdd() {
    setModalAdd(false);
  }
  function saveDataModal(valuse) {
    saveData(valuse);
    closeModalAdd();
  }
  function saveData(values) {
    dispatch({ type: addCVdescription, payload: values.description });
  }
  function openAddModal() {
    setModalAdd(true);
  }
  return (
    <>
      <Box sx={styles.inputBox}>
        {data !== "" ? (
          <></>
        ) : (
          <>
            <Form func={saveData} />
          </>
        )}
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
