import React from 'react'
import { Modal, Pressable, Text, TextInput, View, Image } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const ProposelModal = ({visible,toggleProposelVisibility}) => {
  return (
    <Modal visible={visible} animationType={"fade"} transparent={true} onRequestClose={toggleProposelVisibility}>
    <GestureHandlerRootView style={{
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
            height: 440
        }}>
            <View style={{ flexDirection: 'row',width:'60%',marginLeft:120, }}>
                <Text style={{ fontSize: 16, fontFamily: 'poppins_bold',textAlign:'center',margin:'auto' }}>Proposel</Text>
                <Pressable onPress={() => toggleProposelVisibility()}
                 style={{ padding: 10, marginLeft: 'auto',marginTop:-5 }}>
                    <Image style={{ width: 15, height: 15,  }}
                        source={require('../assets/close.png')} />
                        </Pressable>
            </View>
            <TextInput multiline numberOfLines={15}
                placeholder={'Write Your Proposal'} style={{
                    width: '100%',
                    marginTop: 40,
                    borderColor: '#adadad',
                    borderRadius: 20,
                    borderWidth: 0.5,
                    textAlign: 'center',
                    fontSize: 13,
                    fontFamily: 'poppins_medium',
                    padding: 20,
                    
                }}></TextInput>
            <Pressable onPress={() => toggleProposelVisibility()} style={{
                paddingHorizontal: 60,
                paddingVertical: 13,
                backgroundColor: '#13A3E1',
                borderRadius: 25,
                marginTop: 45
            }}><Text style={{ color: '#fff', fontSize: 14, fontFamily: 'poppins_bold' }}>Send</Text></Pressable>
        </View>
    </GestureHandlerRootView>
</Modal>
  )
}

export default ProposelModal
