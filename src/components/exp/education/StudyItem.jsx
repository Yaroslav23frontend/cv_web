import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { deleteCVstudy, editCVstudy } from "../../../store/action";
import ModalStudy from "./ModalStudy";
import { useState } from "react";
import update from "../../../utilites/update";
import { useTranslation } from "react-i18next";
export default function StudyItem({ data, id, urlId }) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const user = useSelector((state) => state.user.id);
  const cvStudy = useSelector((state) => state.cvStudy);
  const [modalEdit, setModalEdit] = useState(false);
  function Delete() {
    dispatch({ type: deleteCVstudy, payload: data.id });
    const newData = JSON.parse(JSON.stringify(cvStudy));
    update(
      user,
      urlId,
      [],
      id,
      newData.filter((el) => el.id !== data.id),
      true,
      "cvStudy"
    );
  }
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
    const newData = JSON.parse(JSON.stringify(cvStudy));
    newData[id] = {
      ...values,
      id: data.id,
    };
    update(user, urlId, values, id, newData, true, "cvStudy");
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
                  {t("study_section.studies")}:&nbsp;
                </Typography>
                {data.studies}
              </Typography>
            </Box>
            <Box>
              <Typography>
                <Typography fontWeight="bold" component="span">
                  {t("study_section.location")}:&nbsp;
                </Typography>
                {data.location}
              </Typography>
            </Box>
            <Box>
              <Typography>
                <Typography fontWeight="bold" component="span">
                  {t("study_section.insitution")}:&nbsp;
                </Typography>
                {data.insitution}
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
            <Typography fontWeight="bold">
              {t("study_section.description")}
            </Typography>
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
        edit={true}
      />
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
};
