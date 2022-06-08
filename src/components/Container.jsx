import React, { useState, useMemo } from "react";
import { Button, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Items from "../components/Items";
import { useAuth } from "../context/AuthContext";
import Verified from "../components/Verified";
import AddItem from "../components/AddItem";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import CustomBox from "../components/CustomBox";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import SettingsIcon from "@mui/icons-material/Settings";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import CV from "../components/CV";
import CustomModal from "../components/Modal";
import CircularProgress from "@mui/material/CircularProgress";
import { useTranslation } from "react-i18next";
import AddCV from "../components/AddCV";
export default function Container({ children }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchData, setSearchData] = useState("");
  const collection = useSelector((state) => state.collection);
  const { loading } = useAuth();
  async function logOut() {
    await signOut(auth)
      .then(() => {
        console.log("Sign-out successful.");
        navigate("../");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <Paper sx={styles.paper}>
      <Box sx={styles.topNav}>
        <Button onClick={() => navigate(-1)}>{t("buttons.back")}</Button>
        <Button sx={styles.buttonSignOut} onClick={logOut}>
          {t("buttons.signOut")}
        </Button>
      </Box>
      {children}
    </Paper>
  );
}
const styles = {
  title: {
    textAlign: "center",
    marginBottom: "20px",
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
  nav: {
    display: "flex",
    justifyContent: "center",
  },
  buttonSignOut: {
    alignSelf: "flex-end",
    width: "100px",
  },
  topNav: {
    display: "flex",
    alignItems: "center",
    color: "#eee",
    width: "100%",
    justifyContent: "space-between",
  },
  text: {
    width: "100%",
  },
};
