import React, { useEffect, useState } from 'react';
import {
  View,
  ScrollView,
  Text,
  Image,
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  Pressable,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CVByUser } from '../API/actions/cvActions';
import DistributeModal from '../Components/DistributeModal';
import ActivateAccountModal from '../Components/ActivateAccountModal';
import {distributeResume} from "../API";
import { fetchSeeker } from '../API';
function Resume({ navigation }) {
  const dispatch = useDispatch();
  const [ID, setID] = useState();
  const cv = useSelector((state) => state.cv.cv);
  const success = useSelector((state) => state.success.cvSuccess);
  const error = useSelector((state) => state.error.cvError);

  useEffect(() => {
    GetData();
  }, []);

  const GetData = async () => {
    const value = await AsyncStorage.getItem('ID');
    setID(value);
  };

  useEffect(() => {
    if (ID) {
      dispatch(CVByUser(ID));
    }
  }, [dispatch, ID]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (success || error) {
      setIsLoading(false);
    }
  }, [success, error]);

  useEffect(() => {
  console.log(cv)
  }, [cv]);

  const [completed, setCompleted] = useState(true)

  const [verify, setVerify] = useState(false)
  const [verifyAccount, setVerifyAccount] = useState(false)

  // const toggleDistributeVisible = (dis) => {
  //   if (dis) {
  //     distributeResume(cv).then(res => {
  //       const { data: { responseCode } } = res;
  //       if (responseCode===200){
  //         setVerify(false)
  //       }
  //     })
  //   }
  //   setVerify(!verify)
  // }
  const toggleDistributeVisible = (dis) => {
    if (dis) {
      // First, fetch the seeker's details
      fetchSeeker(ID) // Assuming you have access to the seeker's ID
        .then(res => {
          const { data } = res;
          console.log("data.activated===>>",data.data.activated)
          if (data.data.activated === 1) {
            // If the seeker is activated, you can proceed to distribute the resume
            distributeResume(cv).then(res => {
              const { data: { responseCode } } = res;
              if (responseCode === 200) {
                setVerify(false);
              }
            });
            setVerify(!verify)
          } else {
            // If the seeker is not activated, show an error message
            // alert("Please activate your account before distributing your resume.");
            setVerifyAccount(!verifyAccount)
          }
        })
        .catch(error => {
          // Handle any errors that occur while fetching the seeker's details
          console.error("Error fetching seeker details:", error);
        });
    }else{
      setVerify(!verify);
    }
    
  };
  return (
    <View style={{ flex: 1 }}>
      <DistributeModal visible={verify} toggleVisible={toggleDistributeVisible} />
      <ActivateAccountModal visible={verifyAccount} toggleVisible={() => setVerifyAccount(false)} navigation={navigation} />
      <ScrollView style={{ backgroundColor: '#F1F1F1' }}>

        {isLoading ?
          <View style={{ marginTop: 400 }}>
            <ActivityIndicator size={60} color="#13A3E1" />
          </View>
          :
          <>
            <View style={{ flexDirection: 'row', height: 90 }}>
              <Pressable onPress={() => navigation.goBack()}
                style={{ paddingRight: 5 }}><Image style={{
                  width: 22,
                  height: 20,
                  marginTop: 70,
                  marginLeft: 30,
                  tintColor: '#000'
                }} source={require('../assets/back_arrow.png')} alt={'Okay'} />
              </Pressable>
              <View style={{ width: '100%', marginTop: 0, paddingEnd: 90 }}>
                <Pressable >
                  <Image
                    style={{ width: 150, height: 40, marginTop: 60, alignSelf: 'center' }}
                    source={require('../assets/logo.png')} alt={'Okay'} />
                </Pressable>
              </View>
            </View>
            <View style={{ marginTop: 20, paddingTop: 30, marginHorizontal: 0, paddingBottom: 10 }}>
              <Text style={{ fontSize: 16, fontFamily: 'poppins_medium', color: 'black', textAlign: 'center' }}>{cv?.name}</Text>
              <Text style={{ fontSize: 11, fontFamily: 'poppins_medium', color: 'black', textAlign: 'center' }}>{cv?.address}</Text>
              <View style={{ flexDirection: 'row', gap: 10, marginLeft: 'auto', marginRight: 'auto', marginTop: 5 }}>
                <Text style={{ fontSize: 12, fontFamily: 'poppins_medium', color: 'black', textAlign: 'center', }}>{cv?.code}{cv?.phone}</Text>
                <Text style={{ fontSize: 12, fontFamily: 'poppins_medium', color: 'black', textAlign: 'center', }}>{cv?.email}</Text>
              </View>
            </View>

            <View style={{ paddingHorizontal: 20 }}>
              <Text style={{ textAlign: 'center', fontSize: 15, fontFamily: 'poppins_medium', marginTop: 10 }}>{cv?.role}</Text>
              <Text style={{ backgroundColor: 'gray', height: 1, marginTop: 10, paddingHorizontal: 20 }}>-</Text>

              <Text style={{ fontSize: 10, fontFamily: 'poppins_medium', marginVertical: 10, paddingHorizontal: 10, paddingVertical: 10 }}>{cv?.statement}</Text>
              <Text style={{ fontSize: 14, fontFamily: 'poppins_semibold', marginVertical: 10, textAlign: 'center' }}>Key Skills</Text>
              <Text style={{ backgroundColor: 'gray', height: 1, paddingHorizontal: 20 }}>-</Text>

              <SafeAreaView style={{ marginHorizontal: 20, marginVertical: 10 }}>
                <FlatList scrollEnabled={false} nestedScrollEnabled={true}
                  data={cv?.skills} numColumns={3} renderItem={({ item }) => (
                    <Text style={{ fontSize: 10, fontFamily: 'poppins_regular', flex: 1, paddingVertical: 2, color: 'black', marginLeft: 20 }}>
                      {`\u2022 ${item.skill}`}
                    </Text>
                  )} />
              </SafeAreaView>
              <Text style={{ fontSize: 12, fontFamily: 'poppins_semibold', textAlign: 'center' }}>EMPLOYMENT HISTORY</Text>
              <Text style={{ backgroundColor: 'gray', height: 1, paddingHorizontal: 20 }}>-</Text>
              <ScrollView style={{ marginHorizontal: 20, marginVertical: 10 }}>
                <FlatList scrollEnabled={false} nestedScrollEnabled={true}
                  data={cv?.careers} renderItem={({ item }) => (
                    <View>
                      <View style={{ flexDirection: 'row', gap: 4 }}>
                        <Text style={{ fontSize: 10, fontFamily: 'poppins_semibold', }}>
                          {item.job}
                        </Text>
                        <Text style={{ height: 15, marginTop: -2 }} >|</Text>
                        <Text style={{ fontSize: 10, fontFamily: 'poppins_medium', }}>
                          {item.timeperiod}
                        </Text>
                      </View>
                      <Text style={{ fontSize: 10, fontFamily: 'poppins_medium' }}>
                        Company : {item.company}
                      </Text>
                      <View style={{ flexDirection: 'row', }}>
                        <Text style={{ fontSize: 10, fontFamily: 'poppins_medium', marginTop: 0, marginBottom: 0, padding: 0 }}>
                          Address : {item.address}
                        </Text>
                      </View>
                      <Text style={{ fontSize: 10, fontFamily: 'poppins_medium', marginLeft: 'auto', marginTop: 6, marginBottom: 6 }}>
                        {item.phone}
                      </Text>
                      {/* <Text style={{ backgroundColor: 'gray', height: 1, paddingHorizontal: 20 }}>-</Text> */}
                    </View>
                  )} />

              </ScrollView>
              <Text style={{ fontSize: 12, fontFamily: 'poppins_semibold', textAlign: 'center' }}>QUALIFICATIONS</Text>
              <Text style={{ backgroundColor: 'gray', height: 1, paddingHorizontal: 20 }}>-</Text>
              <SafeAreaView style={{ marginHorizontal: 20, marginVertical: 10 }}>
                <FlatList scrollEnabled={false} nestedScrollEnabled={true}
                  data={cv?.educations} renderItem={({ item }) => (
                    <View >
                      <View style={{ flexDirection: 'row', gap: 4 }}>
                        <Text style={{ fontSize: 10, fontFamily: 'poppins_regular', }}>
                          {item.qualification}
                        </Text>
                        <Text style={{ height: 15, marginTop: -2 }} >|</Text>
                        <Text style={{ fontSize: 10, fontFamily: 'poppins_semibold', }}>
                          {item.institute}
                        </Text>
                      </View>
                      <View style={{ display: 'flex', flexDirection: 'row', }}>
                        <Text style={{ fontSize: 10, fontFamily: 'poppins_medium', marginLeft: 'auto' }}>
                          {item.timeperiod}
                        </Text>
                      </View>

                    </View>
                  )} />
              </SafeAreaView>
              <Text style={{ fontSize: 12, fontFamily: 'poppins_semibold', textAlign: 'center' }}>TRAINING COURSES</Text>
              <Text style={{ backgroundColor: 'gray', height: 1, paddingHorizontal: 20 }}>-</Text>
              <SafeAreaView style={{ marginHorizontal: 20, marginVertical: 10 }}>
                <FlatList scrollEnabled={false} nestedScrollEnabled={true}
                  data={cv?.courses} renderItem={({ item }) => (
                    <View >
                      <View style={{ flexDirection: 'row', gap: 4 }}>
                        <Text style={{ fontSize: 10, fontFamily: 'poppins_regular', }}>
                          {item.course}
                        </Text>
                        <Text style={{ height: 15, marginTop: -2 }}>|</Text>
                        <Text style={{ fontSize: 10, fontFamily: 'poppins_semibold', }}>
                          {item.timeperiod}
                        </Text>
                      </View>
                      <View style={{ display: 'flex', flexDirection: 'row', }}>
                        <Text style={{ fontSize: 10, fontFamily: 'poppins_medium', marginLeft: 'auto' }}>
                          {item.institute}
                        </Text>
                      </View>

                    </View>
                  )} />
              </SafeAreaView>


              <Text style={{ fontSize: 14, fontFamily: 'poppins_semibold', marginVertical: 10, textAlign: 'center' }}>Interest</Text>
              <Text style={{ backgroundColor: 'gray', height: 1, paddingHorizontal: 20 }}>-</Text>

              <SafeAreaView style={{ marginHorizontal: 20, marginVertical: 10 }}>
                <FlatList scrollEnabled={false} nestedScrollEnabled={true}
                  data={cv?.interests} numColumns={3} renderItem={({ item }) => (
                    <Text style={{ fontSize: 10, fontFamily: 'poppins_regular', flex: 1, paddingVertical: 2, color: 'black', marginLeft: 20 }}>
                      {`\u2022 ${item.interest}`}
                    </Text>
                  )} />
              </SafeAreaView>

            </View>

          </>}
      </ScrollView>
      <Pressable
        onPress={() => {
          if (completed) {
            toggleDistributeVisible(true)
          } else {
            navigation.push('VerificationProfile')
          }
        }}
        style={{
          borderRadius: 25,
          alignItems: 'center',
          padding: 15,
          marginTop: 15,

        }}>
        <Text style={{ color: 'white', fontSize: 16, fontFamily: 'poppins_medium', backgroundColor: '#2994FF', paddingHorizontal: 20, paddingVertical: 6, borderRadius: 20 }}>Distribute Resume</Text>
      </Pressable>


    </View>
  );
}

export default Resume;
