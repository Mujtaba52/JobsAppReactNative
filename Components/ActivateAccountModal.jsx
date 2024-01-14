import React from 'react';
import { ActivityIndicator, Modal, Text, View } from 'react-native';
import Ripple from "react-native-material-ripple";

const ActivateAccountModal = ({ visible, toggleVisible, navigation }) => {
  return (
    <Modal visible={visible} animationType="fade" transparent={true} onRequestClose={() => toggleVisible(false)}>
      <View style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(66, 66, 66, 0.4)'
      }}>
        <View style={{
          width: 300, // Adjust the width as needed
          height: 200, // Adjust the height as needed
          elevation: 24,
          borderRadius: 25,
          backgroundColor: '#fff',
          opacity: 1,
          padding: 20,
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <Text style={{ paddingBottom: 16, fontSize: 14, fontFamily: 'poppins_medium' }}>Please your account to distribute resumes.</Text>
          <Ripple onPress={() => { navigation.push('PersonalInfo') }} style={{ backgroundColor: '#2994FF', borderRadius: 20, paddingVertical: 6, paddingHorizontal: 20 }}>
            <Text style={{ color: '#fff', fontWeight: '800', fontSize: 15 }}>Activate Account</Text>
          </Ripple>
        </View>
      </View>
    </Modal>
  );
}

export default ActivateAccountModal;
