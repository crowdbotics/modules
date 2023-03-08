import React, { useContext } from "react";
import { OptionsContext } from "@options";
import { SafeAreaView, ScrollView, View, Text, TouchableOpacity } from "react-native";
import AzureAuth from "react-native-azure-auth";

function AzureADAuth() {
  const options = useContext(OptionsContext);
  const { styles, azureTenant, azureClientId, azureRedirectUri } = options;
  const [accessToken, setAccessToken] = React.useState(null);
  const [user, setUser] = React.useState(null);

  const fetchData = async () => {
    const azureAuth = new AzureAuth({
      tenant: azureTenant,
      clientId: azureClientId,
      redirectUri: azureRedirectUri
    });

    try {
      const tokens = await azureAuth.webAuth.authorize({
        scope: "openid profile User.Read",
        prompt: "login"
      });
      setAccessToken(JSON.stringify(tokens));
      const info = await azureAuth.auth.msGraphRequest({
        token: tokens.accessToken,
        path: "/me"
      });
      setUser(JSON.stringify(info, null, 2));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={styles?.safeArea}>
      <View style={styles?.MVfceqLO}>

          <View style={styles?.header}>
            <Text style={styles?.headerText}>Azure Active Directory</Text>
          </View>

          <TouchableOpacity style={styles?.button} onPress={() => {
            fetchData();
          }}>
            <Text style={styles?.DjHOfaku}>Login with Azure AD</Text>
          </TouchableOpacity>

          <ScrollView style={styles?.consoleResponseSection}>
            <Text style={styles?.consoleText}>{user}</Text>
            <Text style={styles?.consoleText}>{accessToken}</Text>
          </ScrollView>
      </View>
    </SafeAreaView>
  );
}

export default {
  title: "Azure Ad Auth",
  navigator: AzureADAuth
};
