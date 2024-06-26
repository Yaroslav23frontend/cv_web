import { useFormik } from "formik";
import * as yup from "yup";
import TextField from "@mui/material/TextField";
import { useTranslation } from "react-i18next";
import CustomButton from "../../../ui/button/CustomButton";

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
  const validationSchema = yup.object({
    studies: yup
      .string()
      .max(150, t("study_section.error.studies.max"))
      .required(t("study_section.error.studies.required")),
    location: yup
      .string()
      .matches(
        /^(?:[A-ZА-ЯҐЄІЇ]{1,}[A-Za-zА-Яа-яґєії]{2,}(?:(\.\s|'s\s|\s?-[A-ZА-ЯҐЄІЇ]{1,1}\s?|\s)?(?=[A-Za-zА-Яа-яґєії]+))){1,2}(?:[A-Za-zА-Яа-яґєії]+)?$/,
        t("study_section.error.location.matches")
      ),
    insitution: yup
      .string()
      .max(150, t("study_section.error.institution.matches"))
      .required(t("study_section.error.institution.required")),
    start: yup.date().required(t("study_section.error.start.required")),
    end: yup.date(),
    description: yup
      .string("Entre your description")
      .max(1000, t("study_section.error.description.max")),
  });
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
        label={t("study_section.studies")}
        value={formik.values.studies}
        onChange={formik.handleChange}
        error={formik.touched.studies && Boolean(formik.errors.studies)}
        helperText={formik.touched.studies && formik.errors.studies}
      />
      <TextField
        fullWidth
        id="location"
        name="location"
        label={t("study_section.location")}
        value={formik.values.location}
        onChange={formik.handleChange}
        error={formik.touched.location && Boolean(formik.errors.location)}
        helperText={formik.touched.location && formik.errors.location}
      />
      <TextField
        fullWidth
        id="insitution"
        name="insitution"
        label={t("study_section.insitution")}
        value={formik.values.insitution}
        onChange={formik.handleChange}
        error={formik.touched.insitution && Boolean(formik.errors.insitution)}
        helperText={formik.touched.insitution && formik.errors.insitution}
      />
      <TextField
        fullWidth
        id="start"
        name="start"
        label={t("study_section.start_date")}
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
        label={t("study_section.end_date")}
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
        label={t("study_section.description")}
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
