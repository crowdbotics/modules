import React, { useEffect, useState, useContext } from "react";
import {
  Text,
  View,
  ScrollView,
  Switch,
  TouchableOpacity,
  SafeAreaView
} from "react-native";
import { OptionsContext } from "@options";

const App = () => {
  const { styles, trackEvent, mixpanel, projectToken } =
    useContext(OptionsContext);
  const [isEnabled, setIsEnabled] = useState(false);

  /**
   * Fetches and updates the tracking status if user has enabled it or not
   */
  const getTrackingStatus = () => {
    mixpanel
      .hasOptedOutTracking()
      .then((res) => {
        setIsEnabled(res);
      })
      .catch((err) => __DEV__ && console.log("err", err));
  };

  // Initialize Mixpanel and identify the user (e.g., with a user ID)
  useEffect(() => {
    mixpanel.init();
    mixpanel.identify("77");
  }, []);

  // Update tracking status when isEnabled changes
  useEffect(() => {
    getTrackingStatus();
  }, [isEnabled]);

  /**
   * Toggles tracking on/off and updates the state.
   */
  const toggleTracking = () => {
    if (isEnabled) {
      mixpanel.optInTracking();
      setIsEnabled(!isEnabled);
    } else {
      mixpanel.optOutTracking();
      setIsEnabled(!isEnabled);
    }
  };

  /**
   * Tracks the "User Login" event.
   */
  const loginEvent = () => {
    trackEvent("User Login");
  };

  /**
   * Tracks the "User Signup" event.
   */
  const signupEvent = () => {
    trackEvent("User Signup");
  };

  /**
   * Tracks the "Add to Cart" event with product details.
   */
  const addToCart = () => {
    trackEvent("Add to cart", {
      productName: "Book",
      price: "$25"
    });
  };

  /**
   * Pushes events to Mixpanel server.
   */
  const pushEvents = () => {
    mixpanel.flush();
  };

  const setUserAlias = () => {
    mixpanel.alias("Module User", "77");
  };

  /**
   * Sets user profile properties using Mixpanel People.
   */
  const setUserProfile = () => {
    mixpanel.getPeople().set({
      $first_name: "Test",
      $last_name: "User",
      $name: "Test User",
      $email: "example@gmail.com",
      $phone: "1223456789",
      $avatar:
        "https://images.unsplash.com/photo-1495344517868-8ebaf0a2044a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8fA%3D%3D&w=1000&q=80",
      $city: "NYC",
      $timezone: "Asia/kolkata",
      $created: "25 july 2023"
    });
  };

  /**
   * Retrieves the device ID asynchronously.
   */
  const getDeviceId = async () => {
    const deviceId = await mixpanel.getDeviceId();
    __DEV__ && console.log(deviceId);
  };

  /**
   * Creates a Mixpanel group for user segmentation.
   */
  const createGroup = () => {
    mixpanel.getGroup("Company Name", "Test Inc.");
  };

  /**
   * Tracks events with user groups.
   */
  const trackEventsWithGroups = () => {
    mixpanel.trackWithGroups(
      "Purchase",
      { Amount: 100 },
      "Company Name",
      "Test Inc."
    );
  };

  /**
   * Adds super properties to user profiles.
   */
  const addSuperProperties = () => {
    mixpanel.registerSuperProperties({
      country: "USA",
      age: "30"
    });
  };

  /**
   * Resets Mixpanel, clearing user data.
   */
  const reset = () => {
    mixpanel.reset();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.mainHeading}>Mixpanel Analytics</Text>
      <View style={styles.idView}>
        <Text style={styles.idKey}>Project Token:</Text>
        <Text style={styles.idValue}>{projectToken}</Text>
      </View>

      <View style={styles.switchView}>
        <Text style={styles.enableTrackingButton}>Enable Tracking</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#000" }}
          thumbColor={isEnabled ? "#fff" : "#fff"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleTracking}
          value={!isEnabled}
        />
      </View>

      <ScrollView style={{ marginTop: 30 }}>
        <Text style={styles.subHeading}>Event tracking</Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.buttonStyles} onPress={loginEvent}>
            <Text style={styles.buttonTitleStyles}>Login Event</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonStyles} onPress={signupEvent}>
            <Text style={styles.buttonTitleStyles}>Signup Event</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.buttonStyles} onPress={addToCart}>
            <Text style={styles.buttonTitleStyles}>Add to cart</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.subHeading}>Others</Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.buttonStyles} onPress={pushEvents}>
            <Text style={styles.buttonTitleStyles}>Push Events</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonStyles} onPress={setUserAlias}>
            <Text style={styles.buttonTitleStyles}>Set User Alias</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.buttonStyles}
            onPress={setUserProfile}
          >
            <Text style={styles.buttonTitleStyles}>Set User Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonStyles} onPress={getDeviceId}>
            <Text style={styles.buttonTitleStyles}>Get Device ID</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.buttonStyles} onPress={createGroup}>
            <Text style={styles.buttonTitleStyles}>Create Group</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.buttonStyles}
            onPress={trackEventsWithGroups}
          >
            <Text style={styles.buttonTitleStyles}>
              Track events with groups
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.buttonStyles}
            onPress={addSuperProperties}
          >
            <Text style={styles.buttonTitleStyles}>Add Super Property</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonStyles} onPress={reset}>
            <Text style={styles.buttonTitleStyles}>Reset</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default {
  title: "Mixpanel Analytics",
  navigator: App
};
