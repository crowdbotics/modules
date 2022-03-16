import React from 'react'

// @ts-ignore
import CountryPicker from 'react-native-country-picker-modal'

const CountryCode = (props) => {

  const onSelect = (country) => {
    props.onCountrySelect(country)
  }

  return (
    <>
    
      <CountryPicker
        {...{
          countryCode: props.code,
          withCallingCodeButton: true,
          withFilter: true,
          withFlag: true,
          withCallingCode: true,
          onSelect,
        }}
      />
    </>
  )
}

export default CountryCode;