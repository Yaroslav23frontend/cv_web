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
export default function CurrentCV() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.cvBasicInfo);
  const user = useSelector((state) => state.user.id);
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
  const cvName = docName();
  console.log(cvName);
  async function getData() {
    const docSnap = await getDoc(doc(db, user, cvName)).catch((err) =>
      console.log(err)
    );
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
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
  });
  return (
    <Container>
      <CVTabs active={tab} setTab={changeTab} />
      {tab === "basic" ? <CurrentCVBasic id={cvName} /> : <></>}
      {tab === "exp" ? <CurrentCVExperience id={cvName} /> : <></>}
      {tab === "pdf" ? <CurrentCVpdf id={cvName} /> : <></>}
    </Container>
  );
}
