import { useEffect } from "react";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import * as yup from "yup";
import { useTranslation } from "react-i18next";
import "yup-phone";
import CustomButton from "../../ui/button/CustomButton";
export default function Form({ func, data }) {
  const { t } = useTranslation();
  const validationSchema = yup.object({
    name: yup
      .string()
      .min(1, t("cvPersonal.error.name.min"))
      .max(32, t("cvPersonal.error.name.max"))
      .required(t("cvPersonal.error.name.required")),
    lastName: yup
      .string()
      .min(1, t("cvPersonal.error.lastName.min"))
      .max(32, t("cvPersonal.error.lastName.max"))
      .required(t("cvPersonal.error.lastName.required")),
    email: yup
      .string()
      .email(t("cvPersonal.error.email.email"))
      .required(t("cvPersonal.error.email.required")),
    tel: yup.string().phone().required(t("cvPersonal.error.tel.required")),
    city: yup
      .string()
      .matches(
        /^(?:[A-Z]{1,}[A-Za-z]{2,}(?:(\.\s|'s\s|\s?-[A-Z]{1,1}\s?|\s)?(?=[A-Za-z]+))){1,2}(?:[A-Za-z]+)?$/,
        t("cvPersonal.error.city.matches")
      ),
    address: yup.string(),
    zip: yup.string().matches(/^[0-9]{5}?$/, t("cvPersonal.error.zip.matches")),

    linkedIn: yup
      .string("Enter link to profile")
      .url(t("cvPersonal.error.linkedIn.url"))
      .matches(
        /^https:\/\/www.linkedin.com\//,
        t("cvPersonal.error.linkedIn.matches")
      ),
    skype: yup
      .string()
      .url(t("cvPersonal.error.skype.url"))
      .matches(
        /^https:\/\/join.skype.com\/invite\//,
        t("cvPersonal.error.skype.matches")
      ),
    git: yup
      .string()
      .url(t("cvPersonal.error.git.url"))
      .matches(/^https:\/\/github.com\//, t("cvPersonal.error.git.matches")),
  });

  const formik = useFormik({
    initialValues: {
      name: data.name,
      lastName: data.lastName,
      email: data.email,
      tel: data.tel,
      city: data.city,
      address: data.address,
      zip: data.zip,
      linkedIn: data.linkedIn,
      skype: data.skype,
      git: data.git,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      func(values);
    },
  });

  useEffect(() => {
    formik.values.name = data.name;
    formik.values.lastName = data.lastName;
    formik.values.email = data.email;
    formik.values.tel = data.tel;
    formik.values.city = data.city;
    formik.values.address = data.address;
    formik.values.zip = data.zip;
    formik.values.linkedIn = data.linkedIn;
    formik.values.skype = data.skype;
    formik.values.git = data.git;
  }, [data]);
  return (
    <>
      <TextField
        fullWidth
        id="name"
        name="name"
        label={t("cvPersonal.name")}
        value={formik.values.name}
        onChange={formik.handleChange}
        error={formik.touched.name && Boolean(formik.errors.name)}
        helperText={formik.touched.name && formik.errors.name}
      />
      <TextField
        fullWidth
        id="LastName"
        name="lastName"
        label={t("cvPersonal.lastName")}
        value={formik.values.lastName}
        onChange={formik.handleChange}
        error={formik.touched.lastName && Boolean(formik.errors.lastName)}
        helperText={formik.touched.lastName && formik.errors.lastName}
      />
      <TextField
        fullWidth
        id="email"
        name="email"
        label={t("cvPersonal.email")}
        value={formik.values.email}
        onChange={formik.handleChange}
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
      />
      <TextField
        fullWidth
        id="tel"
        name="tel"
        label={t("cvPersonal.tel")}
        type="tel"
        value={formik.values.tel}
        onChange={formik.handleChange}
        error={formik.touched.tel && Boolean(formik.errors.tel)}
        helperText={formik.touched.tel && formik.errors.tel}
      />

      <TextField
        fullWidth
        id="city"
        name="city"
        label={t("cvPersonal.city")}
        value={formik.values.city}
        onChange={formik.handleChange}
        error={formik.touched.city && Boolean(formik.errors.city)}
        helperText={formik.touched.city && formik.errors.city}
      />
      <TextField
        fullWidth
        id="address"
        name="address"
        label={t("cvPersonal.address")}
        value={formik.values.address}
        onChange={formik.handleChange}
        error={formik.touched.address && Boolean(formik.errors.address)}
        helperText={formik.touched.address && formik.errors.address}
      />
      <TextField
        fullWidth
        id="zip"
        name="zip"
        label={t("cvPersonal.zip")}
        type="number"
        value={formik.values.zip}
        onChange={formik.handleChange}
        error={formik.touched.zip && Boolean(formik.errors.zip)}
        helperText={formik.touched.zip && formik.errors.zip}
      />
      <TextField
        fullWidth
        id="linkedIn"
        name="linkedIn"
        label={t("cvPersonal.linkedIn")}
        value={formik.values.linkedIn}
        onChange={formik.handleChange}
        error={formik.touched.linkedIn && Boolean(formik.errors.linkedIn)}
        helperText={formik.touched.linkedIn && formik.errors.linkedIn}
      />
      <TextField
        fullWidth
        id="skype"
        name="skype"
        label={t("cvPersonal.skype")}
        value={formik.values.skype}
        onChange={formik.handleChange}
        error={formik.touched.skype && Boolean(formik.errors.skype)}
        helperText={formik.touched.skype && formik.errors.skype}
      />
      <TextField
        fullWidth
        id="git"
        name="git"
        label={t("cvPersonal.git")}
        value={formik.values.git}
        onChange={formik.handleChange}
        error={formik.touched.git && Boolean(formik.errors.git)}
        helperText={formik.touched.git && formik.errors.git}
      />
      <CustomButton func={formik.handleSubmit}>
        {t("buttons.save")}
      </CustomButton>
    </>
  );
}
