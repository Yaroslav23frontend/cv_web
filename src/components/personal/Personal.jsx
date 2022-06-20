import Box from "@mui/material/Box";
import { useTranslation } from "react-i18next";
import PersonalItem from "./PersonalItem";
import PersonalForm from "./form/PersonalForm";
import { useSelector } from "react-redux";
export default function Personal({ urlId }) {
  const { t } = useTranslation();
  const data = useSelector((state) => state.cvBasicInfo);
  return (
    <Box sx={styles.box}>
      {data?.name !== "" ? (
        <PersonalItem urlId={urlId} data={data} />
      ) : (
        <PersonalForm urlId={urlId} />
      )}
    </Box>
  );
}
const styles = {
  box: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 5,
  },
};
