import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import TextField from "@mui/material/TextField";
import { MenuItem } from "@mui/material";
import { useTranslation } from "react-i18next";
import CustomButton from "../../../ui/button/CustomButton";

export default function Form({ func, data = { lan: "", level: "" } }) {
  const { t } = useTranslation();
  const validationSchema = yup.object({
    lan: yup
      .string()
      .max(100, t("languages_section.error.lan.max"))
      .required(t("languages_section.error.lan.required")),
    level: yup.string().required(t("languages_section.error.level.required")),
  });
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
      <CustomButton func={formik.handleSubmit}>
        {t("buttons.save")}
      </CustomButton>
    </>
  );
}
