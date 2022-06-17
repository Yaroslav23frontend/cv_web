import LanItem from "./LanItem";
import LanForm from "./form/LanForm";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
export default function Lan() {
  const data = useSelector((state) => state.cvLan);
  return (
    <Box sx={styles.box}>
      <Typography
        variant="h5"
        component="h2"
        sx={styles.title}
        fontWeight="bold"
      >
        Language
      </Typography>
      {data?.map((el, id) => (
        <LanItem key={`lan-${el.id}`} data={el} id={id} />
      ))}
      <LanForm />
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
