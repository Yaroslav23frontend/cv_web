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
import { addCVstudy } from "../../../store/action";
const validationSchema = yup.object({
  studies: yup
    .string("Entre your title")
    .max(150, "Max length 150 symbols")
    .required("Enter your title"),
  location: yup
    .string()
    .matches(
      /^(?:[A-Z]{1,}[A-Za-z]{2,}(?:(\.\s|'s\s|\s?-[A-Z]{1,1}\s?|\s)?(?=[A-Za-z]+))){1,2}(?:[A-Za-z]+)?$/,
      "The city name is invalid"
    ),
  insitution: yup
    .string("Entre insitution")
    .max(150, "Max length 150 symbols")
    .required("Entre insitution"),
  start: yup.date("Enter your task").required("Please choose the date"),
  end: yup.date("Enter your task").required("Please choose the date"),
  description: yup
    .string("Entre your description")
    .max(1000, "Max length 1000 symbols"),
});

export default function Form({
  func,
  data = {
    studies: "",
    location: "",
    insitution: "",
    start: "",
    end: "",
    description: "",
  },
}) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      studies: data.studies,
      location: data.location,
      insitution: data.insitution,
      start: data.start,
      end: data.end,
      description: data.description,
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
        id="studies"
        name="studies"
        label="Studies"
        value={formik.values.studies}
        onChange={formik.handleChange}
        error={formik.touched.studies && Boolean(formik.errors.studies)}
        helperText={formik.touched.studies && formik.errors.studies}
      />
      <TextField
        fullWidth
        id="location"
        name="location"
        label="Location"
        value={formik.values.location}
        onChange={formik.handleChange}
        error={formik.touched.location && Boolean(formik.errors.location)}
        helperText={formik.touched.location && formik.errors.location}
      />
      <TextField
        fullWidth
        id="insitution"
        name="insitution"
        label="Insitution"
        value={formik.values.insitution}
        onChange={formik.handleChange}
        error={formik.touched.insitution && Boolean(formik.errors.insitution)}
        helperText={formik.touched.insitution && formik.errors.insitution}
      />
      <TextField
        fullWidth
        id="start"
        name="start"
        label="Start Date"
        value={formik.values.start}
        onChange={formik.handleChange}
        type="date"
        error={formik.touched.start && Boolean(formik.errors.start)}
        helperText={formik.touched.start && formik.errors.start}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        fullWidth
        id="end"
        name="end"
        label="End Date"
        value={formik.values.end}
        onChange={formik.handleChange}
        type="date"
        error={formik.touched.end && Boolean(formik.errors.end)}
        helperText={formik.touched.end && formik.errors.end}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        fullWidth
        id="description"
        name="description"
        label="Description"
        value={formik.values.description}
        onChange={formik.handleChange}
        multiline
        error={formik.touched.description && Boolean(formik.errors.description)}
        helperText={formik.touched.description && formik.errors.description}
      />
      <Button color="primary" variant="contained" onClick={formik.handleSubmit}>
        Save
      </Button>
    </>
  );
}
