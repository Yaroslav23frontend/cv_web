import React, { useState } from "react";
import Box from "@mui/material/Box";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { addCVWorkExp } from "../../../../store/action";
import ModalWork from "../ModalWork";
import Form from "./Form";
import update from "../../../../utilites/update";
import CustomButton from "../../../ui/button/CustomButton";
export default function WorkForm({ urlId }) {
  const { t } = useTranslation();
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
          <CustomButton func={() => setModalAdd(true)}>
            {t("buttons.add")}
          </CustomButton>
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
