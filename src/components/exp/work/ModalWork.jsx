import * as React from "react";
import { useTranslation } from "react-i18next";
import Form from "./form/Form";
import { Typography } from "@mui/material";
import ModalItem from "../../ModalItem";
export default function ModalWork({
  open,
  handleConfirm,
  handleCancele,
  data,
  title,
}) {
  const { t } = useTranslation();
  return (
    <div>
      <ModalItem open={open} handleCancele={handleCancele}>
        <Typography variant="h4" component="h1">
          {title}
        </Typography>
        <Form func={handleConfirm} data={data} />
      </ModalItem>
    </div>
  );
}
