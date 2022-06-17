import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Link,
  Svg,
  Path,
  Font,
  Line,
  Image,
} from "@react-pdf/renderer";
import LiberationSansRegular from "../styles/fonts/LiberationSans-Regular.ttf";
import LiberationSansBold from "../styles/fonts/LiberationSans-Bold.ttf";
import { useTranslation } from "react-i18next";

export default function PDFdoc({ data, bg }) {
  Font.register({
    family: "Liberation Sans",
    fonts: [
      { src: LiberationSansRegular },
      { src: LiberationSansBold, fontWeight: "bold", fontStyle: "normal" },
    ],
    fontStyle: "normal",
  });
  const basicInfo = data.cvBasicInfo;
  const styles = StyleSheet.create({
    PDFViewer: {
      maxWidth: "595px",
      width: "100vw",
      minHeight: "840px",
    },
    page: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      gap: "10px",
      height: "auto",
    },
    section: {
      margin: "10px",
      padding: "10px",
      display: "flex",
      color: "green",
    },
    h1: {
      fontFamily: "Liberation Sans",
      fontSize: "28px",
      fontWeight: "bold",
    },
    h2: {
      fontFamily: "Liberation Sans",
      fontWeight: "bold",
      fontSize: "15px",
      margin: "10px 0",
    },
    p: {
      fontFamily: "Liberation Sans",
      fontSize: "12px",
      textJustify: "inter-character",
      position: "relative",
      lineHeight: "1.55px",
    },
    personalP: {
      fontFamily: "Liberation Sans",
      fontSize: "10px",
      lineHeight: "1.5px",
    },
    bold: {
      fontSize: "10px",
    },
    personalInfoMargin: {
      margin: "2px 0",
    },
    marginMainPart: {
      margin: "20px 15px",
    },
    mainH2: {
      color: "red",
    },
    span: {
      fontWeight: "bold",
    },
  });

  const avatar = [basicInfo.photo];
  const linkedIn = [basicInfo.linkedIn];
  const skype = [basicInfo.skype];

  const city = [basicInfo.city];
  const address = [basicInfo.address];
  const postal = [basicInfo.zip];
  const description = [data.cvDescription];

  const { t } = useTranslation();

  const CV = (
    <Document>
      <Page size="A4" style={styles.page} wrap>
        <View
          style={{
            width: "30%",
            height: "100vh",
            backgroundColor: bg,
            color: "#fff",
            padding: "10px",
          }}
          fixed
          wrap
        >
          {avatar.map((el) => {
            if (el !== "") {
              return (
                <View>
                  <Image
                    style={{
                      width: 100,
                      height: 100,
                      borderRadius: "50%",
                    }}
                    src={basicInfo.photo}
                  />
                </View>
              );
            }
          })}
          {[data.cvBasicInfo].map((el) => {
            const check = Object.values(el).findIndex((el) => {
              console.log(el);
              return el.length > 0;
            });
            console.log(check);
            if (check !== -1) {
              return <Text style={styles.h2}>{t("cv.personal")}</Text>;
            }
          })}

          {[data.cvBasicInfo.name].map((el) => {
            if (el !== "") {
              return (
                <View style={styles.personalInfoMargin}>
                  <Text style={[styles.personalP, styles.span]}>
                    {t("personal.name")}
                  </Text>
                  <Text style={styles.personalP}>{basicInfo.name}</Text>
                </View>
              );
            }
          })}
          {[data.cvBasicInfo.lastName].map((el) => {
            if (el !== "") {
              return (
                <View style={styles.personalInfoMargin}>
                  <Text style={[styles.personalP, styles.span]}>
                    {t("personal.lastName")}
                  </Text>
                  <Text style={styles.personalP}>{basicInfo.lastName}</Text>
                </View>
              );
            }
          })}
          {[data.cvBasicInfo.email].map((el) => {
            console.log(el);
            if (el !== "") {
              return (
                <View style={styles.personalInfoMargin}>
                  <Text style={[styles.personalP, styles.span]}>Email</Text>
                  <Text style={[styles.personalP]}>{basicInfo.email}</Text>
                </View>
              );
            }
          })}
          {[data.cvBasicInfo.tel].map((el) => {
            if (el !== "") {
              return (
                <View style={styles.personalInfoMargin}>
                  <Text style={[styles.personalP, styles.span]}>Phone</Text>
                  <Text style={[styles.personalP]}>{data.cvBasicInfo.tel}</Text>
                </View>
              );
            }
          })}

          {[data.cvBasicInfo.city].map((el) => {
            if (el !== "") {
              return (
                <div key={`city-${Date.now()}`}>
                  <View style={styles.personalInfoMargin}>
                    <Text style={[styles.personalP, styles.span]}>
                      {t("personal.city")}
                    </Text>
                    <Text style={[styles.personalP]}>
                      {data.cvBasicInfo.city}
                    </Text>
                  </View>
                </div>
              );
            }
          })}
          {[data.cvBasicInfo.address].map((el) => {
            if (el !== "") {
              return (
                <div key={`address-${Date.now()}`}>
                  <View style={styles.personalInfoMargin}>
                    <Text style={[styles.personalP, styles.span]}>
                      {t("personal.address")}
                    </Text>
                    <Text style={[styles.personalP]}>
                      {data.cvBasicInfo.address}
                    </Text>
                  </View>
                </div>
              );
            }
          })}
          {[data.cvBasicInfo.zip].map((el) => {
            if (el !== "") {
              return (
                <div key={`postal-${Date.now()}`}>
                  <View style={styles.personalInfoMargin}>
                    <Text style={[styles.personalP, styles.span]}>
                      {t("personal.zip")}
                    </Text>
                    <Text style={[styles.personalP]}>
                      {data.cvBasicInfo.zip}
                    </Text>
                  </View>
                </div>
              );
            }
          })}

          <View style={styles.personalInfoMargin}>
            {[data.cvBasicInfo].map((el) => {
              const check = Object.values(el).indexOf((el) => el.length > 0);
              if (check !== -1) {
                return (
                  <Svg
                    style={{
                      margin: "20px 0",
                    }}
                    width="100%"
                    height={4}
                  >
                    <Line
                      x1="0"
                      y1="0"
                      x2="150"
                      y2="0"
                      strokeWidth={4}
                      stroke="rgb(255,255,255)"
                    />
                  </Svg>
                );
              }
            })}
            {[data.cvSkills].map((el) => {
              if (el.length >= 1) {
                return <Text style={styles.h2}>{t("cv.skills")}</Text>;
              }
            })}

            {data.cvSkills.map((el) => {
              return (
                <View>
                  <Text style={styles.personalP}>{el.skill}</Text>
                </View>
              );
            })}

            {data.cvLan.map((el, index) => {
              if (index === 0) {
                return (
                  <View>
                    <View>
                      <Svg
                        style={{
                          margin: "20px 0",
                        }}
                        width={150}
                        height={4}
                      >
                        <Line
                          x1="0"
                          y1="0"
                          x2="150"
                          y2="0"
                          strokeWidth={4}
                          stroke="rgb(255,255,255)"
                        />
                      </Svg>
                      <Text style={styles.h2}>{t("cv.lan")}</Text>
                    </View>
                    <Text style={[styles.personalP, styles.span]}>
                      {el.language}
                    </Text>
                    <Text style={styles.personalP}>{el.level}</Text>
                  </View>
                );
              } else {
                return (
                  <View>
                    <Text style={[styles.personalP, styles.span]}>
                      {el.language}
                    </Text>
                    <Text style={styles.personalP}>{el.level}</Text>
                  </View>
                );
              }
            })}
          </View>

          <View
            style={{
              display: "flex",
              gap: "10px",
              flexDirection: "row",
              position: "absolute",
              bottom: "10px",
              left: "10px",
              marginRight: "10px",
            }}
          >
            {skype.map((el) => {
              if (el !== "") {
                return (
                  <Link
                    key={`skype-${Date.now()}`}
                    src={`${basicInfo.skype}`}
                    style={{
                      marginRight: "5px",
                      marginLeft: "5px",
                    }}
                  >
                    <Svg
                      style={{
                        color: "#fff",
                        widht: "25px",
                        height: "25px",
                      }}
                      width="25"
                      height="25"
                      viewBox="0 0 512 512"
                    >
                      <Path
                        fill="#fff"
                        d="M424.7 299.8c2.9-14 4.7-28.9 4.7-43.8 0-113.5-91.9-205.3-205.3-205.3-14.9 0-29.7 1.7-43.8 4.7C161.3 40.7 137.7 32 112 32 50.2 32 0 82.2 0 144c0 25.7 8.7 49.3 23.3 68.2-2.9 14-4.7 28.9-4.7 43.8 0 113.5 91.9 205.3 205.3 205.3 14.9 0 29.7-1.7 43.8-4.7 19 14.6 42.6 23.3 68.2 23.3 61.8 0 112-50.2 112-112 .1-25.6-8.6-49.2-23.2-68.1zm-194.6 91.5c-65.6 0-120.5-29.2-120.5-65 0-16 9-30.6 29.5-30.6 31.2 0 34.1 44.9 88.1 44.9 25.7 0 42.3-11.4 42.3-26.3 0-18.7-16-21.6-42-28-62.5-15.4-117.8-22-117.8-87.2 0-59.2 58.6-81.1 109.1-81.1 55.1 0 110.8 21.9 110.8 55.4 0 16.9-11.4 31.8-30.3 31.8-28.3 0-29.2-33.5-75-33.5-25.7 0-42 7-42 22.5 0 19.8 20.8 21.8 69.1 33 41.4 9.3 90.7 26.8 90.7 77.6 0 59.1-57.1 86.5-112 86.5z"
                      />
                    </Svg>
                  </Link>
                );
              }
            })}
            {linkedIn.map((el) => {
              if (el !== "") {
                return (
                  <Link
                    key={`linkedIn-${Date.now()}`}
                    src={basicInfo.linkedIn}
                    style={{
                      marginRight: "5px",
                      marginLeft: "5px",
                    }}
                  >
                    <Svg
                      style={{
                        color: "#fff",
                        widht: "25px",
                        height: "25px",
                      }}
                      width="25"
                      height="25"
                      viewBox="0 0 512 512"
                    >
                      <Path
                        fill="#fff"
                        d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"
                      />
                    </Svg>
                  </Link>
                );
              }
            })}
          </View>
        </View>
        <View
          style={[
            {
              width: "70%",
              padding: "10px",
              position: "relative",
            },
            styles.marginMainPart,
          ]}
          wrap={true}
        >
          <View
            style={{
              height: "20px",
              width: "100%",
              backgroundColor: "#fff",
            }}
            fixed
          ></View>
          <Text style={styles.h1}>
            {`${basicInfo.name} ${basicInfo.lastName}`}
          </Text>
          <View
            style={{
              width: "100%",
              height: "20px",
              backgroundColor: "#fff",
              position: "relative",
            }}
          ></View>
          {description.map((el) => {
            // el = descriptionFunction(el, 0);
            return <Text style={styles.p}>{el}</Text>;
          })}
          {[data.cvStudy].map((el, id) => {
            if (el.length !== 0) {
              return (
                <View key={`study-${Date.now()}`}>
                  <Svg
                    style={{
                      margin: "20px 0",
                    }}
                    width="100%"
                    height={1}
                  >
                    <Line
                      x1="0"
                      y1="0"
                      x2="450"
                      y2="0"
                      strokeWidth={1}
                      stroke="grey"
                    />
                  </Svg>
                  <Text style={[styles.h2, styles.mainH2]}>
                    {t("cv.study")}
                  </Text>
                </View>
              );
            }
          })}
          {data.cvStudy.map((el) => {
            return (
              <View key={`study-item-${Date.now()}`}>
                <Text
                  style={[styles.p, styles.span]}
                >{`${el.institution}, ${el.location}`}</Text>
                <Text style={styles.p}> {el.study}</Text>
                <Text style={styles.p}>
                  {" "}
                  {`${el.startDate} - ${el.endDate}`}
                </Text>
                <Text style={styles.p}>
                  <View style={{ padding: "30px" }}>{el.description}</View>
                </Text>
              </View>
            );
          })}
          {[data.cvWork].map((el, id) => {
            if (el.length !== 0) {
              return (
                <View key={`work-${el.id}`}>
                  <Svg
                    style={{
                      margin: "20px 0",
                    }}
                    width="100%"
                    height={1}
                  >
                    <Line
                      x1="0"
                      y1="0"
                      x2="450"
                      y2="0"
                      strokeWidth={1}
                      stroke="grey"
                    />
                  </Svg>
                  <Text style={[styles.h2, styles.mainH2]}>{t("cv.exp")}</Text>
                </View>
              );
            }
          })}
          {data.cvWork.map((el) => {
            return (
              <View key={`work-item-${el.id}`}>
                <Text style={[styles.p, styles.span]}> {el.title}</Text>
                <Text style={styles.p}> {el.city}</Text>
                <Text style={styles.p}> {el.company}</Text>
                <Text style={styles.p}>Start date: {el.endDate}</Text>
                <Text style={styles.p}>{el.description}</Text>
              </View>
            );
          })}
          <View
            style={{
              height: "20px",
              width: "100%",
              backgroundColor: "#fff",
              position: "relative",
            }}
            fixed
          ></View>
        </View>
        <hr />
      </Page>
    </Document>
  );

  return <>{CV}</>;
}
