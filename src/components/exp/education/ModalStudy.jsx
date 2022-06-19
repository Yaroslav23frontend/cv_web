import * as React from "react";
import { useTranslation } from "react-i18next";
import Form from "./form/Form";
import { Typography } from "@mui/material";
import ModalItem from "../../ModalItem";
export default function ModalStudy({
  open,
  handleConfirm,
  handleCancele,
  data,
  edit = false,
}) {
  const { t } = useTranslation();

  return (
    <div>
      <ModalItem open={open} handleCancele={handleCancele}>
        <Typography variant="h4" component="h1" fontWeight="bold">
          {t("study_section.h")}
        </Typography>
        <Typography variant="h6" component="h2">
          {edit ? t("edit") : t("buttons.add")}
        </Typography>
        <Form func={handleConfirm} data={data} />
      </ModalItem>
    </div>
  );
}
