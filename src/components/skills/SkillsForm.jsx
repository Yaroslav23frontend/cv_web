import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { addCVskills } from "../../store/action";
const validationSchema = yup.object({
  skill: yup
    .string("Entre Skill")
    .max(100, "Max length 100 symbols")
    .required("Enter Skill"),
});

export default function SkillsForm({ func }) {
  const data = useSelector((state) => state.cvSkills);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      skill: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      dispatch({ type: addCVskills, payload: { ...values, id: 0 } });
      values.skill = "";
    },
  });
  return (
    <Box sx={styles.inputBox}>
      {data.length === 0 ? (
        <>
          <TextField
            fullWidth
            id="skill"
            name="skill"
            label="Skill"
            value={formik.values.skill}
            onChange={formik.handleChange}
            error={formik.touched.skill && Boolean(formik.errors.skill)}
            helperText={formik.touched.skill && formik.errors.skill}
          />

          <Button
            color="primary"
            variant="contained"
            onClick={formik.handleSubmit}
          >
            Save
          </Button>
        </>
      ) : (
        <Button>Add</Button>
      )}
    </Box>
  );
}
const styles = {
  inputBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "20px",
    height: "100%",
    width: "calc(100% - 100px)",
  },
};
