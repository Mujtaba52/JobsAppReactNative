import React from 'react'
import { Image, Modal, Pressable, Text, View } from "react-native";
import Ripple from 'react-native-material-ripple';

function LoginRequireModal({ toggleRequireVisible, visible, navigation }) {
    return (
        <Modal visible={visible} animationType={"fade"} transparent={true} onRequestClose={toggleRequireVisible}>
            <View style={{ flex: 1, alignContent: 'center', justifyContent: 'center', backgroundColor: 'rgba(66, 66, 66, 0.4)' }}>
                <View style={{ margin: 35, elevation: 24, borderRadius: 15, backgroundColor: '#fff', opacity: 1, padding: 20, justifyContent: 'center', alignItems: 'center', marginHorizontal: 30 }}>
                    <Image style={{ width: 160, height: 150 }} source={require('../assets/login.png')} />
                    <Text style={{ paddingVertical: 7, fontSize: 16, fontFamily: 'poppins_medium', marginTop: 10 }}>Would you like to login now or later ?</Text>
                    <View style={{ flexDirection: 'row', paddingBottom: 20, paddingTop: 10, gap: 30 }}>
                        <Ripple rippleColor='white' onPress={() => {
                            toggleRequireVisible()
                            navigation.push('UserType')
                        }} style={{ backgroundColor: '#13A3E1', paddingVertical: 7,  width: 130,  borderRadius: 20 }}>
                            <Text style={{ color: 'white',fontSize: 16, fontFamily: 'poppins_medium',textAlign: 'center',  }}>Login </Text>
                        </Ripple>
                        <Text onPress={() => toggleRequireVisible()} style={{ backgroundColor: 'white', color: 'black', paddingVertical: 7, fontSize: 16, fontFamily: 'poppins_medium', width: 130, textAlign: 'center', borderRadius: 20, borderWidth: 1 }}>Later</Text>
                    </View>
                </View>
            </View>

        </Modal>
    )
}

export default LoginRequireModal
