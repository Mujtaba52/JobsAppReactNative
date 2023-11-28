import { Image, Modal, Pressable, Text, View } from "react-native";
import React from "react";
import Ripple from "react-native-material-ripple";

const NavigationDrawer = ({ visible, toggleVisibility, navigation, isLogin, toggleLoadingVisibility }) => {
    return (
        <Modal visible={visible} animationType={"slide"} transparent={true}  onRequestClose={toggleVisibility} >

            <View
                style={{ flex: 1, alignContent: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.2)' }}>
                <View style={{
                    width: '100%',
                    maxWidth: 300,
                    margin: 48,
                    elevation: 200,
                    borderRadius: 15,
                    backgroundColor: '#fff',
                    opacity: 1,
                    padding: 20
                }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ width: '100%', fontFamily: 'poppins_semibold', textAlign: 'center' }}>Menu</Text>
                        <Pressable style={{ marginLeft: 'auto', padding: 20 }} onPress={() => toggleVisibility()}><Image
                            style={{ width: 13, height: 13, marginLeft: 'auto', marginTop: -10 }}
                            source={require('../assets/close.png')} /></Pressable>
                    </View>

                    {isLogin ?
                        <>
                            <Ripple rippleColor="white"  onPress={() => {
                                toggleVisibility()
                                if (isLogin) {
                                    navigation.push('Profile')
                                } else {
                                    navigation.push('Login', { USER: "SEEKER" })
                                }
                            }} style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                backgroundColor: '#13A3E1',
                                padding: 15,
                                borderRadius: 10
                            }}
                                >

                                <Text style={{ width: '100%', fontFamily: 'poppins_semibold', color: '#fff' }}>Profile</Text>
                                <Image style={{ width: 15, height: 15, marginLeft: 'auto', tintColor: '#fff' }}
                                    source={require('../assets/arrowRight.png')} />

                            </Ripple>

                            <Ripple rippleColor="white"
                                onPress={() => {
                                    toggleVisibility()
                                    navigation.push('AppliedSaved', { screen: 1 })
                                }}
                            // onAccessibilityAction={() => toggleVisibility()}
                            >
                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    backgroundColor: '#13A3E1',
                                    padding: 15,
                                    borderRadius: 10,
                                    marginTop: 4
                                }}>
                                    <Text style={{ width: '100%', fontFamily: 'poppins_semibold', color: '#fff' }}>Applied
                                        Jobs</Text>
                                    <Image style={{ width: 15, height: 15, marginLeft: 'auto', tintColor: '#fff' }}
                                        source={require('../assets/arrowRight.png')} />
                                </View>
                            </Ripple>

                            <Ripple rippleColor="white"
                                onPress={() => {
                                    toggleVisibility()
                                    navigation.push('AppliedSaved', { screen: 0 })
                                }}>
                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    backgroundColor: '#13A3E1',
                                    padding: 15,
                                    borderRadius: 10,
                                    marginTop: 4
                                }}>
                                    <Text style={{ width: '100%', fontFamily: 'poppins_semibold', color: '#fff' }}>Saved
                                        Jobs</Text>
                                    <Image style={{ width: 15, height: 15, marginLeft: 'auto', tintColor: '#fff' }}
                                        source={require('../assets/arrowRight.png')} />
                                </View>
                            </Ripple>

                            <Ripple rippleColor="white"
                                onPress={() => {
                                    toggleVisibility()
                                    navigation.push('History')
                                }}>
                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    backgroundColor: '#13A3E1',
                                    padding: 15,
                                    borderRadius: 10,
                                    marginTop: 4
                                }}>
                                    <Text style={{ width: '100%', fontFamily: 'poppins_semibold', color: '#fff' }}>History</Text>
                                    <Image style={{ width: 15, height: 15, marginLeft: 'auto', tintColor: '#fff' }}
                                        source={require('../assets/arrowRight.png')} />
                                </View>
                            </Ripple>
                        </>
                        :
                        <Text></Text>
                    }

                    <Ripple rippleColor="white"
                        onPress={() => {
                            toggleVisibility()
                            navigation.push('Privacypolicy')
                        }}>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            backgroundColor: '#13A3E1',
                            padding: 15,
                            borderRadius: 10,
                            marginTop: 4
                        }}>
                            <Text style={{ width: '100%', fontFamily: 'poppins_semibold', color: '#fff' }}>Privacy
                                Policy</Text>
                            <Image style={{ width: 15, height: 15, marginLeft: 'auto', tintColor: '#fff' }}
                                source={require('../assets/arrowRight.png')} />
                        </View>
                    </Ripple>

                    <Ripple rippleColor="white"
                        onPress={() => {
                            toggleVisibility()
                            navigation.push('Termsandconditions')
                        }}>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            backgroundColor: '#13A3E1',
                            padding: 15,
                            borderRadius: 10,
                            marginTop: 4
                        }}>
                            <Text style={{ width: '100%', fontFamily: 'poppins_semibold', color: '#fff' }}>Terms &
                                Conditions</Text>
                            <Image style={{ width: 15, height: 15, marginLeft: 'auto', tintColor: '#fff' }}
                                source={require('../assets/arrowRight.png')} />
                        </View>
                    </Ripple>


                    <Ripple rippleColor="white"
                        onPress={() => {
                            toggleVisibility()
                            navigation.push('Contactus')
                        }} style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            backgroundColor: '#13A3E1',
                            padding: 15,
                            borderRadius: 10,
                            marginTop: 4
                        }}>
                        <Text style={{ width: '100%', fontFamily: 'poppins_semibold', color: '#fff' }}>Contact</Text>
                        <Image style={{ width: 15, height: 15, marginLeft: 'auto', tintColor: '#fff' }}
                            source={require('../assets/arrowRight.png')} />
                    </Ripple>

                    {isLogin ?
                        <Ripple rippleColor="white"
                            onPress={async () => {toggleVisibility() ,toggleLoadingVisibility()}}><View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                backgroundColor: '#13A3E1',
                                padding: 15,
                                borderRadius: 10,
                                marginTop: 4
                            }}>
                                <Text style={{ width: '100%', fontFamily: 'poppins_semibold', color: '#fff' }}>Sign Out</Text>
                                <Image style={{ width: 15, height: 15, marginLeft: 'auto', tintColor: '#fff' }}
                                    source={require('../assets/arrowRight.png')} />
                            </View>
                        </Ripple>
                        :
                        <Ripple rippleColor="white"
                            onPress={async () => {
                                toggleVisibility()
                                navigation.push('UserType')}}><View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                backgroundColor: '#13A3E1',
                                padding: 15,
                                borderRadius: 10,
                                marginTop: 4
                            }}>
                                <Text style={{ width: '100%', fontFamily: 'poppins_semibold', color: '#fff' }}>Sign In</Text>
                                <Image style={{ width: 15, height: 15, marginLeft: 'auto', tintColor: '#fff' }}
                                    source={require('../assets/arrowRight.png')} />
                            </View>
                        </Ripple>
                    }
                </View>
            </View>
        </Modal>
    )
}

export default NavigationDrawer
