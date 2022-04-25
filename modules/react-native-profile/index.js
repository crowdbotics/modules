import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import options from "./options"
import Input from './components/TextInput'
import Button from './components/Button'
import ProfileImage from './components/ProfileImage'

const Profile = () => {
  return (
    <ScrollView>
      <View style={options.styles.mainContainer}>
        <View>
          <View style={options.styles.headerContainer}>
            <ProfileImage />
            <Text style={options.styles.headerText}>Jay Mahanga</Text>
            <Text style={options.styles.headerSubText}>jay@gmail.com</Text>
          </View>
          <View style={options.styles.subheaderContainer}>
            <Text style={options.styles.subheaderDetailText}>Details</Text>
            <Text style={options.styles.subheaderRemoveText}>Delete Account</Text>
          </View>
        </View>
        <View style={options.styles.mainBody}>
          <View style={options.styles.mt15}>
            <Text style={options.styles.lextLabel}>Name</Text>
            <Input placeholder="Name" />
          </View>
          <View style={options.styles.mt15}>
            <Text style={options.styles.lextLabel}>Email address</Text>
            <Input placeholder="Email address" />
          </View>
          <View style={options.styles.mt15}>
            <Text style={options.styles.lextLabel}>Gender</Text>
            <Input placeholder="Gender" />
          </View>
          <View style={options.styles.mt15}>
            <Text style={options.styles.lextLabel}>Password</Text>
            <Input placeholder="Password" />
          </View>
        </View>
        <View style={options.styles.btnSave}>
          <Button height={49}>Save</Button>
        </View>
      </View>
    </ScrollView>
  );
};

export default {
  title: "Profile",
  navigator: Profile
}
