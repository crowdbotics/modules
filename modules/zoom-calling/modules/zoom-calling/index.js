import React, { useEffect, useState } from 'react';
import { View, Text, Button, Image, TouchableOpacity, Modal, Pressable, NativeEventEmitter } from "react-native";
import ZoomUs, { ZoomEmitter } from 'react-native-zoom-us';
// @ts-ignore
import { WebView } from 'react-native-webview';
import { deleteMeeting, createMeeting, getCurrentUser, getOauthToken } from './utils';
import { StyleSheet } from 'react-native';
// @ts-ignore
import DialogInput from 'react-native-dialog-input';

const ZoomCalling = () => {
  const [isFirst, setIsFirst] = useState(true)
  const [oauthToken, setOauthToken] = useState(false)
  const [meetingInfo, setMeetingInfo] = useState(false)
  const [isJoinMeeting, setIsJoinMeeting] = useState(false)
  const [modalVisible, setModalVisible] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [meetingEvent, setMeetingEvent] = useState('');
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
      clientKey: 'uGpAnqHR2dfkUkXi7vTmP4wqtRll4xZeQlio',
      clientSecret: 'xJOm6daNiIR0FCDJSTQSegxa0Loc0AeaYdIn',
    }).then((res) => {
      setIsInitialized(true);
    })

  }, [])

  useEffect(() => {
    if (!isInitialized) {
      return;
    }
    const zoomEmitter = new NativeEventEmitter(ZoomEmitter);
    const eventListener = zoomEmitter.addListener('MeetingEvent', ({ event, status, ...params }) => {
      setMeetingEvent(event)
    },
    );
    return () => eventListener.remove();
  }, [isInitialized])

  useEffect(() => {
    if (meetingEvent == "endedBySelf" || meetingEvent == "endedRemovedByHost") {
      if (meetingInfo) {
        deleteMeeting(meetingInfo['id'], oauthToken['access_token'])
        setMeetingInfo(false);
      }
    }
  }, [meetingEvent])
  
  const startMeeting = () => {
    createMeeting(currentUser.first_name + '' + currentUser.last_name, currentUser.id, oauthToken['access_token']).then(response => {
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
    })
  }

  const parse_query_string = (url) => {
    let regex = /[?&]([^=#]+)=([^&#]*)/g,
      params = {},
      match;
    while (match = regex.exec(url)) {
      params[match[1]] = match[2];
    }
    return params;
  }

  const onNavigationStateChange = (evt) => {
    if (evt.url.includes('https://oauth.pstmn.io/v1/callback')) {
      let params = parse_query_string(evt.url);
      if (params.code && isFirst) {
        setIsFirst(false)
        getOauthToken(params.code).then((response) => {
          setOauthToken(response)
        })
        return
      }
    }
  }

  useEffect(() => {
    if (oauthToken) {
      getCurrentUser(oauthToken['access_token']).then(response => {
        setCurrentUser(response)
      })
    }
  }, [oauthToken])

  return (
    <View style={{ flex: 1 }}>
      {oauthToken ? <>
        <View style={styles.header}>
          <View>
            <Text>&nbsp;</Text>
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
            <TouchableOpacity onPress={startMeeting}>
              <View style={styles.cardbody}>
                <View style={styles.innercard}>
                  <View>
                    <Text style={styles.HostMeetingText}>Host a meeting</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.Card}>
            <TouchableOpacity onPress={() => setIsJoinMeeting(true)}>
              <View style={styles.cardbody}>
                <View style={styles.innercard}>
                  <View>
                    <Text style={styles.JoinMeetingText}>Join a meeting</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.MeetingCard}>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <View style={styles.cardbody}>
              <View style={styles.innercard}>
                <View>
                  <Text style={styles.ScheduleMeetingText}>Schedule a meeting</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <DialogInput isDialogVisible={isJoinMeeting}
          title={"Join Meeting"}
          message={"Please enter Meeting ID"}
          hintInput={"Meeting ID"}
          submitInput={(meetingId) => joinMeeting(meetingId)}
          closeDialog={() => setIsJoinMeeting(false)}>
        </DialogInput>
        <View style={styles.centeredView}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}></Text>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Text style={styles.textStyle}>Hide Modal</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
        </View>

      </> : <WebView
        useWebKit={true}
        userAgent="Mozilla/5.0 (Linux; Android) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/98.0.4758.87 Mobile Safari/537.36"
        onNavigationStateChange={onNavigationStateChange}
        source={{ uri: `https://zoom.us/oauth/authorize?response_type=code&client_id=O5o5klrbQWq3L6PBWbRjoA&redirect_uri=https://oauth.pstmn.io/v1/callback` }}
      />
      }

    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5
  },
  userLogo: {
    width: 40,
    height: 40,
    margin: 5
  },
  cardbody: {
    minHeight: 50,
    height: '100%',
    backgroundColor: '#2D8CFF',
    borderRadius: 5
  },
  innercard: {
    padding: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.23,
    shadowRadius: 1.62,
    elevation: 15,
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
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
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});

export default {
  title: "ZoomCalling",
  navigator: ZoomCalling
}
