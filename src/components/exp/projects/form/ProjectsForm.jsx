import React, { useState } from "react";
import Box from "@mui/material/Box";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { addCVProject, addCVstudy } from "../../../../store/action";
import Form from "./Form";
import ModalProjects from "../ModalProjects";
import update from "../../../../utilites/update";
import CustomButton from "../../../ui/button/CustomButton";
export default function ProjectsForm({ func, add, cancel, urlId }) {
  const { t } = useTranslation();
  const data = useSelector((state) => state.cvProjects);
  const user = useSelector((state) => state.user.id);
  const dispatch = useDispatch();
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
      type: addCVProject,
      payload: {
        ...values,
        id: id,
      },
    });
    console.log(values);
    update(user, urlId, values, id, data, false, "cvProjects");
  }
  function openAddModal() {
    setModalAdd(true);
  }
  return (
    <Box sx={styles.inputBox}>
      {data.length === 0 ? (
        <Form func={saveData} urlId={urlId} />
      ) : (
        <CustomButton func={openAddModal}>{t("buttons.add")}</CustomButton>
      )}
      <ModalProjects
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
