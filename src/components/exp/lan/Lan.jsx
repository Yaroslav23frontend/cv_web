import LanItem from "./LanItem";
import LanForm from "./form/LanForm";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
export default function Lan({ urlId }) {
  const { t } = useTranslation();
  const data = useSelector((state) => state.cvLan);
  return (
    <Box sx={styles.box}>
      <Typography
        variant="h5"
        component="h2"
        sx={styles.title}
        fontWeight="bold"
      >
        {t("languages_section.h")}
      </Typography>
      {data?.map((el, id) => (
        <LanItem key={`lan-${el.id}`} data={el} id={id} urlId={urlId} />
      ))}
      <LanForm urlId={urlId} />
    </Box>
  );
}
const styles = {
  box: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "20px",
    height: "100%",
    width: "calc(100% - 20px)",
  },
};
