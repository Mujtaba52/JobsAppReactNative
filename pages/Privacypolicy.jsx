import { Text, Image, Pressable, ScrollView } from 'react-native'
import React from 'react'
import { View } from 'react-native'
import Contactus from './Contactus'
import { TouchableOpacity } from 'react-native'
import { Linking } from 'react-native'

function Privacypolicy({ navigation }) {
  return (
    <ScrollView>
      <View style={{ display: "flex", flexDirection: "row", marginTop: 40, }}>
        <Pressable onPress={() => navigation.goBack()} style={{ padiingRight: 5 }}>
          <Image style={{ width: 25, height: 25, marginLeft: 25, marginTop: 15, alignSelf: 'flex-start' }} source={require('../assets/back_arrow.png')} />
        </Pressable>
        <Pressable onPress={() => navigation.push('Contactus')}>
          <Image style={{ width: 160, height: 50, marginLeft: 60 }} source={require('../assets/logo.png')} />
        </Pressable>
      </View>
      <ScrollView style={{ padding: 20 }}>
        <Text style={{ fontSize: 18, fontFamily: 'poppins_bold', marginBottom: 20,textAlign:'center' }}>Privacy Policy</Text>

        <View style={{ marginBottom: 20 }}>
          <Text style={{ fontSize: 14, fontFamily: 'poppins_bold' }}>Information We Collect</Text>
          <Text style={{ marginTop: 10, fontFamily: 'poppins_medium',fontSize:12 }}>
            <Text style={{ fontFamily: 'poppins_bold' }}>Personal Information:</Text> We may collect information such as your name, email address, phone number, and resume/CV when you create an account or apply for jobs.
          </Text>

          <Text style={{ marginTop: 10, fontFamily: 'poppins_medium',fontSize:12 }}>
            <Text style={{ fontFamily: 'poppins_bold' }}>Usage Data:</Text> We collect data on how you interact with our app, including search history, job preferences, and device information.
          </Text>

          <Text style={{ marginTop: 10, fontFamily: 'poppins_medium',fontSize:12 }}>
            <Text style={{ fontFamily: 'poppins_bold' }}>Location Information:</Text> With your consent, we may collect your device's location to provide localized job recommendations.
          </Text>
          <Text style={{ marginTop: 10, fontFamily: 'poppins_medium',fontSize:12 }}>
            <Text style={{ fontFamily: 'poppins_bold' }}>How We Use Your Information:
            </Text> Matching: We use your information to match you with job opportunities and employers, improving your job search experience.
            Communication: We may contact you about job matches, updates, or promotions related to our services.

          </Text>
          <Text style={{ marginTop: 10, fontFamily: 'poppins_medium',fontSize:12 }}>
            <Text style={{ fontFamily: 'poppins_bold' }}>Analytics:</Text> We use data analytics to enhance our app's functionality and user experience.

          </Text>
          <Text style={{ marginTop: 10, fontFamily: 'poppins_medium',fontSize:12 }}>
            <Text style={{ fontFamily: 'poppins_bold' }}>Information Sharing:
            </Text> Employers: Your profile and job application information may be shared with potential employers when you apply for a job.
            Service Providers: We may share data with service providers to enhance our app's features.

          </Text>
          <Text style={{ marginTop: 10, fontFamily: 'poppins_medium',fontSize:12 }}>
            <Text style={{ fontFamily: 'poppins_bold' }}>Security:
            </Text> We take measures to protect your information but cannot guarantee absolute security. Please use strong passwords and keep your login details secure.

          </Text>
          <Text style={{ marginTop: 10, fontFamily: 'poppins_medium',fontSize:12 }}>
            <Text style={{ fontFamily: 'poppins_bold' }}> Your Choices:
            </Text> You can review and update your information in your account settings.
            You have the right to access, correct, or delete your personal data. Contact us to make these requests.

          </Text>
          <Text style={{ marginTop: 10, fontFamily: 'poppins_medium',fontSize:12 }}>
            <Text style={{ fontFamily: 'poppins_bold' }}>Third-Party Links:
            </Text> Our app may contain links to third-party websites or services. We are not responsible for their privacy practices.

          </Text>
          <Text style={{ marginTop: 10, fontFamily: 'poppins_medium',fontSize:12 }}>
            <Text style={{ fontFamily: 'poppins_bold' }}>Changes to Privacy Policy:
            </Text>We may update this Privacy Policy as our app evolves. You will be notified of significant changes.

          </Text>
        </View>

        <View style={{ marginTop: 20 }}>
          <Text style={{ marginTop: 10, fontFamily: 'poppins_medium',fontSize:12,textAlign:'right' }}>
            If you have questions or concerns about your privacy or this policy, please contact us at:
          </Text>

          <TouchableOpacity onPress={() => Linking.openURL(`tel:${'1300 562 772'}`)} >
            <Text style={{ color: 'blue', fontFamily: 'poppins_medium',textAlign:'right' }}>1300 562 772</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => Linking.openURL('mailto:info@jobss.com.au')} >
            <Text style={{ color: 'blue', fontFamily: 'poppins_medium',textAlign:'right' }}>info@jobss.com.au</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ScrollView>
  )
}

export default Privacypolicy