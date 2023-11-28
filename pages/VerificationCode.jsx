import {
  Button,
  Image,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
  StyleSheet,
} from "react-native";
import {
  CodeField,
  useBlurOnFulfill,
  useClearByFocusCell,
  Cursor,
} from "react-native-confirmation-code-field";
import { useEffect, useState } from "react";
import { firebase } from "@react-native-firebase/auth";
import {
  changePassword,
  changePasswordProvider,
  verifyCompany,
  verifySeeker,
} from "../API";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import Ripple from "react-native-material-ripple";

const styles = StyleSheet.create({
  root: { flex: 1, padding: 20 },
  title: { textAlign: "center", fontSize: 30 },
  codeFieldRoot: { marginTop: 20 },
  cell: {
    width: 40,
    height: 47,
    lineHeight: 38,
    fontSize: 24,
    borderWidth: 1,
    borderColor: "#00000030",
    borderRadius: 5,
    textAlign: "center",
    marginHorizontal: 5,
  },
  focusCell: {
    borderColor: "#000",
  },
});

const CELL_COUNT = 6;

function VerificationCode({ route, navigation }) {
  const { code } = route.params;
  const { phone } = route.params;
  const { type } = route.params;
  const { ID } = route.params;
  const { verify } = route.params;

  console.log(type);
  console.log("code: ", code);
  console.log("phone: ", phone);

  const [confirm, setConfirm] = useState();

  function onAuthStateChanged(user) {
    if (user) {
      console.log(user);
    }
  }

  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  async function signInWithPhoneNumber(phoneNumber) {
    const phoneNum = code + phoneNumber;
    console.log(phoneNum);
    const confirmation = await firebase.auth().signInWithPhoneNumber(phoneNum);
    setConfirm(confirmation);

    console.log("confirmation: ", confirmation);
  }

  async function confirmCode() {
    try {
      await confirm.confirm(value).then((res) => {
        if (type === "PROVIDER") {
          verifyCompany("true", code, phone, ID).then((res) => {
            const {
              data: { data },
            } = res;
            const {
              data: { responseCode },
            } = res;
            const {
              data: { message },
            } = res;
            if (responseCode === 200) {
              if (verify) {
                navigation.push("ProfileVerifiedSuccessful", { type: type });
              } else {
                navigation.push("ChangePassword", { type: "PROVIDER", ID: ID });
              }
            } else {
              Toast.show({
                type: "error",
                position: "top",
                text1: "Error",
                text2: "Unknown error occurred",
              });
            }
          });
        } else {
          verifySeeker("true", code, phone, ID).then((res) => {
            const {
              data: { data },
            } = res;
            const {
              data: { responseCode },
            } = res;
            const {
              data: { message },
            } = res;
            if (responseCode === 200) {
              if (verify) {
                navigation.push("ProfileVerifiedSuccessful", { type: type });
              } else {
                navigation.push("ChangePassword", { type: "SEEKER", ID: ID });
              }
            } else {
              Toast.show({
                type: "error",
                position: "top",
                text1: "Error",
                text2: "Unknown error occurred",
              });
            }
          });
        }
      });
    } catch (error) {
      Toast.show({
        type: "error",
        position: "top",
        text1: "Error",
        text2: "The code you entered is not valid",
      });
    }
  }

  useEffect(() => {
    signInWithPhoneNumber(phone);
  }, [phone]);

  const [value, setValue] = useState("");
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#fff" }}>
      <Pressable onPress={() => navigation.goBack()}>
        <Image
          style={{
            width: 22,
            height: 20,
            marginTop: 70,
            marginLeft: 30,
            tintColor: "gray",
          }}
          source={require("../assets/back_arrow.png")}
          alt={"Okay"}
        />
      </Pressable>

      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <Image
          style={{ height: 200, width: 200 }}
          source={require("../assets/verification_code.png")}
        />
        <Text
          style={{
            color: "#000",
            fontFamily: "poppins_semibold",
            fontSize: 18,
            width: "85%",
            textAlign: "center",
            marginTop: 20,
            alignSelf: "center",
          }}>
          Verification
        </Text>
        <Text
          style={{
            color: "#000",
            fontFamily: "poppins_regular",
            fontSize: 12,
            width: "85%",
            textAlign: "center",
            marginTop: 5,
            alignSelf: "center",
          }}>
          Enter your OTP code number
        </Text>
        <CodeField
          ref={ref}
          {...props}
          value={value}
          onChangeText={setValue}
          cellCount={CELL_COUNT}
          rootStyle={styles.codeFieldRoot}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          renderCell={({ index, symbol, isFocused }) => (
            <Text
              key={index}
              style={[styles.cell, isFocused && styles.focusCell]}
              onLayout={getCellOnLayoutHandler(index)}>
              {symbol || (isFocused ? <Cursor /> : null)}
            </Text>
          )}
        />
        <Pressable
          onPress={() => confirmCode()}
          style={{
            width: "75%",
            backgroundColor: "#13A3E1",
            alignItems: "center",
            borderRadius: 15,
            marginTop: 40,
            paddingVertical: 15,
          }}>
          <Text
            style={{
              color: "#fff",
              fontFamily: "poppins_semibold",
              fontSize: 15,
            }}>
            Verify
          </Text>
        </Pressable>
        <Text
          style={{
            marginTop: 40,
            fontFamily: "poppins_medium",
            fontSize: 13,
            color: "gray",
          }}>
          Didn't recieve any code ?
        </Text>
        <Ripple
          rippleColor="#13A3E1"
          onPress={() => {
            signInWithPhoneNumber(phone);
          }}
          style={{
            width: "85%",
            alignItems: "center",
            borderRadius: 25,
            marginTop: 5,
            paddingVertical: 7,
          }}>
          <Text
            style={{
              color: "#13A3E1",
              fontFamily: "poppins_semibold",
              fontSize: 15,
            }}>
            Resend New Code
          </Text>
        </Ripple>
      </View>
      <Toast position="top" bottomOffset={20} />
    </ScrollView>
  );
}

export default VerificationCode;
