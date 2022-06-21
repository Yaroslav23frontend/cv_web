import { useEffect, useState } from "react";
import Container from "../components/Container";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import CVTabs from "../components/cvTabs/CVTabs";
import { useLocation } from "react-router-dom";
import CurrentCVBasic from "../components/cvTabs/CurrentCVBasic";
import CurrentCVExperience from "../components/cvTabs/CurrentCVExperience";
import CurrentCVpdf from "../components/cvTabs/CurrentCVPDF";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import {
  addCVdescription,
  uploadCVstudy,
  uploadCVBasicInfo,
  uploadCVwork,
  uploadCVskills,
  uploadCVlan,
  changeCVbg,
} from "../store/action";
import { Typography } from "@mui/material";
export default function CurrentCV() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const data = useSelector((state) => state);
  const user = useSelector((state) => state.user.id);
  const collection = useSelector((state) => state.collection);
  const location = useLocation();
  const [tab, setTab] = useState("basic");
  function changeTab(value) {
    setTab(value);
  }
  function docName() {
    const index = location.pathname.lastIndexOf("/");
    const docName = location.pathname.substring(index + 1);
    return docName;
  }
  function checkCollection(cvName) {
    console.log(cvName);
    const result = Boolean(collection.find((el) => el == cvName));
    console.log(result);
    return result;
  }
  const cvName = docName();
  const upload = checkCollection(cvName);
  console.log(cvName);
  async function getData() {
    const docSnap = await getDoc(doc(db, user, cvName)).catch((err) =>
      console.log(err)
    );
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      const uploadData = docSnap.data();
      console.log(uploadData.cvSkills);
      dispatch({ type: uploadCVBasicInfo, payload: uploadData.cvBasicInfo });
      dispatch({
        type: addCVdescription,
        payload: uploadData.cvDescription,
      });
      dispatch({
        type: uploadCVstudy,
        payload: uploadData.cvStudy,
      });
      dispatch({
        type: uploadCVwork,
        payload: uploadData.cvWork,
      });
      dispatch({
        type: uploadCVskills,
        payload: uploadData.cvSkills,
      });
      dispatch({
        type: uploadCVlan,
        payload: uploadData.cvLan,
      });
      dispatch({
        type: changeCVbg,
        payload: uploadData.cvBg,
      });
      console.log("loading");
      // setLoading(false);
    } else {
      // doc.data() will be undefined in this case
      // setLoading(false);
      console.log("No such document!");
    }
  }
  useEffect(() => {
    getData();
  }, []);
  console.log(data);

  return (
    <Container>
      {upload ? (
        <>
          <CVTabs active={tab} setTab={changeTab} />
          {tab === "basic" ? (
            <CurrentCVBasic next={changeTab} id={cvName} />
          ) : (
            <></>
          )}
          {tab === "exp" ? (
            <CurrentCVExperience next={changeTab} id={cvName} />
          ) : (
            <></>
          )}
          {tab === "pdf" ? (
            <CurrentCVpdf id={cvName} next={changeTab} />
          ) : (
            <></>
          )}
        </>
      ) : (
        <Typography
          variant="h6"
          component="h2"
          sx={styles.error}
        >{`Document with name "${cvName}" does not exist`}</Typography>
      )}
    </Container>
  );
}
const styles = {
  error: {
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
    fontWeight: "bold",
    textAlign: "center",
  },
};
