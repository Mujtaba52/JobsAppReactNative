import {FlatList, Image, Modal, Pressable, SafeAreaView, Text, View} from "react-native";
import React from "react";

const CountrySelectModal = ({ visible, click, list, toggleVisibility }) => {
  return (
      <Modal visible={visible} animationType={"fade"} transparent={true} onRequestClose={toggleVisibility}>
          <View style={{
              flex: 1,
              alignContent: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(0,0,0,0.6)'
          }}>
              <SafeAreaView style={{
                  backgroundColor: '#fff',
                  borderRadius: 40,
                  padding: 23,
                  margin: 20
              }}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Text style={{
                          width: '100%',
                          fontFamily: 'poppins_semibold',
                          textAlign: 'center',
                          color: '#13A3E1'
                      }}>Select</Text>
                      <Pressable onPress={() => toggleVisibility()} style={{marginLeft: 'auto',padding:10}}><Image
                          style={{width: 15, height: 15, marginLeft: 'auto'}}
                          source={require('../assets/close.png')}/></Pressable>
                  </View>
                  <View style={{
                      backgroundColor: '#000',
                      height: 4,
                      width: '30%',
                      alignSelf: 'center',
                      borderRadius: 3
                  }}></View>
                  <FlatList scrollEnabled={true} nestedScrollEnabled={false}
                            style={{marginHorizontal: 0, marginTop: 20, height: 500}} data={list}
                            renderItem={({item}) => (
                                <Pressable onPress={() => click(item)}><View>
                                    <View style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        <Text style={{
                                            fontSize: 15,
                                            fontWeight: 600,
                                            fontFamily: 'poppins_semibold'
                                        }}>{item.name}</Text>
                                    </View>
                                    <View style={{
                                        backgroundColor: '#777777',
                                        height: 0.5,
                                        marginHorizontal: 10,
                                        marginVertical: 5
                                    }}></View>
                                </View></Pressable>
                            )}/>
              </SafeAreaView>
          </View>
      </Modal>
  )
}

export default CountrySelectModal
