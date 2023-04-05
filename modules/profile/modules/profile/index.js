import { unwrapResult } from "@reduxjs/toolkit";
import React, { Fragment, useEffect, useState } from "react";
import {
  Image, ScrollView, StyleSheet, Text, TouchableOpacity, View
} from "react-native";
import DocumentPicker from "react-native-document-picker";
import { useDispatch } from "react-redux";
import { adduser, deleteUser, getUser, slice } from "./auth";
import Button from "./components/Button";
import Input from "./components/Input";
import Loader from "./components/Loader";

const Profile = () => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const [isloading, setIsLoading] = useState(false);
  const [editProfile, setEditPrfile] = useState(false);
  const [isProfile, setIsProfile] = useState(false);
  const [profileData, setProfileData] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    country: "",
    city: "",
    state: "",
    address1: "",
    zip_code: "",
    gender: "",
    age: null,
    profile_image: null
  });

  useEffect(() => {
    getProfile();
  }, []);

  const selectFile = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images]
      });
      setProfileData({ ...profileData, profile_image: res[0] });
      setIsProfile(true);
    } catch (err) {
      setIsProfile(false);
      if (DocumentPicker.isCancel(err)) {
        alert("Canceled");
      } else {
        alert("Unknown Error: " + JSON.stringify(err));
        throw err;
      }
    }
  };

  const addProfile = async () => {
    setIsLoading(true);
    const tmpProfileData = JSON.parse(JSON.stringify(profileData));
    if (!isProfile) {
      delete tmpProfileData.profile_image;
    }
    const data = new FormData();
    Object.keys(tmpProfileData).forEach(key => {
      data.append(key, tmpProfileData[key]);
    });

    dispatch(adduser(data))
      .then(unwrapResult)
      .then((res) => {
        setIsLoading(false);
        setEditPrfile(false);
        setIsProfile(false);
        setErrors({});
        alert("Profile updated successfully");
      })
      .catch((err) => {
        setErrors(err);
        setIsLoading(false);
      });
  };

  const getProfile = async () => {
    setIsLoading(true);
    dispatch(getUser()).then(unwrapResult).then((res) => {
      if (res) {
        setProfileData(res);
      } else {
        setEditPrfile(true);
      }
      setIsLoading(false);
    }).catch((err) => {
      setIsLoading(false);
      alert(err.detail);
    });
  };

  const deleteProfile = async () => {
    setIsLoading(true);
    dispatch(deleteUser()).then(unwrapResult).then((res) => {
      setIsLoading(false);
      setProfileData({
        first_name: "",
        last_name: "",
        phone: "",
        country: "",
        city: "",
        state: "",
        address1: "",
        zip_code: "",
        gender: "",
        age: null,
        profile_image: null
      });
    })
      .catch((err) => {
        setIsLoading(false);
        alert(err.detail);
      });
  };

  return (
    <View style={styles.container}>
      {isloading && <Loader></Loader>}
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity onPress={selectFile}>
            <Image resizeMode="cover" source={profileData?.profile_image ? { uri: profileData.profile_image.uri } || { uri: profileData.profile_image } : require("./assets/profilePicture.png")} style={styles.profilePicture} />
          </TouchableOpacity>
          {
            profileData.first_name
              ? <Text style={styles.name}>{profileData.first_name} {profileData.last_name}</Text>
              : <Text style={styles.name}>username</Text>
          }
        </View>
        <View style={styles.separator}>
          <TouchableOpacity onPress={() => setEditPrfile(!editProfile)}>
            <Text style={[styles.separatorText, styles.green]}>Edit Account</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={deleteProfile}>
            <Text style={[styles.separatorText, styles.red]}>Delete Account</Text>
          </TouchableOpacity>
        </View>
        <Input editable={editProfile} text="First Name" value={profileData.first_name} onChange={text => setProfileData({ ...profileData, first_name: text })} />
        <Input editable={editProfile} text="Last Name" value={profileData.last_name} onChange={text => setProfileData({ ...profileData, last_name: text })} />
        <Input editable={editProfile} text="Phone" value={profileData.phone?.toString()} onChange={text => setProfileData({ ...profileData, phone: text })} />
        <View style={styles.halfInputs}>
          <Input
            editable={editProfile}
            text="City"
            value={profileData.city}
            onChange={text => setProfileData({ ...profileData, city: text })}
            style={styles.input1}
            containerStyle={styles.inputContainer1}
          />
          <Input
            editable={editProfile}
            text="Country"
            value={profileData.country}
            onChange={text => setProfileData({ ...profileData, country: text })}
            style={styles.input2}
            containerStyle={styles.inputContainer2}
          />
        </View>
        <View style={styles.halfInputs}>
          <Input
            editable={editProfile}
            text="Zip Code"
            value={profileData.zip_code}
            onChange={text => setProfileData({ ...profileData, zip_code: text })}
            style={styles.input1}
            containerStyle={styles.inputContainer1}
          />
          <Input
            editable={editProfile}
            text="State"
            value={profileData.state}
            onChange={text => setProfileData({ ...profileData, state: text })}
            style={styles.input2}
            containerStyle={styles.inputContainer2}
          />
        </View>
        <View style={styles.halfInputs}>
          <Input
            editable={editProfile}
            text="Gender"
            value={profileData.gender}
            onChange={text => setProfileData({ ...profileData, gender: text })}
            style={styles.input1}
            containerStyle={styles.inputContainer1}
          />
          <Input
            editable={editProfile}
            text="Age"
            value={profileData.age?.toString()}
            onChange={text => setProfileData({ ...profileData, age: text })}
            style={styles.input2}
            containerStyle={styles.inputContainer2}
          />
        </View>
        <Input editable={editProfile} text="Address 1" value={profileData.address1} onChange={text => setProfileData({ ...profileData, address1: text })} />
        {Object.keys(errors).map((error, index) => (
          <Fragment key={index}>
            {
              (errors[error] instanceof Array)
                ? errors[error].map((obj, index) => (<Text key={index} style={styles.error}>{error}: {obj}</Text>))
                : <Text key={index} style={styles.error}>{error}: {errors[error]}</Text>
            }
          </Fragment>
        ))
        }

        <Button buttonText="Update Profile" onPress={addProfile} />
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20
  },
  heading: {
    fontSize: 20
  },
  header: {
    alignItems: "center"
  },
  profilePicture: {
    width: 80,
    height: 80,
    borderRadius: 40
  },
  name: {
    fontSize: 20,
    marginTop: 10
  },
  email: {
    fontSize: 13,
    color: "#aaa"
  },
  separator: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    marginHorizontal: 10,
    borderBottomColor: "#f2f2f2",
    borderBottomWidth: 1,
    marginVertical: 10
  },
  separatorText: {
    fontSize: 14,
    fontWeight: "bold"
  },
  green: {
    color: "#12D790"
  },
  red: {
    color: "#FF6848"
  },
  halfInputs: {
    flexDirection: "row"
  },
  inputContainer1: {
    flex: 1
  },
  inputContainer2: {
    flex: 1
  },
  input1: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    borderRightWidth: 0
  },
  input2: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    borderLeftWidth: 0
  },
  uploadText: {
    fontSize: 14,
    marginLeft: 20,
    color: "#111112"
  },
  uploadLicense: {
    borderWidth: 1,
    borderColor: "#e6e6e6",
    borderRadius: 10,
    padding: 2,
    paddingLeft: 20,
    marginVertical: 10,
    width: "100%",
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  placeholder: {
    fontSize: 14,
    color: "#9B9B9B"
  },
  button: {
    width: 70,
    height: "100%",
    backgroundColor: "#EE4137",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10
  },
  icon: {
    width: 20,
    height: 20,
    resizeMode: "contain"
  },
  error: { color: "#FF5733" }
});

export default {
  title: "profile",
  navigator: Profile,
  slice
};
