import React, { useContext, useState } from "react";
import { useWindowDimensions } from "react-native";
// @ts-ignore
import { TabView, TabBar, SceneMap } from "react-native-tab-view";
import AppointmentList from "./appointmentList";
import Calendar from "./calendar";
import { OptionsContext } from "@options";

const Home = (props) => {
  const options = useContext(OptionsContext);
  const { styles } = options;

  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  // Tab routes
  const [routes] = useState([
    { key: "AppointmentList", title: "Create an Appointment" },
    { key: "Calendar", title: "Calendar" }

  ]);

  // Renders all the available tabs
  const renderScene = SceneMap({
    AppointmentList: () => <AppointmentList navigation={props.navigation} />,
    Calendar: () => <Calendar navigation={props.navigation} />
  });

  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={styles.indicator}
      indicatorContainerStyle={styles.indicatorContainer}
      labelStyle={styles.label}
      style={styles.tab}
    />
  );

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      renderTabBar={renderTabBar}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
    />

  );
};

export default Home;
