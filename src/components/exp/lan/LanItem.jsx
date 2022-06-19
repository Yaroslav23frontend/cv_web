import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { deleteCVlan, editCVlan } from "../../../store/action";
import ModalLan from "./ModalLan";
import { useState } from "react";
import update from "../../../utilites/update";
export default function LanItem({ data, id, urlId }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.id);
  const cvLan = useSelector((state) => state.cvLan);
  function Delete() {
    dispatch({ type: deleteCVlan, payload: data.id });
    const newData = JSON.parse(JSON.stringify(cvLan));
    update(
      user,
      urlId,
      [],
      id,
      newData.filter((el) => el.id !== data.id),
      true,
      "cvLan"
    );
  }
  const [modalEdit, setModalEdit] = useState(false);

  function closeModalEdit() {
    setModalEdit(false);
  }
  function saveDataModal(valuse) {
    saveData(valuse);
    closeModalEdit();
  }
  function saveData(values) {
    dispatch({
      type: editCVlan,
      payload: {
        data: { ...values, id: data.id },
        id: id,
      },
    });
    const newData = JSON.parse(JSON.stringify(cvLan));
    newData[id] = {
      ...values,
      id: data.id,
    };
    update(user, urlId, values, id, newData, true, "cvLan");
  }
  function openEditModal() {
    setModalEdit(true);
  }
  return (
    <>
      <Paper sx={styles.paper}>
        <Box sx={styles.boxDescription}>
          <Typography fontWeight="bold">{data.lan}</Typography>
          <Typography>{data.level}</Typography>
        </Box>
        <Box sx={styles.boxButtons}>
          <IconButton onClick={openEditModal}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={Delete}>
            <DeleteIcon />
          </IconButton>
        </Box>
      </Paper>
      <ModalLan
        open={modalEdit}
        handleConfirm={saveDataModal}
        handleCancele={closeModalEdit}
        data={data}
        edit={true}
      />
    </>
  );
}
const styles = {
  paper: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "calc(100% - 20px)",
    padding: 1,
  },
  box: {
    display: "flex",
    justifyContent: "space-between",
    padding: 1,
  },
  boxDescription: {
    padding: 1,
  },
  boxButtons: {
    display: "flex",
    alignItems: "center",
    alignSelf: "flex-end",
    height: "100%",
  },
};
