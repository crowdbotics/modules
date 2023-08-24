import React, { useEffect, useState, Fragment, useContext } from "react";
import { Text, View } from "react-native";

import { WebView } from "react-native-webview";
import { OptionsContext } from "@options";
import { getForms, createWebHook } from "../store";
import { getOauthToken, parseQueryString, validateConfig } from "../utils";
import FormItem from "../components/FormItem";
import Loader from "../components/Loader";
import { unwrapResult } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

/**
 * Component for managing Typeform webhooks.
 * @param  {Object} props - Props for the TypeformWebhook component.
 * @param  {Object} props.navigation - React navigation object for navigation purposes.
 * @returns {React.ReactNode}
 */
const TypeformWebhook = ({ navigation }) => {
  const options = useContext(OptionsContext);
  const { userAgent, REDIRECT_URI, CLIENT_ID, CLIENT_SECRET, styles } = options;

  const [oauthToken, setOauthToken] = useState(null);
  const [formList, setFormList] = useState([]);
  const [isFirst, setIsFirst] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  // Function to toggle the enable state of a form
  const toggleSwitch = (id, enable) => {
    setIsLoading(true);
    dispatch(createWebHook({ token: oauthToken, id: id, isEnable: enable }))
      .then(unwrapResult)
      .then((res) => {
        const tmpResult = JSON.parse(JSON.stringify(formList));
        const obj = tmpResult.find((obj) => obj.id === id);
        obj.isEnabled = res.enabled;
        setFormList(tmpResult);
        setIsLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (oauthToken) {
      setIsLoading(true);
      dispatch(getForms(oauthToken))
        .then(unwrapResult)
        .then((res) => {
          setFormList(res.items);
          setIsLoading(false);
        })
        .catch((e) => {
          console.log(e);
          setIsLoading(false);
        });
    }
  }, [oauthToken]);

  const onNavigationStateChange = (navigationState) => {
    if (navigationState.url.includes(REDIRECT_URI)) {
      const params = parseQueryString(navigationState.url);
      if (params.code && isFirst) {
        setIsFirst(false);
        getOauthToken({
          grant_type: "authorization_code",
          code: params.code,
          client_id: CLIENT_ID,
          client_secret: CLIENT_SECRET,
          redirect_uri: REDIRECT_URI
        })
          .then((res) => setOauthToken(res.access_token))
          .catch((e) => console.log("error", e));
      }
    }
  };

  // Function to initialize the Typeform authorization process with provided credentials
  const TypeFormAuth = () => {
    const errors = validateConfig(REDIRECT_URI, CLIENT_ID, CLIENT_SECRET);
    return (
      errors.length === 0 && (
        <Fragment>
          <WebView
            useWebKit={true}
            userAgent={userAgent}
            onNavigationStateChange={onNavigationStateChange}
            source={{
              uri: `https://admin.typeform.com/oauth/authorize?response_type=code&client_id=${CLIENT_ID}&scope=accounts:read+forms:read+responses:read+webhooks:write+webhooks:read&redirect_uri=${REDIRECT_URI}`
            }}
          />
        </Fragment>
      )
    );
  };

  return (
    <Fragment>
      {isLoading && <Loader />}
      {oauthToken
        ? (
        <View style={styles.formListContainer}>
          <Text style={styles.heading}>TypeForm</Text>
          {formList.map((form, index) => (
            <FormItem
              key={index}
              isEnabled={form?.isEnabled}
              toggleSwitch={toggleSwitch}
              form={form}
              oauthToken={oauthToken}
              navigation={navigation}
            />
          ))}
        </View>
          )
        : (
        <TypeFormAuth />
          )}
    </Fragment>
  );
};

export default TypeformWebhook;
