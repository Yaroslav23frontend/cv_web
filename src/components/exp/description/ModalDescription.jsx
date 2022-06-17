import * as React from "react";
import { useTranslation } from "react-i18next";
import Form from "./form/Form";
import { Typography } from "@mui/material";
import ModalItem from "../../ModalItem";
export default function ModalDescription({
  open,
  handleConfirm,
  handleCancele,
  data,
}) {
  const { t } = useTranslation();
  return (
    <div>
      <ModalItem open={open} handleCancele={handleCancele}>
        <Typography variant="h4" component="h1">
          Edit description
        </Typography>
        <Form func={handleConfirm} data={data} />
      </ModalItem>
    </div>
  );
}
