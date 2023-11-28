import { Image, TextInput, Text, Pressable, FlatList, ScrollView, SafeAreaView, ActivityIndicator } from 'react-native'
import { View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Categories from './Categories'
import Resume from './Resume'
import { useDispatch, useSelector } from "react-redux";
import { AllCities } from "../API/actions/cityActions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AllInteractions } from "../API/actions/interactionsActions";
import moment from "moment";
import Ripple from 'react-native-material-ripple'
import { BannerAd, BannerAdSize } from 'react-native-google-mobile-ads'


const History = ({ navigation }) => {

	const dispatch = useDispatch();
	const history = useSelector(state => state.interactions.interactions)
	const error = useSelector(state => state.error.allInteractionError)
	const success = useSelector(state => state.success.allInteractionSuccess)
	const nodata = useSelector(state => state.nodata.allInteractionNoData)

	const [isLoading, setIsLoading] = useState(true)
	const [ID, setID] = useState()

	useEffect(() => {
		GetData()
	}, []);
	const GetData = async () => {
		const value = await AsyncStorage.getItem('ID')
		setID(value);
	}

	useEffect(() => {
		if (ID) {
			dispatch(AllInteractions(ID))
		}
	}, [ID])

	useEffect(() => {
		if (success || error || nodata) {
			setIsLoading(false)
		}
	}, [success, error, nodata])


	const [data, setData] = useState()
	useEffect(() => {
		if (history) {
			setData(history)
		}
	}, [history]);

	const search = (query) => {
		const searched = history.filter((interactions) => {
			return (interactions.title).toLowerCase().includes(query.toLowerCase());
		})
		setData(searched)
	}


	return (
<View style={{ flex:1 }}>  
		<ScrollView  style={{ flex: 1, backgroundColor: '#F1F1F1' }}>
			<View style={{ backgroundColor: '#F1F1F1' }}>
				<View style={{ flexDirection: 'row', height: 90 }}>
					<Pressable onPress={() => navigation.goBack()} style={{ padiingRight: 5 }}><Image style={{
						width: 22,
						height: 20,
						marginTop: 70,
						marginLeft: 30,
						tintColor: '#000'
					}} source={require('../assets/back_arrow.png')} alt={'Okay'} /></Pressable>
					<View style={{ width: '100%', marginTop: 0, paddingEnd: 90 }}>
						<Image
							style={{ width: 150, height: 40, marginTop: 60, alignSelf: 'center' }}
							source={require('../assets/logo.png')} alt={'Okay'} />
					</View>
				</View>
				<View>
					<TextInput onChangeText={text => search(text)} style={{
						backgroundColor: '#fff',
						marginHorizontal: 30,
						height: 50,
						borderRadius: 25,
						paddingHorizontal: 20,
						marginTop: 30,
						borderColor: 'black',
						fontSize: 17,
						elevation: 10
					}} placeholder={'Search'} />
					<Text style={{
						fontSize: 18,
						fontFamily: 'poppins_bold',
						width: '100%',
						textAlign: 'center',
						marginVertical: 20,
						padding: 0
					}}>Browse by History</Text>
				</View>
				{isLoading ?
					<View style={{ marginTop: 200 }}>
						<ActivityIndicator size={60} color="#13A3E1" />
					</View>
					:
					<>
						{nodata ? <View style={{}}>
							<Image source={require('../assets/nodata.png')}
								style={{ width: 260, height: 260, marginLeft: 80, marginBottom: -20, marginTop: 40 }} />
							<Text style={{ textAlign: 'center', fontFamily: 'poppins_medium' }}>No Data Found</Text>
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
										<SafeAreaView style={{
											backgroundColor: '#fff',
											borderRadius: 5,
											padding: 23,
											borderTopLeftRadius: 40,
											borderTopRightRadius: 40,
											marginTop: 9
										}}>
											<FlatList scrollEnabled={false} nestedScrollEnabled={true}
												style={{ marginHorizontal: 0, marginTop: 10 }} data={data} renderItem={({ item }) => (
													<Ripple rippleSize={200}
														onPress={() => navigation.push('JobDetails', { ID: item.job })}>
														<View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
															<Text numberOfLines={1} ellipsizeMode={"tail"} style={{
																fontSize: 15,
																fontWeight: 600,
																fontFamily: 'poppins_semibold',
																width: '70%'
															}}>{item.title}</Text>

															<Text style={{
																fontSize: 12,
																fontWeight: 200,
																fontFamily: 'poppins_light',
																marginLeft: 'auto',
																marginRight: 10
															}}>{moment(item.createddate).format("MMM Do YY")}</Text>
														</View>
														<View style={{
															backgroundColor: '#777777',
															height: 0.5,
															marginHorizontal: 10,
															marginVertical: 5
														}}></View>
													</Ripple>
												)} />
										</SafeAreaView>
									</>}
							</>}
					</>}
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
	)
}

export default History
