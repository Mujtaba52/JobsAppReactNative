import React, { useState } from 'react'
import { Image, Pressable, Text, TextInput, View } from 'react-native'
import { ScrollView } from 'react-native'
import CoverLetterRole from '../Components/CoverLetter/CoverLetterRoleModal'
import IntroModal from '../Components/CoverLetter/IntroModal'
import BodyModal from '../Components/CoverLetter/BodyModal'
import ExperienceModal from '../Components/CoverLetter/ExperienceModal'
import StudyModal from '../Components/CoverLetter/StudyModal'

const CoverLetterForm = ({ navigation }) => {

  const [roleVisible, setRoleVisible] = useState(false)
  const toggleRoleVisibility = () => setRoleVisible(!roleVisible)

  const [introvVisible, setIntroVisible] = useState(false)
  const toggleIntroVisibility = () => setIntroVisible(!introvVisible)

  const [bodyVisible, setBodyVisible] = useState(false)
  const toggleBodyVisibility = () => setBodyVisible(!bodyVisible)

  const [experienceVisible, setExperienceVisible] = useState(false)
  const toggleExperienceVisibility = () => setExperienceVisible(!experienceVisible)

  const [studyVisible , setStudyVisible] = useState (false)
  const toggleStudyVisibility = () => setStudyVisible(!studyVisible)


  return (
    <ScrollView>
      <CoverLetterRole visible={roleVisible} toggleRoleVisibility={toggleRoleVisibility} />
      <IntroModal visible={introvVisible} toggleIntroVisibility={toggleIntroVisibility} />
      <BodyModal visible={bodyVisible} toggleBodyVisibility={toggleBodyVisibility} />
      <ExperienceModal visible={experienceVisible} toggleExperienceVisibility={toggleExperienceVisibility} />
      <StudyModal  visible={studyVisible} toggleStudyVisibility={toggleStudyVisibility}  />

      <View style={{ flexDirection: 'column', width: '100%', height: 240, backgroundColor: '#13A3E1' }}>
        <View style={{ flexDirection: 'row', height: 130 }}>
          <Pressable onPress={() => navigation.goBack()}
            style={{ paddingRight: 5 }}><Image style={{ width: 22, height: 20, marginTop: 70, marginLeft: 30, marginBottom: 250, tintColor: '#fff' }} source={require('../assets/back_arrow.png')} alt={'Okay'} />
          </Pressable>
          <View style={{ width: '100%', marginTop: 0, paddingEnd: 90 }}>
            <Image style={{ width: 150, height: 40, marginTop: 60, alignSelf: 'center' }}
              source={require('../assets/logo.png')} alt={'Okay'} />
          </View>
        </View>
        <Text style={{
          color: '#fff', fontSize: 18, fontFamily: 'poppins_regular', width: '100%', textAlign: 'center'
        }}>Cover Letter</Text>
        <Pressable onPress={() => navigation.push('CoverLetter')} style={{ backgroundColor: '#fff', borderRadius: 25, alignItems: 'center', padding: 15, marginTop: 15, marginHorizontal: 100 }}>
          <Text style={{ color: '#000', fontWeight: '800', fontSize: 15 }}>Build Cover Letter</Text></Pressable>
      </View>

      <ScrollView style={{}}>
        <View style={{ flexDirection: 'column', borderColor: '#b2b2b2', backgroundColor: '#fff', padding: 20, marginHorizontal: 10, marginRight: 30, marginLeft: 30, borderRadius: 30, marginTop: 20 }}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ fontFamily: 'poppins_bold', fontSize: 16 }}>Date</Text>
            <Pressable style={{ backgroundColor: '#e7e7e7', borderRadius: 25, alignItems: 'center', paddingVertical: 5, paddingHorizontal: 15, marginLeft: 'auto' }}>
              <View>
                <Text style={{ color: '#000', fontFamily: 'poppins_medium', fontSize: 12 }}> Update</Text>
              </View>
            </Pressable>
          </View>
          <TextInput style={{ flex: 1, textAlign: 'center', color: '#757575', fontFamily: 'poppins_light', margin: 15 }} placeholder='Enter Date' />
        </View>
        <View style={{ flexDirection: 'column', borderColor: '#b2b2b2', backgroundColor: '#fff', padding: 20, marginHorizontal: 10, marginRight: 30, marginLeft: 30, borderRadius: 30, marginTop: 20 }}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ fontFamily: 'poppins_bold', fontSize: 16 }}>Company</Text>
            <Pressable style={{ backgroundColor: '#e7e7e7', borderRadius: 25, alignItems: 'center', paddingVertical: 5, paddingHorizontal: 15, marginLeft: 'auto' }}>
              <View>
                <Text style={{ color: '#000', fontFamily: 'poppins_medium', fontSize: 12 }}> Update</Text>
              </View>
            </Pressable>
          </View>
          <TextInput style={{ flex: 1, textAlign: 'center', color: '#757575', fontFamily: 'poppins_light', margin: 15 }} placeholder='Enter Employer Name or Advertiser' />
        </View>
        <View style={{ flexDirection: 'column', borderColor: '#b2b2b2', backgroundColor: '#fff', padding: 20, marginHorizontal: 10, marginRight: 30, marginLeft: 30, borderRadius: 30, marginTop: 20 }}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ fontFamily: 'poppins_bold', fontSize: 16 }}>
              Role
            </Text>
            <Pressable onPress={() => toggleRoleVisibility()} style={{ backgroundColor: '#e7e7e7', borderRadius: 25, alignItems: 'center', paddingVertical: 5, paddingHorizontal: 15, marginLeft: 'auto' }}>
              <View>
                <Text style={{ color: '#000', fontFamily: 'poppins_medium', fontSize: 12 }}> Add</Text>
              </View>
            </Pressable>
          </View>
          <TextInput style={{ flex: 1, textAlign: 'center', color: '#757575', fontFamily: 'poppins_light', margin: 15 }} placeholder='Enter Interest' />
        </View>

        <View style={{ flexDirection: 'column', borderColor: '#b2b2b2', backgroundColor: '#fff', padding: 20, marginHorizontal: 10, marginRight: 30, marginLeft: 30, borderRadius: 30, marginTop: 20 }}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ fontFamily: 'poppins_bold', fontSize: 16 }}>Intro</Text>
            <Pressable onPress={() => toggleIntroVisibility()} style={{ backgroundColor: '#e7e7e7', borderRadius: 25, alignItems: 'center', paddingVertical: 5, paddingHorizontal: 15, marginLeft: 'auto' }}>
              <View>
                <Text style={{ color: '#000', fontFamily: 'poppins_medium', fontSize: 12 }}>Add</Text>
              </View>
            </Pressable>
          </View>
          <TextInput style={{ flex: 1, textAlign: 'center', color: '#757575', fontFamily: 'poppins_light', margin: 15 }} placeholder='Introduction paragraph' />
        </View>

        <View style={{ flexDirection: 'column', borderColor: '#b2b2b2', backgroundColor: '#fff', padding: 20, marginHorizontal: 10, marginRight: 30, marginLeft: 30, borderRadius: 30, marginTop: 20 }}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ fontFamily: 'poppins_bold', fontSize: 16 }}>
              Body
            </Text>
            <Pressable onPress={() => toggleBodyVisibility()} style={{ backgroundColor: '#e7e7e7', borderRadius: 25, alignItems: 'center', paddingVertical: 5, paddingHorizontal: 15, marginLeft: 'auto' }}>
              <View>
                <Text style={{ color: '#000', fontFamily: 'poppins_medium', fontSize: 12 }}> Add</Text>
              </View>
            </Pressable>
          </View>
          <TextInput style={{ flex: 1, textAlign: 'center', color: '#757575', fontFamily: 'poppins_light', margin: 15 }} placeholder='Describe Yourself' />
        </View>

        <View style={{ flexDirection: 'column', borderColor: '#b2b2b2', backgroundColor: '#fff', padding: 20, marginHorizontal: 10, marginRight: 30, marginLeft: 30, borderRadius: 30, marginTop: 20 }}>

          <View style={{ flexDirection: 'row' }}>
            <Text style={{
              fontFamily: 'poppins_bold',
              fontSize: 16
            }}>Experiences</Text>
            <Pressable
              onPress={() => toggleExperienceVisibility()} 
              style={{ backgroundColor: '#e7e7e7', borderRadius: 25, alignItems: 'center', paddingVertical: 5, paddingHorizontal: 15, marginLeft: 'auto' }}>
              <View><Text style={{ color: '#000', fontFamily: 'poppins_medium', fontSize: 12 }}>Add</Text>
              </View>
            </Pressable>
          </View>
          <Text style={{ flex: 1, textAlign: 'center', color: '#757575', fontFamily: 'poppins_light', margin: 15 }}>statement</Text>
        </View>
        <View style={{ flexDirection: 'column', borderColor: '#b2b2b2', backgroundColor: '#fff', padding: 20, marginHorizontal: 10, marginRight: 30, marginLeft: 30, borderRadius: 30, marginTop: 20 }}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ fontFamily: 'poppins_bold', fontSize: 16 }}>Study</Text>
            <Pressable  onPress={() => toggleStudyVisibility()}  style={{ backgroundColor: '#e7e7e7', borderRadius: 25, alignItems: 'center', paddingVertical: 5, paddingHorizontal: 15, marginLeft: 'auto' }}>
              <View>
                <Text style={{ color: '#000', fontFamily: 'poppins_medium', fontSize: 12 }}>Add</Text>
              </View>
            </Pressable>
          </View>
          <TextInput style={{ flex: 1, textAlign: 'center', color: '#757575', fontFamily: 'poppins_light', margin: 15 }} placeholder='Introduction paragraph' />
        </View>

      </ScrollView>
    </ScrollView>
  )
}

export default CoverLetterForm
