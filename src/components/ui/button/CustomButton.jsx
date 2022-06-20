import { Button } from "@mui/material";
import { grey } from "@mui/material/colors";
export default function CustomButton({
  func,
  children,
  label = false,
  fullWidth = false,
}) {
  return (
    <Button
      variant="contained"
      component={label ? "label" : "button"}
      fullWidth={fullWidth}
      sx={{
        borderColor: grey[900],
        backgroundColor: grey[900],
        color: "#fff",
        "&:hover": {
          cursor: "pointer",
          backgroundColor: grey[200],
          borderColor: grey[600],
          color: grey[900],
        },
      }}
      onClick={func}
    >
      {children}
    </Button>
  );
}
