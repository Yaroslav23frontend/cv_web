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
import { useTranslation } from "react-i18next";
export default function WorkItem({ data, id, urlId }) {
  const { t } = useTranslation();
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
          <Box sx={{ textAlign: "left" }}>
            <Box>
              <Typography>
                <Typography fontWeight="bold" component="span">
                  {t("work_exp_section.title")}:&nbsp;
                </Typography>
                {data.title}
              </Typography>
            </Box>
            <Box>
              <Typography>
                <Typography fontWeight="bold" component="span">
                  {t("work_exp_section.company")}:&nbsp;
                </Typography>
                {data.company}
              </Typography>
            </Box>
            <Box>
              <Typography>
                <Typography fontWeight="bold" component="span">
                  {t("work_exp_section.city")}:&nbsp;
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
            <Typography fontWeight="bold">
              {t("work_exp_section.description")}
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
        <ModalWork
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
