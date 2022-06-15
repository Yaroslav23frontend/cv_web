import React, { useEffect, useState } from "react";
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
import parse from "html-react-parser";
export default function PDFdoc({ cvColor, cvBgColor, colors, data }) {
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
  //   const data = cvData || store.getState();

  const avatar = [basicInfo.photo];
  const linkedIn = [basicInfo.linkedIn];
  const skype = [basicInfo.skype];
  //   const study = [data.reducerStudy];
  //   const work = [data.reducerWork];
  const city = [basicInfo.city];
  const address = [basicInfo.address];
  const postal = [basicInfo.zip];
  //   const description = [data.reducerDescription];
  function descriptionFunction(data, index) {
    let tempLen = data.length - data.substring(index, data.length).length;
    let startIndex =
      tempLen + data.substring(index, data.length).indexOf("https" || "http");
    console.log(startIndex);
    let tempIndex = 0;
    const links = [];
    while (startIndex < data.length && tempIndex !== -1) {
      for (let i = startIndex; i < data.length; i++) {
        if (data[i] === `"`) {
          const link = data.slice(startIndex, i);
          links.push(link);
          console.log(link);
          index = i;
          tempIndex = data.substring(i, data.length).indexOf("https" || "http");
          tempLen = data.length - data.substring(i, data.length).length;

          startIndex = tempLen + tempIndex;
          console.log(startIndex);
          break;
        }
      }
    }
    links.map((el) => {
      data = data.replace(`"${el}"`, `<Link src = "${el}">${el}</Link>`);
    });
    data = parse(data, {
      replace: (domNode) => {
        if (domNode.attribs && domNode.attribs.class === "remove") {
          return <></>;
        }
      },
    });
    console.log(data);
    return data;
  }

  const { t } = useTranslation();

  const CV = (
    <Document>
      <Page size="A4" style={styles.page} wrap>
        <View
          id={cvColor}
          style={{
            width: "30%",
            height: "100vh",
            backgroundColor: "blue",
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

          <Text style={styles.h2}>{t("cv.personal")}</Text>
          <View style={styles.personalInfoMargin}>
            <Text style={[styles.personalP, styles.span]}>
              {t("personal.name")}
            </Text>
            <Text style={styles.personalP}>{basicInfo.name}</Text>
          </View>
          <View style={styles.personalInfoMargin}>
            <Text style={[styles.personalP, styles.span]}>
              {t("personal.lastName")}
            </Text>
            <Text style={styles.personalP}>{basicInfo.lastName}</Text>
          </View>
          <View style={styles.personalInfoMargin}>
            <Text style={[styles.personalP, styles.span]}>Email</Text>
            <Text style={[styles.personalP]}>{basicInfo.email}</Text>
          </View>
          <View style={styles.personalInfoMargin}>
            <Text style={[styles.personalP, styles.span]}>Phone</Text>
            <Text style={[styles.personalP]}>{basicInfo.tel}</Text>
          </View>
          {city.map((el) => {
            if (el !== "") {
              return (
                <div key={`city-${Date.now()}`}>
                  <View style={styles.personalInfoMargin}>
                    <Text style={[styles.personalP, styles.span]}>
                      {t("personal.city")}
                    </Text>
                    <Text style={[styles.personalP]}>{basicInfo.city}</Text>
                  </View>
                </div>
              );
            }
          })}
          {address.map((el) => {
            if (el !== "") {
              return (
                <div key={`address-${Date.now()}`}>
                  <View style={styles.personalInfoMargin}>
                    <Text style={[styles.personalP, styles.span]}>
                      {t("personal.address")}
                    </Text>
                    <Text style={[styles.personalP]}>{basicInfo.address}</Text>
                  </View>
                </div>
              );
            }
          })}

          {postal.map((el) => {
            if (el !== "") {
              return (
                <div key={`postal-${Date.now()}`}>
                  <View style={styles.personalInfoMargin}>
                    <Text style={[styles.personalP, styles.span]}>
                      {t("personal.zip")}
                    </Text>
                    <Text style={[styles.personalP]}>{basicInfo.zip}</Text>
                  </View>
                </div>
              );
            }
          })}

          {/* <View style={styles.personalInfoMargin}>
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
            <Text style={styles.h2}>{t("cv.skills")}</Text>
            {data.reducerSkills.map((el) => {
              return (
                <View>
                  <Text style={styles.personalP}>{el.skills}</Text>
                </View>
              );
            })}

            {data.reducerLanguages.map((el, index) => {
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
          </View> */}

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
                      viewBox="0 0 448 512"
                    >
                      <Path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z" />
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

          {/* {description.map((el) => {
            el = descriptionFunction(el, 0);
            return <Text style={styles.p}>{el}</Text>;
          })}

          {study.map((el, id) => {
            if (Object.keys(el).length !== 0) {
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

          {data.reducerStudy.map((el) => {
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

          {work.map((el, id) => {
            if (Object.keys(el).length !== 0) {
              return (
                <View key={`work-${Date.now()}`}>
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
          {data.reducerWork.map((el) => {
            return (
              <View key={`work-item-${Date.now()}`}>
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
          ></View> */}
        </View>
        <hr />
      </Page>
    </Document>
  );

  return <>{CV}</>;
}
