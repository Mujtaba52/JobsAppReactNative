import {
	ActivityIndicator,
	FlatList,
	Image,
	Pressable,
	SafeAreaView,
	ScrollView,
	Text,
	TextInput,
	View
} from "react-native";
import React, { useEffect, useState } from "react";
import EducationModal from "../Components/EducationModal";
import SkillModal from "../Components/SkillModal";
import InterestModal from "../Components/InterestModal";
import LanguageModal from "../Components/LanguageModal";
import ResumeModal from "../Components/ResumeModal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import {
	CheckCV,
	CVByUser,
	CVCareer,
	CVCourse,
	CVEducation,
	CVInterest,
	CVLanguage,
	CVResume,
	CVSkill
} from "../API/actions/cvActions";
import CareerModal from "../Components/CareerModal";
import CourseModal from "../Components/CourseModal";
import {
	cvStatement,
	deleteCVCareer,
	deleteCVCourse,
	deleteCVEducation,
	deleteCVInterest,
	deleteCVLanguage,
	deleteCVResume,
	deleteCVSkill,
	roleUpdate,
	updateCVCareer,
	updateCVCourse,
	updateCVEducation,
	updateCVInterest,
	updateCVLanguage,
	// updateCVResume,
	updateCVSkill
} from "../API";
import PersonalStatementModal from "../Components/PersonalStatementModal";
import RoleModal from "../Components/RoleModal";
import DeleteModal from "../Components/DeleteModal";

