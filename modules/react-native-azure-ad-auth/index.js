import React, { useContext, useEffect, useState } from "react";
import { OptionsContext } from "@options";
import { SafeAreaView, View, Text, TouchableOpacity, Alert, SectionList } from "react-native";
import AzureAuth from "react-native-azure-auth";
import { ArrayOfObjects, ValidateConfig } from "./utils";

const AzureADAuth = () => {
  const options = useContext(OptionsContext);
  const [userInfo, setUserInfo] = useState([]);
  const [azureAuth, setAzureAuth] = useState(null);

  useEffect(() => {
    const errors = ValidateConfig(options.AZURE_AUTH_OPTIONS, options.AUTHORIZE_OPTIONS);
    if (!errors.length) {
      const azureAuth = new AzureAuth(options.AZURE_AUTH_OPTIONS);
      setAzureAuth(azureAuth);
    } else {
      let errorsString = "";
      errors.forEach(error => {
        errorsString += `${error.key}: is missing.\n`;
      });
      Alert.alert("Missing configuration", errorsString);
    }
  }, []);

  const authorize = () => {
    return azureAuth.webAuth.authorize(options.AUTHORIZE_OPTIONS);
  };

  const msGraphRequest = (payload) => {
    return azureAuth.auth.msGraphRequest(payload);
  };

  const fetchUserInfo = async () => {
    try {
      const token = await authorize();
      const userInfo = await msGraphRequest({
        token: token.accessToken,
        path: "/me"
      });
      setUserInfo([{
        title: "User Information",
        data: ArrayOfObjects(userInfo)
      }, {
        title: "Token Information",
        data: ArrayOfObjects(token)
      }]);
    } catch (error) {
      Alert.alert("Error", "error_description" in error ? error.error_description : error.message);
    }
  };

  const FlatListItem = ({ item }) => {
    return (
      <View style={options.styles.listItem}>
        <Text style={options.styles.infoHeading}>{item.key}</Text>
        <Text style={options.styles.infoText}>{typeof item.value === "string" ? item.value : JSON.stringify(item.value)}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={options.styles.safeArea}>
      <View style={options.styles.container}>
        <View style={options.styles.header}>
          <Text style={options.styles.headerText}>Azure Active Directory</Text>
        </View>
        <TouchableOpacity style={options.styles.button} onPress={fetchUserInfo}>
          <Text style={options.styles.title}>Login with Azure AD</Text>
        </TouchableOpacity>
        <View style={options.styles.responseSection}>
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
