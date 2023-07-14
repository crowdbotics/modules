import React, { useContext, useEffect, useState } from "react";
import { OptionsContext } from "@options";
import { SafeAreaView, View, Text, TouchableOpacity, Alert, SectionList, ActivityIndicator } from "react-native";
import AzureAuth from "react-native-azure-auth";
import { mapObjectToArray, validateConfig } from "./utils";

const AzureADAuth = () => {
  // Configurations Variable contains (styles, AZURE_AUTH_OPTIONS, AUTHORIZE_OPTIONS)
  const options = useContext(OptionsContext);
  // Saving the User and Token Information such as givenName, rawIdToken and accessToken
  const [userInfo, setUserInfo] = useState([]);
  // Saving the instance AzureAuth which is coming from "react-native-azure-auth"
  // and futher instances will also save through AzureAuth
  const [azureAuth, setAzureAuth] = useState(null);

  const [loader, setLoader] = useState(false);

  useEffect(() => {
    // Validations of the configurations i.e tenant, clientId, redirectUri, prompt and scope
    const errors = validateConfig(options.AZURE_AUTH_OPTIONS, options.AUTHORIZE_OPTIONS);
    if (!errors.length) {
      // To initiate the AzureAuth instance and set through the above useState
      const azureAuth = new AzureAuth(options.AZURE_AUTH_OPTIONS);
      setAzureAuth(azureAuth);
    } else {
      // The error messages will show up if there is any error in the configurations
      let errorsString = "";
      errors.forEach(error => {
        errorsString += `${error.key}: is missing.\n`;
      });
      Alert.alert("Missing configuration", errorsString);
    }
  }, []);

  const authorize = () => {
    // To start the authorization process to login into the Azure Directory it will return the token information
    // includes the parameters tenant, clientId, redirectUri
    return azureAuth.webAuth.authorize(options.AUTHORIZE_OPTIONS);
  };
  const msGraphRequest = (payload) => {
    // To retreive the user information and sending token and path as payload
    return azureAuth.auth.msGraphRequest(payload);
  };

  const fetchUserInfo = async () => {
    try {
      setLoader(true);
      // fetch the token
      const token = await authorize();
      // fetch the user information
      const userInfo = await msGraphRequest({
        token: token.accessToken,
        path: "/me"
      });
      // incorporating the user information and token information
      setUserInfo([{
        title: "User Information",
        data: mapObjectToArray(userInfo)
      }, {
        title: "Token Information",
        data: mapObjectToArray(token)
      }]);
      setLoader(false);
    } catch (error) {
      setLoader(false);
      // The error messages will show up if there is any error
      Alert.alert("Error", "error_description" in error ? error.error_description : error.message);
    }
  };

  const FlatListItem = ({ item }) => {
    // listitem will display to show the fields containing information
    return (
      <View style={[options.styles.listItem, options.styles.commonRadius]}>
        <Text style={[options.styles.infoHeading, options.styles.fontSixteen, options.styles.infoColor, options.styles.fontBold]}>{item.key}</Text>
        <Text style={[options.styles.infoColor, options.styles.fontSixteen]}>{typeof item.value === "string" ? item.value : JSON.stringify(item.value)}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={options.styles.safeArea}>
      <View style={options.styles.container}>
        <View style={[options.styles.header, options.styles.backgroundWhite]}>
          <Text style={[options.styles.headerText, options.styles.fontBold]}>Azure Active Directory</Text>
        </View>
        <TouchableOpacity style={[options.styles.button, options.styles.commonPadding, options.styles.commonRadius]} onPress={fetchUserInfo}>
          <Text style={[options.styles.title, options.styles.fontSixteen]}>Login with Azure AD</Text>
        </TouchableOpacity>
        <View style={[options.styles.responseSection, options.styles.backgroundWhite, options.styles.commonPadding, options.styles.commonRadius]}>
          {loader && <ActivityIndicator /> }
          <SectionList
            sections={userInfo}
            renderItem={({ item }) => <FlatListItem item={item}/>}
            renderSectionHeader={({ section: { title } }) => (
              <Text style={options.styles.sectionHeaderTitle}>{title}</Text>
            )}
          />
        </View>

      </View>
    </SafeAreaView>
  );
};

export default {
  title: "Azure Ad Auth",
  navigator: AzureADAuth
};