function AccountInfo({ route, navigation }) {

	const { role } = route.params

	const dispatch = useDispatch()

	const cv = useSelector(state => state.cv.cv);
	const data = useSelector(state => state.nodata.cvNoData);
	const error = useSelector(state => state.error.cvError);
	const success = useSelector(state => state.success.cvSuccess);

	const [roleData, setRoleData] = useState(role)
	const [educationVisible, setEducationVisible] = useState(false)
	const [careerVisible, setCareerVisible] = useState(false)
	const [courseVisible, setCourseVisible] = useState(false)
	const [skillVisible, setSkillVisible] = useState(false)
	const [interestVisible, setInterestVisible] = useState(false)
	const [languageVisible, setLanguageVisible] = useState(false)
	const [deleteVisible, setDeleteVisible] = useState(false)
	const [edData, setEdData] = useState(null)
	const [carData, setCarData] = useState(null)
	const [couData, setCouData] = useState(null)
	const [inData, setInData] = useState(null)
	const [lanData, setLanData] = useState(null)
	const [resData, setResData] = useState(null)
	const [skData, setSkData] = useState(null)
	const [delV, setDelV] = useState()
	const [delID, setDelID] = useState()
	const [delVal, setDelVal] = useState('')
	const [delLoad, setDelLoad] = useState(false)
	const [trigger, setTrigger] = useState(false)
	const [isloading, setIsLoading] = useState(true)
	const [ID, setID] = useState()
	const [infoVisible, setInfoVisible] = useState(false)
	const [roleVisible, setRoleVisible] = useState(false)


	useEffect(() => {
		GetData()
	}, []);
	const GetData = async () => {
		const value = await AsyncStorage.getItem('ID')
		setID(value);
	}

	useEffect(() => {
		if (ID) {
			dispatch(CVByUser(ID))
			setIsLoading(true)
		}
	}, [ID, trigger])

	useEffect(() => {
		if (ID) {
			dispatch(CheckCV(ID))
		}
	}, [cv]);

	const editEducation = (d) => {
		setEdData(d)
		toggleEducationVisibility()
	}

	const editCareer = (d) => {
		setCarData(d)
		toggleCareerVisibility()
	}

	const editCourse = (d) => {
		setCouData(d)
		toggleCourseVisibility()
	}

	const editInterest = (d) => {
		setInData(d)
		toggleInterestVisibility()
	}

	const editLanguage = (d) => {
		setLanData(d)
		toggleLanguageVisibility()
	}

	// const editResume = (d) => {
	// 	setResData(d)
	// 	toggleResumeVisibility()
	// }

	const editSkill = (d) => {
		setSkData(d)
		toggleSkillVisibility()
	}

	const addRole = async (role) => {
		await roleUpdate(role, ID).then(res => {
			setRoleData(role)
		}).catch(err => {
			console.log(err)
		})
	}

	const addPersonalInfo = async (statement) => {
		await cvStatement(cv.id, statement).then(res => {
			setTrigger(!trigger)
		})
	}

	const addEducation = (qualification, timeperiod, institute) => {
		dispatch(CVEducation(cv.id, qualification, timeperiod, institute))
		setTrigger(!trigger)
	}

	const updateEducation = async (qualification, timeperiod, institute, id) => {
		await updateCVEducation(cv.id, qualification, timeperiod, institute, id).then(res => {
			setTrigger(!trigger)
			setEdData(null)
		})
	}

	const deleteEducation = async (id) => {
		await deleteCVEducation(id).then(res => {
			setTrigger(!trigger)
			setDelVal('')
			toggleDeleteVisibile('', 0)
			setDelLoad(false)
		})
	}

	const addCareer = (company, job, timeperiod, address, phone) => {
		dispatch(CVCareer(cv.id, company, job, timeperiod, address, phone))
		setTrigger(!trigger)
	}

	const updateCareer = async (company, job, timeperiod, address, phone, id) => {
		await updateCVCareer(cv.id, company, job, timeperiod, address, phone, id).then(res => {
			setTrigger(!trigger)
			setCarData(null)
		})
	}

	const deleteCareer = async (id) => {
		await deleteCVCareer(id).then(res => {
			setTrigger(!trigger)
			setDelVal('')
			toggleDeleteVisibile('', 0)
			setDelLoad(false)
		})
	}

	const addCourse = (course, timeperiod, institute) => {
		dispatch(CVCourse(cv.id, course, timeperiod, institute))
		setTrigger(!trigger)
	}

	const updateCourse = async (course, timeperiod, institute, id) => {
		await updateCVCourse(cv.id, course, timeperiod, institute, id).then(res => {
			setTrigger(!trigger)
			setCouData(null)
		})
	}

	const deleteCourse = async (id) => {
		await deleteCVCourse(id).then(res => {
			setTrigger(!trigger)
			setDelVal('')
			toggleDeleteVisibile('', 0)
			setDelLoad(false)
		})
	}

	const addInterest = (interest) => {
		dispatch(CVInterest(cv.id, interest))
		setTrigger(!trigger)
	}

	const updateInterest = async (interest, id) => {
		await updateCVInterest(cv.id, interest, id).then(res => {
			setTrigger(!trigger)
			setInData(null)
		})
	}

	const deleteInterest = async (id) => {
		await deleteCVInterest(id).then(res => {
			setTrigger(!trigger)
			setDelVal('')
			toggleDeleteVisibile('', 0)
			setDelLoad(false)
		})
	}

	const addLanguage = (language) => {
		dispatch(CVLanguage(cv.id, language))
		setTrigger(!trigger)
	}

	const updateLanguage = async (language, id) => {
		await updateCVLanguage(cv.id, language, id).then(res => {
			setTrigger(!trigger)
			setLanData(null)
		})
	}

	const deleteLanguage = async (id) => {
		await deleteCVLanguage(id).then(res => {
			setTrigger(!trigger)
			setDelVal('')
			toggleDeleteVisibile('', 0)
			setDelLoad(false)
		})
	}

	const addResume = (resume) => {
		dispatch(CVResume(cv.id, resume))
		setTrigger(!trigger)
	}

	// const updateResume = async (resume, id) => {
	// 	await updateCVResume(cv.id, resume, id).then(res => {
	// 		setTrigger(!trigger)
	// 		setResData(null)
	// 	})
	// }

	const deleteResume = async (id) => {
		await deleteCVResume(id).then(res => {
			setTrigger(!trigger)
			setDelVal('')
			toggleDeleteVisibile('', 0)
			setDelLoad(false)
		})
	}

	const addSkill = (skill) => {
		dispatch(CVSkill(cv.id, skill))
		setTrigger(!trigger)
	}

	const updateSkill = async (skill, id) => {
		await updateCVSkill(cv.id, skill, id).then(res => {
			setTrigger(!trigger)
			setSkData(null)
		})
	}

	const deleteSkill = async (id) => {
		await deleteCVSkill(id).then(res => {
			setTrigger(!trigger)
			setDelVal('')
			toggleDeleteVisibile('', 0)
			setDelLoad(false)
		})
	}

	const toggleEducationVisibility = () => setEducationVisible(!educationVisible);
	const toggleCareerVisibility = () => setCareerVisible(!careerVisible);
	const toggleCourseVisibility = () => setCourseVisible(!courseVisible);
	const toggleSkillVisibility = () => setSkillVisible(!skillVisible)
	const toggleInterestVisibility = () => setInterestVisible(!interestVisible)
	const toggleLanguageVisibility = () => setLanguageVisible(!languageVisible)
	const toggleDeleteVisibile = (val, id) => {
		setDelV(val)
		setDelID(id)
		setDeleteVisible(!deleteVisible)
	}

	useEffect(() => {
		if (delVal === "EDUCATION") {
			deleteEducation(delID)
		} else if (delVal === "CAREER") {
			deleteCareer(delID)
		} else if (delVal === "COURSE") {
			deleteCourse(delID)
		} else if (delVal === "SKILL") {
			deleteSkill(delID)
		} else if (delVal === "INTEREST") {
			deleteInterest(delID)
		} else if (delVal === "LANGUAGE") {
			deleteLanguage(delID)
		} else if (delVal === "RESUME") {
			deleteResume(delID)
		}
	}, [delVal]);


	useEffect(() => {
		if (success || error || data) {
			setIsLoading(false)
		}
	}, [success, error, data])

	// personalInfo Modal==============

	const toggleInfoVisibility = () => setInfoVisible(!infoVisible)


	const toggleRoleVisibility = () => setRoleVisible(!roleVisible)
	return (
		<View style={{ flex: 1 }}>
			{isloading ?
				<View style={{ marginTop: 400 }}>
					<ActivityIndicator size={60} color="#13A3E1" />
				</View>
				:
				<>
					{data ? <View style={{ marginTop: 200 }}>
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

									<DeleteModal visible={deleteVisible} toggleVisibility={toggleDeleteVisibile} del={setDelVal} val={delV} setLoad={setDelLoad} isLoad={delLoad} />
									<EducationModal visible={educationVisible}
										toggleEducationVisibility={toggleEducationVisibility}
										add={addEducation} edit={updateEducation} data={edData} />
									<CareerModal visible={careerVisible} toggleCareerVisibility={toggleCareerVisibility}
										add={addCareer} edit={updateCareer} data={carData} />
									<CourseModal visible={courseVisible} toggleCourseVisibility={toggleCourseVisibility}
										add={addCourse} edit={updateCourse} data={couData} />
									<SkillModal visible={skillVisible} toggleSkillVisibility={toggleSkillVisibility}
										add={addSkill} edit={updateSkill} data={skData} />
									<InterestModal visible={interestVisible}
										toggleInterestVisibility={toggleInterestVisibility}
										add={addInterest} edit={updateInterest} data={inData} />
									<LanguageModal visible={languageVisible}
										toggleLanguageVisibility={toggleLanguageVisibility}
										add={addLanguage} edit={updateLanguage} data={lanData} />

									<PersonalStatementModal visible={infoVisible}
										toggleInfoVisibility={toggleInfoVisibility}
										add={addPersonalInfo} />
									<RoleModal visible={roleVisible}
										toggleRoleVisibility={toggleRoleVisibility} add={addRole}
									/>

									<ScrollView style={{ flex: 1, backgroundColor: '#F1F1F1' }}>
										<View style={{
											flexDirection: 'column',
											width: '100%',
											height: 240,
											backgroundColor: '#13A3E1'
										}}>
											<View style={{ flexDirection: 'row', height: 130 }}>
												<Pressable onPress={() => navigation.goBack()}
													style={{ paddingRight: 5 }}><Image style={{
														width: 22,
														height: 20,
														marginTop: 70,
														marginLeft: 30,
														marginBottom: 250,
														tintColor: '#fff'
													}} source={require('../assets/back_arrow.png')}
														alt={'Okay'} /></Pressable>
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
											<Text style={{
												color: '#fff',
												fontSize: 18,
												fontFamily: 'poppins_regular',
												width: '100%',
												textAlign: 'center'
											}}>Account Info</Text>
											<Pressable onPress={() => navigation.push('Resume')} style={{
												backgroundColor: '#fff',
												borderRadius: 25,
												alignItems: 'center',
												padding: 15,
												marginTop: 15,
												marginHorizontal: 100
											}}>
												<Text style={{ color: '#000', fontWeight: '800', fontSize: 15 }}>Build CV</Text>
											</Pressable>
										</View>
										{isloading ?
											<View style={{ marginTop: 200 }}>
												<ActivityIndicator size={60} color="#13A3E1" />
											</View>
											:
											<>
												<View style={{
													flexDirection: 'column',
													borderColor: '#b2b2b2',
													backgroundColor: '#fff',
													padding: 20,
													marginHorizontal: 10,
													marginRight: 30,
													marginLeft: 30,
													borderRadius: 30,
													marginTop: 20
												}}>

													<View style={{ flexDirection: 'row' }}>
														<Text style={{
															fontFamily: 'poppins_bold',
															fontSize: 16
														}}>Role</Text>
														<Pressable onPress={() => toggleRoleVisibility()} style={{
															backgroundColor: '#e7e7e7',
															borderRadius: 25,
															alignItems: 'center',
															paddingVertical: 5,
															paddingHorizontal: 15,
															marginLeft: 'auto'
														}}>
															<View><Text
																style={{
																	color: '#000',
																	fontFamily: 'poppins_medium',
																	fontSize: 12
																}}>Update</Text>
															</View></Pressable>
													</View>
													<TextInput placeholder="Role" editable={false} style={{ flex: 1, textAlign: 'center', color: '#757575', fontFamily: 'poppins_light', margin: 15 }}>{roleData}</TextInput>

												</View>
												<View style={{
													flexDirection: 'column',
													borderColor: '#b2b2b2',
													backgroundColor: '#fff',
													padding: 20,
													marginHorizontal: 10,
													marginRight: 30,
													marginLeft: 30,
													borderRadius: 30,
													marginTop: 20
												}}>

													<View style={{ flexDirection: 'row' }}>
														<Text style={{
															fontFamily: 'poppins_bold',
															fontSize: 16
														}}>Personal Info</Text>
														<Pressable onPress={() => toggleInfoVisibility()} style={{
															backgroundColor: '#e7e7e7',
															borderRadius: 25,
															alignItems: 'center',
															paddingVertical: 5,
															paddingHorizontal: 15,
															marginLeft: 'auto'
														}}>
															<View><Text
																style={{
																	color: '#000',
																	fontFamily: 'poppins_medium',
																	fontSize: 12
																}}>Update</Text>
															</View></Pressable>
													</View>
													<Text style={{ flex: 1, textAlign: 'center', color: '#757575', fontFamily: 'poppins_light', margin: 15 }}>{cv?.statement}</Text>

												</View>

												<View style={{
													flexDirection: 'column',
													borderColor: '#b2b2b2',
													backgroundColor: '#fff',
													padding: 20,
													marginHorizontal: 10,
													marginRight: 30,
													marginLeft: 30,
													borderRadius: 30,
													marginTop: 20
												}}>
													<View style={{ flexDirection: 'row' }}>
														<Text style={{
															fontFamily: 'poppins_bold',
															fontSize: 16
														}}>Education</Text>
														<Pressable onPress={() => toggleEducationVisibility()} style={{
															backgroundColor: '#e7e7e7',
															borderRadius: 25,
															alignItems: 'center',
															paddingVertical: 5,
															paddingHorizontal: 15,
															marginLeft: 'auto'
														}}><Text
															style={{
																color: '#000',
																fontFamily: 'poppins_medium',
																fontSize: 12
															}}>Add</Text></Pressable>
													</View>
													<SafeAreaView style={{
														flex: 1,
														minHeight: 90,
														justifyContent: 'center',
														alignItems: 'center'
													}}>
														{cv?.educations.length === 0 ?
															<Text
																style={{ fontFamily: 'poppins_light', color: '#a6a6a6' }}>No
																Education Added</Text>
															:
															<FlatList scrollEnabled={false} nestedScrollEnabled={true}
																style={{
																	marginVertical: 15,
																	width: '100%',
																	paddingHorizontal: 15
																}}
																data={cv?.educations}
																renderItem={({ item }) => (
																	<View
																		style={{
																			flex: 1,
																			flexDirection: 'row',
																			margin: 7,
																			backgroundColor: '#fff',
																			alignItems: 'center',
																			borderRadius: 10,
																			borderColor: '#939393',
																			borderWidth: 0.5,
																			// padding: 10,
																			paddingHorizontal: 10
																		}}>
																		<Text style={{
																			fontFamily: 'poppins_light',
																			fontSize: 12,
																		}}>{item.qualification}</Text>
																		<Pressable style={{ marginLeft: 'auto', padding: 10 }} onPress={() => editEducation({ id: item.id, degree: item.qualification, institute: item.institute, timeperiod: item.timeperiod })}><Image style={{
																			width: 15,
																			height: 15
																		}}
																			source={require('../assets/editIcon.png')} />
																		</Pressable>
																		<Pressable onPress={() => toggleDeleteVisibile('EDUCATION', item.id)} style={{ padding: 10 }} ><Image style={{
																			width: 19,
																			height: 19,
																			tintColor: 'red'
																		}}
																			source={require('../assets/cvDelete.png')} /></Pressable>
																	</View>
																)}
															/>
														}
													</SafeAreaView>
												</View>
												<View style={{
													flexDirection: 'column',
													borderColor: '#b2b2b2',
													backgroundColor: '#fff',
													padding: 20,
													marginHorizontal: 10,
													marginRight: 30,
													marginLeft: 30,
													borderRadius: 30,
													marginTop: 20
												}}>
													<View style={{ flexDirection: 'row' }}>
														<Text style={{
															fontFamily: 'poppins_bold',
															fontSize: 16
														}}>Career</Text>
														<Pressable onPress={() => toggleCareerVisibility()} style={{
															backgroundColor: '#e7e7e7',
															borderRadius: 25,
															alignItems: 'center',
															paddingVertical: 5,
															paddingHorizontal: 15,
															marginLeft: 'auto'
														}}><Text
															style={{
																color: '#000',
																fontFamily: 'poppins_medium',
																fontSize: 12
															}}>Add</Text></Pressable>
													</View>
													<SafeAreaView style={{
														flex: 1,
														minHeight: 90,
														justifyContent: 'center',
														alignItems: 'center'
													}}>
														{cv?.careers.length === 0 ?
															<Text
																style={{ fontFamily: 'poppins_light', color: '#a6a6a6' }}>No
																Career Added</Text>
															:
															<FlatList scrollEnabled={false} nestedScrollEnabled={true}
																style={{
																	marginVertical: 15,
																	width: '100%',
																	paddingHorizontal: 15
																}}
																data={cv?.careers}
																renderItem={({ item }) => (
																	<View
																		style={{
																			flex: 1,
																			flexDirection: 'row',
																			margin: 7,
																			backgroundColor: '#fff',
																			alignItems: 'center',
																			borderRadius: 10,
																			borderColor: '#939393',
																			borderWidth: 0.5,
																			paddingHorizontal: 10,

																		}}>
																		<Text style={{
																			fontFamily: 'poppins_light',
																			fontSize: 12,

																		}}>{item.company}</Text>
																		<Pressable style={{ marginLeft: 'auto', padding: 10 }} onPress={() => editCareer({ company: item.company, job: item.job, timeperiod: item.timeperiod, address: item.address, phone: item.phone, id: item.id })}><Image style={{
																			width: 15,
																			height: 15,
																		}}
																			source={require('../assets/editIcon.png')} /></Pressable>
																		<Pressable onPress={() => toggleDeleteVisibile('CAREER', item.id)} style={{ padding: 10 }} ><Image style={{
																			width: 19,
																			height: 19,
																			tintColor: 'red'
																		}}
																			source={require('../assets/cvDelete.png')} /></Pressable>
																	</View>
																)}
															/>
														}
													</SafeAreaView>
												</View>
												<View style={{
													flexDirection: 'column',
													borderColor: '#b2b2b2',
													backgroundColor: '#fff',
													padding: 20,
													marginHorizontal: 10,
													marginRight: 30,
													marginLeft: 30,
													borderRadius: 30,
													marginTop: 20
												}}>
													<View style={{ flexDirection: 'row' }}>
														<Text style={{
															fontFamily: 'poppins_bold',
															fontSize: 16
														}}>Courses</Text>
														<Pressable onPress={() => toggleCourseVisibility()} style={{
															backgroundColor: '#e7e7e7',
															borderRadius: 25,
															alignItems: 'center',
															paddingVertical: 5,
															paddingHorizontal: 15,
															marginLeft: 'auto'
														}}><Text
															style={{
																color: '#000',
																fontFamily: 'poppins_medium',
																fontSize: 12
															}}>Add</Text></Pressable>
													</View>
													<SafeAreaView style={{
														flex: 1,
														minHeight: 90,
														justifyContent: 'center',
														alignItems: 'center'
													}}>
														{cv?.courses.length === 0 ?
															<Text
																style={{ fontFamily: 'poppins_light', color: '#a6a6a6' }}>No
																Course Added</Text>
															:
															<FlatList scrollEnabled={false} nestedScrollEnabled={true}
																style={{
																	marginVertical: 15,
																	width: '100%',
																	paddingHorizontal: 15
																}}
																data={cv?.courses}
																renderItem={({ item }) => (
																	<View
																		style={{
																			flex: 1,
																			flexDirection: 'row',
																			margin: 7,
																			backgroundColor: '#fff',
																			alignItems: 'center',
																			borderRadius: 10,
																			borderColor: '#939393',
																			borderWidth: 0.5,
																			paddingHorizontal: 10
																		}}>
																		<Text style={{
																			fontFamily: 'poppins_light',
																			fontSize: 12,
																		}}>{item.course}</Text>
																		<Pressable style={{ marginLeft: 'auto', padding: 10 }} onPress={() => editCourse({ course: item.course, timeperiod: item.timeperiod, institute: item.institute, id: item.id })}><Image style={{
																			width: 15,
																			height: 15,
																		}}
																			source={require('../assets/editIcon.png')} /></Pressable>
																		<Pressable onPress={() => toggleDeleteVisibile('COURSE', item.id)} style={{ padding: 10 }} ><Image style={{
																			width: 19,
																			height: 19,
																			tintColor: 'red'
																		}}
																			source={require('../assets/cvDelete.png')} /></Pressable>
																	</View>
																)}
															/>
														}
													</SafeAreaView>
												</View>
												<View style={{
													flexDirection: 'column',
													borderColor: '#b2b2b2',
													backgroundColor: '#fff',
													padding: 20,
													marginHorizontal: 10,
													marginRight: 30,
													marginLeft: 30,
													borderRadius: 30,
													marginTop: 20
												}}>
													<View style={{ flexDirection: 'row' }}>
														<Text style={{
															fontFamily: 'poppins_bold',
															fontSize: 16
														}}>Skills</Text>
														<Pressable onPress={() => toggleSkillVisibility()} style={{
															backgroundColor: '#e7e7e7',
															borderRadius: 25,
															alignItems: 'center',
															paddingVertical: 5,
															paddingHorizontal: 15,
															marginLeft: 'auto'
														}}><Text
															style={{
																color: '#000',
																fontFamily: 'poppins_medium',
																fontSize: 12
															}}>Add</Text></Pressable>
													</View>
													<SafeAreaView style={{
														flex: 1,
														minHeight: 90,
														justifyContent: 'center',
														alignItems: 'center'
													}}>
														{cv?.skills.length === 0 ?
															<Text
																style={{ fontFamily: 'poppins_light', color: '#a6a6a6' }}>No
																Skills Added</Text>
															:
															<FlatList scrollEnabled={false} nestedScrollEnabled={true}
																style={{
																	marginVertical: 15,
																	width: '100%',
																	paddingHorizontal: 15
																}}
																data={cv?.skills}
																renderItem={({ item }) => (
																	<View
																		style={{
																			flex: 1,
																			flexDirection: 'row',
																			margin: 7,
																			backgroundColor: '#fff',
																			alignItems: 'center',
																			borderRadius: 10,
																			borderColor: '#939393',
																			borderWidth: 0.5,
																			paddingHorizontal: 10
																		}}>
																		<Text style={{
																			fontFamily: 'poppins_light',
																			fontSize: 12,
																		}}>{item.skill}</Text>
																		<Pressable style={{ marginLeft: 'auto', padding: 10 }} onPress={() => editSkill({ skill: item.skill, id: item.id })}><Image style={{
																			width: 15,
																			height: 15,
																		}}
																			source={require('../assets/editIcon.png')} /></Pressable>
																		<Pressable onPress={() => toggleDeleteVisibile('SKILL', item.id)} style={{ padding: 10 }} ><Image style={{
																			width: 19,
																			height: 19,
																			tintColor: 'red'
																		}}
																			source={require('../assets/cvDelete.png')} /></Pressable>
																	</View>
																)}
															/>
														}
													</SafeAreaView>
												</View>
												<View style={{
													flexDirection: 'column',
													borderColor: '#b2b2b2',
													backgroundColor: '#fff',
													padding: 20,
													marginHorizontal: 10,
													marginRight: 30,
													marginLeft: 30,
													borderRadius: 30,
													marginTop: 20
												}}>
													<View style={{ flexDirection: 'row' }}>
														<Text style={{
															fontFamily: 'poppins_bold',
															fontSize: 16
														}}>Interests</Text>
														<Pressable onPress={() => toggleInterestVisibility()} style={{
															backgroundColor: '#e7e7e7',
															borderRadius: 25,
															alignItems: 'center',
															paddingVertical: 5,
															paddingHorizontal: 15,
															marginLeft: 'auto'
														}}><Text
															style={{
																color: '#000',
																fontFamily: 'poppins_medium',
																fontSize: 12
															}}>Add</Text></Pressable>
													</View>
													<SafeAreaView style={{
														flex: 1,
														minHeight: 90,
														justifyContent: 'center',
														alignItems: 'center'
													}}>
														{cv?.interests.length === 0 ?
															<Text
																style={{ fontFamily: 'poppins_light', color: '#a6a6a6' }}>No
																Interest Added</Text>
															:
															<FlatList scrollEnabled={false} nestedScrollEnabled={true}
																style={{
																	marginVertical: 15,
																	width: '100%',
																	paddingHorizontal: 15
																}}
																data={cv?.interests}
																renderItem={({ item }) => (
																	<View
																		style={{
																			flex: 1,
																			flexDirection: 'row',
																			margin: 7,
																			backgroundColor: '#fff',
																			alignItems: 'center',
																			borderRadius: 10,
																			borderColor: '#939393',
																			borderWidth: 0.5,
																			paddingHorizontal: 10
																		}}>
																		<Text style={{
																			fontFamily: 'poppins_light',
																			fontSize: 12,
																		}}>{item.interest}</Text>
																		<Pressable style={{ marginLeft: 'auto', padding: 10 }} onPress={() => editInterest({ interest: item.interest, id: item.id })}><Image style={{
																			width: 15,
																			height: 15,
																		}}
																			source={require('../assets/editIcon.png')} /></Pressable>
																		<Pressable onPress={() => toggleDeleteVisibile('INTEREST', item.id)} style={{ padding: 10 }} ><Image style={{
																			width: 19,
																			height: 19,
																			tintColor: 'red'
																		}}
																			source={require('../assets/cvDelete.png')} /></Pressable>
																	</View>
																)}
															/>
														}
													</SafeAreaView>
												</View>
												<View style={{
													flexDirection: 'column',
													borderColor: '#b2b2b2',
													backgroundColor: '#fff',
													padding: 20,
													marginHorizontal: 10,
													marginRight: 30,
													marginLeft: 30,
													borderRadius: 30,
													marginTop: 20
												}}>
													<View style={{ flexDirection: 'row' }}>
														<Text style={{
															fontFamily: 'poppins_bold',
															fontSize: 16
														}}>Languages</Text>
														<Pressable onPress={() => toggleLanguageVisibility()} style={{
															backgroundColor: '#e7e7e7',
															borderRadius: 25,
															alignItems: 'center',
															paddingVertical: 5,
															paddingHorizontal: 15,
															marginLeft: 'auto'
														}}><Text
															style={{
																color: '#000',
																fontFamily: 'poppins_medium',
																fontSize: 12
															}}>Add</Text></Pressable>
													</View>
													<SafeAreaView style={{
														flex: 1,
														minHeight: 90,
														justifyContent: 'center',
														alignItems: 'center'
													}}>
														{cv?.languages.length === 0 ?
															<Text
																style={{ fontFamily: 'poppins_light', color: '#a6a6a6' }}>No
																Language Added</Text>
															:
															<FlatList scrollEnabled={false} nestedScrollEnabled={true}
																style={{
																	marginVertical: 15,
																	width: '100%',
																	paddingHorizontal: 15
																}}
																data={cv?.languages}
																renderItem={({ item }) => (
																	<View
																		style={{
																			flex: 1,
																			flexDirection: 'row',
																			margin: 7,
																			backgroundColor: '#fff',
																			alignItems: 'center',
																			borderRadius: 10,
																			borderColor: '#939393',
																			borderWidth: 0.5,
																			paddingHorizontal: 10
																		}}>
																		<Text style={{
																			fontFamily: 'poppins_light',
																			fontSize: 12,
																		}}>{item.language}</Text>
																		<Pressable style={{ marginLeft: 'auto', padding: 10 }} onPress={() => editLanguage({ language: item.language, id: item.id })}><Image style={{
																			width: 15,
																			height: 15,
																		}}
																			source={require('../assets/editIcon.png')} /></Pressable>
																		<Pressable onPress={() => toggleDeleteVisibile('LANGUAGE', item.id)} style={{ padding: 10 }} ><Image style={{
																			width: 19,
																			height: 19,
																			tintColor: 'red'
																		}}
																			source={require('../assets/cvDelete.png')} /></Pressable>
																	</View>
																)}
															/>
														}
													</SafeAreaView>
												</View>
											</>}
									</ScrollView>

								</>
							}
						</>}
				</>}
		</View>
	)
}

export default AccountInfo
