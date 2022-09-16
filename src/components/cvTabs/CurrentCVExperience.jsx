import { Typography } from "@mui/material";
import Description from "../exp/description/Description";
import CustomBox from "../CustomBox";
import Work from "../exp/work/Work";
import Study from "../exp/education/Study";
import Skills from "../exp/skills/Skills";
import Lan from "../exp/lan/Lan";
import { useTranslation } from "react-i18next";
import SecondaryButton from "../ui/button/SecondaryButton";
import Position from "../exp/position/Position";
import Projects from "../exp/projects/Projects";
export default function CurrentCVExperience({ id, next }) {
  const { t } = useTranslation();
  return (
    <>
      <Typography variant="h4" component="h1" sx={styles.title}>
        {t("cvSection.exp")}
      </Typography>
      <CustomBox>
        <Position urlId={id} />
        <Description urlId={id} />
        <Work urlId={id} />
        <Study urlId={id} />
        <Skills urlId={id} />
        <Projects urlId={id} />
        <Lan urlId={id} />
      </CustomBox>
      <SecondaryButton
        func={() => {
          next("pdf");
        }}
      >
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
