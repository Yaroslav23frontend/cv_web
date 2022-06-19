import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import * as yup from "yup";
import { useTranslation } from "react-i18next";
import Paper from "@mui/material/Paper";
import Form from "./form/Form";
import { Typography } from "@mui/material";
import ModalItem from "../../ModalItem";
export default function ModalSkills({
  open,
  handleConfirm,
  handleCancele,
  data,
  edit,
}) {
  const { t } = useTranslation();

  return (
    <div>
      <ModalItem open={open} handleCancele={handleCancele}>
        <Typography variant="h4" component="h1" fontWeight="bold">
          {t("skills.h")}
        </Typography>
        <Typography variant="h6" component="h2">
          {edit ? t("edit") : t("buttons.add")}
        </Typography>
        <Form func={handleConfirm} data={data} />
      </ModalItem>
    </div>
  );
}
