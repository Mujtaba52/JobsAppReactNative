import React, { useEffect } from 'react'
import { useState } from 'react'
import { FlatList, Image, Pressable, SafeAreaView, ScrollView, Text, View } from 'react-native'
import Ripple from 'react-native-material-ripple'
import { useDispatch, useSelector } from "react-redux";
import { getPlans } from "../API/actions/plansActions";


const Plans = ({ navigation }) => {

    const dispatch = useDispatch()

    const plans = useSelector(state => state.plans.typePlans)

    const [plan, setPlan] = useState()
    const [price, setPrice] = useState()

    useEffect(() => {
        dispatch(getPlans('Provider'))
    }, [dispatch]);

    useEffect(() => {
        console.log(plans)
    }, [plans]);

    return (
        <ScrollView>

            <View style={{
                flexDirection: 'column',
                width: '100%',
                height: 90,
                marginBottom: 20
            }}>
                <View style={{ flexDirection: 'row', height: 130 }}>
                    <Pressable onPress={() => navigation.goBack()}
                        style={{ paddingRight: 5 }}><Image style={{
                            width: 22,
                            height: 20,
                            marginTop: 70,
                            marginLeft: 30,
                            marginBottom: 20,
                            tintColor: 'gray'
                        }} source={require('../assets/back_arrow.png')}
                            alt={'Okay'} />
                    </Pressable>
                    <View style={{ width: '100%', marginTop: 0, paddingEnd: 90 }}>
                        <Text style={{
                            marginTop: 67,
                            alignSelf: 'center',
                            fontSize: 16, fontFamily: 'poppins_medium', color: 'gray'
                        }} >Choose Plan</Text>
                    </View>
                </View>
            </View>
            <SafeAreaView >
                <FlatList scrollEnabled={false} nestedScrollEnabled={true}
                    style={{ marginHorizontal: 20 }} data={plans}
                    renderItem={({ item }) => (
                        <Ripple onPress={() => navigation.push('Payment', { plan: item.id, price: item.amount, type: 'Provider' })} rippleColor='gray'
                            style={{ backgroundColor: 'white', padding: 20, marginTop: 20, paddingVertical: 20, marginHorizontal: 10, borderRadius: 20, marginBottom: 20, flexDirection: 'column', borderWidth: 1, elevation: 10, borderColor: 'gray' }}>
                            <Text style={{ color: '#002E81', textAlign: 'center', fontSize: 29, fontFamily: 'poppins_medium' }}>{item.name}</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'center', paddingVertical: 20, marginTop: -10 }}>
                                <Text style={{ color: 'green', textAlign: 'center', fontSize: 14, }}>$</Text>
                                <Text style={{ fontSize: 40, marginTop: -5, color: 'green' }}>{item.amount}</Text>
                            </View>
                            <Text style={{ color: 'black',opacity:0.6, fontSize: 16, fontFamily: 'poppins_medium', textAlign: 'center' }}>{item.purpose}</Text>
                            {/* <Text style={{ color: 'white', fontSize: 16, fontFamily: 'poppins_medium' }}>{`\u2022`}  up to 200 jobs</Text> */}
                        </Ripple>
                    )}
                />
            </SafeAreaView>
            {/* <Ripple onPress={() => navigation.push('Payment', { plan: 'Basic', price: '8' })} style={{ backgroundColor: 'white', padding: 20, marginTop: 10, paddingVertical: 20, marginHorizontal: 30, borderRadius: 10 }}>
                <Text style={{ color: '#194666', textAlign: 'center', fontSize: 20, fontFamily: 'poppins_medium' }}>Basic</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'center', paddingVertical: 20 }}>
                    <Text style={{ color: '#194666', textAlign: 'center', fontSize: 14 }}>$ </Text>
                    <Text style={{ fontSize: 40, color: '#194666', marginTop: -5 }}>8</Text>
                </View>
                <Text style={{ color: '#194666', fontSize: 16, fontFamily: 'poppins_medium' }}>{`\u2022`}  Get 3 months listing</Text>
                <Text style={{ color: '#194666', fontSize: 16, fontFamily: 'poppins_medium' }}>{`\u2022`}  up to 20 jobs</Text>
            </Ripple>

            <Ripple onPress={() => navigation.push('Payment', { plan: 'Essential', price: '14' })} rippleColor='white' style={{ backgroundColor: '#00C1E4', padding: 20, marginTop: 20, paddingVertical: 20, marginHorizontal: 30, borderRadius: 10 }}>
                <Text style={{ color: 'white', textAlign: 'center', fontSize: 20, fontFamily: 'poppins_medium' }}>Essential</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'center', paddingVertical: 20 }}>
                    <Text style={{ color: 'white', textAlign: 'center', fontSize: 14 }}>$ </Text>
                    <Text style={{ fontSize: 40, color: 'white', marginTop: -5 }}>14</Text>
                </View>
                <Text style={{ color: 'white', fontSize: 16, fontFamily: 'poppins_medium' }}>{`\u2022`}  Get all the benefits of Basic</Text>
                <Text style={{ color: 'white', fontSize: 16, fontFamily: 'poppins_medium' }}>{`\u2022`}  up to 50 jobs</Text>
            </Ripple>

            <Ripple onPress={() => navigation.push('Payment', { plan: 'Premium', price: '20' })} rippleColor='white' style={{ backgroundColor: '#004BFF', padding: 20, marginTop: 20, paddingVertical: 20, marginHorizontal: 30, borderRadius: 10, marginBottom: 20 }}>
                <Text style={{ color: 'white', textAlign: 'center', fontSize: 20, fontFamily: 'poppins_medium' }}>Premium</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'center', paddingVertical: 20 }}>
                    <Text style={{ color: 'white', textAlign: 'center', fontSize: 14 }}>$ </Text>
                    <Text style={{ fontSize: 40, color: 'white', marginTop: -5 }}>20</Text>
                </View>
                <Text style={{ color: 'white', fontSize: 16, fontFamily: 'poppins_medium' }}>{`\u2022`}  Our most popular package</Text>
                <Text style={{ color: 'white', fontSize: 16, fontFamily: 'poppins_medium' }}>{`\u2022`}  up to 200 jobs</Text>
            </Ripple> */}

        </ScrollView>
    )
}

export default Plans
