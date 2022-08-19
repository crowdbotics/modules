import { Alert } from "react-native";

const messageMap = {
    "Request failed with status code 400": {
      code: 400,
      message: "Invalid credentials."
    },
    "Request failed with status code 403": {
      code: 403,
      message: "You do not have access to this resource."
    },
    "Request failed with status code 500": {
      code: 500,
      message: "Unexpected Server Error."
    },
    "Network Error": {
      code: null,
      message:
        "Network Error: It was not possible to establish a connection with the server."
    }
  };
  
  export const mapErrorMessage = (error) => {
    const message = error.message;
    return messageMap[message]
      ? { ...messageMap[message] }
      : { code: null, message };
  };
  

export const parseDjangoError = (error) => {
    console.log('parseDjangoError', error.response.data)
    try {
        return new Error(error.response.data.non_field_errors[0]);
    }catch(e){
        // return first kety of error.response.data
        let key = Object.keys(error.response.data)[0]
        return new Error(error.response.data[key]);
    }
    
}

export const showError = (error) => {
    Alert.alert(
        error?.name,
        error?.message,
        [
            { text: "OK", onPress: () => console.log("OK Pressed") }
        ]
    );
}