import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import WorkForm from "./WorkForm";
import { useSelector } from "react-redux";
import WorkItem from "./WorkItem";
import Button from "@mui/material/Button";
export default function Work() {
  const data = useSelector((state) => state.cvWork);
  return (
    <Box sx={styles.box}>
      <Typography
        variant="h5"
        component="h2"
        sx={styles.title}
        fontWeight="bold"
      >
        Work Experience
      </Typography>
      {data.length !== 0 ? (
        <>
          {data?.map((el) => (
            <WorkItem key={`work-${el.id}`} data={el} />
          ))}
        </>
      ) : (
        <></>
      )}

      <WorkForm data={data} />
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
