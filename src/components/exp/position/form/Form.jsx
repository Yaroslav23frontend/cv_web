import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import TextField from "@mui/material/TextField";
import { useTranslation } from "react-i18next";
import CustomButton from "../../../ui/button/CustomButton";
export default function Form({ func, data = "" }) {
  const { t } = useTranslation();
  const validationSchema = yup.object({
    position: yup
      .string()
      .max(1000, t("position_section.error.max"))
      .required(t("position_section.error.required")),
  });
  const formik = useFormik({
    initialValues: {
      position: data,
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
        id="position"
        name="position"
        label={t("position_section.h")}
        value={formik.values.position}
        onChange={formik.handleChange}
        error={formik.touched.position && Boolean(formik.errors.position)}
        helperText={formik.touched.position && formik.errors.position}
      />
      <CustomButton func={formik.handleSubmit}>
        {t("buttons.save")}
      </CustomButton>
    </>
  );
}
