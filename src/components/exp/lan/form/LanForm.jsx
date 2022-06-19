import React, { useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Form from "./Form";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { addCVlan } from "../../../../store/action";
import ModalLan from "../ModalLan";
import update from "../../../../utilites/update";
export default function LanForm({ urlId }) {
  const data = useSelector((state) => state.cvLan);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [modalAdd, setModalAdd] = useState(false);
  const user = useSelector((state) => state.user.id);
  function closeModalAdd() {
    setModalAdd(false);
  }
  function saveDataModal(valuse) {
    saveData(valuse);
    closeModalAdd();
  }
  function saveData(values) {
    const id = data.length === 0 ? 0 : data[data.length - 1].id + 1;
    dispatch({
      type: addCVlan,
      payload: {
        ...values,
        id: id,
      },
    });
    update(user, urlId, values, id, data, false, "cvLan");
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
  inputBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "20px",
    height: "100%",
    width: "calc(100% - 20px)",
  },
};
