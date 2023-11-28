import React from 'react'
import { ActivityIndicator, Modal, Text, View } from 'react-native'

const DistributeModal = ({visible,toggleVisible}) => {

  return (
    <Modal visible={visible} animationType={"fade"} transparent={true} onRequestClose={() => toggleVisible(false)} >
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
            <Text style={{ paddingBottom: 16, fontSize: 14, fontFamily: 'poppins_medium' }}>Distibuting Resumes
                ...</Text>
            <ActivityIndicator size={60} color="#13A3E1" />
        </View>
    </View>
</Modal>
  )
}

export default DistributeModal
