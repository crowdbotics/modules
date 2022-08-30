import React, { useEffect, useState, Fragment, useContext } from "react";
import {
  Text,
  View,
  StyleSheet
} from "react-native";

// @ts-ignore
import { WebView } from "react-native-webview";
import { OptionsContext } from "@options";
import { createWebHook, getForms } from "../api";
import { getOauthToken, parseQueryString } from "../utils";
import FormItem from "../components/FormItem";
import Loader from "../components/Loader";

const TypeformWebhook = (props) => {
  const options = useContext(OptionsContext);
  const userAgent = "Mozilla/5.0 (Linux; Android) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/98.0.4758.87 Mobile Safari/537.36";
  const [oauthToken, setOauthToken] = useState(null);
  const [formList, setFormList] = useState([]);
  const [isFirst, setIsFirst] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const toggleSwitch = (id, enable) => {
    setIsLoading(true);
    createWebHook(oauthToken, id, enable)
      .then(res => res.json())
      .then(res => {
        const tmpResult = JSON.parse(JSON.stringify(formList));
        const obj = tmpResult.find(obj => obj.id === id);
        obj.isEnabled = res.enabled;
        setFormList(tmpResult);
        setIsLoading(false);
      })
      .catch(e => {
        console.log(e);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (oauthToken) {
      setIsLoading(true);
      getForms(oauthToken)
        .then(res => res.json())
        .then(res => {
          setFormList(res.items);
          setIsLoading(false);
        })
        .catch(e => {
          console.log(e);
          setIsLoading(false);
        });
    }
  }, [oauthToken]);

  const onNavigationStateChange = (evt) => {
    if (evt.url.includes(options.REDIRECT_URI)) {
      const params = parseQueryString(evt.url);
      if (params.code && isFirst) {
        setIsFirst(false);
        getOauthToken({
          grant_type: "authorization_code",
          code: params.code,
          client_id: options.CLIENT_ID,
          client_secret: options.CLIENT_SECRET,
          redirect_uri: options.REDIRECT_URI
        })
          .then(res => setOauthToken(res.access_token))
          .catch(e => console.log("error", e));
      }
    }
  };

  const TypeFormAuth = () => {
    return (
      <Fragment>
        <WebView
          useWebKit={true}
          userAgent={userAgent}
          onNavigationStateChange={onNavigationStateChange}
          source={{ uri: `https://admin.typeform.com/oauth/authorize?response_type=code&client_id=${options.CLIENT_ID}&scope=accounts:read+forms:read+responses:read+webhooks:write+webhooks:read&redirect_uri=${options.REDIRECT_URI}` }}
        />
    </Fragment>
    );
  };

  return (
    <Fragment>
      {isLoading && <Loader/>}
      {oauthToken
        ? <View style={styles.container}>
        <Text style={styles.heading}>TypeForm</Text>
        {formList.map((form, index) => <FormItem isEnabled={form?.isEnabled} toggleSwitch={toggleSwitch} form={form} oauthToken={oauthToken} key={index} navigation={props.navigation}/>
        )}
      </View>
        : <TypeFormAuth/>
      }
    </Fragment>

  );
};
const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "#FFF",
    height: "100%"
  },
  heading: {
    fontSize: 18,
    marginVertical: 10,
    paddingHorizontal: 10
  },
  card: {
    marginVertical: 5,
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderLeftWidth: 3,
    shadowColor: "gray",
    elevation: 10
  }
});
export default TypeformWebhook;
