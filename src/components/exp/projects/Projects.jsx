import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import ProjectsForm from "./form/ProjectsForm";
import ProjectItem from "./ProjectItem";
import { useTranslation } from "react-i18next";
export default function Projects({ urlId }) {
  const { t } = useTranslation();
  const data = useSelector((state) => state.cvProjects);
  console.log(data);
  return (
    <Box sx={styles.box}>
      <Typography
        variant="h5"
        component="h2"
        sx={styles.title}
        fontWeight="bold"
      >
        {t("projects_section.h")}
      </Typography>
      {data.map((el, id) => (
        <ProjectItem key={`project-${el.id}`} data={el} id={id} urlId={urlId} />
      ))}
      <ProjectsForm urlId={urlId} />
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
