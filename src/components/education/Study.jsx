import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import StudyItem from "./StudyItem";
import StudyForm from "./StudyForm";
import { useSelector } from "react-redux";
export default function Study() {
  const data = useSelector((state) => state.cvStudy);
  return (
    <Box sx={styles.box}>
      <Typography
        variant="h5"
        component="h2"
        sx={styles.title}
        fontWeight="bold"
      >
        Education
      </Typography>
      {data?.map((el) => (
        <StudyItem key={`study-${el.id}`} data={el} />
      ))}
      <StudyForm />
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
