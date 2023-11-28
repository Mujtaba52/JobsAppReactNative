import { Image, TextInput, Text, Pressable, FlatList, SafeAreaView, ScrollView, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { useNavigation } from "@react-navigation/native";
import Resume from "./Resume";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TopTags } from "../API/actions/tagActions";
import { RecommendedJobs } from "../API/actions/jobActions";
import moment from "moment/moment";
import { recordInteraction } from "../API";
import { RESET } from "../Utils/Constants";

const data = [
	{ "name": "Facebook" },
	{ "name": "Google" },
	{ "name": "Netflix" },
	{ "name": "Youtube" }
]

function Recommendedjobs({ navigation }) {

	const dispatch = useDispatch()
	const topTags = useSelector(state => state.tag.topTags)
	const recommendedJobs = useSelector(state => state.job.recommendedJobs)
	const success = useSelector(state => state.success.recommendedJobSuccess)
	const error = useSelector(state => state.error.recommendedJobError)
	const noData = useSelector(state => state.nodata.recommendedJobNoData)
	const [ID, setID] = useState()
	const [loading, setLoading] = useState(true)
	const [data, setData] = useState([])

	useEffect(() => {
		GetData()
	}, []);
	const GetData = async () => {
		const value = await AsyncStorage.getItem('ID')
		setID(value);
	}

	useEffect(() => {
		if (ID) {
			dispatch(TopTags(ID))
		}
	}, [ID]);

	useEffect(() => {
		if (ID) {
			if (topTags) {
				if (topTags.length !== 0) {
					if (loading) {
						dispatch(RecommendedJobs(ID, topTags[0].name))
					}
				} else {
					setLoading(false)
				}
			}
		}
	}, [dispatch, topTags, navigation, ID]);


	useEffect(() => {
		console.log(recommendedJobs)
		if (recommendedJobs) {
			setData(recommendedJobs)
		}
	}, [recommendedJobs]);

	useEffect(() => {
		console.log(topTags)
	}, [topTags]);

	useEffect(() => {
		if (success || error || noData) {
			setData(recommendedJobs)
			setLoading(false)
		}
	}, [success]);

	const JobClick = (id) => {
		recordInteraction(id, ID, '', '', 'JOB').then(res => console.log(res))
		navigation.push('JobDetails', { ID: id })
	}

	useEffect(() => {
		console.log(noData)
	}, [noData])

	return (
		<ScrollView style={{ flex: 1, backgroundColor: '#F1F1F1' }}>
			{loading ?
				<View style={{ marginTop: 400 }}>
					<ActivityIndicator size={60} color="#13A3E1" />
				</View>
				:
				<>
					{noData ? <View style={{ marginTop: 200 }}>
						<Image source={require('../assets/nodata.png')}
							style={{ width: 260, height: 260, marginLeft: 80, marginBottom: -20, marginTop: 40 }} />
						<Text style={{ textAlign: 'center', fontFamily: 'poppins_medium' }}>No Recommended jobs Found</Text>
					</View> :
						<>
							{error ?
								<View style={{ marginTop: 360 }}>
									<Image source={require('../assets/delete.png')} style={{
										width: 30,
										height: 30,
										marginLeft: 190,
										marginBottom: -20,
										marginTop: 40
									}} />
									<Text
										style={{ textAlign: 'center', marginVertical: 20, fontFamily: 'poppins_medium' }}>Network
										Error...!</Text>
								</View> : <>


									<View style={{ backgroundColor: '#EAEAEA' }}>
										<View style={{ flexDirection: 'row', height: 90 }}>
											<Pressable onPress={() => navigation.goBack()}><Image style={{
												width: 22,
												height: 20,
												marginTop: 70,
												marginLeft: 30,
												tintColor: '#000'
											}} source={require('../assets/back_arrow.png')} alt={'Okay'} /></Pressable>
											<View style={{ width: '100%', marginTop: 0, paddingEnd: 90 }}>
												<Pressable
												// onPress={() => navigation.push('AppliedJobs')}
												><Image
														style={{ width: 150, height: 40, marginTop: 60, alignSelf: 'center' }}
														source={require('../assets/logo.png')} alt={'Okay'} /></Pressable>
											</View>
										</View>
										<View>
											<Text style={{
												fontSize: 18,
												fontFamily: 'poppins_bold',
												width: '100%',
												paddingHorizontal: 30,
												textAlign: 'left',
												marginVertical: 20,
												padding: 0
											}}>Recommended Jobs</Text>
										</View>
										<SafeAreaView>
											<FlatList nestedScrollEnabled={false} scrollEnabled={false}
												style={{ marginHorizontal: 0, marginTop: 10 }}
												data={data} renderItem={({ item }) => (
													<Pressable onPress={() => JobClick(item.id)}><View style={{
														marginLeft: 25,
														marginRight: 25,
														marginBottom: 8,
														borderColor: '#4C4C4C',
														borderRadius: 15,
														paddingHorizontal: 25,
														paddingVertical: 15,
														display: "flex",
														flexDirection: "column",
														backgroundColor: '#fff'
													}}>
														<View style={{ flexDirection: 'row', flex: 1 }}>
															<Text style={{
																color: '#207A00',
																backgroundColor: 'rgba(0,180,18,0.2)',
																paddingHorizontal: 10,
																paddingTop: 4,
																fontSize: 10,
																fontFamily: 'poppins_medium',
																borderRadius: 5
															}}>NEW</Text>
															<Text style={{
																marginLeft: 'auto',
																textAlign: 'right',
																fontFamily: 'poppins_medium',
																fontSize: 13
															}}>{moment(item.created).format("MMM Do YY")}</Text>
														</View>
														<View style={{ flex: 1, flexDirection: 'row' }}>
															<View style={{ flex: 0.8 }}>
																<Text numberOfLines={1} style={{
																	fontFamily: 'poppins_bold',
																	marginTop: 5,
																	fontSize: 15
																}}>{item.title}</Text>
																<Text style={{
																	fontFamily: 'poppins_regular',
																	marginTop: 0,
																	fontSize: 12
																}}>{item.company_name}</Text>
															</View>
															{item.bookmark === 0 ?
																<Image style={{
																	width: 20,
																	height: 20,
																	marginLeft: 'auto',
																	marginTop: 10
																}} source={require('../assets/bookmarked.png')} />
																:
																<Image style={{
																	width: 20,
																	height: 20,
																	marginLeft: 'auto',
																	marginTop: 10
																}} source={require('../assets/bookmark.png')} />
															}
														</View>
														<View style={{ flexDirection: 'row', flex: 1 }}>
															<Text style={{
																fontFamily: 'poppins_bold',

																fontSize: 16,
															}}>{item.category_name}</Text>
															<Text style={{
																marginLeft: 'auto',
																textAlign: 'right',
																fontFamily: 'poppins_medium',
																fontSize: 13
															}}>{item.qualification}</Text>
														</View>
														<View style={{
															marginTop: 4,
															backgroundColor: '#d9d9d9',
															borderRadius: 10,
															marginLeft: 'auto',
															marginRight: 'auto',
														}} >
															<Text style={{ paddingHorizontal: 10, paddingVertical: 2, fontSize: 13, fontFamily: 'poppins_medium', }}>
																Salary {item.salary}
															</Text>
														</View>

														<View style={{ flexDirection: 'row', flex: 1, marginTop: 7, }}>
															<View style={{
																backgroundColor: '#13a3e1',
																paddingHorizontal: 10,
																paddingTop: 5,
																borderRadius: 14
															}}>
															<Text style={{ color: 'white',fontSize: 15,fontFamily: 'poppins_medium', }}>{item.type}</Text>
															</View>
															<Text style={{
																marginLeft: 'auto',
																textAlign: 'right',
																fontFamily: 'poppins_medium',
																fontSize: 13,
																paddingTop: 6,
															}}>{item.city_name}</Text>
														</View>


													</View></Pressable>
												)} />
										</SafeAreaView>
									</View>
								</>
							}
						</>}
				</>}
		</ScrollView>
	)
}

export default Recommendedjobs
