import { useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    View,
    Modal,
    TouchableOpacity,
    Text,
    Image,
    Pressable,
    TextInput,
    ScrollView,
    Button,
    Alert
} from 'react-native';

import WebView from 'react-native-webview';
import queryString from 'query-string';
import { CardField, useConfirmPayment } from "@stripe/stripe-react-native";
import ButtonComp from "../Components/ButtonComp";
import paypalApi from "../API/paypal"
import { useEffect } from 'react';
import {API_URL, createUserPlan, updateSeekerStatus} from "../API";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";
import LoadingModal from '../Components/LoadingModal';

const PaymentScreen = ({ route, navigation }) => {
    const [email, setEmail] = useState();
    const [cardDetails, setCardDetails] = useState();
    const { confirmPayment, loading } = useConfirmPayment();

    const [ID, setID] = useState()

    const { plan } = route.params
    const { price } = route.params
    const { type } = route.params


    useEffect(() => {
        GetData()
    }, []);
    const GetData = async () => {
        const value = await AsyncStorage.getItem('ID')
        setID(value);
    }

    const fetchPaymentIntentClientSecret = async () => {
        const response = await fetch(`${API_URL}/create-payment-intent`, {
            method: "POST",
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                price: Number(price)*100,
            })
        });
        const { clientSecret, error } = await response.json();
        return { clientSecret, error };
    };

    const handlePayPress = async () => {
        //1.Gather the customer's billing information (e.g., email)
        toggleVisibility(true)

        if (!cardDetails?.complete || !email) {
            Alert.alert("Please enter Complete card details and Email");
            return;
        }
        const billingDetails = {
            email: email,
        };
        //2.Fetch the intent client secret from the backend
        try {
            const { clientSecret, error } = await fetchPaymentIntentClientSecret();
            //2. confirm the payment
            if (error) {
                console.log(error)
                console.log("Unable to process payment");
            } else {
                const { paymentIntent, error } = await confirmPayment(clientSecret, {
                    paymentMethodType: "Card",
                    billingDetails: billingDetails,
                });
                if (error) {
                    alert(`Payment Confirmation Error ${error.message}`);
                } else if (paymentIntent) {
                    subscribePlan()
                    toggleVisibility(false)
                    console.log("Payment successful ", paymentIntent);
                }
            }
        } catch (e) {
            console.log(e);
        }
    }

    const [isLoading, setLoading] = useState(false)
    const [paypalUrl, setPaypalUrl] = useState(null)
    const [accessToken, setAccessToken] = useState(null)


    const onPressPaypal = async () => {
        setLoading(true)
        try {
            const token = await paypalApi.generateToken()
            const res = await paypalApi.createOrder(token, Number(price))
            setAccessToken(token)
            console.log("res++++++", res)
            setLoading(false)
            if (!!res?.links) {
                const findUrl = res.links.find(data => data?.rel == "approve")
                setPaypalUrl(findUrl.href)
            }


        } catch (error) {
            console.log("error", error)
            setLoading(false)

        }
    }


    const onUrlChange = (webviewState) => {
        console.log("webviewStatewebviewState", webviewState)
        if (webviewState.url.includes(`${API_URL}/cancel`)) {
            clearPaypalState()
            return;
        }
        if (webviewState.url.includes(`${API_URL}/return`)) {

            const urlValues = queryString.parseUrl(webviewState.url)
            console.log("my urls value", urlValues)
            const { token } = urlValues.query
            if (!!token) {
                paymentSucess(token)
            }

        }
    }

    const paymentSucess = async (id) => {
        try {
            const res = paypalApi.capturePayment(id, accessToken)
            console.log("capturePayment res++++", res)
            subscribePlan()
            clearPaypalState()
        } catch (error) {
            console.log("error raised in payment capture", error)
        }
    }


    const clearPaypalState = () => {
        setPaypalUrl(null)
        setAccessToken(null)
    }

    const subscribePlan = () => {
        const postDate = moment().format("YYYY-MM-DD")
        createUserPlan(ID, plan, postDate, type).then(res => {
            const {data: {responseCode}} = res;
            if (responseCode === 200) {
                updateSeekerStatus(email)
                navigation.popToTop()
                navigation.replace('PaymentSuccessful', { type: type })
            } else {

            }
        })
    }
    

