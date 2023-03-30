import React, { Fragment, useState } from "react"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import Input from "../../components/Input"
import Button from "../../components/Button"
import { sendVerification } from "../../store/api"
import { sendVerification, verifyCode } from "../../store"
import Loader from "../../components/Loader"
import { useRoute } from "@react-navigation/native"
import { unwrapResult } from "@reduxjs/toolkit"
import { useDispatch } from "react-redux"

const Verification = props => {
  const dispatch = useDispatch()
  const route = useRoute()
  const [code, setCode] = useState("")
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  const handleVerification = async () => {
    setIsLoading(true)
    let apiResult = null
    await dispatch(verifyCode({ method: route.params.method, code: code }))
      .then(unwrapResult)
      .then(res => {
        apiResult = res
        setIsLoading(false)
      })
      .catch(error => {
        apiResult = error
        setIsLoading(false)
      })
    setIsLoading(false)
    if (apiResult.ok) {
      props.navigation.navigate("Home")
    } else {
      setErrors(apiResult)
    }
  }

  const handleResendCode = async () => {
    setIsLoading(true)
    let apiResult = null
    await dispatch(sendVerification({ method: route.params.method }))
      .then(unwrapResult)
      .then(res => {
        apiResult = res
        setIsLoading(false)
      })
      .catch(error => {
        apiResult = error
        setIsLoading(false)
      })
    setIsLoading(false)
    if (apiResult.ok) {
      props.navigation.navigate("Verification", {
        method: route.params.method,
        link: apiResult?.link
      })
    } else {
      setErrors(apiResult)
    }
  }

  const handleQRCode = () => {
    props.navigation.navigate("GoogleAuth", {
      link: route.params.link
    })
  }

  return (
    <Fragment>
      {isLoading && <Loader />}
      <View style={styles.main}>
        <View>
          {route.params.method === "google_authenticator" ? (
            <Text style={styles.text}>
              Enter your 6-digits code from Google Authenticator App
            </Text>
          ) : (
            <Text style={styles.text}>
              Verification code has been sent to your{" "}
              {route.params.method === "phone_number"
                ? "Phone number"
                : "Email"}
            </Text>
          )}
          <Input
            label="Enter Code"
            returnKeyType="next"
            value={code}
            setValue={setCode}
            autoCapitalize="none"
            placeholder="Verification code"
          />
          {Object.keys(errors).map(key => (
            <Fragment key={key}>
              {errors.length ? (
                errors[key].map((obj, index) => (
                  <Text key={index} style={styles.error}>
                    {key}: {obj}
                  </Text>
                ))
              ) : (
                <Text style={styles.error}>{errors[key]}</Text>
              )}
            </Fragment>
          ))}
          <View>
            <Button mode="contained" onPress={handleVerification}>
              Verify
            </Button>
          </View>
          {route.params.method !== "google_authenticator" && (
            <View style={styles.resend}>
              <Text>Did not receive a code? </Text>
              <TouchableOpacity onPress={handleResendCode}>
                <Text style={styles.textPurple}>Resend</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
        {route.params.method === "google_authenticator" && (
          <View style={styles.pt15}>
            <Button mode="contained" onPress={handleQRCode}>
              Google Authenticator QR Code
            </Button>
          </View>
        )}
      </View>
    </Fragment>
  )
}
export default Verification

const styles = StyleSheet.create({
  main: {
    padding: 10,
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignContent: "space-between",
    justifyContent: "space-between"
  },
  text: {
    marginBottom: 5,
    marginTop: 12,
    fontWeight: "bold"
  },
  textPurple: {
    color: "#2E5984",
    fontWeight: "bold"
  },
  resend: {
    paddingTop: 7,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end"
  },
  pt15: {
    paddingTop: 15
  },
  error: {
    paddingLeft: 5,
    fontStyle: "italic",
    color: "red"
  }
})
