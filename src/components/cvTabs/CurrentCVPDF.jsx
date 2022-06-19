import { useSelector } from "react-redux";
import { PDFDownloadLink, PDFViewer, StyleSheet } from "@react-pdf/renderer";
import PDFdoc from "../PDFdoc";
import CVcolor from "../CVcolor";
import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";
export default function CurrentCVpdf({ id }) {
  const data = useSelector((state) => state);
  const bg = useSelector((state) => state.cvBg);
  const { t } = useTranslation();
  const pdfStyles = StyleSheet.create({
    PDFViewer: {
      maxWidth: "590px",
      width: "calc(100% - 20px)",
      height: "calc(100% - 200px)",
      marginRight: "auto",
      marginLeft: "auto",
    },
  });
  return (
    <>
      <CVcolor urlId={id} />
      <PDFViewer style={pdfStyles.PDFViewer}>
        <PDFdoc data={data} bg={bg} />
      </PDFViewer>
      <PDFDownloadLink
        document={<PDFdoc data={data} bg={bg} />}
        fileName={`${id}.pdf`}
        style={{ textDecoration: "none", marginTop: "10px" }}
      >
        {({ blob, url, loading, error }) =>
          loading ? (
            "Loading document..."
          ) : (
            <Button variant="contained">{t("buttons.download")}</Button>
          )
        }
      </PDFDownloadLink>
    </>
  );
}
