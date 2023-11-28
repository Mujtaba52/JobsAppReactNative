import {Button, Image, ImageBackground, Text, View} from "react-native";
import {useEffect} from "react";

function AppLoading() {

    return (
        <View style={{flex: 1, backgroundColor: '#fff', justifyContent: 'center'}}>
            <Image style={{width: 340, height: 190, alignSelf: 'center'}} source={require('../assets/logo.png')}
                   alt={'Okay'}/>
        </View>
    );
}

export default AppLoading
