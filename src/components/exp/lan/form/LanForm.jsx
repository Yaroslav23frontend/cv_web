import React, { useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Form from "./Form";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { addCVlan } from "../../../../store/action";
import ModalLan from "../ModalLan";

export default function LanForm() {
  const data = useSelector((state) => state.cvLan);
  const dispatch = useDispatch();
  const { t } = useTranslation();
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
      type: addCVlan,
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
      <ModalLan
        open={modalAdd}
        handleConfirm={saveDataModal}
        handleCancele={closeModalAdd}
      />
    </Box>
  );
}
const styles = {
  title: {
    alignSelf: "flex-start",
  },

  paper: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    padding: "20px",
    maxWidth: "400px",
    padding: "10px",
    width: "100%",
  },
  inputBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "20px",
    height: "100%",
    width: "calc(100% - 100px)",
  },
  button: {
    alignSelf: "flex-start",
  },
  icon: {
    marginRight: "10px",
  },
  linksBox: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "20px",
    width: "100%",
  },
  link: {
    display: "flex",
  },
  error: {
    fontSize: "12px",
    color: "red",
    marginTop: "-15px",
    marginLeft: "15px",
    alignSelf: "flex-start",
  },
  errorGoogle: {
    fontSize: "12px",
    color: "red",
    marginTop: "-15px",
  },
  signUpLink: {
    justifySelf: "center",
  },
};
