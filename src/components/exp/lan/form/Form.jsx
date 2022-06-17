import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { MenuItem, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { addCVlan } from "../../../../store/action";
const validationSchema = yup.object({
  lan: yup
    .string("Entre Language")
    .max(100, "Max length 100 symbols")
    .required("Enter Language"),
  level: yup.string("Entre level").required("Enter level"),
});

export default function Form({ func, data = { lan: "", level: "" } }) {
  const { t } = useTranslation();
  const formik = useFormik({
    initialValues: {
      lan: data.lan,
      level: data.level,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      func(values);
    },
  });
  return (
    <>
      <TextField
        fullWidth
        id="lan"
        name="lan"
        label="Language"
        value={formik.values.lan}
        onChange={formik.handleChange}
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
        onChange={formik.handleChange}
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
      <Button color="primary" variant="contained" onClick={formik.handleSubmit}>
        Save
      </Button>
    </>
  );
}
