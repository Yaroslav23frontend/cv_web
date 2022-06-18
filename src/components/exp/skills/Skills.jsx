import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import SkillItem from "./SkillItem";
import SkillsForm from "./form/SkillsForm";
export default function Skills({ urlId }) {
  const data = useSelector((state) => state.cvSkills);
  return (
    <Box sx={styles.box}>
      <Typography
        variant="h5"
        component="h2"
        sx={styles.title}
        fontWeight="bold"
      >
        Skills
      </Typography>
      {data?.map((el, id) => (
        <SkillItem key={`skill-${el.id}`} data={el} id={id} urlId={urlId} />
      ))}
      <SkillsForm urlId={urlId} />
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
