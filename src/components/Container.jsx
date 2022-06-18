import { Button } from "@mui/material";
import Paper from "@mui/material/Paper";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
export default function Container({ children }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
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
    overflow: "hidden",
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
