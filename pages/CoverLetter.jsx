import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Image, Pressable, Text, View } from 'react-native'
import { FlatList, GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import moment from "moment/moment";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CVByUser } from "../API/actions/cvActions";
import { applyJob, createCover } from "../API";

const data = [
	{ 'data': 'Enhanced domestic helicopter transfer sales by 60% in 2018/2019 via business-to-business concept ' },
	{ 'data': 'Implemented first helicopter medical evacuation service in Sri Lanka (2018) ' },
	{ 'data': 'Introduced media booth helicopter filming project for local television hostess (2018)   ' },
]


const CoverLetter = ({ route, navigation }) => {

	const { role } = route.params;
	const { intro } = route.params;
	const { body } = route.params;
	const { job } = route.params;

	const { user } = route.params;

	useEffect(() => {
		console.log(user)
	}, [user])




	const dispatch = useDispatch();

	const cv = useSelector((state) => state.cv.cv);
	const success = useSelector(state => state.success.cvSuccess);
	const error = useSelector(state => state.error.cvError);
	const nodata = useSelector(state => state.nodata.cvNoData);
	const date = moment().format("DD MMM YYYY")
	const [isLoading, setIsLoading] = useState(true)

	const [ID, setID] = useState()
	useEffect(() => {
		if (success || error || nodata) {
			setIsLoading(false)
		}
	}, [success, nodata, error])

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


	const ApplyJob = () => {
		const postDate = moment().format("YYYY-MM-DD")
		createCover(ID, job, postDate, role, intro, body).then(res => {
			console.log(res)
			const { data: { data } } = res;
			if (data.affectedRows === 1) {
				const cover = data.insertId;
				applyJob(job, ID, postDate, cover).then(res => {
					console.log(res)
					const { data: { data } } = res;
					if (data.affectedRows === 1) {
						navigation.push('Home')
					}
				})
			}
		})

	}

	return (
		<GestureHandlerRootView style={{ paddingBottom: 40 }}>
			{isLoading ?
				<View style={{ marginTop: 400 }}>
					<ActivityIndicator size={60} color="#13A3E1" />
				</View>
				:
				<>
					<ScrollView>
						<View style={{ flexDirection: 'row', height: 90 }}>
							<Pressable onPress={() => navigation.goBack()}
								style={{ paddingRight: 5 }}><Image style={{
									width: 22,
									height: 20,
									marginTop: 70,
									marginLeft: 30,
									tintColor: '#000'
								}} source={require('../assets/back_arrow.png')} alt={'Okay'} /></Pressable>
							<View style={{ width: '100%', marginTop: 0, paddingEnd: 90 }}>
								<Pressable onPress={() => navigation.push('Home')}><Image
									style={{ width: 150, height: 40, marginTop: 60, alignSelf: 'center' }}
									source={require('../assets/logo.png')} alt={'Okay'} /></Pressable>
							</View>
						</View>


						<View style={{ marginTop: 40, paddingVertical: 10, borderRadius: 20 }}>
							<Text style={{ fontSize: 16, fontFamily: 'poppins_medium', color: 'black', textAlign: 'center' }}>{cv?.name}</Text>
							<Text style={{ fontSize: 10, fontFamily: 'poppins_medium', color: 'black', textAlign: 'center' }}>{cv?.address}</Text>
							<View style={{ flexDirection: "row", justifyContent: 'center', gap: 20, marginTop: 5 }}>
								<Text style={{ fontSize: 10, fontFamily: 'poppins_medium', color: 'black' }}>{cv?.phone}</Text>
								<Text style={{ fontSize: 10, fontFamily: 'poppins_medium', color: 'black' }}>{cv?.email}</Text>
							</View>
						</View>
						<Text style={{ backgroundColor: 'gray', height: 1, marginTop: 10, marginHorizontal: 20 }}>-</Text>
						<View>
							<Text style={{ color: 'red', fontSize: 10, fontFamily: 'poppins_semibold', marginTop: 15, marginHorizontal: 20 }}>{date}</Text>
						</View>
						<Text style={{ fontSize: 10, fontFamily: 'poppins_semibold', marginTop: 15, marginHorizontal: 20 }}>Expression of interest: {role}</Text>
						<Text style={{ fontSize: 10, fontFamily: 'poppins_medium', marginTop: 15, marginHorizontal: 30 }}>{intro}</Text>
						<Text style={{ fontSize: 10, fontFamily: 'poppins_medium', marginTop: 15, marginHorizontal: 30 }}>{body}</Text>
						<GestureHandlerRootView style={{ backgroundColor: '#D3D3D3', marginHorizontal: 40, marginVertical: 10, paddingBottom: 20, }}>
							<SafeAreaView>
								<FlatList scrollEnabled={false} nestedScrollEnabled={true}
									data={cv?.careers} renderItem={({ item }) => (
										<Text style={{ fontSize: 10, fontFamily: 'poppins_semibold', flex: 1, paddingVertical: 2, color: 'black', marginLeft: 20 }}>
											{`\u2022 I was working as a ${item.job} in ${item.company} from ${item.timeperiod}`}
										</Text>
									)} />
							</SafeAreaView>
						</GestureHandlerRootView>
						<GestureHandlerRootView style={{ paddingBottom: 20, }}>
							<SafeAreaView>
								<FlatList scrollEnabled={false} nestedScrollEnabled={true}
									data={cv?.educations} renderItem={({ item }) => (
										<Text style={{ fontSize: 10, fontFamily: 'poppins_medium', marginTop: 3, marginHorizontal: 30 }}>I hold a {item.qualification}  degree completed in {item.institute} at {item.timeperiod}</Text>
									)} />
							</SafeAreaView>
						</GestureHandlerRootView>
						<Text style={{ fontSize: 10, fontFamily: 'poppins_medium', marginTop: -3, marginHorizontal: 30 }}>I am available at short notice to attend an interview, and I look forward to hearing further on my application. </Text>
						<Text style={{ fontSize: 12, fontFamily: 'poppins_medium', marginTop: 11, marginHorizontal: 30 }}>Your's Sincerly</Text>
						<Text style={{ fontSize: 12, fontFamily: 'poppins_semibold', marginTop: 10, marginHorizontal: 30, marginLeft: 'auto' }}>{cv?.name}</Text>
						<Pressable onPress={() => ApplyJob()} style={{ marginHorizontal: 120, paddingTop: 20 }}>
							<Text style={{ backgroundColor: '#13A3E1', color: 'white', fontSize: 16, fontFamily: 'poppins_medium', textAlign: 'center', paddingVertical: 6, borderRadius: 10 }}>Confirm</Text>
						</Pressable>
					</ScrollView>
					</>}
				</GestureHandlerRootView>
			)
}

			export default CoverLetter
