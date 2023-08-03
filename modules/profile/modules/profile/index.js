import React, { Fragment, useEffect, useState, useContext } from "react";
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { unwrapResult } from "@reduxjs/toolkit";
import DocumentPicker from "react-native-document-picker";
import { useDispatch } from "react-redux";
import { adduser, deleteUser, getUser, slice } from "./auth";
import Button from "./components/Button";
import Input from "./components/Input";
import Loader from "./components/Loader";
import { OptionsContext } from "@options";

/**
 * Profile Component for managing user profile details.
 * @returns {React.ReactNode} - The Profile component
 */
const Profile = () => {
  const options = useContext(OptionsContext);
  const { styles, ACCESS_TOKEN } = options;

  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const [isloading, setIsLoading] = useState(false);
  // Indicates whether user can edit profile details or not
  const [editProfile, setEditProfile] = useState(false);
  const [isProfile, setIsProfile] = useState(false);
  // State to store current and incoming profile details
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

  // Select profile image from device storage
  const selectProfileImage = async () => {
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

  // Save updated profile data to backend
  const updateProfile = async () => {
    setIsLoading(true);
    const tmpProfileData = JSON.parse(JSON.stringify(profileData));
    if (!isProfile) {
      delete tmpProfileData.profile_image;
    }
    const data = new FormData();
    delete tmpProfileData.user;
    Object.keys(tmpProfileData).forEach((key) => {
      data.append(key, tmpProfileData[key]);
    });
    dispatch(adduser({ data: data, token: ACCESS_TOKEN }))
      .then(unwrapResult)
      .then(() => {
        setIsLoading(false);
        setEditProfile(false);
        setIsProfile(false);
        setErrors({});
        Alert.alert("Success", "Profile updated successfully");
      })
      .catch((err) => {
        setErrors(err);
        setIsLoading(false);
      });
  };

  // Fetch user profile details from backend
  const getProfile = async () => {
    setIsLoading(true);
    dispatch(getUser({ token: ACCESS_TOKEN }))
      .then(unwrapResult)
      .then((res) => {
        if (res) {
          setProfileData(res);
        } else {
          setEditProfile(true);
        }
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        Alert.alert("Error", err.detail);
      });
  };

  // Delete user profile
  const deleteProfile = async () => {
    setIsLoading(true);
    dispatch(deleteUser({ token: ACCESS_TOKEN }))
      .then(unwrapResult)
      .then(() => {
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

  // Get profile image URI
  const getProfileImage = () => {
    if (profileData.profile_image) {
      return typeof profileData.profile_image === "object"
        ? { uri: profileData.profile_image.uri }
        : { uri: profileData.profile_image };
    } else {
      return require("./assets/profilePicture.png");
    }
  };

  // Display errors
  const displayErrors = () =>
    Object.keys(errors).map((error, index) => (
      <Fragment key={index}>
        {errors[error] instanceof Array
          ? (
              errors[error].map((obj, index) => (
            <Text key={index} style={styles.error}>
              {error}: {obj}
            </Text>
              ))
            )
          : (
          <Text key={index} style={styles.error}>
            {error}: {errors[error]}
          </Text>
            )}
      </Fragment>
    ));

  return (
    <View style={styles.mainContainer}>
      {isloading && <Loader />}
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity onPress={selectProfileImage}>
            <Image
              resizeMode="cover"
              source={getProfileImage()}
              style={styles.profilePicture}
            />
          </TouchableOpacity>
          {profileData.first_name
            ? (
            <Text style={styles.name}>
              {profileData.first_name} {profileData.last_name}
            </Text>
              )
            : (
            <Text style={styles.name}>username</Text>
              )}
        </View>
        <View style={styles.separator}>
          <TouchableOpacity onPress={() => setEditProfile(!editProfile)}>
            <Text style={[styles.separatorText, styles.green]}>
              Edit Profile
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={deleteProfile}>
            <Text style={[styles.separatorText, styles.red]}>
              Delete Profile
            </Text>
          </TouchableOpacity>
        </View>
        <Input
          editable={editProfile}
          text="First Name"
          value={profileData.first_name}
          onChange={(text) =>
            setProfileData({ ...profileData, first_name: text })
          }
        />
        <Input
          editable={editProfile}
          text="Last Name"
          value={profileData.last_name}
          onChange={(text) =>
            setProfileData({ ...profileData, last_name: text })
          }
        />
        <Input
          editable={editProfile}
          text="Phone"
          value={profileData.phone?.toString()}
          onChange={(text) => setProfileData({ ...profileData, phone: text })}
        />
        <View style={styles.halfInputs}>
          <Input
            editable={editProfile}
            text="City"
            value={profileData.city}
            onChange={(text) => setProfileData({ ...profileData, city: text })}
            style={styles.input1}
            containerStyle={styles.inputContainer1}
          />
          <Input
            editable={editProfile}
            text="Country"
            value={profileData.country}
            onChange={(text) =>
              setProfileData({ ...profileData, country: text })
            }
            style={styles.input2}
            containerStyle={styles.inputContainer2}
          />
        </View>
        <View style={styles.halfInputs}>
          <Input
            editable={editProfile}
            text="Zip Code"
            value={profileData.zip_code}
            onChange={(text) =>
              setProfileData({ ...profileData, zip_code: text })
            }
            style={styles.input1}
            containerStyle={styles.inputContainer1}
          />
          <Input
            editable={editProfile}
            text="State"
            value={profileData.state}
            onChange={(text) => setProfileData({ ...profileData, state: text })}
            style={styles.input2}
            containerStyle={styles.inputContainer2}
          />
        </View>
        <View style={styles.halfInputs}>
          <Input
            editable={editProfile}
            text="Gender"
            value={profileData.gender}
            onChange={(text) =>
              setProfileData({ ...profileData, gender: text })
            }
            style={styles.input1}
            containerStyle={styles.inputContainer1}
          />
          <Input
            editable={editProfile}
            text="Age"
            value={profileData.age?.toString()}
            onChange={(text) => setProfileData({ ...profileData, age: text })}
            style={styles.input2}
            containerStyle={styles.inputContainer2}
          />
        </View>
        <Input
          editable={editProfile}
          text="Address 1"
          value={profileData.address1}
          onChange={(text) =>
            setProfileData({ ...profileData, address1: text })
          }
        />
        {displayErrors()}
        <Button buttonText="Update Profile" onPress={updateProfile} />
      </ScrollView>
    </View>
  );
};

export default {
  title: "profile",
  navigator: Profile,
  slice
};
