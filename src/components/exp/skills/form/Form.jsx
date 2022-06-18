import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useTranslation } from "react-i18next";
import { addCVskills } from "../../../../store/action";
const validationSchema = yup.object({
  skill: yup
    .string("Entre Skill")
    .max(100, "Max length 100 symbols")
    .required("Enter Skill"),
});

export default function Form({ func, data = "" }) {
  const { t } = useTranslation();
  const formik = useFormik({
    initialValues: {
      skill: data.skill,
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
        id="skill"
        name="skill"
        label="Skill"
        value={formik.values.skill}
        onChange={formik.handleChange}
        error={formik.touched.skill && Boolean(formik.errors.skill)}
        helperText={formik.touched.skill && formik.errors.skill}
      />

      <Button color="primary" variant="contained" onClick={formik.handleSubmit}>
        Save
      </Button>
    </>
  );
}
