import {
  Image,
  TextInput,
  Text,
  Pressable,
  FlatList,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { JobByID } from "../API/actions/jobActions";
import moment from "moment";
import { BOOKMARK_JOB, RESET } from "../Utils/Constants";
import { bookmarkJob, removeBookmark } from "../API";
import AsyncStorage from "@react-native-async-storage/async-storage";
import WebView from "react-native-webview";
import { fetchSeeker } from "../API/actions/seekerActions";
import LoginRequireModal from "../Components/LoginRequireModal";
import ManageCoverLetter from "./ManageCoverLetter";
import Ripple from "react-native-material-ripple";
import WebsiteModal from "../Components/WebsiteModal";
import { BannerAd, BannerAdSize } from "react-native-google-mobile-ads";

const JobDetails = ({ route, navigation }) => {
  console.log("Inside JobDetails!!!");

  const { ID } = route.params;

  const job = useSelector((state) => state.job.job);
  const error = useSelector((state) => state.error.jobError);
  const nodata = useSelector((state) => state.nodata.jobNoData);
  const success = useSelector((state) => state.success.jobSuccess);
  const dispatch = useDispatch();

  const [USERID, setUSERID] = useState();
  const [applied, setApplied] = useState(0);
  const [bookmark, setBookmark] = useState(0);
  const [webHeight, setWebHeight] = useState(0);
  const [login, setLogin] = useState();
  const [plan, setPlan] = useState();
  const [loginVal, setLoginVal] = useState();

  const seeker = useSelector((state) => state.seeker.seeker);

  useEffect(() => {
    console.log(job);
  }, [job]);

  const [isloading, setIsLoading] = useState(true);
  useEffect(() => {
    if (success || error || nodata) {
      setIsLoading(false);
    }
  }, [success, error, nodata]);

  const onWebHeight = (e) => {
    setWebHeight(Number(e.nativeEvent.data));
  };

  useEffect(() => {
    GetData();
  }, []);
  const GetData = async () => {
    const value = await AsyncStorage.getItem("ID");
    const loginvalue = await AsyncStorage.getItem("LOGIN");
    setUSERID(value);
    setLoginVal(loginvalue);
  };

  useEffect(() => {
    if (loginVal === "true") {
      setLogin(true);
    } else {
      setLogin(false);
    }
  }, [loginVal]);

  useEffect(() => {
    if (USERID) {
      if (!seeker) {
        dispatch(fetchSeeker(USERID));
      } else if (seeker.id.toString() !== USERID) {
        dispatch(fetchSeeker(USERID));
      }
    }
  }, [dispatch, seeker, USERID, navigation]);

  useEffect(() => {
    // console.log(seeker)
    if (seeker?.plan === 0) {
      setPlan(false);
    } else {
      setPlan(true);
    }
  }, [seeker]);

  useEffect(() => {
    if (USERID) {
      dispatch(JobByID(USERID, ID));
    }
  }, [dispatch, USERID]);

  useEffect(() => {
    if (success) {
      setIsLoading(false);
      dispatch({ type: RESET });
    }
  }, [success]);

  useEffect(() => {
    if (job) {
      setApplied(job.applied);
      setBookmark(job.bookmark);
    }
  }, [job]);

  const ApplyJob = (intro, body) => {
    const date = moment().format("YYYY-MM-DD");
    navigation.push("CoverLetter", {
      job: job.id,
      role: job?.role,
      intro: intro,
      body: body,
    });
  };

  const BookmarkJob = () => {
    bookmarkJob(job.id, USERID).then((res) => {
      const {
        data: { data },
      } = res;
      if (data.affectedRows === 1) {
        setBookmark(data.insertId);
        dispatch({
          type: BOOKMARK_JOB,
          payload: { job: job.id, bookmark: data.insertId },
        });
      }
    });
  };

  const RemoveBookmark = () => {
    removeBookmark(bookmark).then((res) => {
      const {
        data: { data },
      } = res;
      if (data.affectedRows === 1) {
        setBookmark(0);
        dispatch({ type: BOOKMARK_JOB, payload: { job: job.id, bookmark: 0 } });
      }
    });
  };

  // Apply Modal ============
  const [applyVisible, setApplyVisible] = useState(false);
  const toggleApplyVisibility = () => setApplyVisible(!applyVisible);

  const [loginVisible, setLoginVisible] = useState(false);
  const toggleLoginVisible = () => setLoginVisible(!loginVisible);

  const [webVisible, setWebVisible] = useState(false);
  const toggWebVisibility = () => setWebVisible(!webVisible);

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView style={{ backgroundColor: "#F1F1F1" }}>
        <LoginRequireModal
          visible={loginVisible}
          toggleRequireVisible={toggleLoginVisible}
          navigation={navigation}
        />
        <ManageCoverLetter
          visible={applyVisible}
          toggleVisible={toggleApplyVisibility}
          apply={ApplyJob}
        />
        <WebsiteModal
          visible={webVisible}
          toggleRequireVisible={toggWebVisibility}
          url={job?.link}
        />

        <View style={{ backgroundColor: "#EAEAEA" }}>
          <View style={{ flexDirection: "row", height: 90 }}>
            <Pressable
              onPress={() => navigation.goBack()}
              style={{ padiingRight: 5 }}>
              <Image
                style={{
                  width: 22,
                  height: 20,
                  marginTop: 70,
                  marginLeft: 30,
                  tintColor: "#000",
                }}
                source={require("../assets/back_arrow.png")}
                alt={""}
              />
            </Pressable>
            <View style={{ width: "100%", marginTop: 0, paddingEnd: 90 }}>
              <Pressable onPress={() => null}>
                <Image
                  style={{
                    width: 150,
                    height: 40,
                    marginTop: 60,
                    alignSelf: "center",
                  }}
                  source={require("../assets/logo.png")}
                  alt={"Okay"}
                />
              </Pressable>
            </View>
          </View>
          {isloading ? (
            <View style={{ marginTop: 300 }}>
              <ActivityIndicator size={60} color="#13A3E1" />
            </View>
          ) : (
            <>
              <View>
                <Text
                  style={{
                    fontSize: 18,
                    fontFamily: "poppins_bold",
                    width: "100%",
                    paddingHorizontal: 30,
                    textAlign: "center",
                    marginTop: 30,
                    padding: 0,
                  }}>
                  {job?.title}
                </Text>
              </View>
              <SafeAreaView style={{ marginTop: 30 }}>
                <View
                  style={{
                    marginBottom: 8,
                    borderColor: "#4C4C4C",
                    borderTopLeftRadius: 50,
                    borderTopRightRadius: 50,
                    paddingVertical: 15,
                    display: "flex",
                    flexDirection: "column",
                    backgroundColor: "#fff",
                  }}>
                  <View style={{ flexDirection: "row", flex: 1 }}>
                    <Text
                      style={{
                        paddingHorizontal: 10,
                        paddingTop: 4,
                        fontSize: 14,
                        fontFamily: "poppins_bold",
                        borderRadius: 5,
                        marginLeft: 25,
                      }}>
                      {job?.company === 0 ? job?.company_n : job?.company_name}
                    </Text>
                    <Text
                      style={{
                        marginLeft: "auto",
                        textAlign: "right",
                        fontFamily: "poppins_medium",
                        fontSize: 13,
                        marginRight: 25,
                      }}>
                      {moment(job?.created).format("MMM Do YY")}
                    </Text>
                  </View>
                  <View
                    style={{
                      marginTop: 19,
                      backgroundColor: "#00A224",
                      marginLeft: "auto",
                      marginRight: "auto",
                      paddingTop: 5,
                      paddingBottom: 2,
                      paddingHorizontal: 20,
                      borderRadius: 20,
                    }}>
                    <Text
                      style={{
                        textAlign: "center",
                        color: "white",
                        fontSize: 15,
                        fontFamily: "poppins_medium",
                      }}>
                      Salary {job?.salary}
                    </Text>
                  </View>
                  <View style={{ flex: 1, flexDirection: "row" }}>
                    <View style={{ flex: 1 }}>
                      <Text
                        numberOfLines={1}
                        style={{
                          fontFamily: "poppins_bold",
                          marginTop: 15,
                          fontSize: 17,
                          textAlign: "center",
                        }}>
                        {job?.category_name}
                      </Text>
                      <Text
                        style={{
                          fontFamily: "poppins_medium",
                          marginTop: 0,
                          fontSize: 13,
                          textAlign: "center",
                        }}>
                        {job?.city_name}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      marginTop: 20,
                      backgroundColor: "white",
                      gap: 10,
                    }}>
                    <View
                      style={{
                        flex: 0.4,
                        backgroundColor: "rgba(19, 163, 225, 0.20)",
                        paddingHorizontal: 30,
                        width: "50%",
                        paddingVertical: 25,
                        borderTopRightRadius: 40,
                        borderBottomRightRadius: 40,
                      }}>
                      <View style={{ flexDirection: "column" }}>
                        <View
                          style={{
                            backgroundColor: "#13a3e1",
                            paddingHorizontal: 6,
                            paddingVertical: 8,
                            borderRadius: 14,
                          }}>
                          <Text
                            style={{
                              textAlign: "center",
                              fontFamily: "poppins_medium",
                              fontSize: 14,
                              color: "white",
                            }}>
                            {job?.type}
                          </Text>
                        </View>
                        <Text
                          style={{
                            fontSize: 16,
                            fontFamily: "poppins_medium",
                            textAlign: "center",
                          }}>
                          {job?.workdays}
                        </Text>
                        <Text
                          style={{
                            fontSize: 13,
                            fontFamily: "poppins_medium",
                            textAlign: "center",
                          }}>
                          {job?.worktime}
                        </Text>
                      </View>
                    </View>
                    <View style={{ flex: 0.6 }}>
                      <View
                        style={{
                          flexDirection: "column",
                          paddingVertical: 25,
                        }}>
                        <Text
                          style={{
                            textAlign: "center",
                            fontSize: 15,
                            fontFamily: "poppins_medium",
                          }}>
                          {job?.experience}
                        </Text>
                        <Text
                          style={{
                            textAlign: "center",
                            fontSize: 20,
                            fontFamily: "poppins_medium",
                          }}>
                          {job?.qualification}
                        </Text>
                        <Text
                          style={{
                            textAlign: "center",
                            fontSize: 12,
                            fontFamily: "poppins_medium",
                          }}>
                          {job?.skills}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <Text
                    style={{
                      fontSize: 18,
                      fontFamily: "poppins_medium",
                      marginLeft: 15,
                      marginTop: 10,
                    }}>
                    Description:{" "}
                  </Text>

                  <WebView
                    source={{ html: job?.description }}
                    style={{
                      height: webHeight,
                      marginHorizontal: 25,
                      fontFamily: "poppins_medium",
                    }}
                    scalesPageToFit={false}
                    onMessage={(e) => onWebHeight(e)}
                    injectedJavaScript="window.ReactNativeWebView.postMessage(document.body.scrollHeight)"
                  />
                </View>
              </SafeAreaView>
            </>
          )}
        </View>
      </ScrollView>
      {!isloading ? (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            gap: 20,
            fontFamily: "poppins_medium",
            paddingVertical: 10,
            backgroundColor: "#e8e8e8",
          }}>
          {bookmark === 0 ? (
            <Ripple
              rippleColor="white"
              onPress={() => {
                if (login) {
                  BookmarkJob();
                } else {
                  toggleLoginVisible();
                }
              }}
              style={{
                justifyContent: "center",
                height: 50,
                backgroundColor: "#143D59",
                width: 150,
                paddingVertical: 10,
                borderRadius: 25,
                paddingTop: 13,
              }}>
              <Text
                style={{
                  color: "white",
                  textAlign: "center",
                  fontSize: 15,
                  fontFamily: "poppins_bold",
                }}>
                SAVE
              </Text>
            </Ripple>
          ) : (
            <Pressable
              onPress={() => RemoveBookmark()}
              style={{
                justifyContent: "center",
                height: 50,
                backgroundColor: "#143D59",
                width: 150,
                paddingVertical: 10,
                borderRadius: 25,
                paddingTop: 13,
              }}>
              <Text
                style={{
                  color: "white",
                  textAlign: "center",
                  fontSize: 15,
                  fontFamily: "poppins_bold",
                }}>
                SAVED
              </Text>
            </Pressable>
          )}
          {applied === 0 ? (
            <Pressable
              onPress={() => {
                if (login) {
                  if (plan) {
                    if (job?.link) {
                      toggWebVisibility();
                    } else {
                      toggleApplyVisibility();
                    }
                  } else {
                    navigation.push("VerificationProfile");
                  }
                } else {
                  toggleLoginVisible();
                }
              }}
              style={{
                justifyContent: "center",
                height: 50,
                backgroundColor: "#13A3E1",
                width: 150,
                paddingVertical: 10,
                borderRadius: 25,
                paddingTop: 13,
              }}>
              <Text
                style={{
                  fontFamily: "poppins_bold",
                  textAlign: "center",
                  color: "white",
                  fontSize: 15,
                }}>
                APPLY NOW
              </Text>
            </Pressable>
          ) : (
            <Pressable
              style={{
                justifyContent: "center",
                height: 50,
                backgroundColor: "#13A3E1",
                width: 150,
                paddingVertical: 10,
                borderRadius: 25,
                paddingTop: 13,
              }}>
              <Text
                style={{
                  fontFamily: "poppins_bold",
                  textAlign: "center",
                  color: "white",
                  fontSize: 15,
                }}>
                APPLIED
              </Text>
            </Pressable>
          )}
        </View>
      ) : (
        ""
      )}
      <BannerAd
        unitId="ca-app-pub-3940256099942544/6300978111"
        size={BannerAdSize.FULL_BANNER}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }}
      />
    </View>
  );
};

export default JobDetails;
