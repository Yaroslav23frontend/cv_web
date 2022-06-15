import React, { useState, useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { useTranslation } from "react-i18next";
import AvatarEditor from "react-avatar-editor";
import Resizer from "react-image-file-resizer";
import Slider from "@mui/material/Slider";
export default function ModalAvatar({
  open,
  handleConfirm,
  massege,
  handleCancele,
  result = "",
}) {
  const { t } = useTranslation();
  const editor = useRef();
  const [avatar, setAvatar] = useState(sessionStorage.getItem("avatar") || "");
  const [tempImg, setTempImg] = useState("");
  const [properties, setProperties] = useState({
    image: "",
    allowZoomOut: false,
    position: { x: 0.5, y: 0.5 },
    scale: 1,
    rotate: 0,
    borderRadius: 50,
    preview: null,
    width: 200,
    height: 200,
  });
  const [edit, setEdit] = useState(false);
  const chooseFile = useRef();
  const handleNewImage = (e) => {
    e.preventDefault();

    setProperties({ ...properties, image: e.target.files[0] });
  };
  const handleScale = (e) => {
    const scale = parseFloat(e.target.value);
    setProperties({ ...properties, scale });
  };
  const handlePositionChange = (position) => {
    setProperties({ ...properties, position });
  };
  // async function resizeImg() {
  //   const img = await resizeFile(tempImg);
  //   setAvatar(img);
  // }

  const resizeFile = (file) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        200,
        200,
        "PNG",
        100,
        0,
        (uri) => {
          resolve(uri);
          setAvatar(uri);
          handleConfirm(uri);
        },
        "base64"
      );
    });
  function saveImage() {
    if (editor.current !== null && editor.current.props.image !== "") {
      const canvas = editor.current.getImage().toDataURL();
      fetch(canvas)
        .then((res) => res.blob())
        .then(async (blob) => {
          blob.name = `image.jpeg`;

          blob.lastModified = new Date();
          resizeFile(blob);
          const reader = new FileReader();
          reader.readAsDataURL(blob);
          reader.onloadend = function () {
            var base64data = reader.result;

            console.log(base64data);
          };
        });
    }
  }
  function onLoadFailure() {
    alert("Error");
    setAvatar("");
    chooseFile.current.value = "";
    setProperties({ ...properties, image: "" });
  }
  if (result !== "") {
    return (
      <div>
        <Modal
          open={open}
          aria-labelledby="parent-modal-title"
          aria-describedby="parent-modal-description"
        ></Modal>
      </div>
    );
  }
  return (
    <div>
      <Modal
        open={open}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={styles.box}>
          <p id="parent-modal-description">{massege}</p>
          <Box sx={styles.boxAvatar}>
            <AvatarEditor
              ref={editor}
              scale={parseFloat(properties.scale)}
              width={properties.width}
              height={properties.height}
              position={properties.position}
              onPositionChange={handlePositionChange}
              onLoadFailure={onLoadFailure}
              rotate={parseFloat(properties.rotate)}
              borderRadius={properties.width / (100 / properties.borderRadius)}
              image={properties.image}
              className="editor-canvas"
            />

            <Slider
              size="small"
              min={0.5}
              max={5}
              step={0.1}
              defaultValue={1}
              aria-label="scale"
              onChange={handleScale}
              valueLabelDisplay="auto"
            />
            <Button variant="contained" component="label">
              Choose Photo
              <input type="file" onChange={handleNewImage} hidden />
            </Button>
            <Box sx={styles.boxButtons}>
              <Button
                onClick={() => {
                  saveImage();
                  // handleConfirm(avatar);
                }}
              >
                Save
              </Button>
              <Button onClick={handleCancele}>Cancele</Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
const styles = {
  box: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 320,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
    textAlign: "center",
  },
  boxButtons: {
    display: "flex",
    justifyContent: "center",
    gap: 2,
  },
  boxEdit: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    width: "100%",
    gap: 2,
  },
  boxAvatar: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 1,
  },
};
