import React, { useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  TextInput,
  Switch,
  ScrollView
} from "react-native";

const AccountSettingsScreen = (params) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [notifications, setNotifications] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [deactivateAccount, setDeactivateAccount] = useState(false);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.subContainer}>
          <Text style={styles.subText}>Subscription</Text>
          <View style={styles.subPallet}>
            <View style={styles.planDes}>
              <Text style={[styles.fnt25, styles.boldText]}>Plan</Text>
              <Text style={styles.fnt16}>Description</Text>
            </View>
            <View style={styles.subPricing}>
              <Text style={[styles.fnt25, styles.boldText]}>$14.99 </Text>
              <Text style={styles.fnt16}>per month</Text>
            </View>
          </View>
        </View>
        <View style={styles.billingContainer}>
          <Text style={styles.billingText}>Billing information</Text>
          <View style={styles.nameInput}>
            <Text style={styles.inputText}>Full Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your full name"
              placeholderTextColor="#9B9B9B"
              autoCapitalize="none"
              autoCorrect={false}
              value={name}
              onChangeText={(text) => setName(text)}
            />
          </View>
          <View style={styles.nameInput}>
            <Text style={styles.inputText}>Email Address</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your Email Address"
              placeholderTextColor="#9B9B9B"
              autoCapitalize="none"
              autoCorrect={false}
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
          </View>
          <View style={styles.nameInput}>
            <Text style={styles.inputText}>Card number</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your Card Number"
              placeholderTextColor="#9B9B9B"
              autoCapitalize="none"
              autoCorrect={false}
              value={cardNumber}
              onChangeText={(text) => setCardNumber(text)}
            />
          </View>
        </View>
        <View style={styles.togglesContainer}>
          <View style={styles.toggle}>
            <Text style={styles.toggleText}>Notifications</Text>
            <Switch
              style={styles.toggleSwitch}
              value={notifications}
              onValueChange={(value) => setNotifications(value)}
            />
          </View>
          <View style={styles.toggle}>
            <Text style={styles.toggleText}>Email Notifications</Text>
            <Switch
              style={styles.toggleSwitch}
              value={emailNotifications}
              onValueChange={(value) => setEmailNotifications(value)}
            />
          </View>
          <View style={styles.toggle}>
            <Text style={styles.toggleText}>SMS Notifications</Text>
            <Switch
              style={styles.toggleSwitch}
              value={smsNotifications}
              onValueChange={(value) => setSmsNotifications(value)}
            />
          </View>
          <View style={styles.toggle}>
            <Text style={styles.toggleText}>Deactivate Account</Text>
            <Switch
              style={styles.toggleSwitch}
              value={deactivateAccount}
              onValueChange={(value) => setDeactivateAccount(value)}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  subContainer: {
    paddingHorizontal: 20,
    flex: 0.2,
    justifyContent: "center"
  },
  subText: {
    fontSize: 16,
    fontWeight: "bold",
    padding: 2,
    marginVertical: 12,
    marginLeft: 20
  },
  subPallet: {
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#e6e6e6",
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  planDes: {
    flex: 0.4,
    padding: 10,
    // borderWidth: 1,
    // borderColor: '#979797',
    justifyContent: "center",
    alignItems: "flex-start"
  },
  subPricing: {
    flex: 0.6,
    padding: 10,
    // borderWidth: 1,
    // borderColor: '#979797',
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "center"
  },
  boldText: {
    fontWeight: "bold"
  },
  fnt25: {
    fontSize: 25
  },
  fnt16: {
    fontSize: 16
  },
  billingContainer: {
    flex: 0.5,
    paddingHorizontal: 20 // borderWidth: 1,
    // borderColor: '#979797',
  },
  billingText: {
    fontSize: 16,
    fontWeight: "bold",
    padding: 2,
    marginVertical: 12,
    marginLeft: 20
  },
  inputText: {
    fontSize: 16,
    marginLeft: 20
  },
  input: {
    borderWidth: 1,
    borderColor: "#e6e6e6",
    borderRadius: 10,
    padding: 10,
    paddingLeft: 20,
    marginVertical: 10,
    width: "100%"
  },
  togglesContainer: {
    flex: 0.3,
    paddingHorizontal: 20
  },
  toggle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  toggleText: {
    fontSize: 16,
    fontWeight: "bold",
    padding: 2,
    marginVertical: 12,
    marginLeft: 20
  }
});
export default AccountSettingsScreen;
