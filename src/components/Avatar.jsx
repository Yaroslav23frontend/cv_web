import React, { useEffect, useState, useRef } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import AvatarEditor from "react-avatar-editor";
import Resizer from "react-image-file-resizer";
export default function CurrentCVBasic({ match }) {
  const editor = useRef();
  const [avatar, setAvatar] = useState(sessionStorage.getItem("avatar") || "");
  const [tempImg, setTempImg] = useState("");
  const [properties, setProperties] = useState({
    image: "",
    allowZoomOut: false,
    position: { x: 0.5, y: 0.5 },
    scale: 1,
    rotate: 0,
    borderRadius: 0,
    preview: null,
    width: 200,
    height: 200,
  });
  const [edit, setEdit] = useState(false);
  const chooseFile = useRef();
  const handleNewImage = (e) => {
    e.preventDefault();
    if (e.target.files[0].size > 2000000) {
      alert("Max image size 2MB");
      e.target.value = "";
    }
    setProperties({ ...properties, image: e.target.files[0] });
  };
  const handleScale = (e) => {
    const scale = parseFloat(e.target.value);
    setProperties({ ...properties, scale });
  };
  const handlePositionChange = (position) => {
    setProperties({ ...properties, position });
  };
  const delAvatar = (e) => {
    e.preventDefault();
    setProperties({ ...properties, image: "" });
    setAvatar("");
    sessionStorage.removeItem("avatar");
  };
  async function resizeImg() {
    const img = await resizeFile(tempImg);
    setAvatar(img);
  }
  useEffect(() => {
    if (tempImg !== "") {
      resizeImg();
    }
  }, [tempImg]);

  const resizeFile = (file) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        200,
        200,
        "JPEG",
        100,
        0,
        (uri) => {
          resolve(uri);
        },
        "base64"
      );
    });
  function onLoadFailure() {
    alert("Error");
    setAvatar("");
    chooseFile.current.value = "";
    setProperties({ ...properties, image: "" });
  }
  return (
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
      <Button variant="contained" component="label">
        Upload Photo
        <input type="file" onChange={handleNewImage} hidden />
      </Button>
    </Box>
  );
}
const styles = {
  boxAvatar: {
    display: "flex",
    flexDirection: "column",
    gap: 1,
  },
};
