import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { MenuItem, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
const validationSchema = yup.object({
  lan: yup
    .string("Entre Language")
    .max("Max length 100 symbols")
    .required("Enter Language"),
  level: yup.string("Entre level").required("Enter level"),
});

export default function LanForm({ func }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      skill: "",
      level: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      func(values.email, values.password);
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <>
      <Box sx={styles.inputBox}>
        <TextField
          fullWidth
          id="lan"
          name="lan"
          label="Language"
          value={formik.values.lan}
          onChange={formik.lan}
          error={formik.touched.lan && Boolean(formik.errors.lan)}
          helperText={formik.touched.lan && formik.errors.lan}
        />
        <TextField
          fullWidth
          id="level"
          name="level"
          select
          label="Level"
          value={formik.values.level}
          onChange={formik.level}
          error={formik.touched.level && Boolean(formik.errors.level)}
          helperText={formik.touched.level && formik.errors.level}
        >
          <MenuItem value="Beginner">Beginner</MenuItem>
          <MenuItem value="Pre-intermediate">Pre-intermediate</MenuItem>
          <MenuItem value="Intermediate">Intermediate</MenuItem>
          <MenuItem value="Advanced">Advanced</MenuItem>
          <MenuItem value="Proficient">Proficient</MenuItem>
          <MenuItem value="Native">Native</MenuItem>
        </TextField>
        <Button
          sx={styles.button}
          color="primary"
          variant="contained"
          onClick={formik.handleSubmit}
        >
          Save
        </Button>
      </Box>
    </>
  );
}
const styles = {
  title: {
    alignSelf: "flex-start",
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
    width: "calc(100% - 100px)",
  },
  button: {
    alignSelf: "flex-start",
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
};
