import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSeeker } from "../API/actions/seekerActions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LogoutConfirmationModal from "../Components/LogoutConfirmationModal";
import { RESET, RESET_SEEKER } from "../Utils/Constants";

function Profile({ navigation }) {
  const seeker = useSelector((state) => state.seeker.seeker);

  const error = useSelector((state) => state.error.seekerError);
  const success = useSelector((state) => state.success.seekerSuccess);
  const check = useSelector((state) => state.seeker.check);
  const checkCV = useSelector((state) => state.cv.check);
  const dispatch = useDispatch();
  const [ID, setID] = useState();

  const [isloading, setIsLoading] = useState(true);
  useEffect(() => {
    if (success || error) {
      setIsLoading(false);
      // dispatch({ type: RESET })
    }
  }, [success, error]);

  const [loginVal, setLoginVal] = useState();

  useEffect(() => {
    GetData();
  }, []);
  const GetData = async () => {
    const value = await AsyncStorage.getItem("ID");
    setID(value);
  };

  useEffect(() => {
    console.log("START");
    if (ID) {
      console.log("ID");
      if (isloading) {
        console.log("LOADING");
        if (!seeker) {
          console.log("SEEKER");
          dispatch(fetchSeeker(ID));
        } else if (seeker.id.toString() !== ID) {
          console.log("SEEKER!");
          dispatch(fetchSeeker(ID));
        } else {
          console.log("DONE");
          setIsLoading(false);
        }
      }
    }
  }, [dispatch, navigation, seeker, ID]);

  useEffect(() => {
    console.log(seeker);
  }, [seeker]);

  const [visible, setVisible] = useState(false);
  const toggleVisibility = () => setVisible(!visible);

  const Logout = async () => {
    await AsyncStorage.setItem("LOGIN", "false");
    await AsyncStorage.setItem("ID", "");
    await AsyncStorage.setItem("NAME", "");
    await AsyncStorage.setItem("EMAIL", "");
    await AsyncStorage.setItem("USERNAME", "");
    setLoginVal("false");
    toggleVisibility();
    toggleLoadingVisibility();
    navigation.popToTop();
    navigation.replace("Home");
  };
  // log out===================
  const [loadingVisible, setLoadingVisible] = useState(false);
  const toggleLoadingVisibility = () => setLoadingVisible(!loadingVisible);

  return (
    <View style={{ flex: 1 }}>
      <LogoutConfirmationModal
        toggleLoadingVisibility={toggleLoadingVisibility}
        visible={loadingVisible}
        Logout={Logout}
      />
      {isloading ? (
        <View style={{ marginTop: 400 }}>
          <ActivityIndicator size={60} color="#13A3E1" />
        </View>
      ) : (
        <>
          <ScrollView style={{ flex: 1, backgroundColor: "#F1F1F1" }}>
            <View
              style={{
                flexDirection: "column",
                width: "100%",
                height: 240,
                backgroundColor: "#13A3E1",
              }}>
              <View style={{ flexDirection: "row", height: 130 }}>
                <Pressable onPress={() => navigation.goBack()}>
                  <Image
                    style={{
                      width: 22,
                      height: 20,
                      marginTop: 70,
                      marginLeft: 30,
                      marginBottom: 250,
                      tintColor: "#fff",
                    }}
                    source={require("../assets/back_arrow.png")}
                    alt={"Okay"}
                  />
                </Pressable>
                <View style={{ width: "100%", marginTop: 0, paddingEnd: 90 }}>
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
                </View>
              </View>
              <Text
                ellipsizeMode={"tail"}
                style={{
                  color: "#fff",
                  fontSize: 30,
                  fontFamily: "poppins_bold",
                  textAlign: "center",
                  marginTop: 10,
                  marginHorizontal: 20,
                  paddingBottom: 20,
                }}>
                {seeker?.name}
              </Text>
            </View>
            <View
              style={{
                backgroundColor: "#fff",
                paddingVertical: 20,
                marginHorizontal: 10,
                marginRight: 30,
                marginLeft: 30,
                borderRadius: 30,
                marginTop: -20,
              }}>
              <Text
                style={{
                  color: "#000",
                  fontSize: 16,
                  fontFamily: "poppins_medium",
                  width: "100%",
                  textAlign: "center",
                }}>
                Phone : {seeker?.phone}
              </Text>
              <Text
                style={{
                  color: "#000",
                  fontSize: 15,
                  fontFamily: "poppins_semibold",
                  width: "100%",
                  textAlign: "center",
                }}>
                Email : {seeker?.email}
              </Text>
              <Text
                style={{
                  color: "#000",
                  fontSize: 14,
                  fontFamily: "poppins_light",
                  width: "100%",
                  textAlign: "center",
                }}>
                Address : {seeker?.address}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                backgroundColor: "#13A3E1",
                paddingVertical: 20,
                marginHorizontal: 10,
                marginRight: 30,
                marginLeft: 30,
                borderRadius: 30,
                marginTop: 20,
              }}>
              <Pressable
                onPress={() => navigation.push("AppliedSaved", { screen: 0 })}
                style={{ flex: 1, paddingVertical: 20 }}>
                <Text
                  style={{
                    color: "#fff",
                    fontSize: 14,
                    fontFamily: "poppins_medium",
                    width: "100%",
                    textAlign: "center",
                  }}>
                  Saved Jobs
                </Text>
                <Text
                  style={{
                    color: "#fff",
                    fontSize: 35,
                    fontFamily: "poppins_semibold",
                    width: "100%",
                    textAlign: "center",
                    marginTop: 20,
                  }}>
                  {seeker?.saved}
                </Text>
              </Pressable>
              <View style={{ backgroundColor: "#fff", width: 3 }} />
              <Pressable
                onPress={() => navigation.push("AppliedSaved", { screen: 1 })}
                style={{ flex: 1, paddingVertical: 20 }}>
                <Text
                  style={{
                    color: "#fff",
                    fontSize: 14,
                    fontFamily: "poppins_medium",
                    width: "100%",
                    textAlign: "center",
                  }}>
                  Applied Jobs
                </Text>
                <Text
                  style={{
                    color: "#fff",
                    fontSize: 35,
                    fontFamily: "poppins_semibold",
                    width: "100%",
                    textAlign: "center",
                    marginTop: 20,
                  }}>
                  {seeker?.applied}
                </Text>
              </Pressable>
            </View>
            <View
              style={{
                flexDirection: "column",
                backgroundColor: "#F0A51E",
                paddingHorizontal: 20,
                marginHorizontal: 10,
                marginRight: 30,
                marginLeft: 30,
                borderRadius: 30,
                marginTop: 20,
              }}>
              <Pressable
                onPress={() => {
                  if (check === "complete") {
                    navigation.push("AccountInfo", { role: seeker?.role });
                  } else {
                    navigation.push("VerificationProfile");
                  }
                }}>
                <View style={{ flex: 1, paddingVertical: 10, marginTop: 10 }}>
                  <Text
                    style={{
                      color: "#000",
                      fontSize: 15,
                      fontFamily: "poppins_semibold",
                      width: "100%",
                      textAlign: "center",
                    }}>
                    Manage Your Resume
                  </Text>
                </View>
              </Pressable>
              <View style={{ backgroundColor: "#000", height: 3 }} />
              <Pressable onPress={() => navigation.push("History")}>
                <View
                  style={{ flex: 1, paddingVertical: 10, marginBottom: 10 }}>
                  <Text
                    style={{
                      color: "#000",
                      fontSize: 15,
                      fontFamily: "poppins_semibold",
                      width: "100%",
                      textAlign: "center",
                    }}>
                    History
                  </Text>
                </View>
              </Pressable>
            </View>
            <View
              style={{
                flexDirection: "column",
                backgroundColor: "#fff",
                paddingHorizontal: 30,
                marginHorizontal: 10,
                marginRight: 30,
                marginLeft: 30,
                borderRadius: 30,
                marginTop: 20,
                marginBottom: 30,
              }}>
              <Pressable onPress={() => navigation.push("PersonalInfo")}>
                <View
                  style={{
                    flexDirection: "row",
                    flex: 1,
                    marginTop: 20,
                    alignItems: "center",
                  }}>
                  <Image
                    style={{ width: 20, height: 20 }}
                    source={require("../assets/manageaccounticon.png")}
                  />
                  <Text
                    style={{
                      color: "#000",
                      fontSize: 16,
                      fontFamily: "poppins_regular",
                      width: "100%",
                      textAlign: "left",
                      marginLeft: 20,
                    }}>
                    Manage Your Account
                  </Text>
                </View>
              </Pressable>

              <Pressable onPress={async () => toggleLoadingVisibility()}>
                <View
                  style={{
                    flexDirection: "row",
                    flex: 1,
                    marginBottom: 20,
                    alignItems: "center",
                    marginTop: 5,
                  }}>
                  <Image
                    style={{ width: 20, height: 20 }}
                    source={require("../assets/logouticon.png")}
                  />
                  <Text
                    style={{
                      color: "#000",
                      fontSize: 16,
                      fontFamily: "poppins_regular",
                      width: "100%",
                      textAlign: "left",
                      marginLeft: 20,
                    }}>
                    Log out
                  </Text>
                </View>
              </Pressable>
            </View>
          </ScrollView>
        </>
      )}
    </View>
  );
}

export default Profile;
