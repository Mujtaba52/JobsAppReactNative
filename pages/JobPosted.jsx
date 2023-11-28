import { ActivityIndicator, FlatList, Image, Modal, Pressable, SafeAreaView, ScrollView, Text, TextInput, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AllCategories } from "../API/actions/categoryActions";
import moment from "moment";
import Ripple from "react-native-material-ripple";
import { ProviderJobs } from "../API/actions/jobActions";
import AsyncStorage from "@react-native-async-storage/async-storage";

function JobPosted({ navigation }) {

  const dispatch = useDispatch();
  const [login, isLogin] = useState(false);
  const companyJobs = useSelector(state => state.job.providerJobs)
  const nodata = useSelector(state => state.nodata.providerJobNoData)
  const error = useSelector(state => state.error.providerJobError)
  const success = useSelector(state => state.success.providerJobSuccess)


  const [isloading, setIsLoading] = useState(true)
  useEffect(() => {
      if (success || error || nodata) {
          setIsLoading(false)
      }
  }, [success, error, nodata])


  const [ID, setID] = useState()

  useEffect(() => {
    GetData()
  }, []);
  const GetData = async () => {
    const value = await AsyncStorage.getItem('ID')
    setID(value);
  }

  const [visible, setVisible] = useState(false)
  const toggleVisibility = () => setVisible(!visible)


  useEffect(() => {
    console.log(companyJobs)
  }, [companyJobs])
  useEffect(() => {
    if (ID) {
      dispatch(ProviderJobs(ID))
    }
  }, [dispatch, ID]);

  return (

    <View style={{ flex: 1 }}>

      {isloading ?
        <View style={{ marginTop: 400 }}>
          <ActivityIndicator size={60} color="#13A3E1" />
        </View>
        :
        <>
          <ScrollView style={{ flex: 1, backgroundColor: '#F1F1F1', marginBottom: -75 }}>


            <View style={{
              flexDirection: 'column',
              width: '100%',
              height: 90,
              marginBottom: 40
            }}>
              <View style={{ flexDirection: 'row', height: 130 }}>
                <Pressable onPress={() => navigation.goBack()}
                  style={{ paddingRight: 5 }}><Image style={{
                    width: 22,
                    height: 20,
                    marginTop: 70,
                    marginLeft: 30,
                    marginBottom: 20,
                    tintColor: 'gray'
                  }} source={require('../assets/back_arrow.png')}
                    alt={'Okay'} />
                </Pressable>
                <View style={{ width: '100%', marginTop: 0, paddingEnd: 90 }}>
                  <Image style={{
                    width: 150,
                    height: 40,
                    marginTop: 60,
                    alignSelf: 'center'
                  }}
                    source={require('../assets/logo.png')} alt={'Okay'} />
                </View>
              </View>
            </View>
            <Text style={{ textAlign: 'center', fontSize: 19, fontFamily: 'poppins_semibold', marginBottom: 10 }}>Job Posted</Text>
            <SafeAreaView style={{ flex: 1 }}>
              <FlatList scrollEnabled={false} nestedScrollEnabled={true}
                style={{ marginHorizontal: 26, marginTop: 10 }} data={companyJobs} renderItem={({ item }) => (
                  <View
                    style={{
                      margin: 5,
                      backgroundColor: '#fff',
                      borderColor: '#c2c2c2',
                      borderWidth: 1,
                      borderRadius: 25,
                      paddingVertical: 20,
                      paddingHorizontal: 20
                    }}>
                    <Text style={{ fontFamily: 'poppins_medium', fontSize: 14, marginLeft: 'auto' }}>{moment(item.created).format('ll')}</Text>
                    <Text numberOfLines={1} style={{ fontFamily: 'poppins_bold', fontSize: 16, textAlign: 'center', color: '#F0A51E' }}>{item.title}</Text>
                    <Text style={{ textAlign: "center", fontSize: 14, fontFamily: 'poppins_medium', paddingVertical: 5 }}>{item.category_name}</Text>
                    <View style={{ paddingHorizontal: 50 }}><Text style={{ backgroundColor: '#D9D9D9', textAlign: "center", paddingVertical: 6, borderRadius: 20, fontSize: 12, fontFamily: 'poppins_medium' }}>Salary {item.salary}/month</Text></View>
                    <View style={{ paddingHorizontal: 30, marginTop: 14 }}>
                      <Ripple rippleColor="white" onPress={() => navigation.push('RecommendedUser', { job: item.id })}><Text style={{ backgroundColor: '#143D59', textAlign: "center", borderRadius: 20, fontSize: 14, fontFamily: 'poppins_bold', color: 'white', marginVertical: 4, paddingVertical: 11 }}>Recommended Users</Text></Ripple>
                      <Ripple rippleColor="white" onPress={() => navigation.push('AppliedByJob', { job: item.id })} >
                        <Text style={{ backgroundColor: '#207A00', textAlign: "center", borderRadius: 20, fontSize: 14, fontFamily: 'poppins_bold', color: 'white', marginVertical: 4, paddingVertical: 11 }}> Applied Users </Text>
                      </Ripple>
                      <Ripple rippleColor="white" onPress={() => navigation.push('OffersByJob', { job: item.id })} >
                        <Text style={{ backgroundColor: '#0098FF', textAlign: "center", borderRadius: 20, fontSize: 14, fontFamily: 'poppins_bold', color: 'white', marginVertical: 4, paddingVertical: 11 }}> Sent Offers </Text>
                      </Ripple>
                    </View>
                  </View>

                )}
              />
            </SafeAreaView>


            <View style={{ height: 90 }} />
          </ScrollView>
        </>}
    </View>
  )
}

export default JobPosted
