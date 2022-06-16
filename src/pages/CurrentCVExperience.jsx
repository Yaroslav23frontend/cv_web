import React, { useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Container from "../components/Container";
import "yup-phone";
import { useNavigate } from "react-router-dom";
import CVTabs from "../components/CVTabs";
import { Typography } from "@mui/material";
import Description from "../components/exp/description/Description";
import CustomBox from "../components/CustomBox";
import Work from "../components/exp/work/Work";
import { useSelector } from "react-redux";
import Study from "../components/education/Study";
import Skills from "../components/skills/Skills";
import Lan from "../components/exp/lan/Lan";
export default function CurrentCVExperience({ match }) {
  const navigate = useNavigate();
  const [valueNav, setValueNav] = useState("pdf");
  const description = useSelector((state) => state.cvDescription);
  function handleChangeIndexNav(event, index) {
    console.log(index);
    setValueNav(index);
    navigate(`../${index}`);
  }
  return (
    <Container>
      <CVTabs active="exp" />
      <Typography variant="h4" component="h1" sx={styles.title}>
        Experience
      </Typography>
      <CustomBox>
        <Box sx={styles.boxSections}>
          <Description />
          <Work />
          <Study />
          <Skills />
          <Lan />
        </Box>
      </CustomBox>
      <Button sx={styles.next} onClick={() => {}}>
        Next
      </Button>
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
  boxSections: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 5,
  },
  boxSection: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 2,
  },
  buttonAdd: {
    alignSelf: "flex-start",
    marginLeft: "50px",
  },
};
