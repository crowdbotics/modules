import React, { useEffect, useState } from "react";
import { View, Text, Image, NativeEventEmitter, StyleSheet } from "react-native";

import ZoomUs, { ZoomEmitter } from "react-native-zoom-us";

import { WebView } from "react-native-webview";
import { API_URL, deleteMeeting, makeId, parseQueryString, parseStartDate } from "./utils";
import { getOauthToken, getCurrentUser, createMeeting, getMeetingList, slice } from "./store";
// @ts-ignore
import DialogInput from "react-native-dialog-input";
import Button from "./components/Button";
import MeetingScheduleModal from "./components/MeetingScheduleModal";

import CookieManager from "@react-native-cookies/cookies";
import ScheduleMeetingList from "./components/ScheduleMeetingList";

import { sha256 } from "react-native-sha256";
import { unwrapResult } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import options from "./options";

const ZoomCalling = () => {
  const dispatch = useDispatch();
  const [sha256CodeChallenge, setSha256CodeChallenge] = useState("");
  const userAgent = "Mozilla/5.0 (Linux; Android) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/98.0.4758.87 Mobile Safari/537.36";
  const [isFirst, setIsFirst] = useState(true);
  const [oauthToken, setOauthToken] = useState(false);
  const [meetingInfo, setMeetingInfo] = useState(false);
  const [isJoinMeeting, setIsJoinMeeting] = useState(false);
  const [isMeetingScheduleModal, setIsMeetingScheduleModal] = useState(false);
  const [isMeetingScheduleSave, setIsMeetingScheduleSave] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [meetingEvent, setMeetingEvent] = useState("");
  const [upcomingMeetingsList, setUpcomingMeetingsList] = useState([]);
  const [currentUser, setCurrentUser] = useState({
    id: "",
    email: null,
    pmi: null,
    host_key: null,
    pic_url: null,
    first_name: "",
    last_name: "",
    personal_meeting_url: null
  });

  useEffect(() => {
    ZoomUs.initialize({
      clientKey: options.SDK_KEY,
      clientSecret: options.SDK_SECRET
    }).then((res) => {
      setIsInitialized(true);
    }).catch((error) => console.log(error));

    sha256(makeId(100)).then(hash => {
      setSha256CodeChallenge(hash);
    }).catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    if (!isInitialized) {
      return;
    }
    const zoomEmitter = new NativeEventEmitter(ZoomEmitter);
    const eventListener = zoomEmitter.addListener("MeetingEvent", ({ event, status, ...params }) => {
      setMeetingEvent(event);
    });
    return () => eventListener.remove();
  }, [isInitialized]);

  useEffect(() => {
    if (meetingEvent === "endedBySelf" || meetingEvent === "endedRemovedByHost") {
      if (meetingInfo) {
        setMeetingInfo(false);
      }
    }
  }, [meetingEvent]);

  useEffect(async () => {
    if (oauthToken) {
      await dispatch(getCurrentUser(oauthToken?.access_token))
        .then(unwrapResult)
        .then(async response => {
          setCurrentUser(response);
          await dispatch(getMeetingList({ userId: response?.id, token: oauthToken?.access_token }))
            .then(unwrapResult)
            .then(res => {
              if (res.meetings.length === 0) { return; }

              const DATA = [{
                title: "Upcoming Meetings",
                data: res.meetings
              }];
              setUpcomingMeetingsList(DATA);
            })
            .catch(error => {
              console.log(error);
            });
        })
        .catch(error => {
          console.log(error);
        });
    }
  }, [oauthToken]);

  const startMeeting = async () => {
    const meetingPayload = {
      topic: `${currentUser.first_name + "" + currentUser.last_name}'s Personal Meeting Room`,
      type: 1
    };
    await dispatch(createMeeting({ userid: currentUser.id, meetingPayload: meetingPayload, token: oauthToken.access_token }))
      .then(unwrapResult)
      .then(response => {
        setMeetingInfo(response);
        const params = parseQueryString(response?.start_url);
        if (params.zak) {
          ZoomUs.startMeeting({
            userName: currentUser.first_name + "" + currentUser.last_name,
            meetingNumber: currentUser.pmi,
            userId: currentUser.id,
            zoomAccessToken: params.zak
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  const joinMeeting = (meetingId) => {
    setIsJoinMeeting(false);
    ZoomUs.joinMeeting({
      userName: currentUser.first_name + "" + currentUser.last_name,
      meetingNumber: meetingId
    }).then(res => console.log(res)).catch((error) => console.log(error));
  };

  const onNavigationStateChange = async (evt) => {
    if (evt.url.includes(options.REDIRECT_URI)) {
      const params = parseQueryString(evt.url);
      if (params.code && isFirst) {
        setIsFirst(false);
        await dispatch(getOauthToken({ code: params?.code, codeVerifier: sha256CodeChallenge }))
          .then(unwrapResult)
          .then(response => {
            setOauthToken(response);
          })
          .catch(error => {
            console.log(error);
          });
      }
    }
  };

  const onHandleMeetingSchedule = async (data) => {
    setIsMeetingScheduleSave(true);
    const meetingPayload = {
      settings: {
        host_video: data.hostVideo,
        participant_video: data.participantsVideo,
        use_pmi: data.meetingID
      },
      start_time: parseStartDate(data.startDate),
      timezone: data.timezone,
      topic: data.topic,
      type: 2,
      recurrence: {
        end_date_time: "",
        end_times: 1,
        monthly_day: 1,
        monthly_week: -1,
        monthly_week_day: 1,
        repeat_interval: 0,
        type: 1,
        weekly_days: 1
      }
    };
    if (data.recurring_meeting && data.recurrence.recurrence_type !== -1) {
      meetingPayload.type = 8;
      meetingPayload.recurrence.type = data.recurrence.recurrence_type;
      meetingPayload.recurrence.repeat_interval = data.recurrence.repeatEvery;
      if (data.recurrence.isBy) {
        meetingPayload.recurrence.end_date_time = parseStartDate(data.recurrence.endDate);
      } else {
        meetingPayload.recurrence.end_times = data.recurrence.occurrences;
      }
      if (data.recurrence.recurrence_type === 2) {
        meetingPayload.recurrence.weekly_days = data.recurrence.weekly_days;
      }
      if (data.recurrence.recurrence_type === 3) {
        if (data.recurrence.isDayMonthly) { meetingPayload.recurrence.monthly_day = data.recurrence.dayOfMonth; } else {
          meetingPayload.recurrence.monthly_week_day = data.recurrence.day;
          meetingPayload.recurrence.monthly_week = data.recurrence.week;
        }
      }
    } else if (data.recurring_meeting && data.recurrence.recurrence_type === -1) {
      meetingPayload.type = 3;
    }
    await dispatch(createMeeting({ userId: currentUser.id, meetingPayload: meetingPayload, token: oauthToken.access_token }))
      .then(unwrapResult)
      .then(async response => {
        setIsMeetingScheduleModal(!isMeetingScheduleModal);
        setIsMeetingScheduleSave(false);
        await dispatch(getMeetingList({ userId: currentUser.id, token: oauthToken?.access_token }))
          .then(unwrapResult)
          .then(res => {
            if (res.meetings.length === 0) { return; }

            const DATA = [{
              title: "Upcoming Meetings",
              data: res.meetings
            }];
            setUpcomingMeetingsList(DATA);
          })
          .catch(error => {
            console.log(error);
          });
      })
      .catch(error => {
        setIsMeetingScheduleSave(false);
        console.log(error);
      });
  };

  const handleLogout = () => {
    CookieManager.clearAll().then(() => {
      setOauthToken(false);
      setIsFirst(true);
    }).catch((error) => console.log(error));
  };

  const handleRemoveMeeting = (item) => {
    deleteMeeting({ meetingId: item.id, token: oauthToken.access_token }).then(res => {
      const tmpUpcomingMeetingsList = JSON.parse(JSON.stringify(upcomingMeetingsList));
      const index = upcomingMeetingsList[0].data.indexOf(item);
      tmpUpcomingMeetingsList[0].data.splice(index, 1);
      setUpcomingMeetingsList(tmpUpcomingMeetingsList);
    }).catch((error) => console.log(error));
  };

  return (
    <View style={styles.Container}>
      {oauthToken
        ? <>
          <View style={styles.header}>
            <View>
              <Text onPress={handleLogout} style={styles.LogoutText}>Logout</Text>
            </View>
            <View style={styles.UserImageArea}>
              <View>
                <Text>{currentUser.first_name + "" + currentUser.last_name}</Text>
              </View>
              <Image
                style={styles.userLogo}
                resizeMode="cover"
                borderRadius={10}
                source={{
                  uri: currentUser.pic_url
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
          <View style={styles.Area}></View>
          <ScheduleMeetingList upcomingMeetingsList={upcomingMeetingsList} joinMeeting={joinMeeting} handleRemoveMeeting={handleRemoveMeeting} />
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

        </>
        : <>
          {sha256CodeChallenge !== "" &&
            <WebView
              useWebKit={true}
              userAgent={userAgent}
              onNavigationStateChange={onNavigationStateChange}
              source={{ uri: `${API_URL}/oauth/authorize?response_type=code&client_id=${options.CLIENT_ID}&redirect_uri=${options.REDIRECT_URI}&code_challenge=${sha256CodeChallenge}&code_challenge_method=plain` }}
            />
          }
        </>
      }

    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1
  },
  header: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
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
    color: "#FA060D"
  },
  UserImageArea: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
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
    color: "white",
    textTransform: "uppercase"
  },
  JoinMeetingText: {
    color: "white",
    textTransform: "uppercase"
  },
  ScheduleMeetingText: {
    color: "white",
    textTransform: "uppercase"
  },
  Area: {
    marginTop: 20
  },
  MeetingCard: {
    width: "100%",
    height: 50,
    padding: 5
  },
  ///
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 15,
    width: "90%",
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
    borderRadius: 5,
    padding: 8,
    elevation: 12,
    marginLeft: 10,
    width: 100
  }
});

export default {
  title: "ZoomCalling",
  navigator: ZoomCalling,
  slice
};
