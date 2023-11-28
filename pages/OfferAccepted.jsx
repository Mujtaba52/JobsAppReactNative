import { Image, TextInput, Text, Pressable, FlatList, SafeAreaView, ScrollView, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { useNavigation } from "@react-navigation/native";
import Resume from "./Resume";
import { useDispatch, useSelector } from "react-redux";
import { JobByID } from "../API/actions/jobActions";
import moment from "moment";
import WebView from "react-native-webview";

const OfferAccepted = ({ route, navigation }) => {

  const { ID } = route.params
  const dispatch = useDispatch()
  const job = useSelector(state => state.job.job)
  const success = useSelector(state => state.success.jobSuccess)
  const nodata = useSelector(state => state.nodata.jobNoData)
  const error = useSelector(state => state.error.jobError)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (success || error || nodata) {
      setIsLoading(false)
    }
  }, [success, nodata, error])

  useEffect(() => {
    if (ID) {
      dispatch(JobByID(0, ID))
    }
  }, [dispatch,]);

  useEffect(() => {

    console.log(job)

  }, [job])



  const [webHeight, setWebHeight] = useState(0)
  const onWebHeight = (e) => {
    setWebHeight(Number(e.nativeEvent.data))
  }


  return (

    <View style={{ flex: 1, }}>
      {isLoading ?
        <View style={{ marginTop: 200 }}>
          <ActivityIndicator size={60} color="#13A3E1" />
        </View>
        : <>
          <ScrollView style={{ backgroundColor: '#F1F1F1' }}>
            <View style={{ backgroundColor: '#EAEAEA', }}>
              <View style={{ flexDirection: 'row', height: 90 }}>
                <Pressable onPress={() => navigation.goBack()} style={{ padiingRight: 5 }}><Image style={{
                  width: 22,
                  height: 20,
                  marginTop: 70,
                  marginLeft: 30,
                  tintColor: '#000'
                }} source={require('../assets/back_arrow.png')} alt={''} /></Pressable>
                <View style={{ width: '100%', marginTop: 0, paddingEnd: 90 }}>
                  <Pressable onPress={() => navigation.push('OfferRejected')}><Image
                    style={{ width: 150, height: 40, marginTop: 60, alignSelf: 'center' }}
                    source={require('../assets/logo.png')} alt={'Okay'} /></Pressable>
                </View>
              </View>
              <Text style={{ fontSize: 22, fontFamily: 'poppins_bold', textAlign: "center", marginTop: 90 }}>{job?.role}</Text>
              {/* <View style={{ paddingHorizontal: 106, marginTop: 4 }}>
          <Text style={{ backgroundColor: '#0EB000', textAlign: "center", borderRadius: 20, fontSize: 16, fontFamily: 'poppins_bold', color: 'white', marginVertical: 4, paddingVertical: 7 }}>{job?.address}</Text>
        </View> */}
              <View style={{ marginTop: 10 }}>


                <View style={{

                  marginBottom: 8,
                  borderColor: '#4C4C4C',
                  borderTopLeftRadius: 50,
                  borderTopRightRadius: 50,
                  paddingVertical: 15,
                  display: "flex",
                  flexDirection: "column",
                  backgroundColor: '#fff'
                }}>
                  <View style={{ flexDirection: 'row', flex: 1 }}>
                    <Text style={{
                      paddingHorizontal: 10,
                      paddingTop: 4,
                      fontSize: 14,
                      fontFamily: 'poppins_bold',
                      borderRadius: 5,
                      marginLeft: 25,
                    }}>{job?.company_name}</Text>
                    <Text style={{ marginLeft: 'auto', textAlign: 'right', fontFamily: 'poppins_medium', fontSize: 13, marginRight: 25 }}>{moment(job?.created).format("MMM Do YY")}</Text>
                  </View>
                  <View style={{ marginLeft: 'auto', marginRight: 'auto', marginTop: 20 }}>
                    <Text style={{ fontFamily: 'poppins_medium', fontSize: 15, textAlign: 'center', marginTop: 4, backgroundColor: '#00A224', color: "white", borderRadius: 20, paddingLeft: 20, paddingRight: 20, paddingTop: 6, paddingBottom: 5 }} >
                      Salary ${job?.salary}
                    </Text>
                  </View>
                  <View style={{ flex: 1, flexDirection: 'row' }}>
                    <View style={{ flex: 1 }}>
                      <Text numberOfLines={1} style={{ fontFamily: 'poppins_bold', marginTop: 15, fontSize: 20, textAlign: "center", }}>{job?.category_name}</Text>
                      <Text style={{ fontFamily: 'poppins_medium', marginTop: 0, fontSize: 14, textAlign: "center" }}>{job?.address}</Text>
                    </View>
                  </View>
                  <View style={{ flexDirection: "row", marginTop: 20, backgroundColor: '#F6F6F6', }}>
                    <View style={{ backgroundColor: 'rgba(19, 163, 225, 0.20)', paddingHorizontal: 30, width: '50%', paddingVertical: 25, borderTopRightRadius: 40, borderBottomRightRadius: 40 }}>
                      <View style={{}}>
                        <Text style={{
                          color: 'white',
                          backgroundColor: '#13a3e1',
                          paddingHorizontal: 12,
                          paddingVertical: 6,
                          fontSize: 15,
                          fontFamily: 'poppins_bold',
                          borderRadius: 14,
                          textAlign: "center",
                          marginLeft: 'auto', marginRight: 'auto'
                        }}>{job?.type}</Text>
                        <Text style={{ fontSize: 14, fontFamily: 'poppins_medium', textAlign: "center", marginTop: 5 }}> {job?.workdays} </Text>
                        <Text style={{ fontSize: 13, fontFamily: 'poppins_regular', textAlign: "center", marginTop: 5 }}>  {job?.worktime}</Text>
                      </View>
                    </View>
                    <View style={{ width: '50%' }}>
                      <View style={{ flexDirection: 'column', paddingVertical: 25, }}>
                        <Text style={{ textAlign: "center", fontSize: 19, fontFamily: 'poppins_medium' }}>{job?.experience}</Text>
                        <Text style={{ textAlign: "center", fontSize: 25, fontFamily: 'poppins_medium' }}>{job?.qualification}</Text>
                        <Text style={{ textAlign: "center", width: '80%', marginLeft: 15, fontSize: 12, fontFamily: 'poppins_regular' }}>{job?.skills}</Text>

                      </View>
                    </View>
                  </View>
                  <View  >
                    <Text style={{ fontSize: 18, fontFamily: 'poppins_medium', marginLeft: 25, marginTop: 10 }}>Job Details: </Text>
                    <ScrollView >
                      <WebView source={{ html: job?.description }} style={{ marginTop: 20, flex: 1, minHeight: 300, height: webHeight, marginHorizontal: 20 }}
                        scalesPageToFit={false}
                        onMessage={e => onWebHeight(e)}
                        injectedJavaScript='window.ReactNativeWebView.postMessage(document.body.scrollHeight)'
                      />
                    </ScrollView>
                  </View>

                </View>
              </View>
            </View>
        </ScrollView>
          </> }
      <View style={{ marginLeft: 'auto', marginRight: 'auto' }}>
        <Text onPress={() => navigation.push('AppliedByJob', { job: job?.id })} style={{ fontSize: 16, fontFamily: 'poppins_medium', backgroundColor: '#13A3E1', color: 'white', textAlign: "center", paddingVertical: 7, borderRadius: 20, paddingHorizontal: 50 }}>View Applied</Text>
      </View>

    </View>
  )
}

export default OfferAccepted
