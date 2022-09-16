import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
export default function TechnologiesItem({ data, func }) {
  return (
    <>
      <Paper sx={styles.paper}>
        <Box sx={styles.boxDescription}>
          <Typography>{data}</Typography>
        </Box>
        <Box sx={styles.boxButtons}>
          <IconButton onClick={() => func(data)}>
            <DeleteIcon />
          </IconButton>
        </Box>
      </Paper>
    </>
  );
}
const styles = {
  paper: {
    display: "flex",
    justifyContent: "space-between",
    width: "calc(100% - 20px)",
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
