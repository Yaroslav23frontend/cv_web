import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import update from "../../utilites/update";
import { useTranslation } from "react-i18next";
import { uploadCVBasicInfo } from "../../store/action";
import ModalPersonal from "./ModalPersonal";
export default function PersonalItem({ data, id, urlId }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.id);
  const [modalEdit, setModalEdit] = useState(false);
  const cvBasic = useSelector((state) => state.cvBasicInfo);
  function Delete() {
    const newData = {
      photo: "",
      name: "",
      lastName: "",
      email: "",
      tel: "",
      address: "",
      zip: "",
      city: "",
      linkedIn: "",
      skype: "",
      git: "",
    };
    dispatch({
      type: uploadCVBasicInfo,
      payload: newData,
    });
    update(user, urlId, [], id, newData, true, "cvBasicInfo");
  }
  function closeModalEdit() {
    setModalEdit(false);
  }
  function saveDataModal(values) {
    saveData(values);
    closeModalEdit();
  }
  function saveData(values) {
    const newData = {
      ...values,
      photo: data.photo,
    };
    dispatch({
      type: uploadCVBasicInfo,
      payload: newData,
    });
    update(user, urlId, values, id, newData, true, "cvBasicInfo");
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
                  {t("cvPersonal.name")}:&nbsp;
                </Typography>
                {data.name}
              </Typography>
            </Box>
            <Box>
              <Typography>
                <Typography fontWeight="bold" component="span">
                  {t("cvPersonal.lastName")}:&nbsp;
                </Typography>
                {data.lastName}
              </Typography>
            </Box>
            <Box>
              <Typography>
                <Typography fontWeight="bold" component="span">
                  {t("cvPersonal.email")}:&nbsp;
                </Typography>
                {data.email}
              </Typography>
            </Box>
            <Box>
              <Typography>
                <Typography fontWeight="bold" component="span">
                  {t("cvPersonal.tel")}:&nbsp;
                </Typography>
                {data.tel}
              </Typography>
            </Box>
            {data.city !== "" ? (
              <Box>
                <Typography>
                  <Typography fontWeight="bold" component="span">
                    {t("cvPersonal.city")}:&nbsp;
                  </Typography>
                  {data.city}
                </Typography>
              </Box>
            ) : (
              <></>
            )}
            {data.address !== "" ? (
              <Box>
                <Typography>
                  <Typography fontWeight="bold" component="span">
                    {t("cvPersonal.address")}:&nbsp;
                  </Typography>
                  {data.address}
                </Typography>
              </Box>
            ) : (
              <></>
            )}
            {data.zip !== "" ? (
              <Box>
                <Typography>
                  <Typography fontWeight="bold" component="span">
                    {t("cvPersonal.zip")}:&nbsp;
                  </Typography>
                  {data.zip}
                </Typography>
              </Box>
            ) : (
              <></>
            )}
            {data.linkedIn !== "" ? (
              <Box>
                <Typography>
                  <Typography fontWeight="bold" component="span">
                    {t("cvPersonal.linkedIn")}:&nbsp;
                  </Typography>
                  {data.linkedIn}
                </Typography>
              </Box>
            ) : (
              <></>
            )}
            {data.skype ? (
              <Box>
                <Typography>
                  <Typography fontWeight="bold" component="span">
                    {t("cvPersonal.skype")}:&nbsp;
                  </Typography>
                  {data.skype}
                </Typography>
              </Box>
            ) : (
              <></>
            )}
            {data.git !== "" ? (
              <Box>
                <Typography>
                  <Typography fontWeight="bold" component="span">
                    {t("cvPersonal.git")}:&nbsp;
                  </Typography>
                  {data.git}
                </Typography>
              </Box>
            ) : (
              <></>
            )}
          </Box>
        </Box>
        <Box sx={styles.boxButtons}>
          <IconButton onClick={openEditModal}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={Delete}>
            <DeleteIcon />
          </IconButton>
        </Box>
        <ModalPersonal
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
    marginTop: 2,
    marginBottom: 2,
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
