import { ActivityIndicator, Image, Modal, Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ProviderRegistration, Registeration } from "../API/actions/registerActions";
import Toast from "react-native-toast-message";
import { RESET_SEEKER } from "../Utils/Constants";

function Register({ route, navigation }) {

    const { USER } = route.params

    const [show, setShow] = useState(true)
    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [size, setSize] = useState('')
    const [buttonClick, setButtonClick] = useState(false)

    const dispatch = useDispatch();

    const toggleVisibility = () => setShow(!show);

    const seekerError = useSelector(state => state.error.seekerRegisterError)
    const providerError = useSelector(state => state.error.providerRegisterError)
    const seekerSuccess = useSelector(state => state.success.seekerRegisterSuccess)
    const providerSuccess = useSelector(state => state.success.providerRegisterSuccess)
    const seekerLoading = useSelector(state => state.loading.seekerRegisterLoading)
    const providerLoading = useSelector(state => state.loading.providerRegisterLoading)

    const RegisterUser = () => {
        if (name.length >= 2) {
            if (USER === "SEEKER") {
                if (username.length >= 3) {
                    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
                        Toast.show({ type: 'error', position: 'top', text1: 'Please Enter a Valid Email Address' })
                    } else {
                        if (password.length >= 9) {
                            if (password === confirmPassword) {
                                dispatch(Registeration(navigation, name, username, email, '', '', '', '', password, 'NORMAL'));
                                toggleLoadingVisibility(true)
                                setButtonClick(true)
                            } else {
                                Toast.show({ type: 'error', position: 'top', text1: 'Password Not Match' })
                            }
                        } else {
                            Toast.show({ type: 'error', position: 'top', text1: 'Please Enter a Strong Password', text2: 'password must be more than 9 Letters' })
                        }
                    }
                } else {
                    Toast.show({ type: 'error', position: '', text1: 'Please Enter a Valid UserName', text2: 'Username must be more than 6 Letters' })
                }
            } else {
                if (size.length >= 1) {
                    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
                        Toast.show({ type: 'error', position: 'top', text1: 'Please Enter a Valid Email Address' })
                    } else {
                        if (password.length >= 9) {
                            if (password === confirmPassword) {
                                dispatch(ProviderRegistration(navigation, name, size, 0, 0, email, '', '', '', '', password, 'NORMAL'));
                                toggleLoadingVisibility(true)
                                setButtonClick(true)
                            } else {
                                Toast.show({ type: 'error', position: 'top', text1: 'Password Not Match' })
                            }
                        } else {
                            Toast.show({ type: 'error', position: 'top', text1: 'Please Enter a Strong Password' })
                        }
                    }
                } else {
                    Toast.show({ type: 'error', position: 'top', text1: 'Please Enter a Valid UserName' })
                }
            }
        } else {
            Toast.show({ type: 'error', position: 'top', text1: 'Please Enter a Valid Name' })
        }
    }



    const error = useSelector(state => state.register.error)

    useEffect(() => {
        if (buttonClick) {
            if (seekerError || providerError) {
                toggleLoadingVisibility(false)
                Toast.show({
                    type: 'error',
                    position: 'top',
                    text1: 'Failed to Register',
                    text2: 'Invalid email or Password'
                })
                setButtonClick(false)
            } else if (seekerSuccess || providerSuccess) {
                toggleLoadingVisibility(false)
                Toast.show({
                    type: 'success',
                    position: 'top',
                    text1: 'Success',
                    text2: 'Successfully Logged In'
                })
                setButtonClick(false)
            }
        }
    }, [seekerError, seekerSuccess, seekerLoading, providerError, providerSuccess, providerLoading, buttonClick]);


    // loading===============
    const [loadingVisible, setLoadingVisible] = useState(false)
    const toggleLoadingVisibility = (val) => setLoadingVisible(val);





    return (
        <ScrollView style={{ flex: 1, backgroundColor: '#F0A51E' }}>
            <Modal visible={loadingVisible} animationType={"fade"} transparent={true}>
                <View style={{ flex: 1, alignContent: 'center', justifyContent: 'center', backgroundColor: 'rgba(66, 66, 66, 0.4)' }}>
                    <View style={{ margin: 35, elevation: 24, borderRadius: 25, backgroundColor: '#fff', opacity: 1, padding: 20, justifyContent: 'center', alignItems: 'center', marginHorizontal: 100 }}>
                        <Text style={{ paddingBottom: 16, fontSize: 14, fontFamily: 'poppins_medium' }}>Please Wait ...</Text>
                        <ActivityIndicator size={60} color="#13A3E1" />
                    </View>
                </View>
            </Modal>

            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 60 }}>
                <Text style={{ color: '#000', fontWeight: 700, fontSize: 18, marginTop: 90 }}>Welcome</Text>
                <Text style={{ color: '#000', fontFamily: 'poppins_light', width: 250, textAlign: 'center', marginBottom: 20 }}>Let's
                    help you meet up
                    your task</Text>
                <TextInput onChangeText={(text) => setName(text)} style={{
                    height: 50,
                    backgroundColor: '#fff',
                    width: '85%',
                    borderRadius: 25,
                    marginTop: 50,
                    paddingHorizontal: 20,
                    color: '#626262',
                    elevation: 10
                }} placeholder={USER === "SEEKER" ? 'Enter your full Name' : 'Enter Your Company Name'} inputMode={'text'} />
                {USER === "SEEKER" ?
                    <TextInput onChangeText={(text) => setUsername(text)} style={{
                        height: 50,
                        backgroundColor: '#fff',
                        width: '85%',
                        borderRadius: 25,
                        marginTop: 15,
                        paddingHorizontal: 20,
                        color: '#626262',
                        elevation: 10
                    }} placeholder={'Enter your username'} />
                    :
                    <TextInput onChangeText={(text) => setSize(text)} style={{
                        height: 50,
                        backgroundColor: '#fff',
                        width: '85%',
                        borderRadius: 25,
                        marginTop: 15,
                        paddingHorizontal: 20,
                        color: '#626262',
                        elevation: 10
                    }} placeholder={'Enter your Company Size'} />
                }
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
                        marginTop: 15,
                        paddingHorizontal: 20,
                        color: '#626262',
                        elevation: 10
                    }} />



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
                    }} placeholder={'Enter your Password'} secureTextEntry={show} />
                    {show === true ? <Pressable onPress={() => toggleVisibility()} style={{ marginLeft: 'auto' }}><Image style={{ width: 25, height: 25 }} source={require('../assets/show.png')} /></Pressable>
                        : <Pressable onPress={() => toggleVisibility()} style={{ marginLeft: 'auto' }}><Image style={{ width: 25, height: 25 }} source={require('../assets/hide.png')} /></Pressable>}

                </View>
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
                    <TextInput onChangeText={(text) => setConfirmPassword(text)} style={{
                        height: 50,
                        paddingHorizontal: 20,
                        color: '#626262',
                        flex: 1
                    }} placeholder={'Confirm Password'} secureTextEntry={show} />
                    {show === true ? <Pressable onPress={() => toggleVisibility()} style={{ marginLeft: 'auto' }}><Image style={{ width: 25, height: 25 }} source={require('../assets/show.png')} /></Pressable>
                        : <Pressable onPress={() => toggleVisibility()} style={{ marginLeft: 'auto' }}><Image style={{ width: 25, height: 25 }} source={require('../assets/hide.png')} /></Pressable>}
                </View>

                <Pressable onPress={() => RegisterUser()} style={{
                    width: '85%',
                    backgroundColor: '#13A3E1',
                    alignItems: 'center',
                    borderRadius: 25,
                    marginTop: 50,
                    paddingVertical: 15
                }}><Text style={{ color: '#fff', fontWeight: '900', fontSize: 15 }}>Register</Text></Pressable>
                <View style={{ flexDirection: 'row', marginTop: 25, marginBottom: 30 }}>
                    <Text style={{ color: '#fff', fontWeight: '900', fontSize: 15 }}>Already have an account?</Text>
                    <Pressable onPress={() => navigation.replace('Login', { USER: USER })}><Text
                        style={{ color: '#000', fontWeight: '900', fontSize: 15 }}> Sign In</Text></Pressable>
                </View>
            </View>
            <Toast
                position='top'
                bottomOffset={20}
            />
        </ScrollView>
    );
}

export default Register
