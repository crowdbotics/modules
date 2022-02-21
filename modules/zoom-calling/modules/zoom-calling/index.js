import React, { useEffect, useState } from 'react';
import { View, Text, Image, NativeEventEmitter, Pressable, SectionList } from "react-native";
import ZoomUs, { ZoomEmitter } from 'react-native-zoom-us';
// @ts-ignore
import { WebView } from 'react-native-webview';
import { API_URL, CLIENT_ID, createMeeting, deleteMeeting, getCurrentUser, getMeetingList, getOauthToken, parse_query_string, REDIRECT_URI, SDK_KEY, SDK_SECRET } from './utils';
import { StyleSheet } from 'react-native';
// @ts-ignore
import DialogInput from 'react-native-dialog-input';
import Button from './components/Button';
import MeetingScheduleModal from './components/MeetingScheduleModal';
// @ts-ignore
import CookieManager from '@react-native-cookies/cookies';
import { timezones } from './timezones';


const ZoomCalling = () => {
  const userAgent = "Mozilla/5.0 (Linux; Android) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/98.0.4758.87 Mobile Safari/537.36"
  const [isFirst, setIsFirst] = useState(true)
  const [oauthToken, setOauthToken] = useState(false)
  const [meetingInfo, setMeetingInfo] = useState(false)
  const [isJoinMeeting, setIsJoinMeeting] = useState(false)
  const [isMeetingScheduleModal, setIsMeetingScheduleModal] = useState(false);
  const [isMeetingScheduleSave, setIsMeetingScheduleSave] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [meetingEvent, setMeetingEvent] = useState('');
  const [upcomingMeetingsList, setUpcomingMeetingsList] = useState([]);
  const [currentUser, setCurrentUser] = useState({
    id: '',
    email: null,
    pmi: null,
    host_key: null,
    pic_url: null,
    first_name: "",
    last_name: "",
    personal_meeting_url: null
  })


  useEffect(() => {
    ZoomUs.initialize({
      clientKey: SDK_KEY,
      clientSecret: SDK_SECRET
    }).then((res) => {
      setIsInitialized(true);
    }).catch((error) => console.log(error))

  }, [])

  useEffect(() => {
    if (!isInitialized) {
      return;
    }
    const zoomEmitter = new NativeEventEmitter(ZoomEmitter);
    const eventListener = zoomEmitter.addListener('MeetingEvent', ({ event, status, ...params }) => {
      setMeetingEvent(event)
    });
    return () => eventListener.remove();
  }, [isInitialized])

  useEffect(() => {
    if (meetingEvent == "endedBySelf" || meetingEvent == "endedRemovedByHost") {
      if (meetingInfo) {
        setMeetingInfo(false);
      }
    }
  }, [meetingEvent])

  useEffect(() => {
    if (oauthToken) {
      getCurrentUser(oauthToken['access_token']).then(response => {
        setCurrentUser(response)
        getMeetingList(response['id'], oauthToken['access_token']).then(res => {
          if (res.meetings.length == 0)
            return

          let DATA = [{
            title: "Upcoming Meetings",
            data: res.meetings
          }]
          setUpcomingMeetingsList(DATA)
        }).catch((error) => console.log(error))
      }).catch((error) => console.log(error))
    }
  }, [oauthToken])

  const startMeeting = () => {
    let meetingPayload = {
      topic: `${currentUser.first_name + '' + currentUser.last_name}'s Personal Meeting Room`,
      type: 1
    }
    createMeeting(currentUser.id, meetingPayload, oauthToken['access_token']).then(response => {
      setMeetingInfo(response)
      let params = parse_query_string(response.start_url)
      if (params.zak) {
        ZoomUs.startMeeting({
          userName: currentUser.first_name + '' + currentUser.last_name,
          meetingNumber: currentUser.pmi,
          userId: currentUser.id,
          zoomAccessToken: params.zak
        })
      }
    }).catch(err => console.log(err))
  }

  const joinMeeting = (meetingId) => {
    setIsJoinMeeting(false)
    ZoomUs.joinMeeting({
      userName: currentUser.first_name + '' + currentUser.last_name,
      meetingNumber: meetingId
    }).then(res => console.log(res)).catch((error) => console.log(error))
  }

  const onNavigationStateChange = (evt) => {
    if (evt.url.includes(REDIRECT_URI)) {
      let params = parse_query_string(evt.url);
      if (params.code && isFirst) {
        setIsFirst(false)
        getOauthToken(params.code).then((response) => {
          setOauthToken(response)
        }).catch((error) => console.log(error))
        return
      }
    }
  }

  const onHandleMeetingSchedule = (data) => {
    setIsMeetingScheduleSave(true)
    let meetingPayload = {
      recurrence: {
        end_date_time: '',
        end_times: 1,
        monthly_day: 1,
        monthly_week: -1,
        monthly_week_day: 1,
        repeat_interval: 0,
        type: 1,
        weekly_days: '1'
      },
      settings: {
        host_video: data.hostVideo,
        participant_video: data.participantsVideo,
        use_pmi: data.meetingID
      },
      start_time: data.startDate.toString(),
      timezone: data.timezone,
      topic: data.topic,
      type: 2
    }
    createMeeting(currentUser.id, meetingPayload, oauthToken['access_token']).then(() => {
      setIsMeetingScheduleModal(!isMeetingScheduleModal)
      setIsMeetingScheduleSave(false)
      getMeetingList(currentUser.id, oauthToken['access_token']).then(res => {
        if (res.meetings.length == 0)
          return

        let DATA = [{
          title: "Upcoming Meetings",
          data: res.meetings
        }]
        setUpcomingMeetingsList(DATA)
      }).catch((error) => console.log(error))
    }).catch((error) => { setIsMeetingScheduleSave(false); console.log(error) })
  }

  const handleLogout = () => {
    CookieManager.clearAll().then(() => {
      setOauthToken(false)
      setIsFirst(true)
    }).catch((error) => console.log(error))
  }

  const handleRemoveMeeting = (item) => {
    deleteMeeting(item.id, oauthToken['access_token']).then(res => {
      let tmpUpcomingMeetingsList = JSON.parse(JSON.stringify(upcomingMeetingsList))
      const index = upcomingMeetingsList[0].data.indexOf(item)
      tmpUpcomingMeetingsList[0].data.splice(index, 1)
      setUpcomingMeetingsList(tmpUpcomingMeetingsList)
    }).catch((error) => console.log(error))
  }

  return (
    <View style={styles.Container}>
      {oauthToken ? <>
        <View style={styles.header}>
          <View>
            <Text onPress={handleLogout} style={styles.LogoutText}>Logout</Text>
          </View>
          <View style={styles.UserImageArea}>
            <View>
              <Text>{currentUser.first_name + '' + currentUser.last_name}</Text>
            </View>
            <Image
              style={styles.userLogo}
              resizeMode="cover"
              borderRadius={10}
              source={{
                uri: currentUser.pic_url,
              }}
            />
          </View>
        </View>
        <View style={styles.MainCard}>
          <View style={styles.Card}>
            <Button title="Host a meeting" onPress={startMeeting} />
          </View>
          <View style={styles.Card}>
            <Button title="Join a meeting" onPress={() => setIsJoinMeeting(true)} />
          </View>
        </View>
        <View style={styles.MeetingCard}>
          <Button title="Schedule a meeting" onPress={() => setIsMeetingScheduleModal(true)} />
        </View>
        <View style={styles.Area}>

        </View>
        <SectionList
          sections={upcomingMeetingsList}
          keyExtractor={(item, index) => item + index}
          renderItem={({ item }) => (
            <View style={styles.TimeArea}>
              <View style={styles.TimeAndLocation}>
                <Text style={styles.TimeText}>{new Date(item.start_time).toLocaleString()}</Text>
                <Text numberOfLines={2} style={styles.LocationText}>{timezones.find(obj => obj.value == item.timezone).label}</Text>
              </View>
              <View style={styles.MeetingDay}>
                <Text numberOfLines={3} style={styles.TimeText}>{item.topic}</Text>
                {/* <Text style={styles.MeetingIDText}>Meeting ID: -</Text> */}
              </View>
              <View style={styles.ButtonArea}>
                <Pressable style={[styles.EditButton, styles.EditBtn]}>
                  <Text style={styles.textStyle}>Join</Text>
                </Pressable>
                <Pressable onPress={() => handleRemoveMeeting(item)} style={[styles.EditButton, styles.DeleteBtn]}>
                  <Text style={styles.textStyle}>Delete</Text>
                </Pressable>
              </View>
            </View>
          )}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={styles.TitleText}>{title}</Text>
          )}
          ListEmptyComponent={() => (
            <View style={{}}>
              <Text style={styles.UpcomingText}>Upcoming Meetings</Text>
              <Text style={styles.NewMeetingText}>The user does not have any upcoming meetings. To schedule a new meeting click Schedule a Meeting.</Text>
            </View>
          )}
        />
        <DialogInput isDialogVisible={isJoinMeeting}
          title={"Join Meeting"}
          message={"Please enter Meeting ID"}
          hintInput={"Meeting ID"}
          textInputProps={{ keyboardType: "number-pad" }}
          submitInput={(meetingId) => joinMeeting(meetingId)}
          closeDialog={() => setIsJoinMeeting(false)}>
        </DialogInput>
        {isMeetingScheduleModal &&
          <MeetingScheduleModal
            setModalVisible={setIsMeetingScheduleModal}
            onHandleMeetingSchedule={onHandleMeetingSchedule}
            isMeetingScheduleSave={isMeetingScheduleSave}
          />
        }

      </> : <WebView
        useWebKit={true}
        userAgent={userAgent}
        onNavigationStateChange={onNavigationStateChange}
        source={{ uri: `${API_URL}/oauth/authorize?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}` }}
      />
      }

    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
  },
  header: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
    alignItems: "center"
  },
  userLogo: {
    width: 40,
    height: 40,
    margin: 5
  },
  LogoutText: {
    marginLeft: 5,
    color: "#FA060D",
  },
  UserImageArea: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  MainCard: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 30
  },
  Card: {
    width: "50%",
    height: 100,
    padding: 5
  },
  HostMeetingText: {
    color: 'white',
    textTransform: 'uppercase'
  },
  JoinMeetingText: {
    color: 'white',
    textTransform: 'uppercase'
  },
  ScheduleMeetingText: {
    color: 'white',
    textTransform: 'uppercase'
  },
  Area: {
    marginTop: 20
  },
  MeetingCard: {
    width: "100%",
    height: 50,
    padding: 5,
  },
  ///
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 15,
    width: '90%',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 5,
    padding: 8,
    elevation: 12,
    marginLeft: 10,
    width: 100
  },
  ButtonArea: {
    display: 'flex',
    flexDirection: 'row',
    width: '40%',
    alignItems: 'center',
    textAlign: 'center',
  },
  buttonOpen: {
    backgroundColor: "#FA060D",
  },
  EditBtn: {
    backgroundColor: '#0e71eb',
  },
  DeleteBtn: {
    backgroundColor: '#FA060D',
  },
  EditButton: {
    borderRadius: 6,
    marginLeft: 10,
    marginTop: 8,
    paddingTop: 8,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
    fontSize: 12,
    textAlign: 'center',
    alignItems: 'center',
    display: 'flex',
  },
  buttonClose: {
    backgroundColor: "#2D8CFF",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  heading: {
    fontSize: 24,
    color: 'black',
    fontWeight: 'bold',
    marginRight: 40,
  },
  ModalContent: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  InputLabels: {
    width: "49%",
  },
  MeetingID: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  MeetingRow: {
    display: "flex",
    flexDirection: "row",
    marginTop: 5,
  },
  InputsArea: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "50%",
    paddingRight: 5,
  },
  RadioButtons: {
    display: "flex",
    flexDirection: "row",
  },
  VideoText: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  TimeAndLocation: {
    marginTop: 20,
    marginLeft: 10,
    display: 'flex',
    flexDirection: 'column',
    width: '30%',
  },
  TimeText: {
    fontSize: 12,
  },
  MeetingDay: {
    marginTop: 20,
    marginLeft: 10,
    display: 'flex',
    flexDirection: 'column',
    width: '30%'
  },
  LocationText: {
    color: '#747487',
    fontSize: 12,
    paddingTop: 6,
  },
  TimeArea: {
    display: 'flex',
    flexDirection: 'row',
  },
  MeetingIDText: {
    fontSize: 12,
    color: '#747487',
    paddingTop: 6,
  },
  TitleText: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: 'bold'
  },
  UpcomingText: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  NewMeetingText: {
    marginTop: 50,
    color: '#747487',
    padding: 40,
    textAlign: 'center',
    fontSize: 13,
  },
});

export default {
  title: "ZoomCalling",
  navigator: ZoomCalling
}
