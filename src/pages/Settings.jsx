import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import Paper from "@mui/material/Paper";
import { Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { deleteUser } from "firebase/auth";
import { useAuth } from "../context/AuthContext";
import CustomModal from "../components/Modal";
import { doc, deleteDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { addCVs, addItems } from "../store/action";
import { useTranslation } from "react-i18next";
import ChangeLan from "../components/ChangeLan";
import i18next from "i18next";
import CustomBox from "../components/CustomBox";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
export default function Settings({ back }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const _user = useSelector((state) => state.user);
  const { user } = useAuth();
  const [modal, setModal] = useState(false);
  const [modalDeleteAll, setModalDeleteAll] = useState(false);
  const [result, setResult] = useState("");
  const data = useSelector((state) => state.boards);
  const settings = useSelector((state) => state.settings);

  const [language, setLanguage] = useState(
    document.cookie
      .split(";")
      .filter((el) => el.match("i18next"))
      .join("")
      .slice(8)
  );
  function deleteAccount() {
    deleteUser(user)
      .then(() => {
        // User deleted.
        setModal(false);
        navigate("../userDeleted");
      })
      .catch((error) => {
        // An error ocurred
        // ...
        setResult(error);
        setModal(true);
        setTimeout(() => {
          setModal(false);
        }, 1000);
      });
  }
  function modalClose() {
    setModal(false);
  }
  function modalDeleteAllClose() {
    setModalDeleteAll(false);
  }
  function delAll() {
    dispatch({ type: addItems, payload: [] });
    dispatch({ type: addCVs, payload: [] });
    setDoc(doc(db, `${_user.id}-boards`, "boards"), {});
    data.forEach(async (el) => await deleteDoc(doc(db, `${_user.id}`, el)));
    modalDeleteAllClose();
  }
  function setLan(lan) {
    i18next.changeLanguage(lan);
    setLanguage(lan);
  }

  return (
    <Paper sx={styles.paper}>
      <IconButton
        sx={styles.buttonBack}
        onClick={() => {
          navigate(-1);
        }}
      >
        <ArrowBackIcon />
      </IconButton>
      <CustomBox maxHeight="100%">
        <Box sx={styles.box}>
          <Typography sx={styles.title} variant="h5" component="h1">
            {t("settings.titles.personal")}
          </Typography>

          <Box sx={styles.box}>
            <Box sx={styles.boxDays}>
              <Typography>{_user.email}</Typography>
              <IconButton onClick={() => navigate("/resetEmail")}>
                <EditIcon />
              </IconButton>
            </Box>
            <Box sx={styles.boxDays}>
              <Typography>{t("settings.password")}</Typography>
              <IconButton onClick={() => navigate("/resetPassword")}>
                <EditIcon />
              </IconButton>
            </Box>
            <Box sx={styles.boxDays}>
              <Typography>{t("settings.deleteAccount")}</Typography>
              <IconButton onClick={() => setModal(true)}>
                <DeleteIcon />
              </IconButton>
            </Box>
            <Box sx={styles.boxDays}>
              <Typography>{t("settings.deleteAllData")}</Typography>
              <IconButton onClick={() => setModalDeleteAll(true)}>
                <DeleteIcon />
              </IconButton>
            </Box>
            <ChangeLan
              id="lan"
              label="lan"
              value={language}
              setValue={setLan}
            />
            <CustomModal
              handleCancele={modalClose}
              handleConfirm={deleteAccount}
              open={modal}
              massege={t("messagesModal.deleteAccount")}
              result={result}
            />
            <CustomModal
              handleCancele={modalDeleteAllClose}
              handleConfirm={delAll}
              open={modalDeleteAll}
              massege={t("messagesModal.deleteAllData")}
            />
          </Box>
        </Box>
      </CustomBox>
    </Paper>
  );
}
const styles = {
  title: {
    textAlign: "center",
    marginBottom: "10px",
  },
  paper: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    maxWidth: "1000px",
    width: "100%",
    minHeight: "400px",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  box: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: "20px",
  },
  boxDays: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: "20px",
  },
  textField: {
    width: 120,
    marginLeft: 8.6,
    textAlign: "center",
    marginBottom: "20px",
  },
  textDays: {
    width: 150,
  },
  buttonBack: {
    alignSelf: "flex-start",
  },
};
