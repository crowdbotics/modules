import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { useForm, Controller } from "react-hook-form";
export const DropDown = ({ setSort }) => {
  const { control } = useForm();
  const [genderOpen, setGenderOpen] = useState(false);
  const [genderValue, setGenderValue] = useState(null);
  const [gender, setGender] = useState([
    { label: "Ascending", value: "ascending" },
    { label: "Descending", value: "descending" },
    { label: "Alphabatic", value: "alphabatic" }
  ]);
  return (
    <View>
      <Text style={styles.label}>Sort</Text>
      <Controller
        name="sort"
        defaultValue=""
        control={control}
        render={({ field: { onChange, value } }) => (
          <View style={styles.dropdownGender}>
            <DropDownPicker
              style={styles.dropdown}
              open={genderOpen}
              value={genderValue} // genderValue
              items={gender}
              setOpen={setGenderOpen}
              setValue={setGenderValue}
              setItems={setGender}
              placeholder="Ascending"
              placeholderStyle={styles.placeholderStyles}
              onChangeValue={setSort}
            />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    marginBottom: 10
  },
  placeholderStyles: {
    color: "grey"
  },
  dropdownGender: {
    marginBottom: 15
  },
  dropdown: {
    borderColor: "#B7B7B7",
    height: 42,
    color: "grey",
    backgroundColor: "#fcfcfc"
  }
});
