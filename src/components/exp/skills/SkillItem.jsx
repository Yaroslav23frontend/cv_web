import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { deleteCVskills, editCVskills } from "../../../store/action";
import { useState } from "react";
import ModalSkills from "./ModalSkills";
import update from "../../../utilites/update";
export default function SkillItem({ data, id, urlId }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.id);
  const cvSkills = useSelector((state) => state.cvSkills);
  function Delete() {
    dispatch({ type: deleteCVskills, payload: data.id });
    const newData = JSON.parse(JSON.stringify(cvSkills));

    update(
      user,
      urlId,
      [],
      id,
      newData.filter((el) => el.id !== data.id),
      true,
      "cvSkills"
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
      type: editCVskills,
      payload: {
        data: { ...values, id: data.id },
        id: id,
      },
    });
    const newData = JSON.parse(JSON.stringify(cvSkills));
    newData[id] = {
      ...values,
      id: data.id,
    };
    update(user, urlId, values, id, newData, true, "cvSkills");
  }
  function openEditModal() {
    setModalEdit(true);
  }
  return (
    <>
      <Paper sx={styles.paper}>
        <Box sx={styles.boxDescription}>
          <Typography>{data.skill}</Typography>
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
      <ModalSkills
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
    width: "calc(100% - 20px)",
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
    alignSelf: "flex-end",
  },
};