const [loadingVisible,setLoadingVisible ] = useState(false)
const toggleVisibility = (val) => setLoadingVisible(!val)

    return (
        <ScrollView
        keyboardShouldPersistTaps="handled"
        >
            <LoadingModal  visible={loadingVisible}  />
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
                        }} >Payment Details</Text>
                    </View>
                </View>
            </View>

            <Text style={{ color: '#002E81', fontSize: 50, fontFamily: 'poppins_medium', textAlign: 'center', marginTop: 40 }}>${price}</Text>
            <Text style={{ color: 'gray', fontSize: 13, fontFamily: 'poppins_medium', textAlign: 'center', marginBottom: 40 }}>{plan} plan</Text>

            <View style={styles.container}>
                <Text style={{ fontFamily: 'poppins_medium', fontSize: 14, marginLeft: 13, }}>Enter Your Email:</Text>
                <TextInput
                    autoCapitalize="none"
                    placeholder="E-mail"
                    keyboardType="email-address"
                    onChange={value => setEmail(value.nativeEvent.text)}
                    style={{ backgroundColor: 'white', height: 47, borderWidth: 1, borderColor: 'gray', marginHorizontal: 10, borderRadius: 10, paddingLeft: 10 }}
                />
                <Text style={{ fontFamily: 'poppins_medium', fontSize: 14, marginLeft: 13, marginTop: 30, marginBottom: -25 }}>Enter Your Card details:</Text>
                <CardField
                    postalCodeEnabled={true}
                    placeholder={{
                        number: "4242 4242 4242 4242",
                    }}
                    cardStyle={{ textColor: 'gray', borderWidth: 1, borderColor: 'gray', borderRadius: 10 }}
                    style={{ height: 47, marginTop: 20, borderWidth: 1, borderColor: 'gray', marginHorizontal: 10 }}
                    onCardChange={cardDetails => {
                        setCardDetails(cardDetails);
                    }}
                />

            </View>

            {/* <View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 70, width: '80%', marginLeft: 'auto', marginRight: 'auto' }}>
                        <Text style={{ fontSize: 14, fontFamily: 'poppins_medium', color: 'gray' }}>Amount</Text>
                        <Text style={{ fontSize: 14, fontFamily: 'poppins_medium', color: 'green' }}>$5</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 70, width: '80%', marginLeft: 'auto', marginRight: 'auto' }}>
                        <Text style={{ fontSize: 14, fontFamily: 'poppins_medium', color: 'gray' }}>Tax</Text>
                        <Text style={{ fontSize: 14, fontFamily: 'poppins_medium', color: 'green' }}>$0.1</Text>
                    </View>
                    <Text style={{ backgroundColor: "gray", height: 2, width: '80%', marginLeft: 'auto', marginRight: 'auto', marginVertical: 20 }}>-</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 70, width: '80%', marginLeft: 'auto', marginRight: 'auto' }}>
                        <Text style={{ fontSize: 14, fontFamily: 'poppins_medium', color: 'gray' }}>Total</Text>
                        <Text style={{ fontSize: 24, fontFamily: 'poppins_medium', color: 'black' }}>$5.1</Text>
                    </View>


                </View> */}

            <SafeAreaView style={{ flex: 1, marginTop: 10 }}>
                <View style={{ width: '80%', marginLeft: 'auto', marginRight: 'auto' }}>
                    <ButtonComp
                        onPress={handlePayPress}
                        disabled={false}
                        btnStyle={{ backgroundColor: '#F7BE38', }}
                        text="Pay using Stripe"
                        isLoading={false} />
                </View>
                <View style={{ flexDirection: 'row', marginLeft: 'auto', marginRight: 'auto', marginVertical: 30, gap: 10, }}>
                    <Text style={{ backgroundColor: 'gray', height: 1.5, width: 100, marginTop: 6 }}>-</Text>
                    <Text>OR</Text>
                    <Text style={{ backgroundColor: 'gray', height: 1.5, width: 100, marginTop: 6 }}>-</Text>
                </View>
                <View style={{ width: '80%', marginLeft: 'auto', marginRight: 'auto' }}>
                    <ButtonComp
                        onPress={onPressPaypal}
                        disabled={false}
                        btnStyle={{ backgroundColor: '#002E81', }}
                        text="Pay using paypal"
                        isLoading={isLoading}
                    />
                </View>
                <Modal visible={!!paypalUrl} onRequestClose={clearPaypalState} >
                    <TouchableOpacity onPress={clearPaypalState} style={{ margin: 24 }} >
                        <Image source={require('../assets/back_arrow.png')} style={{ width:24,height:24,tintColor:'gray' }}  />

                    </TouchableOpacity>
                    <View style={{ flex: 1 }}>
                        <WebView source={{ uri: paypalUrl }} onNavigationStateChange={onUrlChange} />
                    </View>

                </Modal>
            </SafeAreaView>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        margin: 20,
    },
    input: {
        backgroundColor: "#efefefef",

        borderRadius: 8,
        fontSize: 20,
        height: 50,
        padding: 10,
    },
    card: {
        backgroundColor: "#efefefef",
    },
    cardContainer: {
        height: 50,
        marginVertical: 30,
    },
});

export default PaymentScreen;


