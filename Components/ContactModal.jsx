import React from "react";
import { Image, Linking, Modal, Pressable, Text, View } from "react-native";
import Ripple from "react-native-material-ripple";

const ContactModal = ({ visible, toggleVisibility, name, phone, email }) => {
    return (
        <Modal visible={visible} animationType={"fade"} transparent={true} onRequestClose={toggleVisibility}>
            <View style={{
                flex: 1,
                alignContent: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(66, 66, 66, 0.4)'
            }}>
                <View style={{
                    margin: 35,
                    elevation: 24,
                    borderRadius: 15,
                    backgroundColor: '#fff',
                    opacity: 1,
                    padding: 20,
                    marginHorizontal: 30
                }}>
                    <Image source={require('../assets/contact.png')} style={{ width: 225, height: 190, marginLeft: 'auto', marginRight: 'auto' }} />
                    {/* <Text style={{ fontFamily: 'poppins_medium', textAlign: 'center', marginVertical: 20, fontSize: 19 }}>Contact Info </Text> */}

                    <Ripple style={{ flexDirection: 'row', borderWidth: 2, padding: 10, borderRadius: 10, borderColor: 'lightgray' }}>
                        <Image source={require('../assets/profile.png')} style={{ height: 25, width: 25, tintColor: '#13A3E1' }} />
                        <Text style={{ fontFamily: 'poppins_medium', textAlign: 'right', width: '90%', color: '#13A3E1' }}>{name}</Text>
                    </Ripple>

                    <Ripple onPress={() => Linking.openURL(`tel:${phone}`)} rippleDuration={600} style={{ flexDirection: 'row', borderWidth: 2, padding: 10, marginVertical: 20, borderRadius: 10, borderColor: 'lightgray' }}>
                        <Image source={require('../assets/call.png')} style={{ height: 25, width: 25, tintColor: '#13A3E1' }} />
                        <Text style={{ fontFamily: 'poppins_medium', textAlign: 'right', width: '90%', color: '#13A3E1' }}>{phone}</Text>
                    </Ripple>

                    <Ripple onPress={() => Linking.openURL(`mailto:${email}`)} style={{ flexDirection: 'row', borderWidth: 2, padding: 10, borderRadius: 10, borderColor: 'lightgray' }}>
                        <Image source={require('../assets/mail.png')} style={{ height: 25, width: 25, tintColor: '#13A3E1' }} />
                        <Text style={{ fontFamily: 'poppins_medium', textAlign: 'right', width: '90%', color: '#13A3E1' }}>{email}</Text>
                    </Ripple>

                    <Text onPress={() => toggleVisibility()} style={{ fontFamily: 'poppins_bold', textAlign: 'center', marginLeft: 'auto', marginRight: 'auto', marginTop: 20, paddingHorizontal: 50, paddingVertical: 9, borderRadius: 20, backgroundColor: '#13A3E1', color: 'white' }}>Cancel</Text>

                </View>
            </View>
        </Modal>
    )

}
export default ContactModal
