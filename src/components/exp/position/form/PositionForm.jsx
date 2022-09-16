import Box from "@mui/material/Box";
import { useDispatch, useSelector } from "react-redux";
import { addCVPosition } from "../../../../store/action";
import Form from "./Form";
import update from "../../../../utilites/update";
export default function PositionForm({ urlId }) {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.cvPosition);
  const user = useSelector((state) => state.user.id);
  function saveData(values) {
    dispatch({ type: addCVPosition, payload: values.position });
    update(user, urlId, "", "", values.position, true, "cvPosition");
  }

  return (
    <>
      <Box sx={styles.inputBox}>
        {data !== "" ? (
          <></>
        ) : (
          <>
            <Form func={saveData} />
          </>
        )}
      </Box>
    </>
  );
}
const styles = {
  inputBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "20px",
    height: "100%",
    width: "calc(100% - 20px)",
    marginBottom: "20px",
  },
};
