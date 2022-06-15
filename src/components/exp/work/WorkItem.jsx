import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { date } from "yup";
import { deleteCVWorkExp } from "../../../store/action";
export default function WorkItem({ data }) {
  const dispatch = useDispatch();
  function Delete() {
    dispatch({ type: deleteCVWorkExp, payload: data.id });
  }
  return (
    <>
      <Paper sx={styles.paper}>
        <Box sx={styles.box}>
          <Box>
            <Box>
              <Typography>
                <Typography fontWeight="bold" component="span">
                  Title:&nbsp;
                </Typography>
                {data.title}
              </Typography>
            </Box>
            <Box>
              <Typography>
                <Typography fontWeight="bold" component="span">
                  Company:&nbsp;
                </Typography>
                {data.company}
              </Typography>
            </Box>
            <Box>
              <Typography>
                <Typography fontWeight="bold" component="span">
                  City:&nbsp;
                </Typography>
                {data.city}
              </Typography>
            </Box>
          </Box>
          <Typography>
            {data.start}-{data.end}
          </Typography>
        </Box>
        {data.description !== "" ? (
          <Box sx={styles.boxDescription}>
            <Typography fontWeight="bold">Description</Typography>
            <Typography>{data.description}</Typography>
          </Box>
        ) : (
          <></>
        )}

        <Box sx={styles.boxButtons}>
          <IconButton>
            <EditIcon />
          </IconButton>
          <IconButton onClick={Delete}>
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
    flexDirection: "column",
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
