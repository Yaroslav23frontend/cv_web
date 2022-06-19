import React, { useEffect, useMemo, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import { db } from "../firebase/firebase";
import { deleteDoc, doc, setDoc, getDoc } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { addCVs, deleteCV, deleteItem } from "../store/action";
import { completedItem } from "../store/action";
import { useNavigate } from "react-router-dom";
import CustomModal from "./Modal";
import { useTranslation } from "react-i18next";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useActive } from "../context/ActiveContext";
export default function CV({ data }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.id);
  const collection = useSelector((state) => state.collection);
  const items = useSelector((state) => state.items);
  const [modal, setModal] = useState(false);
  const [delModal, setDelModal] = useState(false);
  const id = useSelector((state) => state.user.id);
  async function delItem() {
    dispatch({ type: deleteCV, payload: data });
    await deleteDoc(doc(db, user, data));
    await setDoc(doc(db, `${user}-collection`, `collection`), {
      collection: [...collection.filter((el) => el !== data)],
    });
  }
  function closeModal() {
    setModal(false);
  }
  function closeDelModal() {
    setDelModal(false);
  }
  async function renameCV(docName) {
    const result = [...collection.filter((el) => el !== data), docName];
    dispatch({ type: addCVs, payload: result });
    const docSnap = await getDoc(doc(db, `${id}`, data));
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      await setDoc(doc(db, `${user}`, docName), docSnap.data());
    } else {
      console.log("No such document!");
    }
    await setDoc(doc(db, `${user}-collection`, "collection"), {
      collection: result,
    });
  }
  const styles = {
    box: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      width: "calc(100% - 20px)",
      gap: "10px",
      textAlign: "center",
      borderTop: "1px solid #eee",
      borderBottom: "1px solid #eee",
    },
    text: {
      textDecoration: data.completed ? "line-through" : "none",
    },
    checkboxBox: {
      display: "flex",
      gap: "10px",
      alignItems: "center",
    },
  };
  const { setActive } = useActive();
  return (
    <>
      <Box sx={styles.box}>
        <Button
          onClick={() => {
            setActive(data);
            sessionStorage.setItem("cv", data);
            navigate(`../cv/${data}`);
          }}
          color="inherit"
        >
          {data}
        </Button>
        <Box>
          <Button onClick={() => setModal(true)}>
            <EditIcon />
          </Button>
          <Button onClick={() => setDelModal(true)}>
            <DeleteIcon />
          </Button>
        </Box>
      </Box>
      <CustomModal
        handleCancele={closeModal}
        handleConfirm={renameCV}
        open={modal}
        boardName={data}
        editBoardName={true}
      />
      <CustomModal
        handleCancele={closeDelModal}
        handleConfirm={delItem}
        open={delModal}
        boardName={data}
        massege={t("messagesModal.deleteBoard")}
      />
    </>
  );
}
