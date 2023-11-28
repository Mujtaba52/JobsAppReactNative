import React, {PureComponent, useState} from 'react'
import { FlatList, Image, KeyboardAvoidingView, Modal, Pressable, SafeAreaView, Text, TextInput, View } from "react-native";
import { PhoneData } from '../Utils/Constants';
import Ripple from 'react-native-material-ripple';

const PhoneModal = ({ visible, togglePhoneVisible, set }) => {

    const add = (code) => {
        set(code)
    }

    const [data, setData] = useState(PhoneData)
    const search = (query) => {
        const searched = PhoneData.filter((data) => {
            return (data.name).toLowerCase().includes(query.toLowerCase());
        })
        setData(searched)
    }

    const getItemLayout = (data, index) => ({
        length: 50,
        offset: 50 * index,
        index,
    });

    return (

        <Modal visible={visible} animationType={"fade"} onRequestClose={togglePhoneVisible}>
            <View style={{}}>
                <SafeAreaView style={{}}>
                    <View style={{ flexDirection: 'row', marginVertical: 30, marginHorizontal: 20 }}>
                        <View style={{ padding: 6 }}>
                            <Pressable onPress={() => togglePhoneVisible()} style={{ marginLeft: 'auto', padding: 5 }}><Image
                                style={{ width: 25, height: 15, tintColor: 'gray' }}
                                source={require('../assets/back_arrow.png')} /></Pressable>
                        </View>
                        <Text style={{ textAlign: 'center', width: '80%', fontFamily: 'poppins_medium', marginTop: 6 }}>Select Country Code</Text>

                    </View>

                    <TextInput
                        onChangeText={text => search(text)}
                        style={{
                            borderRadius: 25,
                            paddingHorizontal: 20,
                            marginVertical: 8,
                            borderColor: 'gray',
                            borderWidth: 1,
                            paddingVertical: 6,
                            marginHorizontal: 10,
                            marginTop: -10,
                            marginBottom: 20
                        }} placeholder={'Search Country'} />


                    <View style={{
                        backgroundColor: '#000',
                        height: 3,
                        width: '91%',
                        alignSelf: 'center',
                        borderRadius: 3
                    }}></View>
                    <FlatList scrollEnabled={true} nestedScrollEnabled={false}
                        style={{ marginHorizontal: 0, marginTop: 20, }} data={data}
                        renderItem={({ item,index }) => (
                            <Ripple rippleColor='#13A3E1' rippleOpacity={0.3} rippleSize={800} onPress={() => add(item.dial_code)}><View>
                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                }}>
                                    <Text style={{
                                        fontSize: 15,
                                        fontWeight: 500,
                                        fontFamily: 'poppins_semibold',
                                        marginHorizontal: 20,
                                        borderRightWidth: 1,
                                        width: 70,
                                    }}>{item.dial_code}</Text>
                                    {/* <Text style={{
                                        height: 30,
                                    }} >|</Text> */}
                                    <Text style={{
                                        fontSize: 12,
                                        fontWeight: 400,
                                        fontFamily: 'poppins_semibold',
                                        marginLeft: 5,
                                        color: 'gray'
                                    }}>{item.name}</Text>
                                </View>
                                <View style={{
                                    backgroundColor: '#777777',
                                    height: 0.5,
                                    marginHorizontal: 10,
                                    marginVertical: 5
                                }}></View>
                            </View></Ripple>
                        )}
                        keyExtractor={(item, index) => String(index)}
                    getItemLayout={getItemLayout}/>
                </SafeAreaView>
            </View>
        </Modal>

    )
}

export default PhoneModal
