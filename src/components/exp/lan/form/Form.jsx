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
        label={t("languages_section.h")}
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
        label={t("languages_section.level")}
        value={formik.values.level}
        onChange={formik.handleChange}
        error={formik.touched.level && Boolean(formik.errors.level)}
        helperText={formik.touched.level && formik.errors.level}
      >
        <MenuItem value={t("languages_section.basic")}>
          {t("languages_section.basic")}
        </MenuItem>
        <MenuItem value={t("languages_section.pre")}>
          {t("languages_section.pre")}
        </MenuItem>
        <MenuItem value={t("languages_section.inter")}>
          {t("languages_section.inter")}
        </MenuItem>
        <MenuItem value={t("languages_section.adv")}>
          {" "}
          {t("languages_section.adv")}
        </MenuItem>
        <MenuItem value={t("languages_section.pro")}>
          {t("languages_section.pro")}
        </MenuItem>
        <MenuItem value={t("languages_section.native")}>
          {t("languages_section.native")}
        </MenuItem>
      </TextField>
      <Button color="primary" variant="contained" onClick={formik.handleSubmit}>
        {t("buttons.save")}
      </Button>
    </>
  );
}
