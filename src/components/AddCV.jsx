import React, { useEffect, useState, Fragment } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../context/AuthContext";
import { addCV, addItem } from "../store/action";
import * as yup from "yup";
import { useTranslation } from "react-i18next";
import { grey } from "@mui/material/colors";
export default function AddCV() {
  const { t } = useTranslation();
  const user = useSelector((state) => state.user.id);
  const dataCollection = useSelector((state) => state.collection);
  const dispatch = useDispatch();
  const [count, setCount] = useState(0);
  async function addNewItem(data) {
    dispatch({
      type: addCV,
      payload: data.item,
    });
    storeData(data.item);
  }
  async function storeData(data) {
    console.log(data);
    await setDoc(doc(db, `${user}`, data), {
      cvBasicInfo: {
        photo: "",
        name: "",
        lastName: "",
        email: "",
        tel: "",
        address: "",
        zip: "",
        city: "",
        linkedIn: "",
        skype: "",
        git: "",
      },
      cvWork: [],
      cvDescription: "",
      cvStudy: [],
      cvSkills: [],
      cvLan: [],
      cvBg: "",
    });
    await setDoc(doc(db, `${user}-collection`, "collection"), {
      collection: [...dataCollection, data],
    });
  }

  const styles = {
    inputAddItem: {
      width: "calc(100% - 300px)",
      minWidth: "300px",
    },
    boxAddNew: {
      marginRight: "auto",
      marginLeft: "auto",
      width: "95%",
      position: "absolute",
      bottom: "20px",
      display: "flex",
      alignItems: "baseline",
      justifyContent: "center",
      gap: "20px",
      flexWrap: "wrap",
    },
    dateAndButton: {
      alignSelf: "felx-start",
      display: "flex",
      gap: "20px",
    },
  };
  const validationSchema = yup.object({
    item: yup
      .string("Enter your password")
      .min(1, "Item should be  minimum 1 character length")
      .max(
        50,
        "The item should be less than 50 or equal to 50 characters in length"
      )
      .required("Item should be minimum 1 character length"),
  });
  const formik = useFormik({
    initialValues: {
      item: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const data = values;
      addNewItem(data);
      values.item = "";
      values.date = "";
      setCount(count + 1);
    },
  });
  return (
    <form
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
      }}
      onSubmit={formik.handleSubmit}
    >
      <Box sx={styles.boxAddNew}>
        <TextField
          sx={styles.inputAddItem}
          id="item"
          name="item"
          label={t("placeholders.addCV")}
          variant="standard"
          value={formik.values.item}
          onChange={formik.handleChange}
          error={formik.touched.item && Boolean(formik.errors.item)}
          helperText={formik.touched.item && formik.errors.item}
        />

        <Button
          variant="outlined"
          type="submit"
          sx={{
            borderColor: grey[900],
            color: grey[900],
            "&:hover": {
              cursor: "pointer",
              backgroundColor: grey[200],
              borderColor: grey[600],
            },
          }}
        >
          {t("buttons.add")}
        </Button>
      </Box>
    </form>
  );
}
