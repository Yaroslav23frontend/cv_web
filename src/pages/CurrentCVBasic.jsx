import React, { useEffect, useState, useRef } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Container from "../components/Container";
import CustomBox from "../components/CustomBox";
import { useFormik } from "formik";
import * as yup from "yup";
import Typography from "@mui/material/Typography";
import ModalAvatar from "../components/ModalAvatar";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useSelector, useDispatch } from "react-redux";
import { addCVBasicInfo, uploadPhotoCVBasicInfo } from "../store/action";
import "yup-phone";
import CVTabs from "../components/CVTabs";
export default function CurrentCVBasic({ match }) {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.cvBasicInfo);
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
    phone: yup
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
      phone: data.tel,
      city: data.city,
      address: data.address,
      zip: data.zip,
      linkedIn: data.linkedIn,
      skype: data.skype,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
      dispatch({
        type: addCVBasicInfo,
        payload: {
          name: values.name,
          lastName: values.lastName,
          email: values.email,
          tel: values.phone,
          city: values.city,
          address: values.address,
          zip: values.zip,
          linkedIn: values.linkedIn,
          skype: values.skype,
        },
      });
      console.log(values);
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
  return (
    <Container>
      <CVTabs active="basic" />
      <Typography variant="h4" component="h1" sx={styles.title}>
        Basic Info
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
            Upload Photo
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
            label="Name"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
          <TextField
            fullWidth
            id="LastName"
            name="lastName"
            label="Last Name"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
            helperText={formik.touched.lastName && formik.errors.lastName}
          />
          <TextField
            fullWidth
            id="email"
            name="email"
            label="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            fullWidth
            id="phone"
            name="phone"
            label="Phone"
            type="tel"
            value={formik.values.phone}
            onChange={formik.handleChange}
            error={formik.touched.phone && Boolean(formik.errors.phone)}
            helperText={formik.touched.phone && formik.errors.phone}
          />

          <TextField
            fullWidth
            id="city"
            name="city"
            label="City"
            value={formik.values.city}
            onChange={formik.handleChange}
            error={formik.touched.city && Boolean(formik.errors.city)}
            helperText={formik.touched.city && formik.errors.city}
          />
          <TextField
            fullWidth
            id="address"
            name="address"
            label="Address"
            value={formik.values.address}
            onChange={formik.handleChange}
            error={formik.touched.address && Boolean(formik.errors.address)}
            helperText={formik.touched.address && formik.errors.address}
          />
          <TextField
            fullWidth
            id="zip"
            name="zip"
            label="ZIP"
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
            label="LinkedIn"
            value={formik.values.linkedIn}
            onChange={formik.handleChange}
            error={formik.touched.linkedIn && Boolean(formik.errors.linkedIn)}
            helperText={formik.touched.linkedIn && formik.errors.linkedIn}
          />
          <TextField
            fullWidth
            id="skype"
            name="skype"
            label="Skype(invite link)"
            value={formik.values.skype}
            onChange={formik.handleChange}
            error={formik.touched.skype && Boolean(formik.errors.skype)}
            helperText={formik.touched.skype && formik.errors.skype}
          />
        </Box>
      </CustomBox>
      <Button sx={styles.next} onClick={formik.handleSubmit}>
        Next
      </Button>
    </Container>
  );
}
const styles = {
  title: {
    textAlign: "center",
    marginBottom: "20px",
    marginTop: "25px",
  },

  paper: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    padding: "20px",
    maxWidth: "400px",
    padding: "10px",
    width: "100%",
  },
  inputBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "20px",
    height: "100%",
    width: "calc(100% - 20px)",
  },
  button: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    marginRight: "10px",
  },
  linksBox: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "20px",
    width: "100%",
  },
  link: {
    display: "flex",
  },
  error: {
    fontSize: "12px",
    color: "red",
    marginTop: "-15px",
    marginLeft: "15px",
    alignSelf: "flex-start",
  },
  errorGoogle: {
    fontSize: "12px",
    color: "red",
    marginTop: "-15px",
  },
  signUpLink: {
    justifySelf: "center",
  },
  tabs: {
    width: "100%",
    maxWidth: "360px",
    display: "flex",
    padding: "5px",
    justifyContent: "center",
  },
  next: {
    marginTop: 1,
    marginBottom: 1,
  },
  boxTabs: {
    width: "100%",
    padding: "10px",
    display: "flex",
    justifyContent: "center",
  },
  boxAvatar: {
    display: "flex",
    flexDirection: "column",
    gap: 1,
  },
};
