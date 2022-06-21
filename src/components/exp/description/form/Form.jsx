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
import { addCVdescription } from "../../../../store/action";
import CustomButton from "../../../ui/button/CustomButton";

export default function Form({ func, data = "" }) {
  const { t } = useTranslation();
  const validationSchema = yup.object({
    description: yup
      .string()
      .max(1000, t("description_section.error.max"))
      .required(t("description_section.error.required")),
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      description: data,
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
        id="description"
        name="description"
        label={t("description_section.h")}
        value={formik.values.description}
        onChange={formik.handleChange}
        multiline
        error={formik.touched.description && Boolean(formik.errors.description)}
        helperText={formik.touched.description && formik.errors.description}
      />

      <CustomButton func={formik.handleSubmit}>
        {t("buttons.save")}
      </CustomButton>
    </>
  );
}
