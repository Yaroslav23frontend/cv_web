import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import * as yup from "yup";
import { useTranslation } from "react-i18next";
export default function CustomModal({
  open,
  handleConfirm,
  massege,
  handleCancele,
  result = "",
  boardName,
  editBoardName,
  item = { item: "", date: "" },
  editItem,
}) {
  const { t } = useTranslation();
  const validationSchemaDescrition = yup.object({
    description: yup
      .string("Entre your description")
      .max("Max length 1000 symbols")
      .required("Enter description"),
  });
  const validationSchemaEditItem = yup.object({
    item: yup
      .string("Enter your password")
      .min(1, "Item should be  minimum 1 character length")
      .max(
        50,
        "The item should be less than 50 or equal to 50 characters in length"
      )
      .required("Item should be minimum 1 character length"),
    date: yup.date("Enter your task").required("Please choose the date"),
  });
  const formikDescrition = useFormik({
    initialValues: {
      description: description,
    },
    validationSchema: validationSchemaDescrition,
    onSubmit: (values) => {
      const data = values;
      handleConfirm(data.description);
      values.description = "";
    },
  });

  //   const formikEditItem = useFormik({
  //     initialValues: {
  //       item: item.item,
  //       date: item.date,
  //     },
  //     validationSchema: validationSchema,
  //     onSubmit: (values) => {
  //       const data = values;
  //       handleConfirm(data);
  //       values.item = "";
  //       values.date = "";
  //     },
  //   });

  return (
    <div>
      <Modal
        open={open}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={styles.box}>
          <TextField
            fullWidth
            id="description"
            name="description"
            label="Description"
            value={formikDescrition.values.description}
            onChange={formikDescrition.handleChange}
            multiline
            error={
              formikDescrition.touched.description &&
              Boolean(formikDescrition.errors.description)
            }
            helperText={
              formikDescrition.touched.description &&
              formikDescrition.errors.description
            }
          />
          <Box sx={styles.boxButtons}>
            <Button onClick={handleConfirm}>{t("buttons.save")}</Button>
            <Button onClick={handleCancele}>{t("buttons.cancel")}</Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
const styles = {
  box: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 320,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
    textAlign: "center",
  },
  boxButtons: {
    display: "flex",
    justifyContent: "center",
    gap: 2,
  },
  boxEdit: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    width: "100%",
    gap: 2,
  },
  input: {
    marginBottom: 2,
  },
};
