import { IconButton } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import { red, grey, blue } from "@mui/material/colors";
import Box from "@mui/material/Box";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useDispatch, useSelector } from "react-redux";
import { changeCVbg } from "../store/action";
import update from "../utilites/update";
export default function CVcolor({ urlId }) {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.cvBg);
  const user = useSelector((state) => state.user.id);
  function color(color) {
    dispatch({ type: changeCVbg, payload: color });
    update(user, urlId, "", "", color, true, "cvBg");
  }
  return (
    <Box sx={styles.box}>
      <IconButton onClick={() => color(grey[900])}>
        <Box sx={{ ...styles.black, ...styles.circle }}>
          {data === grey[900] ? (
            <KeyboardArrowDownIcon sx={styles.arrowDown} />
          ) : (
            <></>
          )}
        </Box>
      </IconButton>
      <IconButton onClick={() => color(red[500])}>
        <Box sx={{ ...styles.red, ...styles.circle }}>
          {data === red[500] ? (
            <KeyboardArrowDownIcon sx={styles.arrowDown} />
          ) : (
            <></>
          )}
        </Box>
      </IconButton>
      <IconButton onClick={() => color(blue[500])}>
        <Box sx={{ ...styles.blue, ...styles.circle }}>
          {data === blue[500] ? (
            <KeyboardArrowDownIcon sx={styles.arrowDown} />
          ) : (
            <></>
          )}
        </Box>
      </IconButton>
    </Box>
  );
}
const styles = {
  box: {
    display: "flex",
    gap: 2,
  },
  circle: {
    width: "25px",
    height: "25px",
    borderRadius: "50%",
    content: '""',
  },

  red: {
    backgroundColor: red[500],
  },
  black: {
    backgroundColor: grey[900],
  },
  blue: {
    backgroundColor: blue[500],
  },
  arrowDown: {
    color: grey[100],
  },
};
