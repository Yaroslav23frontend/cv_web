import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import TextField from "@mui/material/TextField";
import { useTranslation } from "react-i18next";
import CustomButton from "../../../ui/button/CustomButton";

export default function Form({
  data = {
    title: "",
    company: "",
    city: "",
    start: "",
    end: "",
    description: "",
    id: "",
  },
  func,
}) {
  const { t } = useTranslation();
  const validationSchema = yup.object({
    title: yup
      .string()
      .max(100, t("work_exp_section.error.title.max"))
      .required(t("work_exp_section.error.title.required")),
    company: yup
      .string()
      .max(150, t("work_exp_section.error.company.max"))
      .required(t("work_exp_section.error.company.required")),
    city: yup
      .string()
      .matches(
        /^(?:[A-Z]{1,}[A-Za-z]{2,}(?:(\.\s|'s\s|\s?-[A-Z]{1,1}\s?|\s)?(?=[A-Za-z]+))){1,2}(?:[A-Za-z]+)?$/,
        t("work_exp_section.error.location.matches")
      ),
    start: yup.date().required(t("work_exp_section.error.start.required")),
    end: yup.date(),
    description: yup
      .string("Entre your description")
      .max(1000, t("work_exp_section.error.description.max")),
  });
  const formik = useFormik({
    initialValues: {
      title: data.title,
      city: data.city,
      company: data.company,
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
        id="title"
        name="title"
        label={t("work_exp_section.title")}
        value={formik.values.title}
        onChange={formik.handleChange}
        error={formik.touched.title && Boolean(formik.errors.title)}
        helperText={formik.touched.title && formik.errors.title}
      />
      <TextField
        fullWidth
        id="company"
        name="company"
        label={t("work_exp_section.company")}
        value={formik.values.company}
        onChange={formik.handleChange}
        error={formik.touched.company && Boolean(formik.errors.company)}
        helperText={formik.touched.company && formik.errors.company}
      />
      <TextField
        fullWidth
        id="city"
        name="city"
        label={t("work_exp_section.city")}
        value={formik.values.city}
        onChange={formik.handleChange}
        error={formik.touched.city && Boolean(formik.errors.city)}
        helperText={formik.touched.city && formik.errors.city}
      />
      <TextField
        fullWidth
        id="start"
        name="start"
        label={t("work_exp_section.start_date")}
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
        label={t("work_exp_section.end_date")}
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
        label={t("work_exp_section.description")}
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
