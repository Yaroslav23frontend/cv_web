import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import TextField from "@mui/material/TextField";
import { useTranslation } from "react-i18next";
import CustomButton from "../../../ui/button/CustomButton";
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
        label={t("skills.skill")}
        value={formik.values.skill}
        onChange={formik.handleChange}
        error={formik.touched.skill && Boolean(formik.errors.skill)}
        helperText={formik.touched.skill && formik.errors.skill}
      />

      <CustomButton func={formik.handleSubmit}>
        {t("buttons.save")}
      </CustomButton>
    </>
  );
}
