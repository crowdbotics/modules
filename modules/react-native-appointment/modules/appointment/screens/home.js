import React, { useEffect } from 'react';
import { StyleSheet, useWindowDimensions } from 'react-native';
// @ts-ignore
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import AppointmentList from './appointmentList';
import Calendar from './calendar';
// @ts-ignore
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';


const Home = (props) => {
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'AppointmentList', title: 'Create an Appointment' },
    { key: 'Calendar', title: 'Calendar' },

  ]);

  useEffect(() => {
    GoogleSignin.configure({
      scopes: ['https://www.googleapis.com/auth/calendar'],
      androidClientId: '980184327649-ssjrkhp0s3utqe5e3k3312ggafvguciv.apps.googleusercontent.com',
      offlineAccess: true,
      webClientId: '980184327649-hrvksdtlg79vn7v36s305nf99p2eu283.apps.googleusercontent.com'
    });

    GoogleSignin.hasPlayServices().then((hasPlayService) => {
      if (hasPlayService) {
        GoogleSignin.signIn().then(async (userInfo) => {
          // console.log(JSON.stringify(userInfo))
          const tokens = await GoogleSignin.getTokens()
          console.log('tokens', tokens)
        }).catch((e) => {
          console.log("ERROR IS: " + JSON.stringify(e));
        })
      }
    }).catch((e) => {
      console.log("ERROR IS: " + JSON.stringify(e));
    })

  }, [])

  const renderScene = SceneMap({
    AppointmentList: () => <AppointmentList navigation={props.navigation} />,
    Calendar: () => <Calendar navigation={props.navigation} />,

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

  )

};
const styles = StyleSheet.create({
  tab: {
    backgroundColor: '#F1F1F1',
    height: 48,
    borderRadius: 10,
    marginLeft: 10,
    marginRight: 10,
    marginVertical: 10
  },
  indicator: { backgroundColor: '#FFFFFF', borderRadius: 10, height: 37, shadowColor: '#000', elevation: 5 },
  indicatorContainer: { height: 37, marginTop: 6 },
  label: { color: '#000000', fontSize: 14, textTransform: 'capitalize', width: '100%' },


})
export default Home