import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { date } from "yup";
import { deleteCVWorkExp, editCVWorkExp } from "../../../store/action";
import { useState } from "react";
import ModalWork from "./ModalWork";
import update from "../../../utilites/update";
export default function WorkItem({ data, id, urlId }) {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.id);
  const [modalEdit, setModalEdit] = useState(false);
  const cvWork = useSelector((state) => state.cvWork);
  function Delete() {
    dispatch({ type: deleteCVWorkExp, payload: data.id });
    const newData = JSON.parse(JSON.stringify(cvWork));
    update(
      user,
      urlId,
      [],
      id,
      newData.filter((el) => el.id !== data.id),
      true,
      "cvWork"
    );
  }
  function closeModalEdit() {
    setModalEdit(false);
  }
  function saveDataModal(values) {
    saveData(values);
    closeModalEdit();
  }
  function saveData(values) {
    dispatch({
      type: editCVWorkExp,
      payload: {
        data: {
          ...values,
          id: data.id,
        },
        id: id,
      },
    });
    const newData = JSON.parse(JSON.stringify(cvWork));
    newData[id] = {
      ...values,
      id: data.id,
    };
    update(user, urlId, values, id, newData, true, "cvWork");
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
                  Title:&nbsp;
                </Typography>
                {data.title}
              </Typography>
            </Box>
            <Box>
              <Typography>
                <Typography fontWeight="bold" component="span">
                  Company:&nbsp;
                </Typography>
                {data.company}
              </Typography>
            </Box>
            <Box>
              <Typography>
                <Typography fontWeight="bold" component="span">
                  City:&nbsp;
                </Typography>
                {data.city}
              </Typography>
            </Box>
          </Box>
          <Typography>
            {`${data.stringStart} ${
              data.stringEnd !== "" ? `- ${data.stringEnd}` : ""
            }`}
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
        <ModalWork
          open={modalEdit}
          handleConfirm={saveDataModal}
          handleCancele={closeModalEdit}
          data={data}
          title={"Edit work Experience"}
        />
      </Paper>
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
