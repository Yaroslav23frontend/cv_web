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
import { addCVWorkExp } from "../../../store/action";
const validationSchema = yup.object({
  title: yup
    .string("Entre your title")
    .max(100, "Max length 100 symbols")
    .required("Enter your title"),
  company: yup
    .string("Enter company name")
    .max(100, "Max length 100 symbols")
    .required("Enter your title"),
  city: yup
    .string()
    .matches(
      /^(?:[A-Z]{1,}[A-Za-z]{2,}(?:(\.\s|'s\s|\s?-[A-Z]{1,1}\s?|\s)?(?=[A-Za-z]+))){1,2}(?:[A-Za-z]+)?$/,
      "The city name is invalid"
    ),
  start: yup.date("Enter your task").required("Please choose the date"),
  end: yup.date("Enter your task").required("Please choose the date"),
  description: yup
    .string("Entre your description")
    .max(1000, "Max length 1000 symbols"),
});

export default function WorkForm() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.cvWork);
  const formik = useFormik({
    initialValues: {
      title: "",
      city: "",
      company: "",
      start: "",
      end: "",
      description: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      dispatch({
        type: addCVWorkExp,
        payload: { ...values, id: 0 },
      });

      alert(values);
    },
  });
  console.log(data);
  return (
    <>
      <Box sx={styles.inputBox}>
        {data.length === 0 ? (
          <>
            <TextField
              fullWidth
              id="title"
              name="title"
              label="Title"
              value={formik.values.title}
              onChange={formik.handleChange}
              error={formik.touched.title && Boolean(formik.errors.title)}
              helperText={formik.touched.title && formik.errors.title}
            />
            <TextField
              fullWidth
              id="company"
              name="company"
              label="Company"
              value={formik.values.company}
              onChange={formik.handleChange}
              error={formik.touched.company && Boolean(formik.errors.company)}
              helperText={formik.touched.company && formik.errors.company}
            />
            <TextField
              fullWidth
              id="city"
              name="city"
              label="City"
              value={formik.values.city}
              onChange={formik.handleChange}
              error={formik.touched.city && Boolean(formik.errors.city)}
              helperText={formik.touched.city && formik.errors.city}
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
        ) : (
          <Button variant="contained">Add</Button>
        )}
      </Box>
    </>
  );
}
const styles = {
  inputBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "20px",
    height: "100%",
    width: "calc(100% - 100px)",
  },
};
