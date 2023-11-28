import React from 'react'
import {Image, Text, View} from 'react-native'

const AppliedSuccessful = () => {
    return (
        <View>
            <View style={{
                flexDirection: 'column',
                justifyContent: 'center',
                marginLeft: 'auto',
                marginRight: 'auto',
                marginTop: 150
            }}>
                <Image source={require('../assets/purchase.png')} style={{marginTop: 20, width: 220, height: 240}}/>
                <Text style={{textAlign: 'center', fontSize: 16, fontFamily: 'poppins_medium', marginTop: 20}}>Job
                    Successfuly Applied !</Text>
                <Text style={{textAlign: 'center', fontSize: 16, fontFamily: 'poppins_medium'}}></Text>
                <Text style={{
                    textAlign: 'center',
                    fontSize: 16,
                    fontFamily: 'poppins_medium',
                    backgroundColor: 'green',
                    color: 'white',
                    marginTop: 100,
                    borderRadius: 20,
                    paddingVertical: 10
                }}>Search Other Jobs</Text>
                <Text style={{
                    textAlign: 'center',
                    fontSize: 16,
                    fontFamily: 'poppins_medium',
                    backgroundColor: 'green',
                    color: 'white',
                    marginTop: 10,
                    borderRadius: 20,
                    paddingVertical: 10
                }}>Go to Home</Text>
            </View>
        </View>
    )
}

export default AppliedSuccessful
