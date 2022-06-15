import React, { useState, useMemo } from "react";
import { Button, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { useAuth } from "../context/AuthContext";
import Verified from "../components/Verified";
import CustomBox from "../components/CustomBox";
import SettingsIcon from "@mui/icons-material/Settings";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import CV from "../components/CV";
import CircularProgress from "@mui/material/CircularProgress";
import { useTranslation } from "react-i18next";
import AddCV from "../components/AddCV";
export default function Collection() {
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
  const { isVerified } = useAuth();
  const data = useMemo(() => {
    if (searchData !== "") {
      return collection.filter((el) => el.includes(searchData));
    }
    return collection;
  }, [searchData, collection]);
  return (
    <Paper sx={styles.paper}>
      <Box sx={styles.topNav}>
        <Button onClick={() => navigate("/settings")}>
          <SettingsIcon />
        </Button>
        <Button sx={styles.buttonSignOut} onClick={logOut}>
          {t("buttons.signOut")}
        </Button>
      </Box>

      {isVerified ? (
        <>
          <TextField
            sx={styles.inputSearch}
            id="standard-basic"
            label={t("placeholders.search")}
            variant="standard"
            value={searchData}
            onChange={(e) => {
              setSearchData(e.target.value);
            }}
            InputProps={{
              endAdornment:
                searchData !== "" ? (
                  <Button onClick={() => setSearchData("")}>
                    {t("buttons.clear")}
                  </Button>
                ) : (
                  ""
                ),
            }}
          />

          <Box sx={styles.progress}>
            {loading ? (
              <CircularProgress />
            ) : (
              <>
                {data.length === 0 ? (
                  <Typography sx={styles.text} variant="h6" component="h2">
                    {t("messagesCollection.noCV")}
                  </Typography>
                ) : (
                  <></>
                )}
              </>
            )}
          </Box>

          <CustomBox>
            {data.map((el) => {
              return <CV key={el} data={el} />;
            })}
          </CustomBox>

          <AddCV />
        </>
      ) : (
        <Verified />
      )}
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
  inputSearch: {
    width: "calc(100% - 300px)",
    minWidth: "300px",
    marginBottom: "20px",
  },
  inputAddItem: {
    width: "calc(100% - 120px)",
  },
  buttonSignOut: {
    alignSelf: "flex-end",
    width: "100px",
  },
  boxAddNew: {
    width: "95%",
    padding: "20px",
    position: "absolute",
    bottom: "20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "20px",
  },
  tabs: {
    marginBottom: "10px",
  },
  topNav: {
    display: "flex",
    alignItems: "center",
    color: "#eee",
    width: "100%",
    justifyContent: "space-between",
  },
  colorsBox: {
    display: "flex",
    alignItems: "center",
    color: "#eee",
    width: "100%",
  },
  colors: {
    width: "90px",
    textAlign: "center",
  },
  yellow: {
    backgroundColor: "yellow",
  },
  red: {
    backgroundColor: "red",
  },
  blue: {
    backgroundColor: "blue",
  },
  grey: {
    backgroundColor: "gray",
  },
  itemsBox: {
    width: "95%",
    maxHeight: "calc(100vh - 300px)",
    overflowY: "auto",
    tabSize: "0px",
  },
  select: {
    alignSelf: "flex-start",
    minWidth: 120,
    marginLeft: 5.5,
  },
  progress: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  text: {
    width: "100%",
    textAlign: "center",
  },
};
