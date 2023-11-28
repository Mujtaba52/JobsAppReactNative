import React, { useEffect } from 'react'
import { useState } from 'react'
import { Pressable, View, Text, Image } from 'react-native'
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { fetchSeeker } from "../API/actions/seekerActions";
import VerificationStatusModal from '../Components/VerificationStatusModal';

const Verification = ({ navigation }) => {

	const dispatch = useDispatch();

	const check = useSelector(state => state.seeker.check)
	const checkCV = useSelector(state => state.cv.check)
	const seeker = useSelector(state => state.seeker.seeker)


	const [isComplete, setIsComplete] = useState(false)
	const [cv, setCv] = useState(false)
	const [verify, setVerify] = useState(false)
	const [plan, setPlan] = useState(false)
	const [text, setText] = useState('Please Complete your Profile First')

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
			if (!seeker) {
				dispatch(fetchSeeker(ID))
			} else if ((seeker.id).toString() !== ID) {
				dispatch(fetchSeeker(ID))
			}
		}
	}, [dispatch, seeker, ID, navigation]);

	useEffect(() => {
		console.log(seeker)
		if (seeker?.verified === "true") {
			setVerify(true)
			if (seeker?.plan !== 0) {
				setPlan(true)
			} else {
				setPlan(false)
			}
		} else {
			setVerify(false)
		}
	}, [seeker]);

	useEffect(() => {
		if (check === "complete") {
			setIsComplete(true)
		} else {
			setIsComplete(false)
		}
	}, [check]);

	useEffect(() => {
		if (checkCV === "complete") {
			setCv(true)
		} else {
			setCv(false)
		}
	}, [checkCV]);

	const click = (t) => {
		toggleVisibility();
		setText(t)
	}

	const [visible, setVisible] = useState(false)
	const toggleVisibility = () => setVisible(!visible)

	return (
		<View style={{}}>

			<VerificationStatusModal visible={visible} toggleVisibility={toggleVisibility} line={text} />
			<View style={{}}>
				<View style={{
					flexDirection: 'column',
					width: '100%',
					height: 90,
					marginBottom: 20
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
							<Text style={{
								marginTop: 67,
								alignSelf: 'center',
								fontSize: 16, fontFamily: 'poppins_medium', color: 'gray'
							}} >Complete Profile</Text>
						</View>
					</View>
				</View>
				<Image source={require('../assets/job.png')} style={{ width: 250, height: 150, marginLeft: 'auto', marginRight: 'auto' }} />
				<Text style={{ textAlign: 'center', fontFamily: 'poppins_semibold', fontSize: 16, }}>Few steps more to find your dream job</Text>
				<View style={{ marginHorizontal: 20 }}>
					<View style={{ flexDirection: 'row', gap: 4, paddingLeft: 10, marginTop: 20, padding: 2 }}>
						<Text style={{
							textAlign: 'center',
							color: 'black',
							fontSize: 14,
							fontFamily: 'poppins_bold',
						}}>1)</Text>
						<Text style={{
							textAlign: 'center',
							color: 'black',
							fontSize: 14,
							fontFamily: 'poppins_bold',
						}}>Complete your profile</Text>
					</View>
					{isComplete ?
						<View style={{ flexDirection: 'row', marginLeft: 10, gap: 10 }}>
							<Image style={{ width: 20, height: 20, marginTop: 5 }}
								source={require('../assets/verified.png')} />
							<Text style={{ color: 'green', fontSize: 14, fontFamily: 'poppins_bold', marginTop: 4 }}
							>Completed</Text>
						</View>
						:
						<Pressable onPress={() => navigation.push('PersonalInfo')} style={{ flexDirection: 'row', marginLeft: 10, gap: 10 }}>
							<Image style={{ width: 20, height: 20, marginTop: 5 }}
								source={require('../assets/unverified.png')} />
							<Text style={{ color: 'red', fontSize: 14, fontFamily: 'poppins_medium', marginTop: 4 }}
							>(complete now)</Text>
						</Pressable>
					}
					{/* <View style={{ flexDirection: 'row', marginLeft: 10, gap: 10 }}>
								<Image style={{ width: 20, height: 20, marginTop: 5 }}
									source={require('../assets/unverified.png')} />
								<Text onPress={() => navigation.push('ProviderProfile')} style={{ color: 'gray', fontSize: 14, fontFamily: 'poppins_bold', marginTop: 4 }}
								>(Complete Now)</Text>

							</View> */}


					<View style={{ flexDirection: 'row', gap: 4, paddingLeft: 10, marginTop: 10, padding: 2 }}>
						<Text style={{
							textAlign: 'center',
							color: 'black',
							fontSize: 14,
							fontFamily: 'poppins_bold',
						}}>2)</Text>

						<Text style={{
							textAlign: 'center',
							color: 'black',
							fontSize: 14,
							fontFamily: 'poppins_bold',
						}}>Create Your CV</Text>
					</View>

					{cv ?
						<View style={{ flexDirection: 'row', marginLeft: 10, gap: 10 }}>
							<Image style={{ width: 20, height: 20, marginTop: 5 }}
								source={require('../assets/verified.png')} />
							<Text style={{ color: 'green', fontSize: 14, fontFamily: 'poppins_bold', marginTop: 4 }}
							>Created</Text>
						</View>
						:
						<Pressable onPress={() => {
							if (isComplete) {
								navigation.push('AccountInfo', { role: seeker?.role })
							} else {
								click('Please Complete Your Profile First')
							}
						}}
							style={{ flexDirection: 'row', marginLeft: 10, gap: 10 }}>
							<Image style={{ width: 20, height: 20, marginTop: 5 }}
								source={require('../assets/unverified.png')} />
							<Text style={{ color: 'red', fontSize: 14, fontFamily: 'poppins_regular', marginTop: 4 }}
							>(Create CV)</Text>
						</Pressable>
					}

					<View style={{ flexDirection: 'row', gap: 4, paddingLeft: 10, marginTop: 10, padding: 2 }}>
						<Text style={{
							textAlign: 'center',
							color: 'black',
							fontSize: 14,
							fontFamily: 'poppins_bold',
						}}>3)</Text>

						<Text style={{
							textAlign: 'center',
							color: 'black',
							fontSize: 14,
							fontFamily: 'poppins_bold',
						}}>Verify your phone number</Text>
					</View>
					{verify ?
						<View style={{ flexDirection: 'row', marginLeft: 10, gap: 10 }}>
							<Image style={{ width: 20, height: 20, marginTop: 5 }}
								source={require('../assets/verified.png')} />
							<Text style={{ color: 'green', fontSize: 14, fontFamily: 'poppins_bold', marginTop: 4 }}
							>Verified</Text>
						</View>
						:
						<Pressable onPress={() => {
							if (cv) {
								navigation.push('PersonalInfo')
							} else {
								click('Complete your cv first')
							}
						}}
							style={{ flexDirection: 'row', marginLeft: 10, gap: 10 }}>
							<Image style={{ width: 20, height: 20, marginTop: 5 }}
								source={require('../assets/unverified.png')} />
							<Text style={{ color: 'red', fontSize: 14, fontFamily: 'poppins_medium', marginTop: 4 }}
							>(Verify now)</Text>
						</Pressable>

					}

					<View style={{ flexDirection: 'row', gap: 4, paddingLeft: 10, marginTop: 10, padding: 2 }}>
						<Text style={{
							textAlign: 'center',
							color: 'black',
							fontSize: 14,
							fontFamily: 'poppins_bold',
						}}>4)</Text>

						<Text style={{
							textAlign: 'center',
							color: 'black',
							fontSize: 14,
							fontFamily: 'poppins_bold',
						}}>Choose a plan </Text>
					</View>
					{plan ?
						<View style={{ flexDirection: 'row', marginLeft: 10, gap: 10 }}>
							<Image style={{ width: 20, height: 20, marginTop: 5 }}
								source={require('../assets/verified.png')} />
							<Text style={{ color: 'green', fontSize: 14, fontFamily: 'poppins_bold', marginTop: 4 }}
							>Purchased</Text>
						</View>
						:
						<Pressable onPress={() => {
							if (verify) {
								navigation.push('SeekerPlans')
							} else {
								click('Verify your phone first')
							}
						}}
							style={{ flexDirection: 'row', marginLeft: 10, gap: 10 }}>
							<Image style={{ width: 20, height: 20, marginTop: 5 }}
								source={require('../assets/unverified.png')} />
							<Text style={{ color: 'red', fontSize: 14, fontFamily: 'poppins_regular', marginTop: 4 }}
							>(Choose Plan)</Text>
						</Pressable>
					}

				</View>
			</View>
		</View>
	)
}

export default Verification
