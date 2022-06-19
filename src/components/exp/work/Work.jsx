import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import WorkForm from "./form/WorkForm";
import { useSelector } from "react-redux";
import WorkItem from "./WorkItem";
import Button from "@mui/material/Button";
import { useTranslation } from "react-i18next";
export default function Work({ urlId }) {
  const data = useSelector((state) => state.cvWork);
  const { t } = useTranslation();
  return (
    <Box sx={styles.box}>
      <Typography
        variant="h5"
        component="h2"
        sx={styles.title}
        fontWeight="bold"
      >
        {t("work_exp_section.h")}
      </Typography>
      {data.length !== 0 ? (
        <>
          {data?.map((el, id) => (
            <WorkItem key={`work-${el.id}`} data={el} id={id} urlId={urlId} />
          ))}
        </>
      ) : (
        <></>
      )}

      <WorkForm data={data} urlId={urlId} />
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
