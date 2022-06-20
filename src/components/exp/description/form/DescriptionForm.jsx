import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { addCVdescription } from "../../../../store/action";
import Form from "./Form";
import update from "../../../../utilites/update";
export default function DescriptionForm({ urlId }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.cvDescription);
  const user = useSelector((state) => state.user.id);
  function saveData(values) {
    dispatch({ type: addCVdescription, payload: values.description });
    update(user, urlId, "", "", values.description, true, "cvDescription");
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
