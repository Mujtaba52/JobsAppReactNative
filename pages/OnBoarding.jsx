import {Image, ImageBackground, Pressable, Text, View} from "react-native";

function OnBoarding({ navigation }) {
    return (
        <View style={{flex: 1, backgroundColor: '#fff'}}>
            <ImageBackground
                style={{width: 270, height: 282, paddingLeft: 20, paddingRight: 40, justifyContent: 'center'}}
                source={require('../assets/circle_blue.png')}>
                <Text style={{textAlign: 'center', fontSize: 14, fontFamily: 'poppins_bold', color: '#fff'}}>We will work for you to expose your skills to find the most reliable job opportunity in Australia and New Zealand.</Text>
            </ImageBackground>
            <Text style={{color: 'black', fontWeight: '600', fontSize:20, alignSelf: 'center', marginTop: 50}}>Welcome to</Text>
            <Image style={{ width: 300, height: 40, marginBottom: 130, alignSelf: 'center' }} source={require('../assets/logo.png')} alt={'Okay'} />
            <Pressable onPress={() => navigation.replace('Home')} style={{
                width: '85%',
                backgroundColor: '#13A3E1',
                alignItems: 'center',
                borderRadius: 25,
                paddingVertical: 15,
                alignSelf: 'center',
                elevation:10,
                zIndex: 1
            }}><Text style={{color: '#fff', fontWeight: '900', fontSize: 20}}>Continue</Text></Pressable>
            <ImageBackground style={{width: 270, height: 287, marginTop: 'auto', marginLeft: 'auto', paddingTop: 40}}
                             source={require('../assets/circle_yellow.png')}>
                <Text style={{
                    textAlign: 'center',
                    fontSize: 18,
                    color: '#fff',
                    fontFamily: 'poppins_bold',
                    alignSelf: 'center',
                    marginTop: 'auto',
                    marginRight: 20,
                    marginLeft: 40
                }}>Reliable Opportunities Await: Aus & NZ Jobs!</Text>
                <Text style={{
                    textAlign: 'right',
                    fontSize: 10,
                    color: '#fff',
                    fontFamily: 'poppins_regular',
                    marginTop: 'auto',
                    marginLeft: 40,
                    marginRight: 10
                }}>The largest resume distribution Service in Australia and New Zealand</Text>
            </ImageBackground>
        </View>
    )
}

export default OnBoarding
