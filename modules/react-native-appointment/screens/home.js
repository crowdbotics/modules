import React, { useContext } from "react";
import { useWindowDimensions } from "react-native"; // @ts-ignore
import { TabView, TabBar, SceneMap } from "react-native-tab-view";
import AppointmentList from "./appointmentList";
import Calendar from "./calendar";
import { OptionsContext } from "@options";

/**
 * Component to display the home screen with a tab view for Appointment List and Calendar.
 * @param {Object} props - Props passed to the Home component.
 * @param {Object} props.navigation - Navigation object provided by React Navigation.
 * @returns {JSX.Element} - The rendered Home component.
 */
const Home = (props) => {
  const { styles } = useContext(OptionsContext);

  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {
      key: "AppointmentList",
      title: "Calendar"
    },
    {
      key: "Calendar",
      title: "Create an Appointment"
    }
  ]);

  /**
   * Function to render the scenes for the TabView.
   * @param {Object} SceneMapProps - Props provided by React Navigation.
   * @returns {JSX.Element} - The rendered scene component.
   */
  const renderScene = SceneMap({
    AppointmentList: () => <AppointmentList navigation={props.navigation} />,
    Calendar: () => <Calendar navigation={props.navigation} />
  });

  /**
   * Function to render the custom TabBar for the TabView.
   * @param {Object} tabBarProps - Props provided by React Navigation.
   * @returns {JSX.Element} - The rendered TabBar component.
   */
  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={styles.indicator}
      indicatorContainerStyle={styles.indicatorContainer}
      labelStyle={styles.tabLabel}
      style={styles.tab}
    />
  );

  return (
    <TabView
      navigationState={{
        index,
        routes
      }}
      renderScene={renderScene}
      renderTabBar={renderTabBar}
      onIndexChange={setIndex}
      initialLayout={{
        width: layout.width
      }}
    />
  );
};

export default Home;
