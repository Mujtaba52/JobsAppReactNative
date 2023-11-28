import React from 'react'
import { Image, Linking, Modal, Pressable, Text, View } from "react-native";

function WebsiteModal ({ toggleRequireVisible, visible,url }) {
    return (
        <Modal visible={visible} animationType={"fade"} transparent={true} onRequestClose={toggleRequireVisible}>
            <View style={{ flex: 1, alignContent: 'center', justifyContent: 'center', backgroundColor: 'rgba(66, 66, 66, 0.4)' }}>
                <View style={{ margin: 35, elevation: 24, borderRadius: 15, backgroundColor: '#fff', opacity: 1, padding: 20, justifyContent: 'center', alignItems: 'center', marginHorizontal: 30 }}>
                    <Image style={{ width: 160, height: 150 }} source={require('../assets/website.png')} />
                    <Text style={{ paddingVertical: 7, fontSize: 16, fontFamily: 'poppins_medium', marginTop: 10,textAlign:'center' }}>This link is trying to open an website outside the app. Are your sure want to opn it? </Text>
                    <View style={{ flexDirection: 'row', paddingBottom: 20, paddingTop: 10, gap: 30 }}>
                        <Text onPress={() => { Linking.openURL(url) , toggleRequireVisible() }}  style={{ backgroundColor: '#13A3E1', color: 'white', paddingVertical: 7, fontSize: 16, fontFamily: 'poppins_medium', width: 130, textAlign: 'center', borderRadius: 20 }}>Open Web </Text>
                        <Text onPress={() => toggleRequireVisible()} style={{ backgroundColor: 'white', color: 'black', paddingVertical: 7, fontSize: 16, fontFamily: 'poppins_medium', width: 130, textAlign: 'center', borderRadius: 20, borderWidth: 1 }}>Cancel</Text>
                    </View>
                </View>
            </View>

        </Modal>
    )
}

export default WebsiteModal