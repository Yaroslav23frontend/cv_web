import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import CustomBox from "../CustomBox";
import { useFormik } from "formik";
import * as yup from "yup";
import Typography from "@mui/material/Typography";
import ModalAvatar from "../ModalAvatar";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useSelector, useDispatch } from "react-redux";
import { addCVBasicInfo, uploadPhotoCVBasicInfo } from "../../store/action";
import { useTranslation } from "react-i18next";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import "yup-phone";
import { useLocation } from "react-router-dom";
export default function CurrentCVBasic({ id, next }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.id);
  const data = useSelector((state) => state.cvBasicInfo);
  const location = useLocation();
  function docName() {
    const index = location.pathname.indexOf("cv");
    const lastIndex = location.pathname.lastIndexOf("/");
    const docName = location.pathname.substring(index + 1);
    return docName;
  }
  const validationSchema = yup.object({
    name: yup
      .string("Enter your name")
      .min(1, "Name should be of minimum 2 characters length")
      .max(32, "Name should be of max 32 characters length")
      .required("Name is required"),
    lastName: yup
      .string("Enter your last name")
      .min(1, "Name should be of minimum 2 characters length")
      .max(32, "Name should be of max 32 characters length")
      .required("Name is required"),
    email: yup
      .string("Enter your email")
      .email("Enter a valid email")
      .required("Email is required"),
    tel: yup
      .string("Enter your phone number")
      .phone()
      .required("Phone number is required"),
    city: yup
      .string()
      .matches(
        /^(?:[A-Z]{1,}[A-Za-z]{2,}(?:(\.\s|'s\s|\s?-[A-Z]{1,1}\s?|\s)?(?=[A-Za-z]+))){1,2}(?:[A-Za-z]+)?$/,
        "The city name is invalid"
      ),
    address: yup.string("Enter your city"),
    zip: yup
      .string("Enter your zip code")
      .matches(/^[0-9]{5}?$/, "The zip code should be 5 numbers in length"),

    linkedIn: yup
      .string("Enter link to profile")
      .url("Must be url")
      .matches(
        /^https:\/\/www.linkedin.com\//,
        "The link must reach your profile on LinkedIn"
      ),
    skype: yup
      .string()
      .url("Must be url")
      .matches(
        /^https:\/\/join.skype.com\/invite\//,
        "The link should be invite to Skype"
      ),
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
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      next("exp");
      dispatch({
        type: addCVBasicInfo,
        payload: {
          name: values.name,
          lastName: values.lastName,
          email: values.email,
          tel: values.tel,
          city: values.city,
          address: values.address,
          zip: values.zip,
          linkedIn: values.linkedIn,
          skype: values.skype,
        },
      });
      await updateDoc(doc(db, `${user}`, id), {
        cvBasicInfo: {
          name: values.name,
          lastName: values.lastName,
          email: values.email,
          tel: values.tel,
          city: values.city,
          address: values.address,
          zip: values.zip,
          linkedIn: values.linkedIn,
          skype: values.skype,
          photo: data.photo,
        },
      });
    },
  });

  const [modalAvatar, setModalAvatar] = useState(false);
  function closeModalAvatar() {
    setModalAvatar(false);
  }
  function confirmModalAvatar(img) {
    dispatch({ type: uploadPhotoCVBasicInfo, payload: img });
    setModalAvatar(false);
  }
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
  }, [data]);
  return (
    <>
      <Typography variant="h4" component="h1" sx={styles.title}>
        {t("cvSection.personal")}
      </Typography>

      <CustomBox>
        <Box sx={styles.inputBox}>
          {data.photo !== "" ? (
            <img
              src={data.photo}
              alt={"avatar"}
              style={{ borderRadius: "50%" }}
            />
          ) : (
            <AccountCircleIcon sx={{ width: "100px", height: "100px" }} />
          )}

          <Button
            variant="contained"
            component="label"
            onClick={() => {
              setModalAvatar(true);
            }}
          >
            {t("buttons.uploadPhoto")}
          </Button>
          <ModalAvatar
            handleConfirm={confirmModalAvatar}
            handleCancele={closeModalAvatar}
            open={modalAvatar}
          />
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
        </Box>
      </CustomBox>
      <Button sx={styles.next} onClick={formik.handleSubmit}>
        {t("buttons.next")}
      </Button>
    </>
  );
}
const styles = {
  title: {
    textAlign: "center",
    marginBottom: "20px",
    marginTop: "25px",
  },
  inputBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "20px",
    height: "100%",
    width: "calc(100% - 20px)",
  },
  next: {
    marginTop: 1,
    marginBottom: 1,
  },
};
