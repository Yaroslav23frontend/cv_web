import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import Description from "../exp/description/Description";
import CustomBox from "../CustomBox";
import Work from "../exp/work/Work";
import Study from "../exp/education/Study";
import Skills from "../exp/skills/Skills";
import Lan from "../exp/lan/Lan";
export default function CurrentCVExperience({ id }) {
  return (
    <>
      <Typography variant="h4" component="h1" sx={styles.title}>
        Experience
      </Typography>
      <CustomBox>
        <Box sx={styles.boxSections}>
          <Description urlId={id} />
          <Work urlId={id} />
          <Study urlId={id} />
          <Skills urlId={id} />
          <Lan urlId={id} />
        </Box>
      </CustomBox>
      <Button sx={styles.next} onClick={() => {}}>
        Next
      </Button>
    </>
  );
}
const styles = {
  title: {
    textAlign: "center",
    marginBottom: "20px",
    marginTop: "25px",
  },
  next: {
    marginTop: 1,
    marginBottom: 1,
  },
  boxSections: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 5,
  },
};
