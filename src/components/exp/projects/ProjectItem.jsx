import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { deleteCVProject, editCVProject } from "../../../store/action";
import { useState } from "react";
import ModalProjects from "./ModalProjects";
import update from "../../../utilites/update";
import { useTranslation } from "react-i18next";
import { Link } from "@mui/material";
export default function ProjectItem({ data, id, urlId }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.id);
  const [modalEdit, setModalEdit] = useState(false);
  const cvProjects = useSelector((state) => state.cvProjects);
  function Delete() {
    dispatch({ type: deleteCVProject, payload: data.id });
    const newData = JSON.parse(JSON.stringify(cvProjects));
    update(
      user,
      urlId,
      [],
      id,
      newData.filter((el) => el.id !== data.id),
      true,
      "cvProjects"
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
      type: editCVProject,
      payload: {
        data: {
          ...values,
          id: data.id,
        },
        id: id,
      },
    });
    const newData = JSON.parse(JSON.stringify(cvProjects));
    newData[id] = {
      ...values,
      id: data.id,
    };
    update(user, urlId, values, id, newData, true, "cvProjects");
  }
  function openEditModal() {
    setModalEdit(true);
  }
  return (
    <>
      <Paper sx={styles.paper}>
        <Box sx={styles.box}>
          <Box sx={{ textAlign: "left" }}>
            <Box>
              <Typography fontWeight="bold" variant="h6">
                {data.title}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box sx={styles.boxDescription}>
          <Typography>{data.description}</Typography>
        </Box>
        <Box sx={styles.technologiesBox}>
          {data.link && (
            <Link href={data.link}>
              <Typography>Demo</Typography>
            </Link>
          )}
          {data.git && (
            <Link href={data.git}>
              <Typography>GitHub</Typography>
            </Link>
          )}
        </Box>
        <Box sx={styles.technologiesBox}>
          {data.technologies.map((el) => (
            <Box sx={styles.technologyBox}>
              <Typography>{el}</Typography>
            </Box>
          ))}
        </Box>
        <Box sx={styles.boxButtons}>
          <IconButton onClick={openEditModal}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={Delete}>
            <DeleteIcon />
          </IconButton>
        </Box>
        <ModalProjects
          open={modalEdit}
          handleConfirm={saveDataModal}
          handleCancele={closeModalEdit}
          data={data}
          edit={true}
        />
      </Paper>
    </>
  );
}
const styles = {
  paper: {
    display: "flex",
    flexDirection: "column",
    width: "calc(100% - 20px)",
  },
  box: {
    display: "flex",
    justifyContent: "space-between",
    padding: 1,
    mt: 2,
    width: "100%",
    ["@media (max-width:780px)"]: {
      flexDirection: "column",
    },
  },
  boxDescription: {
    padding: 1,
  },
  boxButtons: {
    alignSelf: "flex-end",
  },
  dateText: {
    ["@media (max-width:828px)"]: {
      display: "flex",
      justifyContent: "flex-start",
    },
  },
  technologyBox: {
    border: "1px solid gray",
    borderRadius: "5px",
    padding: "5px 10px",
    display: "inline-block",
  },
  technologiesBox: {
    display: "flex",
    gap: 2,
    padding: 1,
    width: "100%",
    mr: "auto",
    ml: "auto",
  },
};
