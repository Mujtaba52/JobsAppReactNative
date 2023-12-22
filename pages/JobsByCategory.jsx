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
import { useNavigation } from "@react-navigation/native";
import Resume from "./Resume";
import { useDispatch, useSelector } from "react-redux";
import { AllCities } from "../API/actions/cityActions";
import { AllJobs, CategoryJobs } from "../API/actions/jobActions";
import moment from "moment";
import { recordInteraction } from "../API";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RESET } from "../Utils/Constants";
import categories from "./Categories";
import { BannerAd, BannerAdSize } from "react-native-google-mobile-ads";

function JobsByCategory({ route, navigation }) {
  const { CATID } = route.params;
  const jobs = useSelector((state) => state.job.categoryJobs);
  const success = useSelector((state) => state.success.categoryJobSuccess);
  const nodata = useSelector((state) => state.nodata.categoryJobNoData);
  const error = useSelector((state) => state.error.categoryJobError);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [ID, setID] = useState();
  const [prevCatId, setPrevCatId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const id = await AsyncStorage.getItem("ID");
      setID(id);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (CATID !== prevCatId && ID) {
      setData([]);
      setLoading(true);
      dispatch(CategoryJobs(ID, CATID));
      setPrevCatId(CATID);
    }
  }, [CATID, prevCatId, ID, dispatch]);

  useEffect(() => {
    if (jobs) {
      setData(jobs);
    }
    if (success || error || nodata) {
      setLoading(false);
    }
  }, [jobs, success, error, nodata]);

  const JobClick = (id) => {
    recordInteraction(id, ID, "", "", "JOB").then((res) => console.log(res));
    navigation.push("JobDetails", { ID: id });
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1, backgroundColor: "#F1F1F1" }}>
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
                alt={"Okay"}
              />
            </Pressable>
            <View style={{ width: "100%", marginTop: 0, paddingEnd: 90 }}>
              <Pressable onPress={() => navigation.push("Recommendedjobs")}>
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
          <View>
            <Text
              style={{
                fontSize: 18,
                fontFamily: "poppins_bold",
                width: "100%",
                paddingHorizontal: 30,
                textAlign: "left",
                marginVertical: 20,
                padding: 0,
              }}>
              Jobs
            </Text>
          </View>
          {loading ? (
            <ActivityIndicator
              size={60}
              color="#13A3E1"
              style={{ marginTop: 200 }}
            />
          ) : nodata || (data && data.length === 0) ? (
            <NoDataView />
          ) : error ? (
            <ErrorView />
          ) : (
            <DataView data={data} navigation={navigation} />
          )}
        </View>
      </ScrollView>
      <BannerAd
        unitId="ca-app-pub-3940256099942544/6300978111"
        size={BannerAdSize.FULL_BANNER}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }}
      />
    </View>
  );
}

const NoDataView = () => (
  <View style={{ marginTop: 200 }}>
    <Image
      source={require("../assets/nodata.png")}
      style={{
        width: 260,
        height: 260,
        marginLeft: 80,
        marginBottom: -20,
        marginTop: 40,
      }}
    />
    <Text style={{ textAlign: "center", fontFamily: "poppins_medium" }}>
      No Jobs Found
    </Text>
  </View>
);

const ErrorView = () => (
  <View style={{ marginTop: 200 }}>
    <Image
      source={require("../assets/delete.png")}
      style={{
        width: 30,
        height: 30,
        marginLeft: 190,
        marginBottom: -20,
        marginTop: 40,
      }}
    />
    <Text
      style={{
        textAlign: "center",
        marginVertical: 20,
        fontFamily: "poppins_medium",
      }}>
      Network Error...!
    </Text>
  </View>
);

