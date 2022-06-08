import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Container from "../components/Container";
import CustomBox from "../components/CustomBox";
import { useFormik } from "formik";
import * as yup from "yup";
import Typography from "@mui/material/Typography";
export default function CurrentCV({ match }) {
  const validationSchema = yup.object({
    name: yup
      .string("Enter your email")
      .min(8, "Name should be of minimum 2 characters length")
      .max(32, "Name should be of max 32 characters length")
      .required("Name is required"),
    email: yup
      .string("Enter your email")
      .email("Enter a valid email")
      .required("Email is required"),
  });
  const formik = useFormik({
    initialValues: {
      name: "",
      lastName: "",
      email: "",
      phone: "",
      city: "",
      address: "",
      zip: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <Container>
      <CustomBox>
        <form onSubmit={formik.handleSubmit}>
          <Typography variant="h4" component="h1" sx={styles.title}>
            Basic Info
          </Typography>
          <Box sx={styles.inputBox}>
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
              value={formik.values.phone}
              type="tel"
              onChange={formik.phone}
              error={formik.touched.phone && Boolean(formik.errors.phone)}
              helperText={formik.touched.phone && formik.errors.phone}
            />

            <TextField
              fullWidth
              id="city"
              name="city"
              label="City"
              value={formik.values.city}
              type="tel"
              onChange={formik.city}
              error={formik.touched.city && Boolean(formik.errors.city)}
              helperText={formik.touched.city && formik.errors.city}
            />
            <TextField
              fullWidth
              id="address"
              name="address"
              label="Address"
              value={formik.values.address}
              type="tel"
              onChange={formik.address}
              error={formik.touched.address && Boolean(formik.errors.address)}
              helperText={formik.touched.address && formik.errors.address}
            />
            <TextField
              fullWidth
              id="zip"
              name="zip"
              label="ZIP"
              value={formik.values.zip}
              type="tel"
              onChange={formik.zip}
              error={formik.touched.zip && Boolean(formik.errors.zip)}
              helperText={formik.touched.zip && formik.errors.zip}
            />
          </Box>
        </form>
      </CustomBox>
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
};
