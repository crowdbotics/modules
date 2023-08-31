import React, { useState } from "react"
import DatePicker from "react-native-date-picker"

export const DatePickerComponent = () => {
  const [startDate, setStartDate] = useState(new Date())

  return <DatePicker date={startDate} onDateChange={setStartDate} />
}