const DataView = ({ data,navigation }) => (
  <>
    <SafeAreaView>
      <FlatList
        nestedScrollEnabled={false}
        scrollEnabled={false}
        initialNumToRender={5}
        maxToRenderPerBatch={2}
        updateCellsBatchingPeriod={100}
        windowSize={10}
        style={{ marginHorizontal: 0, marginTop: 10 }}
        data={data}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => {
              console.log("renderItem****", item);
              navigation.push("ApiDescription", { ID: item.id });
              // JobClick(item.id);
            }}>
            <View
              style={{
                marginLeft: 25,
                marginRight: 25,
                marginBottom: 8,
                borderColor: "#4C4C4C",
                borderRadius: 15,
                paddingHorizontal: 25,
                paddingVertical: 15,
                display: "flex",
                flexDirection: "column",
                backgroundColor: "#fff",
              }}>
              <View style={{ flexDirection: "row", flex: 1 }}>
                <Text
                  style={{
                    color: "#207A00",
                    backgroundColor: "rgba(0,180,18,0.2)",
                    paddingHorizontal: 10,
                    paddingTop: 4,
                    fontSize: 10,
                    fontFamily: "poppins_medium",
                    borderRadius: 5,
                  }}>
                  NEW
                </Text>
                <Text
                  style={{
                    marginLeft: "auto",
                    textAlign: "right",
                    fontFamily: "poppins_medium",
                    fontSize: 13,
                  }}>
                  {moment(item.created).format("MMM Do YY")}
                </Text>
              </View>
              <View style={{ flex: 1, flexDirection: "row" }}>
                <View style={{ flex: 0.8 }}>
                  <Text
                    numberOfLines={1}
                    style={{
                      fontFamily: "poppins_bold",
                      marginTop: 5,
                      fontSize: 15,
                    }}>
                    {item.title}
                  </Text>
                  <Text
                    style={{
                      fontFamily: "poppins_regular",
                      marginTop: 0,
                      fontSize: 12,
                    }}>
                    {item.company_name}
                  </Text>
                </View>
                {item.bookmark === 0 ? (
                  <Image
                    style={{
                      width: 20,
                      height: 20,
                      marginLeft: "auto",
                      marginTop: 10,
                    }}
                    source={require("../assets/bookmarked.png")}
                  />
                ) : (
                  <Image
                    style={{
                      width: 20,
                      height: 20,
                      marginLeft: "auto",
                      marginTop: 10,
                    }}
                    source={require("../assets/bookmark.png")}
                  />
                )}
              </View>
              <View style={{ flexDirection: "row", flex: 1 }}>
                <Text
                  style={{
                    fontFamily: "poppins_bold",

                    fontSize: 16,
                  }}>
                  {item.category_name}
                </Text>
                <Text
                  style={{
                    marginLeft: "auto",
                    textAlign: "right",
                    fontFamily: "poppins_medium",
                    fontSize: 13,
                  }}>
                  {item.qualification}
                </Text>
              </View>

              <View
                style={{
                  marginTop: 4,
                  backgroundColor: "#d9d9d9",
                  paddingHorizontal: 20,
                  paddingVertical: 2,
                  borderRadius: 10,
                  marginLeft: "auto",
                  marginRight: "auto",
                }}>
                <Text
                  style={{
                    fontFamily: "poppins_medium",
                    fontSize: 13,
                    textAlign: "center",
                  }}>
                  Salary {item.salary}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  flex: 1,
                  marginTop: 7,
                }}>
                <View
                  style={{
                    backgroundColor: "#13a3e1",
                    paddingHorizontal: 10,
                    paddingTop: 5,
                    borderRadius: 14,
                  }}>
                  <Text
                    style={{
                      color: "white",
                      fontSize: 15,
                      fontFamily: "poppins_medium",
                    }}>
                    {item.type}
                  </Text>
                </View>
                <Text
                  style={{
                    marginLeft: "auto",
                    textAlign: "right",
                    fontFamily: "poppins_medium",
                    fontSize: 13,
                    paddingTop: 6,
                  }}>
                  {item.city_name}
                </Text>
              </View>
            </View>
          </Pressable>
        )}
      />
    </SafeAreaView>
  </>
);

export default JobsByCategory;
