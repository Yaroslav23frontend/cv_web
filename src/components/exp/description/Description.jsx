import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import DescriptionForm from "./form/DescriptionForm";
import DescriptionItem from "./DescriptionItem";
import { useTranslation } from "react-i18next";
export default function Description({ urlId }) {
  const { t } = useTranslation();
  return (
    <Box sx={styles.box}>
      <Typography
        variant="h5"
        component="h2"
        sx={styles.title}
        fontWeight="bold"
      >
        {t("description")}
      </Typography>
      <DescriptionItem urlId={urlId} />
      <DescriptionForm urlId={urlId} />
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
