# Platform Specific Code

# What kind of support for multiple platforms do we provide?

Our scaffold makes use of React Native, React, React Native for Web, and Django.

When building screens for **mobile** devices you will be using [React Native Core Components](https://reactnative.dev/docs/components-and-apis) with [React APIs](https://react.dev/reference/react).

When building screens for **web** you can use any of the following:
- React-only components with React DOM (1);
- React-native components that get converted (2) into React DOM via React Native for Web;
- A mix of the above in any proportion;

This means that you can re-use code across all platforms and when it makes sense you can separate platform-specific components. You might want to use different libraries for web and mobile or you might want to do different business logic on a specific platform. By default start with a shared implementation for all platforms as this aims for the most code re-use possible, and only "specialize" your code to tailor a platform when necessary.

1:  [React DOM](https://www.npmjs.com/package/react-dom) refers to the React library that abstracts away the [DOM](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction) Web API. As an example, the following `App` component makes use of `div` which is defined in the React DOM library.

```jsx
function App() {
  return <div>Hello World</div>;
}
```

2: When sharing the same screen code for all platforms we perform additional build steps for web. During your app's web build process we rewrite all `react-native` imports to point to `react-native-web` instead which provides a compatibility layer between React DOM and React Native. We also prioritize web-specific source code, we will discuss this mechanism in more detail in the next section.

# How can I create a platform-specific version of a component or screen?

In this section we will dive deep into a couple of options that you have at your disposal for controlling which pieces of source code get added to your web bundle.

## Using platform-specific file extensions

The first and simplest tool that you have available is **file extensions**. Naming a file `index.web.js` sets this file to be picked for the web build instead of `index.js`. This is a system of extensions priority for web, and the order goes as follow (more priority from left to right):
```
[".web.js", ".web.ts", ".web.jsx", ".web.tsx", ".js", ".ts", ".jsx", ".tsx"]
```

As an example, let's take a look at our "Date Picker" module:
```jsx
// modules/date-picker/date-picker.web.js
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const DatePickerComponent = () => {
  const [startDate, setStartDate] = useState(new Date());

  return <DatePicker selected={startDate} onChange={setStartDate} />;
};
```

```jsx
// modules/date-picker/date-picker.native.js
import React, { useState } from "react"
import DatePicker from "react-native-date-picker"

export const DatePickerComponent = () => {
  const [startDate, setStartDate] = useState(new Date())

  return <DatePicker date={startDate} onDateChange={setStartDate} />
}
```

The first file is used when doing a web build of the app, and as you can see in the imports section of that file it depends on the [react-datepicker](https://npmjs.com/package/react-datepicker) library.

The second file is used in the mobile build of the app, and depends on [react-native-date-picker](https://npmjs.com/package/react-native-date-picker) library.

This is an example of platform-specific components separated using this file extension mechanism, and also an example of platform-specific dependencies or libraries.

## Using the Platform API

The second tool that you can use which is much more granular in scope is the React Native [Platform](https://reactnative.dev/docs/platform) API. With this API you can query the current platform at runtime, which opens the door for platform-specific business logic and much more.

You can see an example of this in the same "Date Picker" module:
```jsx
// modules/date-picker/index.js

import React from "react"
import {
  SafeAreaView,
  ScrollView,
  Text,
  Platform,
  StyleSheet
} from "react-native"
import { DatePickerComponent } from "./datepicker"

const DatePicker = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Text style={styles.text}>Date picker for {Platform.OS}</Text>
        <DatePickerComponent />
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F8F8FC",
    height: "100%"
  },
  scrollView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 20
  },
  text: {
    textAlign: "center",
    fontSize: 28,
    color: "#828AB0",
    fontWeight: 700,
    padding: 20
  }
})

export default {
  title: "Date Picker",
  navigator: DatePicker
}
```

Notice the line with `Platform.OS` in this file:
```jsx
        <Text style={styles.text}>Date picker for {Platform.OS}</Text>
```

That's a property returns a string of the current OS at runtime. With this you can for example show the OS in Text as seen here or you can even use it in any JavaScript code to separate business logic for each OS (Platform).

## Date Picker preview

Here's how that [Date Picker](https://github.com/crowdbotics/modules/blob/docs/react-native-web/modules/react-native-date-picker/README.md) module looks like in action.

![Date Picker module preview image showing both platforms](https://github.com/crowdbotics/modules/blob/docs/react-native-web/docs/examples/date-picker.png?raw=true)
![alt text](https://github.com/[username]/[reponame]/blob/[branch]/image.jpg?raw=true)
