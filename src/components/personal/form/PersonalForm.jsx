import Box from "@mui/material/Box";
import { useDispatch, useSelector } from "react-redux";
import { addCVBasicInfo } from "../../../store/action";
import Form from "./Form";
import update from "../../../utilites/update";
export default function PersonalForm({ urlId }) {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.cvBasicInfo);
  const user = useSelector((state) => state.user.id);
  function saveData(values) {
    const newData = {
      name: values.name,
      lastName: values.lastName,
      email: values.email,
      tel: values.tel,
      city: values.city,
      address: values.address,
      zip: values.zip,
      linkedIn: values.linkedIn,
      skype: values.skype,
      photo: data.photo,
      git: values.git,
    };
    dispatch({ type: addCVBasicInfo, payload: newData });
    update(user, urlId, "", "", [newData], true, "cvBasicInfo");
  }
  return (
    <>
      <Box sx={styles.inputBox}>
        <Form func={saveData} data={data} />
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
