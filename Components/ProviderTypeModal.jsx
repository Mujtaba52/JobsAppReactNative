import React from 'react'
import {Image, Modal, Pressable, Text, View} from 'react-native'

const ProviderTypeModal = ({visible, toggleVisibility, click}) => {

    const onSelect = (type) => {
        click(type)
        toggleVisibility()
    }

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
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginHorizontal: 30
                }}>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={{
                            paddingVertical: 7,
                            fontSize: 16,
                            fontFamily: 'poppins_medium',
                            marginTop: 10,
                            marginLeft: 40
                        }}>Select Your Company Type </Text>
                        <View style={{marginLeft: 20}}>
                            <Pressable onPress={() => toggleVisibility()} style={{paddingLeft: 10}}>
                                <Image style={{width: 15, height: 15, marginLeft: 'auto'}}
                                       source={require('../assets/close.png')}/></Pressable>
                        </View>
                    </View>
                    <Pressable onPress={() => onSelect('Organization')}>
                        <View>
                            <Text style={{
                                marginTop: 30,
                                marginBottom: 10,
                                fontSize: 14,
                                fontFamily: 'poppins_medium'
                            }}>Organization</Text>
                        </View>
                    </Pressable>
                    <Text style={{backgroundColor: "black", width: 200, height: 1}}>-</Text>
                    <Pressable onPress={() => onSelect('Individual')}>
                        <View>
                            <Text style={{
                                marginTop: 10,
                                marginBottom: 10,
                                fontSize: 14,
                                fontFamily: 'poppins_medium'
                            }}>Individual</Text>
                        </View>
                    </Pressable>
                </View>
            </View>
        </Modal>
    )
}

export default ProviderTypeModal
