import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import StudyItem from "./StudyItem";
import StudyForm from "./form/StudyForm";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
export default function Study({ urlId }) {
  const data = useSelector((state) => state.cvStudy);
  const { t } = useTranslation();
  return (
    <Box sx={styles.box}>
      <Typography
        variant="h5"
        component="h2"
        sx={styles.title}
        fontWeight="bold"
      >
        {t("study_section.h")}
      </Typography>
      {data?.map((el, id) => (
        <StudyItem key={`study-${el.id}`} data={el} id={id} urlId={urlId} />
      ))}
      <StudyForm urlId={urlId} />
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
