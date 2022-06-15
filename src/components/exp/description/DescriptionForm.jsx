import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { addCVdescription } from "../../../store/action";
const validationSchema = yup.object({
  description: yup
    .string("Entre your description")
    .max(1000, "Max length 1000 symbols")
    .required("Enter description"),
});

export default function DescriptionForm({
  signUp,
  reset,
  func,
  resetText,
  resetEmail,
  resetPassword,
  error,
}) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.cvDescription);
  const formik = useFormik({
    initialValues: {
      description: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      dispatch({ type: addCVdescription, payload: values.description });
      values.description = "";
    },
  });

  return (
    <>
      <Box sx={styles.inputBox}>
        {data !== "" ? (
          <Button>Add</Button>
        ) : (
          <>
            <TextField
              fullWidth
              id="description"
              name="description"
              label="Description"
              value={formik.values.description}
              onChange={formik.handleChange}
              multiline
              error={
                formik.touched.description && Boolean(formik.errors.description)
              }
              helperText={
                formik.touched.description && formik.errors.description
              }
            />

            <Button
              sx={styles.button}
              color="primary"
              variant="contained"
              onClick={formik.handleSubmit}
            >
              Save
            </Button>
          </>
        )}
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
  button: {},
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
