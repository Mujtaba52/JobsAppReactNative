import { ActivityIndicator, Image, Modal, Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LoginAuthentication, ProviderLoginAuthentication } from "../API/actions/loginActions";
import Toast from "react-native-toast-message";
import { GoogleSignin, statusCodes } from "@react-native-google-signin/google-signin";
import { google, googleProvider } from "../API";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {CheckCV} from "../API/actions/cvActions";
import {CheckSeeker} from "../API/actions/seekerActions";

function Login({ route, navigation }) {

    const { USER } = route.params

    const [show, setShow] = useState(false);
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [buttonClick, setButtonClick] = useState(false)

    const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

    const dispatch = useDispatch()

    const toggleVisibility = () => setShow(!show)

    const seekerError = useSelector(state => state.error.seekerLoginError)
    const providerError = useSelector(state => state.error.providerLoginError)
    const seekerSuccess = useSelector(state => state.success.seekerLoginSuccess)
    const providerSuccess = useSelector(state => state.success.providerLoginSuccess)
    const seekerLoading = useSelector(state => state.loading.seekerLoginLoading)
    const providerLoading = useSelector(state => state.loading.providerLoginLoading)

    const LoginUser = () => {
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
            Toast.show({ type: 'error', position: 'top', text1: 'Please Enter a Valid Email Address' })
        } else {
            if (USER === "SEEKER") {
                dispatch(LoginAuthentication(navigation, email, password))
                toggleLoadingVisibility(true)
                setButtonClick(true)
            } else {
                dispatch(ProviderLoginAuthentication(navigation, email, password))
                toggleLoadingVisibility(true)
                setButtonClick(true)
            }
        }
    }

    useEffect(() => {
        if (buttonClick) {
            if (seekerError || providerError) {
                toggleLoadingVisibility(false)
                Toast.show({
                    type: 'error',
                    position: 'top',
                    text1: 'Failed to Login',
                    text2: 'Invalid email or Password'
                })
            } else if (seekerSuccess || providerSuccess) {
                toggleLoadingVisibility(false)
                Toast.show({
                    type: 'success',
                    position: 'top',
                    text1: 'Success',
                    text2: 'Successfully Logged In'
                })
            }
        }
    }, [seekerError, seekerSuccess, seekerLoading, providerError, providerSuccess, providerLoading, buttonClick]);

    const [loadingVisible, setLoadingVisible] = useState(false)
    const toggleLoadingVisibility = (val) => setLoadingVisible(val);

    GoogleSignin.configure({
        webClientId: '404623696003-doe1cpjrlljj8om770ha3ri9s9vatoc8.apps.googleusercontent.com', // Replace with your actual Web Client ID
    });

    const handleGoogleSignIn = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            const { user } = userInfo;
            toggleLoadingVisibility(true)
            await google(user.name, user.givenName + (user.id).substring((user.id).length - 6), user.email, '', '', '', '', user.id, 'GOOGLE').then(async res => {
                const { data: { data } } = res;
                const { data: { responseCode } } = res;
                const { data: { message } } = res;
                console.log(message)
                if (responseCode === 200) {
                    let ID
                    if (data.affectedRows === 1) {
                        ID = (data.insertId).toString()
                    } else {
                        ID = (data.id).toString()
                    }

                    dispatch(CheckCV(ID))
                    dispatch(CheckSeeker(ID))
                    sleep(2000).then( async () => {
                        await AsyncStorage.setItem("LOGIN", 'true')
                        await AsyncStorage.setItem("ID", ID)
                        await AsyncStorage.setItem("USER", "SEEKER")
                        await AsyncStorage.setItem("NAME", user.name)
                        await AsyncStorage.setItem("EMAIL", user.email)
                        await AsyncStorage.setItem("USERNAME", user.givenName + (user.id).substring((user.id).length - 6))
                        toggleLoadingVisibility(false)
                        navigation.popToTop()
                        navigation.replace('Home')
                    })
                } else {
                    toggleLoadingVisibility(false)
                }
            })
        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // User canceled the sign-in process
                console.log('Google sign-in canceled');
            } else if (error.code === statusCodes.IN_PROGRESS) {
                // Another sign-in process is already in progress
                console.log('Google sign-in in progress');
            } else {
                console.error('Google sign-in error:', error);
            }
        }
    };

    const handleProviderGoogleSignIn = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            const { user } = userInfo;
            toggleLoadingVisibility(true)
            await googleProvider('', '', 0, 0, user.email, '', '', '', '', user.id, 'GOOGLE').then(async res => {
                console.log(res)
                const { data: { data } } = res;
                const { data: { responseCode } } = res;
                const { data: { message } } = res;
                console.log(data)
                if (responseCode === 200) {
                    if (data.affectedRows === 1) {
                        var ID = (data.insertId).toString()
                    } else {
                        var ID = (data.id).toString()
                    }
                    if (data.affectedRows === 1) {
                        toggleLoadingVisibility(false)
                        navigation.popToTop()
                        navigation.replace('GoogleRegister', { id: ID, name: user.name, email: user.email })
                    } else if (data.name === "") {
                        toggleLoadingVisibility(false)
                        navigation.popToTop()
                        navigation.replace('GoogleRegister', { id: ID, name: user.name, email: user.email })
                    } else {
                        await AsyncStorage.setItem("LOGIN", 'true')
                        await AsyncStorage.setItem("ID", ID)
                        await AsyncStorage.setItem("USER", "PROVIDER")
                        await AsyncStorage.setItem("NAME", user.name)
                        await AsyncStorage.setItem("EMAIL", user.email)
                        toggleLoadingVisibility(false)
                        navigation.popToTop()
                        navigation.replace('PostJob')
                    }
                } else {
                    toggleLoadingVisibility(false)
                }
            }).catch(error => console.log(error))
        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // User canceled the sign-in process
                console.log('Google sign-in canceled');
            } else if (error.code === statusCodes.IN_PROGRESS) {
                // Another sign-in process is already in progress
                console.log('Google sign-in in progress');
            } else {
                console.error('Google sign-in error:', error);
            }
        }
    };

    return (
        <ScrollView style={{ flex: 1, backgroundColor: '#F0A51E' }} keyboardShouldPersistTaps='handled'>

                <Modal visible={loadingVisible} animationType={"fade"} transparent={true}>
                    <View style={{
                        flex: 1,
                        alignContent: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'rgba(66, 66, 66, 0.4)'
                    }}>
                        <View style={{
                            margin: 35,
                            elevation: 24,
                            borderRadius: 25,
                            backgroundColor: '#fff',
                            opacity: 1,
                            padding: 20,
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginHorizontal: 100
                        }}>
                            <Text style={{ paddingBottom: 16, fontSize: 14, fontFamily: 'poppins_medium' }}>Please Wait ...</Text>
                            <ActivityIndicator size={60} color="#13A3E1" />
                        </View>
                    </View>
            </Modal>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 70, marginLeft: 30 }}>
                {/* <Image style={{tintColor: '#000', width: 40, height: 40}}
                       source={require('../assets/back_arrow.png')}/> */}
                <Pressable onPress={() => navigation.replace('Home')} style={{
                    marginLeft: 'auto',
                    marginRight: 20,
                    paddingHorizontal: 30,
                    paddingVertical: 15,
                    backgroundColor: '#13A3E1',
                    borderRadius: 30
                }}><Text style={{ color: '#fff', fontWeight: '600' }}>Skip</Text></Pressable>
            </View>
            <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 10 }}>
                <Text style={{ color: '#000', fontWeight: 700, fontSize: 18 }}>Welcome Back!</Text>
                <Text style={{ color: '#000', fontWeight: 200, width: 130, textAlign: 'center', marginBottom: 20 }}>Let's
                    help you meet up
                    your task</Text>
                <Image style={{ height: 150, width: 150 }} source={require('../assets/login_icon.png')} />
                <TextInput
                        autoCapitalize="none"
                        placeholder="Enter Your Email"
                        keyboardType="email-address"
                        onChangeText={(text) => setEmail(text)}
                        style={{
                            height: 50,
                            backgroundColor: '#fff',
                            width: '85%',
                            borderRadius: 25,
                            marginTop: 25,
                            paddingHorizontal: 20,
                            color: '#626262',
                            elevation: 10
                        }}      />
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: 15,
                    backgroundColor: '#fff',
                    elevation: 10,
                    borderRadius: 25,
                    width: '85%',
                    paddingRight: 20
                }}>
                    <TextInput onChangeText={(text) => setPassword(text)} style={{
                        height: 50,
                        paddingHorizontal: 20,
                        color: '#626262',
                        flex: 1
                    }} placeholder={'Enter your Password'} secureTextEntry={!show} />
                    {show === true ? <Pressable onPress={() => toggleVisibility()} style={{ marginLeft: 'auto' }}><Image
                        style={{ width: 25, height: 25 }} source={require('../assets/hide.png')} /></Pressable>
                        : <Pressable onPress={() => toggleVisibility()} style={{ marginLeft: 'auto' }}><Image
                            style={{ width: 25, height: 25 }} source={require('../assets/show.png')} /></Pressable>}
                </View>
                <Pressable onPress={() => navigation.push('ForgotPassword')} style={{
                    width: '100%',
                }}
                    >
                <Text style={{ color: '#000', fontWeight: 400, width: '85%', textAlign: 'right', marginTop: 20 }}>Forgot
                    Password?</Text></Pressable>
                <Pressable onPress={() => LoginUser()} style={{
                    width: '85%',
                    backgroundColor: '#13A3E1',
                    alignItems: 'center',
                    borderRadius: 25,
                    marginTop: 20,
                    paddingVertical: 15
                }}><Text style={{ color: '#fff', fontWeight: '900', fontSize: 15 }}>Log In</Text></Pressable>
                <View style={{ flexDirection: 'row' }}>
                    <Pressable onPress={() => {
                        if (USER==="SEEKER") {
                            handleGoogleSignIn()
                        } else {
                            handleProviderGoogleSignIn()
                        }
                    }
                    } style={{
                        width: '85%',
                        backgroundColor: '#fff',
                        alignItems: 'center',
                        borderRadius: 25,
                        marginTop: 15,
                        paddingVertical: 15,
                        marginRight: 5,
                        flexDirection: 'row',
                        paddingHorizontal:20
                    }}><Image style={{ width: 25, height: 25, marginRight: 10 }}
                        source={require('../assets/google.png')} /><Text
                            style={{ color: '#000', fontFamily: 'poppins_medium', fontSize: 15,marginLeft:'30%' }}>Google</Text></Pressable>

                </View>
                <View style={{ flexDirection: 'row', marginTop: 25, marginBottom: 30 }}>
                    <Text style={{ color: '#fff', fontWeight: '900', fontSize: 15 }}>Don't have an account?</Text>
                    <Pressable onPress={() => navigation.replace('Register', { USER: USER })}><Text
                        style={{ color: '#000', fontWeight: '900', fontSize: 15 }}> Register</Text></Pressable>
                </View>
            </View>
            <Toast
                position='top'
                bottomOffset={20}
            />
        </ScrollView>
    );
}

export default Login
