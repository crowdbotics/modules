import React, { useState, useContext } from "react";
import { StyleSheet, View, ScrollView, Text, TextInput, Image, Button, Alert, Pressable} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import {storage} from "../../../../utils/storage";
import { showError } from "../../api/errorMessage";
import CBTextInput from "../../components/CBTextInput";
import ProfileIcon from "../../components/ProfileIcon"
import BackButton from "../../components/BackButton";
import { SafeAreaView } from "react-native-safe-area-context";
import { OptionsContext, GlobalOptionsContext } from "@options";

/*
  Name
  Birthday
  Gender
  City
  Country
  Phone Number
  Interests
  Skills
*/
export const ProfileSetup = (props) => {
  const [name, setName] = useState('');
  const [biography, setBiography] = useState('');
  const [birthday, setBirthday] = useState('');
  const [gender, setGender] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [phoneNum, setPhoneNum] = useState('');
  const [interests, setInterests] = useState('');
  const [skills, setSkills] = useState('');
  const [loading, setLoading] = useState(false);
  const {navigation} = props;
  const gOptions = useContext(GlobalOptionsContext);
  const BASE_URL = gOptions.url

  const doSomething = async (res) => {
    console.log('do something clicked');
    setLoading(true);
    const data = new FormData();
    data.append("name", name);
    data.append("biography", biography);
    data.append("birthday", birthday);
    data.append("gender", gender);
    data.append("city", city);
    data.append("country", country);
    data.append("phoneNum", phoneNum);
    data.append("interests", interests);
    data.append("skills", skills);
    const userToken = await storage.getToken();
    fetch(`${BASE_URL}/api/v1/setup-profile/`,{
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Token ${userToken}`
      },
      body: data
    }).then(navigation.goBack())
    .then((response) => response.json())
    .catch((error) => console.log(error))
    .finally(() => setLoading(false));
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView style={styles.container}>
        {navigation.canGoBack() && <Pressable onPress={()=>{navigation.goBack()}}  
          style={{position: 'absolute', zIndex: 1, left: 15, top: 15}}>
          <BackButton bgColor={"#fff"}/>
        </Pressable>}
        
        <View style={styles.headerContainer}>
          
          <View style={styles.headerImageContainer}>
              <Image source={{
                  uri: 'https://images.unsplash.com/photo-1597431842922-d9686a23baa6?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=800&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY1ODQzNTI0OA&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1900',
                }}
                resizeMode='cover'
                style={styles.profileCoverImage}
              />
             
            <TouchableOpacity style={styles.profileContainer}>
                <Image source={{
                  uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg==',
                }}
                resizeMode='cover'
                style={styles.profileImage}
                />
            </TouchableOpacity>
          </View>
          
        </View>
        <View>
          <CBTextInput value={name} valueSetter={setName} title="Name" placeholder="First Last"/>
          <CBTextInput value={biography} valueSetter={setBiography} title="Biography" placeholder="I enjoy..."/>
          <CBTextInput value={birthday} valueSetter={setBirthday} title="Birthday" placeholder="YYYY-MM-DD"/>
          <CBTextInput value={gender} valueSetter={setGender} title="Gender" placeholder="Male | Female | Other"/>
          <CBTextInput value={city} valueSetter={setCity} title="City" placeholder="New York City"/>
          <CBTextInput value={country} valueSetter={setCountry} title="Country" placeholder="U.S.A."/>
          <CBTextInput value={phoneNum} valueSetter={setPhoneNum} title="Phone Number" placeholder="555-555-5555"/>
          <CBTextInput value={interests} valueSetter={setInterests} title="Interests" placeholder="Interest 1, Interest 2..."/>
          <CBTextInput value={skills} valueSetter={setSkills} title="Skills" placeholder="Skill 1, Skill 2..."/>
        </View>
        <View style={styles.buttonContainer}>
            <TouchableOpacity style={[styles.btn]} onPress={()=> {doSomething()}}>
              <Text style={styles.btnText}>Save</Text>
            </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileContainer: {
    width: 80,
    height: 80,
    backgroundColor: '#7f8c8d',
    borderRadius: 40,
    marginBottom: -15,
  },
  headerImageContainer:{
    backgroundColor: 'red', 
    width: '100%', 
    height: 180, 
    justifyContent: 'flex-end', 
    alignItems: 'center'
  },
  profileCoverImage: {
    width: '100%',
    height: 180,
    position: 'absolute'
  },
  profileImage: {
    width: 80,
    height: 80,
  },
  signupcontainer:{
    flexDirection:'row',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent:'center',
  },
  sign:{
    fontSize: 18,
    fontWeight: '400',
    color: "black",
    padding: 13,
    textAlign: 'center',
  },
  grey:{
    fontSize: 13,
    fontWeight: '400',
    color: "gray",
    textAlign: 'center',
    padding: 35,
  },
  button:{
    borderRadius:10,
    padding: 10,
    backgroundColor: 'red'
  },
  btn: {
    paddingHorizontal: 40,
    paddingVertical: 10,
    backgroundColor: 'black',
    borderRadius: 10
  },
  underText:{
    fontSize: 14,
    fontWeight: '400',
    color: "black",
    padding: 13,

  },
  btnText: {
    color: 'white'
  },
  subTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 0,
    paddingTop: 20
  },  
  input: {
    borderRadius: 10,
    borderWidth: 1,
    height: 45,
    paddingHorizontal: 15,
    borderColor: '#C4C4C4',
    backgroundColor: '#FFF'
  },
  buttonContainer: {
    alignItems: 'center',
    flex: 1,
    paddingTop: 15
  },
  subText:{
    fontSize: 14,
    padding:10,
    fontWeight: '400',
    color: "black",
    textAlign: 'left'
  },
  container: {
    flex: 1,
    height: 100,
    backgroundColor: "white",
  },
  text: {
    fontSize: 42,
    fontWeight: '700',
    color: "black",
    textAlign: 'center',
    padding:60
  },

})
