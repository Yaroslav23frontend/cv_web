import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import PositionItem from "./PositionItem";
import PositionForm from "./form/PositionForm";
export default function Position({ urlId }) {
  const { t } = useTranslation();
  return (
    <Box sx={styles.box}>
      <Typography
        variant="h5"
        component="h2"
        sx={styles.title}
        fontWeight="bold"
      >
        {t("position_section.h")}
      </Typography>
      <PositionItem urlId={urlId} />
      <PositionForm urlId={urlId} />
    </Box>
  );
}
const styles = {
  box: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 2,
  },
};
