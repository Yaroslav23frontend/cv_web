import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSelector, useDispatch } from "react-redux";
import { addCVdescription } from "../../../store/action";
import ModalDescription from "./ModalDescription";
import { useState } from "react";
import update from "../../../utilites/update";
import { useTranslation } from "react-i18next";
export default function DescriptionItem({ urlId }) {
  const { t } = useTranslation();
  const data = useSelector((state) => state.cvDescription);
  const user = useSelector((state) => state.user.id);
  const dispatch = useDispatch();
  const [modalAdd, setModalAdd] = useState(false);
  function Delete() {
    dispatch({ type: addCVdescription, payload: "" });
    update(user, urlId, "", "", "", true, "cvDescription");
  }
  function closeModalAdd() {
    setModalAdd(false);
  }
  function saveDataModal(valuse) {
    saveData(valuse);
    closeModalAdd();
  }
  function saveData(values) {
    dispatch({ type: addCVdescription, payload: values.description });
    update(user, urlId, "", "", values.description, true, "cvDescription");
  }
  function openAddModal() {
    setModalAdd(true);
  }
  if (data !== "") {
    return (
      <Paper sx={styles.paper}>
        <Box sx={styles.boxDescription}>
          <Typography fontWeight="bold">{t("description")}</Typography>
          <Typography>{data}</Typography>
        </Box>
        <Box sx={styles.boxButtons}>
          <IconButton onClick={openAddModal}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={Delete}>
            <DeleteIcon />
          </IconButton>
        </Box>
        <ModalDescription
          open={modalAdd}
          handleConfirm={saveDataModal}
          handleCancele={closeModalAdd}
          data={data}
        />
      </Paper>
    );
  }
  return <></>;
}
const styles = {
  paper: {
    display: "flex",
    flexDirection: "column",
    width: "calc(100% - 20px)",
    flexWrap: "wrap",
  },
  box: {
    display: "flex",
    justifyContent: "space-between",
    padding: 1,
  },
  boxDescription: {
    display: "flex",
    flexDirection: "column",
    padding: 1,
    flexWrap: "wrap",
  },
  boxButtons: {
    alignSelf: "flex-end",
  },
};
