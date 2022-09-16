import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useTranslation } from "react-i18next";
import WorkIcon from "@mui/icons-material/Work";
import PersonIcon from "@mui/icons-material/Person";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
export default function CVTabs({ active, setTab }) {
  const { t } = useTranslation();
  function handleChangeIndexNav(event, index, id) {
    setTab(index);
  }
  return (
    <Tabs
      value={active}
      onChange={handleChangeIndexNav}
      textColor="secondary"
      variant="fullWidth"
      indicatorColor="secondary"
      aria-label="secondary tabs example"
      sx={styles.tabs}
    >
      <Tab sx={{ border: 0 }} value="basic" label={<PersonIcon />} />
      <Tab value="exp" label={<WorkIcon />} />
      <Tab value="pdf" label={<PictureAsPdfIcon />} />
    </Tabs>
  );
}
const styles = {
  tabs: {
    width: "100%",
    maxWidth: "330px",
    display: "flex",
    padding: "5px",
    justifyContent: "center",
    border: 0,
  },
};
