import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch } from "react-redux";
import { deleteCVlan } from "../../../store/action";
export default function LanItem({ data }) {
  const dispatch = useDispatch();
  function Delete() {
    dispatch({ type: deleteCVlan, payload: data.id });
  }
  return (
    <Paper sx={styles.paper}>
      <Box sx={styles.boxDescription}>
        <Typography>{data.lan}</Typography>
      </Box>
      <Typography>{data.level}</Typography>
      <Box sx={styles.boxButtons}>
        <IconButton>
          <EditIcon />
        </IconButton>
        <IconButton onClick={Delete}>
          <DeleteIcon />
        </IconButton>
      </Box>
    </Paper>
  );
}
const styles = {
  paper: {
    display: "flex",
    justifyContent: "space-between",
    width: "calc(100% - 100px)",
  },
  box: {
    display: "flex",
    justifyContent: "space-between",
    padding: 1,
  },
  boxDescription: {
    padding: 1,
  },
  boxButtons: {
    alignSelf: "flex-end",
  },
};
