import React, { useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { addCVskills } from "../../../../store/action";
import Form from "./Form";
import ModalSkills from "../ModalSkills";
import update from "../../../../utilites/update";
export default function SkillsForm({ urlId }) {
  const data = useSelector((state) => state.cvSkills);
  const user = useSelector((state) => state.user.id);
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
    const id = data.length === 0 ? 0 : data[data.length - 1].id + 1;
    dispatch({
      type: addCVskills,
      payload: {
        ...values,
        id: id,
      },
    });
    update(user, urlId, values, id, data, false, "cvSkills");
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
          {t("buttons.add")}
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
    width: "calc(100% - 20px)",
  },
};
