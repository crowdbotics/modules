import React, { useState } from "react";
import { View, StyleSheet, Text, Pressable } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import Input from "../Input";
import { timezones } from "../../timezones";

import DatePicker from "react-native-date-picker";

const MeetingTime = ({
  meetingSchedule,
  setMeetingSchedule
}) => {
  const [openStartDate, setOpenStartDate] = useState(false);
  const [openTimezone, setOpenTimezone] = useState(false);
  const [timezoneList, setTimezoneList] = useState(timezones);

  return (
    <View style={styles.ModalContent}>
      <View style={styles.InputLabels}>
        <Pressable onPress={() => setOpenStartDate(true)}>
          <Input
            label="When"
            editable={false}
            value={meetingSchedule.startDate.toLocaleString("en-US", {
              day: "numeric",
              month: "short",
              year: "numeric",
              hour: "numeric",
              minute: "2-digit"
            })}
          />
        </Pressable>
        <DatePicker
          modal
          open={openStartDate}
          date={meetingSchedule.startDate}
          onConfirm={(date) => {
            setOpenStartDate(false);
            setMeetingSchedule({ ...meetingSchedule, startDate: date });
          }}
          onCancel={() => {
            setOpenStartDate(false);
          }}
        />
      </View>
      <View style={styles.InputLabels}>
        <Text style={[styles.FwBold, styles.Mt10]}>Timezone</Text>
        <DropDownPicker
          placeholder='Timezone'
          placeholderStyle={styles.DropDownPlaceholder}
          style={styles.DropDownPicker}
          labelProps={{
            numberOfLines: 1
          }}
          listMode="MODAL"
          modalTitle="Select timezone"
          searchable={true}
          open={openTimezone}
          value={meetingSchedule.timezone}
          items={timezoneList}
          setOpen={setOpenTimezone}
          setValue={(value) => setMeetingSchedule({ ...meetingSchedule, timezone: value() })}
          setItems={setTimezoneList}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  ModalContent: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  InputLabels: {
    width: "49%"
  },
  DropDownPicker: {
    borderWidth: 1,
    borderColor: "lightgray",
    borderRadius: 5,
    padding: 4,
    marginTop: 5,
    height: 39
  },
  DropDownPlaceholder: {
    color: "lightgrey"
  },
  Mt10: {
    marginTop: 10
  },
  FwBold: {
    fontWeight: "bold"
  }
});
export default MeetingTime;
