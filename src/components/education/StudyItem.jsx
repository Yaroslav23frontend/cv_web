import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch } from "react-redux";
import { deleteCVstudy, editCVstudy } from "../../store/action";
import ModalStudy from "./ModalStudy";
import { useState } from "react";
export default function StudyItem({ data, id }) {
  const dispatch = useDispatch();
  function Delete() {
    dispatch({ type: deleteCVstudy, payload: data.id });
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
      type: editCVstudy,
      payload: {
        data: { ...values, id: data.id },
        id: id,
      },
    });
  }
  function openEditModal() {
    setModalEdit(true);
  }
  return (
    <>
      <Paper sx={styles.paper}>
        <Box sx={styles.box}>
          <Box>
            <Box>
              <Typography>
                <Typography fontWeight="bold" component="span">
                  Study:&nbsp;
                </Typography>
                {data.studies}
              </Typography>
            </Box>
            <Box>
              <Typography>
                <Typography fontWeight="bold" component="span">
                  City:&nbsp;
                </Typography>
                {data.location}
              </Typography>
            </Box>
            <Box>
              <Typography>
                <Typography fontWeight="bold" component="span">
                  Institution:&nbsp;
                </Typography>
                {data.insitution}
              </Typography>
            </Box>
          </Box>
          <Typography>
            {data.start}-{data.end}
          </Typography>
        </Box>
        {data.description !== "" ? (
          <Box sx={styles.boxDescription}>
            <Typography fontWeight="bold">Description</Typography>
            <Typography>{data.description}</Typography>
          </Box>
        ) : (
          <></>
        )}

        <Box sx={styles.boxButtons}>
          <IconButton onClick={openEditModal}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={Delete}>
            <DeleteIcon />
          </IconButton>
        </Box>
      </Paper>
      <ModalStudy
        open={modalEdit}
        handleConfirm={saveDataModal}
        handleCancele={closeModalEdit}
        data={data}
        title={"Edit Education"}
      />
    </>
  );
}
const styles = {
  paper: {
    display: "flex",
    flexDirection: "column",
    width: "calc(100% - 100px)",
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
