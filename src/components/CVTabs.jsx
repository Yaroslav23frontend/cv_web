import React, { useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Container from "../components/Container";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useSelector } from "react-redux";
import "yup-phone";
import { useNavigate } from "react-router-dom";
import { PDFViewer, StyleSheet } from "@react-pdf/renderer";
import PDFdoc from "../components/PDFdoc";
export default function CVTabs({ active }) {
  const navigate = useNavigate();
  const data = useSelector((state) => state);
  const [valueNav, setValueNav] = useState(active);
  function handleChangeIndexNav(event, index) {
    console.log(index);
    setValueNav(index);
    navigate(`../cv/:id/${index}`);
  }
  return (
    <Tabs
      value={valueNav}
      onChange={handleChangeIndexNav}
      textColor="secondary"
      variant="fullWidth"
      indicatorColor="secondary"
      aria-label="secondary tabs example"
      sx={styles.tabs}
    >
      <Tab value="basic" label="Basic" />
      <Tab value="exp" label="Expirience" />
      <Tab value="pdf" label="PDF" />
    </Tabs>
  );
}
const styles = {
  title: {
    textAlign: "center",
    marginBottom: "20px",
    marginTop: "25px",
  },

  paper: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    padding: "20px",
    maxWidth: "400px",
    padding: "10px",
    width: "100%",
  },
  inputBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "20px",
    height: "100%",
    width: "calc(100% - 20px)",
  },
  button: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    marginRight: "10px",
  },
  linksBox: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "20px",
    width: "100%",
  },
  link: {
    display: "flex",
  },
  error: {
    fontSize: "12px",
    color: "red",
    marginTop: "-15px",
    marginLeft: "15px",
    alignSelf: "flex-start",
  },
  errorGoogle: {
    fontSize: "12px",
    color: "red",
    marginTop: "-15px",
  },
  signUpLink: {
    justifySelf: "center",
  },
  tabs: {
    width: "100%",
    maxWidth: "330px",
    display: "flex",
    padding: "5px",
    justifyContent: "center",
  },
  next: {
    marginTop: 1,
    marginBottom: 1,
  },
  boxTabs: {
    width: "100%",
    padding: "10px",
    display: "flex",
    justifyContent: "center",
  },
  boxAvatar: {
    display: "flex",
    flexDirection: "column",
    gap: 1,
  },
};
