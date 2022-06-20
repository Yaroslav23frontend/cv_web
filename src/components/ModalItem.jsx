import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { useTranslation } from "react-i18next";
import Paper from "@mui/material/Paper";
import CustomBox from "./CustomBox";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { IconButton } from "@mui/material";
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
            <IconButton onClick={handleCancele}>
              <ArrowBackIcon />
            </IconButton>
          </Box>
          <CustomBox maxHeight="calc(100% - 100px)">
            <Box sx={styles.box}>{children}</Box>
          </CustomBox>
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
  },
  topNav: {
    display: "flex",
    alignItems: "center",
    color: "#eee",
    width: "100%",
    justifyContent: "space-between",
  },
  box: {
    width: "calc(100% - 20px)",
    minHeight: "400px",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 2,
    padding: 2,
    marginBottom: 2,
  },
};
