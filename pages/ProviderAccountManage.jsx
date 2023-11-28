import React, { useEffect, useState } from 'react'
import {
	ActivityIndicator,
	BackHandler,
	FlatList,
	Image,
	Modal,
	Pressable,
	SafeAreaView,
	ScrollView,
	Text,
	TextInput,
	View
} from "react-native";
import { useDispatch, useSelector } from 'react-redux';
import { CompanyData } from '../API/actions/companyActions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CitySelectModal from "../Components/CitySelectModal";
import CountrySelectModal from "../Components/CountrySelectModal";
import ProviderTypeModal from "../Components/ProviderTypeModal";
import { AllCities } from "../API/actions/cityActions";
import { AllCountries } from "../API/actions/countryActions";
import PhoneInput from 'react-native-phone-number-input';
import PhoneModal from '../Components/PhoneModal';
import { updateCompany } from '../API';
import { RESET } from '../Utils/Constants';

const ProviderAccountManage = ({ navigation }) => {

	const dispatch = useDispatch();

	const [trigger, setTrigger] = useState(false)

	const [ID, setID] = useState()
	const [cityVisible, setCityVisible] = useState(false)
	const [countryVisible, setCountryVisible] = useState(false)
	const [type, setType] = useState(false)
	const [country, setCountry] = useState()
	const [citiesData, setCitiesData] = useState()


	const [nameCity, setNameCity] = useState()
	const [countryName, setCountryName] = useState()

	const [phoneCode, setPhoneCode] = useState('')

	const [verified, setVerified] = useState(false)


	const [data, setData] = useState({
		email: '',
		size: '',
		city: '',
		country: '',
		phone: '',
		headquater: '',
		type: ''
	})

	useEffect(() => {
		GetData()
	}, []);
	const GetData = async () => {
		const value = await AsyncStorage.getItem('ID')
		setID(value);
	}

	const company = useSelector(state => state.company.company)
	const success = useSelector(state => state.success.companySuccess)
	const error = useSelector(state => state.company.companyError)

	const [isLoading, setIsLoading] = useState(true)
	useEffect(() => {
		if (success || error) {
			setIsLoading(false)
		}
	}, [success, error])

	useEffect(() => {
		if (ID) {
			dispatch(CompanyData(ID))
		}
	}, [dispatch, ID, trigger]);


	useEffect(() => {
		console.log(company)
		if (company) {
			setData({
				...data,
				email: company?.email,
				size: company?.size,
				city: company?.city,
				country: company?.country,
				code: company?.code,
				phone: company?.phone,
				headquater: company?.headquater,
				type: company?.type
			})
			setCountry(company?.country)
			setPhoneCode(company?.code)
			setNameCity(company?.city_name)
			setCountryName(company?.country_name)
		}
	}, [company])

	const toggleVisibility = () => setCityVisible(!cityVisible)
	const toggleCountryVisibility = () => setCountryVisible(!countryVisible)
	const toggleType = () => setType(!type)

	const cities = useSelector(state => state.city.cities)
	const countries = useSelector(state => state.country.countries)


	useEffect(() => {
		if (!cities) {
			dispatch(AllCities())
		}
	}, [dispatch, cities]);

	useEffect(() => {
		if (!countries) {
			dispatch(AllCountries())
		}
	}, [dispatch, countries]);

	const cityClick = (item) => {
		setData({ ...data, city: item.id })
		toggleVisibility()
		setNameCity(item.name)
	}

	const countryClick = (item) => {
		setData({ ...data, country: item.id })
		setCountry(item.id)
		toggleCountryVisibility()
		setCountryName(item.name)
	}

	useEffect(() => {
		const searched = cities?.filter((data) => {
			return data.country === country
		})
		setCitiesData(searched)
	}, [country]);

	const typeClick = (value) => [
		setData({ ...data, type: value })
	]

	const [phoneVisible, setPhoneVisible] = useState(false)
	const togglePhoneVisible = () => setPhoneVisible(!phoneVisible)

	const UpdateCompany = async () => {
		await updateCompany(data.size, data.country, data.city, data.code, data.phone, data.headquater, data.email, data.type, ID).then(res => {
			console.log(res)
		})
		setTrigger(!trigger)
	}

	const setCode = (code) => {
		setPhoneCode(code)
		setData({ ...data, code: code })
		togglePhoneVisible()
	}

	return (
		<View style={{ flex: 1 }}  >
			<CitySelectModal visible={cityVisible} toggleVisibility={toggleVisibility} list={citiesData}
				click={cityClick} />
			<CountrySelectModal visible={countryVisible} toggleVisibility={toggleCountryVisibility} list={countries}
				click={countryClick} />

			<PhoneModal visible={phoneVisible} togglePhoneVisible={togglePhoneVisible} set={setCode} />

			<ProviderTypeModal visible={type} toggleVisibility={toggleType} click={typeClick} />
			{isLoading ?
				<View style={{ marginTop: 400 }}>
					<ActivityIndicator size={60} color="#13A3E1" />
				</View> : <>

					<ScrollView style={{ flex: 1, backgroundColor: '#F1F1F1', }} keyboardShouldPersistTaps='handled'>
						<View style={{ flexDirection: 'column', width: '100%', height: 240, backgroundColor: '#13A3E1' }}>
							<View style={{ flexDirection: 'row', height: 130 }}>
								<Pressable onPress={() => navigation.goBack()} style={{ padiingRight: 5 }}><Image style={{
									width: 22,
									height: 20,
									marginTop: 70,
									marginLeft: 30,
									marginBottom: 250,
									tintColor: '#fff'
								}} source={require('../assets/back_arrow.png')} alt={'Okay'} /></Pressable>
								<View style={{ width: '100%', marginTop: 0, paddingEnd: 90 }}>
									<Image style={{ width: 150, height: 40, marginTop: 60, alignSelf: 'center' }}
										source={require('../assets/logo.png')} alt={'Okay'} />
								</View>
							</View>
							<Text style={{
								color: '#fff',
								fontSize: 20,
								fontFamily: 'poppins_bold',
								width: '100%',
								textAlign: 'center',
								marginTop: 10
							}}>Company Details</Text>

							{company.verified ?
								''
								:
								<Text style={{
									color: '#fff',
									fontSize: 12,
									fontFamily: 'poppins_semibold',
									width: '60%',
									alignSelf: 'center',
									textAlign: 'center',
									marginTop: 5,
									backgroundColor: '#ff0000',
									borderRadius: 10,
									paddingTop: 1
								}}>Complete Your Profile</Text>
							}
						</View>

						<View style={{
							flexDirection: 'column',
							borderColor: '#b2b2b2',
							backgroundColor: '#fff',
							marginHorizontal: 10,
							marginRight: 30,
							marginLeft: 30,
							borderRadius: 30,
							marginTop: 20
						}}>
							<View style={{ flexDirection: 'row', flex: 1 }}>
								<View style={{
									flex: 0.7,
									backgroundColor: '#E6E6E6',
									borderTopLeftRadius: 30,
									borderColor: '#b2b2b2',
									borderWidth: 1,
									paddingHorizontal: 20,
									paddingVertical: 5
								}}>
									<Text style={{
										color: '#000',
										fontSize: 14,
										fontFamily: 'poppins_light',
										width: '100%',
										textAlign: 'left'
									}}>Name</Text>
								</View>
								<View style={{
									flex: 1.3,
									borderTopRightRadius: 30,
									borderColor: '#b2b2b2',
									borderWidth: 1,
									paddingHorizontal: 20,
									paddingVertical: 5
								}}>
									<TextInput
										editable={false}
										placeholder={'Missing!!!'} style={{
											color: '#000',
											fontSize: 14,
											fontFamily: 'poppins_medium',
											width: '100%',
											textAlign: 'left'
										}}> {company?.name} </TextInput>
								</View>
							</View>
							<View style={{ flexDirection: 'row', flex: 1, marginTop: -1 }}>
								<View style={{
									flex: 0.7,
									backgroundColor: '#E6E6E6',
									borderColor: '#b2b2b2',
									borderWidth: 1,
									paddingHorizontal: 20,
									paddingVertical: 5
								}}>
									<Text style={{
										color: '#000',
										fontSize: 14,
										fontFamily: 'poppins_light',
										width: '100%',
										textAlign: 'left'
									}}>Email</Text>
								</View>
								<View style={{
									flex: 1.3,
									borderColor: '#b2b2b2',
									borderWidth: 1,
									paddingHorizontal: 20,
									paddingVertical: 5
								}}>
									<TextInput
										onChangeText={text => setData({ ...data, email: text })}
										placeholder={'Missing!!!'} style={{
											color: '#000',
											fontSize: 14,
											fontFamily: 'poppins_medium',
											width: '100%',
											textAlign: 'left'
										}}>{company?.email}</TextInput>
								</View>
							</View>
							<View style={{ flexDirection: 'row', flex: 1, marginTop: -1 }}>
								<View style={{
									flex: 0.7,
									backgroundColor: '#E6E6E6',
									borderBottomLeftRadius: 30,
									borderColor: '#b2b2b2',
									borderWidth: 1,
									paddingHorizontal: 20,
									paddingVertical: 5
								}}>
									<Text style={{
										color: '#000',
										fontSize: 14,
										fontFamily: 'poppins_light',
										width: '100%',
										textAlign: 'left'
									}}>Headquater</Text>
								</View>
								<Pressable
									style={{
										flex: 1.3,
										borderBottomRightRadius: 30,
										borderColor: '#b2b2b2',
										borderWidth: 1,
										paddingHorizontal: 20,
										paddingVertical: 5
									}}>
									<View>
										<TextInput
											onChangeText={text => setData({ ...data, headquater: text })}
											placeholder={'Missing!!!'} style={{
												color: '#000',
												fontSize: 14,
												fontFamily: 'poppins_medium',
												width: '100%',
												textAlign: 'left'
											}}>{company?.headquater}</TextInput>
									</View>
								</Pressable>
							</View>
						</View>
						<View style={{
							flexDirection: 'column',
							borderColor: '#b2b2b2',
							backgroundColor: '#fff',
							marginHorizontal: 10,
							marginRight: 30,
							marginLeft: 30,
							borderRadius: 30,
							marginTop: 20
						}}>
							<View style={{ flexDirection: 'row', flex: 1 }}>
								<View style={{
									flex: 0.7,
									backgroundColor: '#E6E6E6',
									borderTopLeftRadius: 30,
									borderColor: '#b2b2b2',
									borderWidth: 1,
									paddingHorizontal: 20,
									paddingVertical: 5
								}}>
									<Text style={{
										color: '#000',
										fontSize: 14,
										fontFamily: 'poppins_light',
										width: '100%',
										textAlign: 'left'
									}}>Type</Text>
								</View>
								<View style={{
									flex: 1.3,
									borderTopRightRadius: 30,
									borderColor: '#b2b2b2',
									borderWidth: 1,
									paddingHorizontal: 20,
									paddingVertical: 5
								}}>
									<TextInput onChangeText={text => setData({ ...data, type: text })} editable={false}
										placeholder={'Missing!!!'} style={{
											color: '#000',
											fontSize: 14,
											fontFamily: 'poppins_medium',
											width: '100%',
											textAlign: 'left'
										}}>{company?.type}</TextInput>
								</View>
							</View>


							<View style={{ flexDirection: 'row', flex: 1, marginTop: -1 }}>
								<View style={{
									flex: 0.7,
									backgroundColor: '#E6E6E6',

									borderColor: '#b2b2b2',
									borderWidth: 1,
									paddingHorizontal: 20,
									paddingVertical: 5
								}}>
									<Text style={{
										color: '#000',
										fontSize: 14,
										fontFamily: 'poppins_light',
										width: '100%',
										textAlign: 'left'
									}}>Size</Text>
								</View>
								<View style={{
									flex: 1.3,
									borderColor: '#b2b2b2',
									borderWidth: 1,
									paddingHorizontal: 20,
									paddingVertical: 5
								}}>
									<TextInput onChangeText={text => setData({ ...data, size: text })}
										placeholder={'Missing!!!'} style={{
											color: '#000',
											fontSize: 14,
											fontFamily: 'poppins_medium',
											width: '100%',
											textAlign: 'left',
											paddingLeft: 2
										}}>{company?.size}</TextInput>
								</View>
							</View>

							<View style={{
								flexDirection: 'column',
								borderColor: '#b2b2b2',

							}}>

								<View style={{ flexDirection: 'row', flex: 1, marginTop: -1 }}>
									<View style={{
										flex: 0.7,
										backgroundColor: '#E6E6E6',
										borderColor: '#b2b2b2',
										borderWidth: 1,
										paddingHorizontal: 20,
										paddingVertical: 5
									}}>
										<Text style={{
											color: '#000',
											fontSize: 14,
											fontFamily: 'poppins_light',
											width: '100%',
											textAlign: 'left'
										}}>Country</Text>
									</View>
									<View style={{
										flex: 1.3,
										borderColor: '#b2b2b2',
										borderWidth: 1,
										paddingHorizontal: 20,
										paddingVertical: 5
									}}>
										<Pressable onPress={() => toggleCountryVisibility()}>
											<TextInput editable={false}
												onFocus={() => toggleCountryVisibility()}
												placeholder={'Missing!!!'}
												style={{
													color: '#000',
													fontSize: 14,
													fontFamily: 'poppins_medium',
													width: '100%',
													textAlign: 'left'
												}}> {countryName} </TextInput>
										</Pressable>
									</View>
								</View>


								<View style={{ flexDirection: 'row', flex: 1 }}>
									<View style={{
										flex: 0.7,
										backgroundColor: '#E6E6E6',
										borderColor: '#b2b2b2',
										borderWidth: 1,
										paddingHorizontal: 20,
										paddingVertical: 5,
										borderBottomLeftRadius: 20
									}}>
										<Text style={{
											color: '#000',
											fontSize: 14,
											fontFamily: 'poppins_light',
											width: '100%',
											textAlign: 'left'
										}}>City</Text>
									</View>
									<View style={{
										flex: 1.3,
										borderBottomRightRadius: 30,
										borderColor: '#b2b2b2',
										borderWidth: 1,
										paddingHorizontal: 20,
										paddingVertical: 5
									}}>
										<Pressable onPress={() => toggleVisibility()}>
											<TextInput editable={false}
												onFocus={() => toggleVisibility()}
												placeholder={'Missing!!!'}
												style={{
													color: '#000',
													fontSize: 14,
													fontFamily: 'poppins_medium',
													width: '100%',
													textAlign: 'left'
												}}> {nameCity} </TextInput>
										</Pressable>
									</View>
								</View>
							</View>
						</View>
						<View style={{ flexDirection: 'row', marginTop: 20, marginHorizontal: 15, elevation: 10, }}>
							<TextInput editable={false} style={{
								textAlign: 'center',
								paddingVertical: 10,
								borderColor: '#b2b2b2',
								backgroundColor: 'white',
								borderWidth: 1,
								width: '20%',
								borderTopLeftRadius: 25,
								borderBottomLeftRadius: 25,
								marginLeft: 'auto'
							}} placeholder="country code">{phoneCode}</TextInput>
							<TextInput editable={false}
								keyboardType='numeric'
								onChangeText={text => setData({ ...data, phone: text })}
								placeholder="Enter Your Number" style={{
									textAlign: 'left',
									paddingHorizontal: 8,
									paddingVertical: 10,
									width: '72%',
									borderColor: '#b2b2b2',
									borderTopRightRadius: 25,
									borderBottomRightRadius: 25,
									borderTopWidth: 1,
									borderBottomWidth: 1,
									borderRightWidth: 1,
									backgroundColor: 'white',
									marginRight: 'auto',
									color: 'black'
								}}>{data?.phone}</TextInput>
						</View>
						<Pressable onPress={() => UpdateCompany()} style={{
							backgroundColor: '#13A3E1',
							borderRadius: 25,
							alignItems: 'center',
							padding: 15,
							marginTop: 15,
							marginHorizontal: 25
						}}>
							<Text style={{ color: '#fff', fontWeight: '800', fontSize: 15 }}
							>Update
							</Text>
						</Pressable>
						{company?.account !== "GOOGLE" ?
							<Pressable onPress={() => {
								if (verified) {
									navigation.push('Verify', {
										code: company?.code,
										verifyPhone: company?.phone,
										type: "PROVIDER",
										verify: false,
										forgot: true,
										ID: ID
									})
								} else {
									navigation.push('Verify', {
										code: company?.code,
										verifyPhone: company?.phone,
										type: "PROVIDER",
										verify: false,
										ID: ID
									})
								}
							}}

								style={{
									borderColor: '#000',
									backgroundColor: '#000',
									borderWidth: 1,
									borderRadius: 25,
									alignItems: 'center',
									padding: 15,
									marginTop: 15,
									marginHorizontal: 25
								}}><Text style={{ color: '#fff', fontWeight: '800', fontSize: 15 }}>Change Password</Text></Pressable>
							:
							<Pressable onPress={() => null
							}

								style={{
									borderColor: '#000',
									backgroundColor: '#000',
									borderWidth: 1,
									borderRadius: 25,
									alignItems: 'center',
									padding: 15,
									marginTop: 15,
									marginHorizontal: 25
								}}><Text style={{ color: '#fff', fontWeight: '800', fontSize: 15 }}>Log In Using Google</Text></Pressable>
						}
					</ScrollView>
				</>}
		</View>
	)
}

export default ProviderAccountManage
