import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { useTranslation } from "react-i18next";
import Paper from "@mui/material/Paper";
export default function ModalItem({ open, handleCancele, children }) {
  const { t } = useTranslation();

  return (
    <div>
      <Modal
        open={open}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Paper sx={styles.paper}>
          <Box sx={styles.topNav}>
            <Button onClick={handleCancele}>{t("buttons.back")}</Button>
          </Box>
          {children}
        </Paper>
      </Modal>
    </div>
  );
}
const styles = {
  paper: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    maxWidth: "1000px",
    width: "100%",
    minHeight: "400px",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    overflow: "hidden",
    gap: 2,
    padding: 2,
  },
  topNav: {
    display: "flex",
    alignItems: "center",
    color: "#eee",
    width: "100%",
    justifyContent: "space-between",
    marginLeft: -3.5,
  },
};
