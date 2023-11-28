import { Image, Pressable, ScrollView, Text, TextInput, View} from "react-native";
import {useState} from "react";
import Toast from "react-native-toast-message";
import {changePassword, changePasswordProvider} from "../API";

function ChangePassword({route, navigation}) {

    // const { verifyPhone } = route.params
    // const { code } = route.params
    // const { phone } = route.params
    const {type} = route.params
    const { ID } = route.params

    const [password, setPassword] = useState()
    const [cPassword, setCPassword] = useState()
    const [show, setShow] = useState(false);

    const toggleVisibility = () => setShow(!show)

    const passwordUpdate = () => {
        if (/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/.test(password)) {
            if (password === cPassword) {
                // navigation.navigate('Verify', { verifyPhone: verifyPhone, password: password})
                if (type === "PROVIDER") {

                        changePasswordProvider(password, ID).then(res => {
                            navigation.replace('Login', { USER: 'PROVIDER' })
                        }).catch(err => {
                            console.log(err)
                        })

                } else {

                        changePassword(password, ID).then(res => {
                            navigation.replace('Login', { USER: 'SEEKER' })
                        }).catch(err => {
                            console.log(err)
                        })

                }
            } else {
                Toast.show({
                    type: 'error',
                    position: 'top',
                    text1: 'Password Mismatch',
                    text2: 'Please confirm your password by writing your password again.'
                })
            }
        } else {
            Toast.show({
                type: 'error',
                position: 'top',
                text1: 'Weak Password',
                text2: 'Password must be greater than 7 Letters and contains numeric letters'
            })
        }
    }

    return (
        <ScrollView style={{flex: 1, backgroundColor: '#fff'}}
        keyboardShouldPersistTaps="handled"
        >
            <Pressable onPress={() => navigation.goBack()}
                       style={{flexDirection: 'row', alignItems: 'center', marginTop: 70, marginLeft: 30}}>
                <Image style={{tintColor: 'gray', width: 24, height: 10}}
                       source={require('../assets/back_arrow.png')}/>
            </Pressable>
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <Image style={{height: 200, width: 300, marginTop: 80}}
                       source={require('../assets/passwordchange.png')}/>
                <Text style={{
                    color: '#4041B0',
                    fontFamily: 'poppins_semibold',
                    fontSize: 18,
                    width: '85%',
                    textAlign: 'center',
                    marginTop: 0,
                    alignSelf: 'center'
                }}>Change Password</Text>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: 45,
                    backgroundColor: '#fff',
                    elevation: 10,
                    borderRadius: 25,
                    width: '85%',
                    paddingRight: 20,

                }}>
                    <TextInput onChangeText={(text) => setPassword(text)} style={{
                        height: 50,
                        paddingHorizontal: 20,
                        color: '#626262',
                        flex: 1
                    }} placeholder={'Enter your new Password'} secureTextEntry={!show}/>
                    {show === true ? <Pressable onPress={() => toggleVisibility()} style={{marginLeft: 'auto'}}><Image
                            style={{width: 25, height: 25}} source={require('../assets/hide.png')}/></Pressable>
                        : <Pressable onPress={() => toggleVisibility()} style={{marginLeft: 'auto'}}><Image
                            style={{width: 25, height: 25}} source={require('../assets/show.png')}/></Pressable>}
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
                    <TextInput onChangeText={(text) => setCPassword(text)} style={{
                        height: 50,
                        paddingHorizontal: 20,
                        color: '#626262',
                        flex: 1
                    }} placeholder={'Confirm your Password'} secureTextEntry={!show}/>
                    {show === true ? <Pressable onPress={() => toggleVisibility()} style={{marginLeft: 'auto'}}><Image
                            style={{width: 25, height: 25}} source={require('../assets/hide.png')}/></Pressable>
                        : <Pressable onPress={() => toggleVisibility()} style={{marginLeft: 'auto'}}><Image
                            style={{width: 25, height: 25}} source={require('../assets/show.png')}/></Pressable>}
                </View>
                <Pressable onPress={() => passwordUpdate()} style={{
                    width: '85%',
                    backgroundColor: '#13A3E1',
                    alignItems: 'center',
                    borderRadius: 25,
                    marginTop: 80,
                    paddingVertical: 15,
                }}><Text style={{color: '#fff', fontFamily: 'poppins_semibold', fontSize: 15}}>Change
                    Password</Text></Pressable>
            </View>
            <Toast
                position='top'
                bottomOffset={20}
            />
        </ScrollView>
    );
}

export default ChangePassword
