import { useFormik } from "formik";
import * as yup from "yup";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { useTranslation } from "react-i18next";
import CustomButton from "../../../ui/button/CustomButton";
import { useState } from "react";
import TechnologiesItem from "../TechnologiesItem";
import { Typography } from "@mui/material";
export default function Form({
  func,
  data = {
    title: "",
    technologies: [],
    description: "",
    link: "",
    git: "",
  },
}) {
  const { t } = useTranslation();
  const [technologies, setTechnogies] = useState(data.technologies);
  const validationSchema = yup.object({
    title: yup
      .string()
      .max(150, t("projects_section.error.title.max"))
      .required(t("projects_section.error.title.required")),
    description: yup
      .string("Entre your description")
      .max(1000, t("study_section.error.description.max")),
    git: yup
      .string()
      .url(t("cvPersonal.error.git.url"))
      .matches(/^https:\/\/github.com\//, t("cvPersonal.error.git.matches")),
    link: yup.string().url(t("cvPersonal.error.git.url")),
  });
  const validationSchemaTechnologies = yup.object({
    technology: yup
      .string()
      .max(150, t("projects_section.error.technologies.max"))
      .required(t("projects_section.error.technologies.required")),
  });
  const formik = useFormik({
    initialValues: {
      title: data.title,
      description: data.description,
      link: data.link,
      git: data.git,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      func({ ...values, technologies: technologies });
    },
  });
  const formikTechnologies = useFormik({
    initialValues: {
      technology: "",
    },
    validationSchema: validationSchemaTechnologies,
    onSubmit: (values) => {
      setTechnogies([...technologies, values.technology]);
      formikTechnologies.values.technology = "";
    },
  });
  function deleteTechnolgy(data) {
    const temp = technologies.filter((el) => el !== data);
    setTechnogies(temp);
  }
  return (
    <>
      <TextField
        fullWidth
        name="title"
        label={t("projects_section.title")}
        value={formik.values.title}
        onChange={formik.handleChange}
        error={formik.touched.title && Boolean(formik.errors.title)}
        helperText={formik.touched.title && formik.errors.title}
      />
      <TextField
        fullWidth
        id="git"
        name="git"
        label={t("projects_section.git")}
        value={formik.values.git}
        onChange={formik.handleChange}
        error={formik.touched.git && Boolean(formik.errors.git)}
        helperText={formik.touched.git && formik.errors.git}
      />
      <TextField
        fullWidth
        id="link"
        name="link"
        label={t("projects_section.link")}
        value={formik.values.link}
        onChange={formik.handleChange}
        error={formik.touched.link && Boolean(formik.errors.link)}
        helperText={formik.touched.link && formik.errors.link}
      />
      <TextField
        fullWidth
        id="description"
        name="description"
        label={t("projects_section.description")}
        value={formik.values.description}
        onChange={formik.handleChange}
        multiline
        error={formik.touched.description && Boolean(formik.errors.description)}
        helperText={formik.touched.description && formik.errors.description}
      />

      <Box
        sx={{
          display: "flex",
          gap: "2rem",
          justifySelf: "flex-start",
          width: "100%",
        }}
      >
        <TextField
          fullWidth
          name="technology"
          label={t("projects_section.technology")}
          value={formikTechnologies.values.technology}
          onChange={formikTechnologies.handleChange}
          error={
            formikTechnologies.touched.technology &&
            Boolean(formikTechnologies.errors.technology)
          }
          helperText={
            formikTechnologies.touched.technology &&
            formikTechnologies.errors.technology
          }
        />
        <CustomButton func={formikTechnologies.handleSubmit}>
          {t("buttons.add")}
        </CustomButton>
      </Box>

      {technologies.length !== 0 && (
        <Typography variant="h5">
          {t("projects_section.technologies")}
        </Typography>
      )}
      {technologies.map((el) => {
        return <TechnologiesItem data={el} func={deleteTechnolgy} />;
      })}

      <CustomButton func={formik.handleSubmit}>
        {t("buttons.save")}
      </CustomButton>
    </>
  );
}
