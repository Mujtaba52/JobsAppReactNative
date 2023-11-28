import React, { useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, Image, Pressable, SafeAreaView, ScrollView, Text, View } from 'react-native'
import Resume from './Resume'
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CVByUser } from "../API/actions/cvActions";
import Ripple from "react-native-material-ripple";

const ViewResume = ({ route, navigation }) => {

	const { ID } = route.params
	const { job } = route.params;
	const { offer } = route.params;

	// const { seeker } = route.params;



	const dispatch = useDispatch();
	const cv = useSelector((state) => state.cv.cv);
	const success = useSelector((state) => state.success.cvSuccess);
	const error = useSelector((state) => state.success.cvError);

	useEffect(() => {
		if (ID) {
			dispatch(CVByUser(ID));
		}
	}, [dispatch, ID]);

	// useEffect(() => {
	//     if (seeker) {
	//         dispatch(CVByUser(seeker));
	//     }
	// }, [dispatch, seeker]);



	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		if (success||error) {
			setIsLoading(false);
		}
	}, [success,error]);






	return (
		<View style={{ flex: 1 }}>
			<ScrollView>
				{isLoading ?
					<View style={{ marginTop: 400 }}>
						<ActivityIndicator size={60} color="#13A3E1" />
					</View>
					:
					<>
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
						<Text style={{ textAlign: 'center', fontSize: 19, fontFamily: 'poppins_semibold' }}>Resume</Text>
						<View style={{ marginTop: 10, paddingVertical: 10, marginHorizontal: 0, backgroundColor: 'white', width: '95%', marginLeft: 'auto', marginRight: 'auto' }}>
							<Text style={{ fontSize: 16, fontFamily: 'poppins_medium', color: 'black', textAlign: 'center' }}>{cv?.name}</Text>
							<Text style={{ fontSize: 11, fontFamily: 'poppins_medium', color: 'black', textAlign: 'center' }}>{cv?.address}</Text>
							<View style={{ flexDirection: "row", justifyContent: 'center', gap: 20, marginTop: 5 }}>
								<Text style={{ fontSize: 12, fontFamily: 'poppins_medium', color: 'black' }}>{cv?.phone}</Text>
								<Text style={{ fontSize: 12, fontFamily: 'poppins_medium', color: 'black' }}>{cv?.email}</Text>
							</View>
						</View>
						<View style={{ paddingHorizontal: 20, backgroundColor: 'white', width: '95%', marginLeft: 'auto', marginRight: 'auto', }}>
							<Text style={{ backgroundColor: 'black', height: 1, marginTop: 10, paddingHorizontal: 20 }}>-</Text>
							<Text style={{ textAlign: 'center', fontSize: 10, fontFamily: 'poppins_semibold', marginTop: 10 }}>{cv?.role}</Text>
							<Text style={{ backgroundColor: 'black', height: 1, marginTop: 10, paddingHorizontal: 20 }}>-</Text>

							<Text style={{ fontSize: 11, fontFamily: 'poppins_semibold', marginVertical: 10 }}>{cv?.statement}</Text>
							<Text style={{ fontSize: 14, fontFamily: 'poppins_semibold', marginVertical: 10, textAlign: 'center' }}>Key Skills</Text>
							<Text style={{ backgroundColor: 'black', height: 1, paddingHorizontal: 20 }}>-</Text>
							<SafeAreaView style={{ marginHorizontal: 20, marginVertical: 10 }}>
								<FlatList scrollEnabled={false} nestedScrollEnabled={true}
									data={cv?.skills} numColumns={3} renderItem={({ item }) => (
										<Text style={{ fontSize: 10, fontFamily: 'poppins_regular', flex: 1, paddingVertical: 2, color: 'black', marginLeft: 20 }}>
											{`\u2022 ${item.skill}`}
										</Text>
									)} />
							</SafeAreaView>
							<Text style={{ fontSize: 12, fontFamily: 'poppins_semibold', textAlign: 'center' }}>EMPLOYMENT HISTORY</Text>
							<Text style={{ backgroundColor: 'black', height: 1, paddingHorizontal: 20 }}>-</Text>
							<ScrollView style={{ marginHorizontal: 20, marginVertical: 10 }}>
								<FlatList scrollEnabled={false} nestedScrollEnabled={true}
									data={cv?.careers} renderItem={({ item }) => (
										<View>
											<View style={{ flexDirection: 'row', gap: 5 }}>
												<Text style={{ fontSize: 10, fontFamily: 'poppins_semibold', }}>
													{item.job}
												</Text>
												<Text style={{ color: 'gray' }}>|</Text>
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
											{/* <Text style={{ backgroundColor: 'black', height: 1, paddingHorizontal: 20 }}>-</Text> */}
										</View>
									)} />

							</ScrollView>
							<Text style={{ fontSize: 12, fontFamily: 'poppins_semibold', textAlign: 'center' }}>QUALIFICATIONS</Text>
							<Text style={{ backgroundColor: 'black', height: 1, paddingHorizontal: 20 }}>-</Text>
							<SafeAreaView style={{ marginHorizontal: 20, marginVertical: 10 }}>
								<FlatList scrollEnabled={false} nestedScrollEnabled={true}
									data={cv?.educations} renderItem={({ item }) => (
										<View >
											<View style={{ flexDirection: 'row', gap: 2 }}>
												<Text style={{ fontSize: 10, fontFamily: 'poppins_regular', }}>
													{item.qualification}
												</Text>
												<Text style={{ color: 'gray' }}>|</Text>
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
							<Text style={{ backgroundColor: 'black', height: 1, paddingHorizontal: 20 }}>-</Text>
							<SafeAreaView style={{ marginHorizontal: 20, marginVertical: 10 }}>
								<FlatList scrollEnabled={false} nestedScrollEnabled={true}
									data={cv?.courses} renderItem={({ item }) => (
										<View >
											<View style={{ flexDirection: 'row', gap: 5 }}>
												<Text style={{ fontSize: 10, fontFamily: 'poppins_regular', }}>
													{item.institute}
												</Text>
												<Text style={{ color: 'gray' }}>|</Text>
												<Text style={{ fontSize: 10, fontFamily: 'poppins_semibold', }}>
													{item.course}
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
							<Text style={{ fontSize: 14, fontFamily: 'poppins_semibold', marginVertical: 10, textAlign: 'center' }}>Interests</Text>
							<Text style={{ backgroundColor: 'black', height: 1, paddingHorizontal: 20 }}>-</Text>

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



			{offer !== 0 ?
				<Ripple>
					<Text style={{
						justifyContent: 'center',
						height: 50,
						fontSize: 15,
						fontFamily: 'poppins_bold',
						backgroundColor: '#13A3E1',
						color: 'white',
						width: 150,
						textAlign: "center",
						paddingVertical: 10,
						borderRadius: 25,
						paddingTop: 13,
						marginLeft:'auto',
						marginRight:'auto'
					}} >Already Sent</Text>
				</Ripple>
				:

				<View style={{
					flexDirection: 'row',
					justifyContent: "center",
					gap: 20,
					fontFamily: 'poppins_medium',
					paddingVertical: 10,
					backgroundColor: '#e8e8e8'
				}}>


					<Ripple onPress={() => navigation.push('AppliedUsers')} >
						<Text style={{
							justifyContent: 'center',
							height: 50,
							fontSize: 15,
							fontFamily: 'poppins_bold',
							backgroundColor: '#143D59',
							color: 'white',
							width: 150,
							textAlign: "center",
							paddingVertical: 10,
							borderRadius: 25,
							paddingTop: 13,
						}}>Ignore</Text>
					</Ripple>


					<Ripple onPress={() => navigation.push('OfferSend', { user: ID, job: job })}  >
						<Text style={{
							justifyContent: 'center',
							height: 50,
							fontSize: 15,
							fontFamily: 'poppins_bold',
							backgroundColor: '#13A3E1',
							color: 'white',
							width: 150,
							textAlign: "center",
							paddingVertical: 10,
							borderRadius: 25,
							paddingTop: 13,
						}}>Send Offer</Text>
					</Ripple>
				</View>
			}
		</View>
	)
}

export default ViewResume
