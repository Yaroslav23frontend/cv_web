import React, { useEffect, useState, useRef } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Container from "../components/Container";
import CustomBox from "../components/CustomBox";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useFormik } from "formik";
import * as yup from "yup";
import Typography from "@mui/material/Typography";
import ModalAvatar from "../components/ModalAvatar";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useSelector, useDispatch } from "react-redux";
import { addCVBasicInfo } from "../store/action";
import "yup-phone";
import { useNavigate } from "react-router-dom";
import { PDFViewer, StyleSheet } from "@react-pdf/renderer";
import PDFdoc from "../components/PDFdoc";
import CVTabs from "../components/CVTabs";
import CVcolor from "../components/CVcolor";
export default function CurrentCVpdf({ match }) {
  const navigate = useNavigate();
  //   const data = useSelector((state) => state.cvBasicInfo);
  const data = useSelector((state) => state);
  const bg = useSelector((state) => state.cvBg);
  const [valueNav, setValueNav] = useState("pdf");
  function handleChangeIndexNav(event, index) {
    console.log(index);
    setValueNav(index);
    navigate(`../${index}`);
  }
  const pdfStyles = StyleSheet.create({
    PDFViewer: {
      maxWidth: "595px",
      width: "100vw",
      minHeight: "720px",
      marginRight: "auto",
      marginLeft: "auto",
    },
  });
  return (
    <Container>
      <CVTabs active="pdf" />
      <CVcolor />
      <PDFViewer style={pdfStyles.PDFViewer}>
        <PDFdoc data={data} bg={bg} />
      </PDFViewer>
    </Container>
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
    maxWidth: "360px",
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
