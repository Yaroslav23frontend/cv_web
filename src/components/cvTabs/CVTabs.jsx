import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useTranslation } from "react-i18next";
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
      <Tab value="basic" label={t("cvSection.personal")} />
      <Tab value="exp" label={t("cvSection.exp")} />
      <Tab value="pdf" label={t("cvSection.pdf")} />
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
  },
};
