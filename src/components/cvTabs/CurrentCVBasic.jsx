import CustomBox from "../CustomBox";
import Typography from "@mui/material/Typography";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import Personal from "../personal/Personal";
import Avatar from "../Avatar";
import SecondaryButton from "../ui/button/SecondaryButton";
export default function CurrentCVBasic({ id, next }) {
  const { t } = useTranslation();
  const data = useSelector((state) => state.cvBasicInfo);
  return (
    <>
      <Typography variant="h4" component="h1" sx={styles.title}>
        {t("cvSection.personal")}
      </Typography>

      <CustomBox>
        <Avatar data={data} />
        <Personal urlId={id} />
      </CustomBox>
      <SecondaryButton func={() => next("exp")}>
        {t("buttons.next")}
      </SecondaryButton>
    </>
  );
}
const styles = {
  title: {
    textAlign: "center",
    marginBottom: "20px",
    marginTop: "25px",
  },
};
