import * as React from 'react';
import { Text, View, Image } from 'react-native';
import options from "./options";
import faq from "./faq.png";
import emailSupport from "./emailsupport.png";
import invitefriends from "./invitefriends.png";
import bell from "./bell.png";
import updates from "./updates.png";
import abouticon from "./abouticon.png";

 const Settings = () => {
  return (
    <View style={options.styles.container}>

      <View style={options.styles.mainSection}>
        <View style={options.styles.faqSupport}>
          <Image style={options.styles.faqIcon} source={faq}/>
          <Text style={options.styles.faqText}>FAQ's</Text>
        </View>
        <View style={options.styles.emailSupport}>
          <Image style={options.styles.emailsupportIcon} source={emailSupport}/>
          <Text style={options.styles.emailsupportText}>Email Support</Text>
        </View>
        <View style={options.styles.invitefriendsSupport}>
          <Image style={options.styles.inviteFriendsIcon} source={invitefriends}/>
          <Text style={options.styles.inviteFriendsText}>Invite Friends</Text>
        </View>
        <View style={options.styles.pushNotifications}>
          <View style={options.styles.pushnoti}>
            <Image style={options.styles.pushnotificationsIcon} source={bell}/>
            <Text style={options.styles.pushnotificationsText}>Push Notifications</Text>
          </View>
          <View style={options.styles.switchbutton}>
              <View style={options.styles.ballicon}></View>
          </View>
        </View>
        <View style={options.styles.pushNotifications}>
          <View style={options.styles.pushnoti}>
            <Image style={options.styles.pushnotificationsIcon} source={updates}/>
            <Text style={options.styles.pushnotificationsText}>Auto Updates</Text>
          </View>
          <View style={options.styles.switchbutton}>
              <View style={options.styles.ballicon}></View>
          </View>
        </View>
          <View style={options.styles.invitefriendsSupport}>
          <Image style={options.styles.inviteFriendsIcon} source={abouticon}/>
          <Text style={options.styles.inviteFriendsText}>About Us</Text>
        </View>
      </View>
    </View>
  );
}


export default {
  title: "Settings",
  navigator: Settings
}
