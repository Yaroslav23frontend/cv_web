import { grey } from "@mui/material/colors";
import Button from "@mui/material/Button";
export default function SecondaryButton({ func, children }) {
  return (
    <Button sx={styles.button} onClick={func}>
      {children}
    </Button>
  );
}
const styles = {
  button: {
    color: grey[900],
    "&:hover": {
      cursor: "pointer",
      backgroundColor: grey[200],
    },
  },
};
