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
export default function DescriptionItem() {
  const data = useSelector((state) => state.cvDescription);
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
    dispatch({ type: addCVdescription, payload: values.description });
  }
  function openAddModal() {
    setModalAdd(true);
  }
  if (data !== "") {
    return (
      <Paper sx={styles.paper}>
        <Box sx={styles.boxDescription}>
          <Typography fontWeight="bold">Description</Typography>
          <Typography>{data}</Typography>
        </Box>
        <Box sx={styles.boxButtons}>
          <IconButton onClick={openAddModal}>
            <EditIcon />
          </IconButton>
          <IconButton
            onClick={() => {
              dispatch({ type: addCVdescription, payload: "" });
            }}
          >
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
