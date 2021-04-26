# Table of contents
 
- [Table of contents](#table-of-contents)
- [Project structure](#project-structure)
- [Your application state](#your-application-state)
 - [The store/](#the-store)
 - [Services](#services)
 - [Slices](#slices)
 - [Handling Thunk Results](#handling-thunk-results)
- [References](#references)
 
# Project structure
 
[Table of contents](#table-of-contents)
 
When creating a new React Native app, your project structure looks like this:
 
Android and iOS native files are stored here.
 
```
android
ios
```
 
This is your Django backend that serves a REST API.
 
```
backend
```
 
The source code of your React Native app is stored in the root directory of your repository.
It is worth noting that the `screens/` folder contains your screen components (Figma imported screens and other generated code), `modules/` contains the installed modules through Crowdbotics Dashboard, and the connectors code is inside the `store/` directory.
 
Your main component `App` is then registered in `index.js`.
 
```javascript
//index.js
AppRegistry.registerComponent(appName, () => App);
```
 
# The Application State
 
[Table of contents](#table-of-contents)
 
React Native applications usually store various amounts of data that can be used across multiple components.
 
We chose to use [Redux](https://redux.js.org/) as the pattern for managing and updating the application state.
 
> Redux is a pattern and library for managing and updating application state, using events called "actions".
 
And we also use [Redux-Toolkit](https://redux-toolkit.js.org/), which facilitates managing the app state and create an easier standard for writing redux logic.
 
Lets go over in detail on the various pieces that make up the Redux pattern and where you can find them in your project.
 
## The store/
The `store/` directory should contain all of your application's state. Inside the store, there are multiple custom directories. Each directory can represent an automatically generated api connector, which are available at Crowdbotics platform "Connector" tool, and can be added to any project. The exception goes to `custom/` directory, which will be explained shortly.
 
Inside each connector directory, you will find the following types of files:
- `api.js`
- `{model_name}.slice.js`
 
## api.js
 
[Table of contents](#table-of-contents)
 
Our connector tool automatically generates a service layer that serves as a helper mechanism to send requests to
the multiple endpoints that you have available via the connectors installed in the project.
 
```javascript
// store/petStoreService/api.js
import axios from "axios";
import { PETS_STORE_USERNAME, PETS_STORE_PASSWORD } from "react-native-dotenv";
 
const petStoreService = axios.create({
 baseURL: "https://pets.crowdbotics.io",
 auth: { username: PETS_STORE_USERNAME, password: PETS_STORE_PASSWORD },
 headers: { Accept: "application/json", "Content-Type": "application/json" },
});
 
function get_pets_list() {
 return petStoreService.get(`/pets`);
}
 
export const apiService = { get_pets_list };
```
 
## Slices
 
[Table of contents](#table-of-contents)
 
For every data model existing in a connector, we create a `.slice.js` file that:
> 1. Creates a slice with the `createSlice` function. This redux-toolkit function accepts an initial state, an object full of reducer functions, and a "slice name", and automatically generates action creators and action types that correspond to the reducers and state [1](https://redux-toolkit.js.org/api/createSlice)
> 2. For each request defined in the `services` file, it creates a corresponding thunk using `createAsyncThunk` function that accepts an action type string (which is generated in the `createSlice`) and a callback function that should return a promise. It then generates a promise lifecycle based on the provided type action and returns a thunk action creator, that runs the callback and dispatch the lifecycle actions based on the returned promise [2](https://redux-toolkit.js.org/api/createAsyncThunk). This abstracts the standard recommended approach for handling async request lifecycles.
 
Both combined enables an abstraction for the recommended approach for handling async requests with redux. Let's take a look at the code:
 
 
```javascript
//store/petStoreService/pets.slice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { apiService } from "./services"
 
// First, creating the think for getting pets data
// using the service/endpoint call as the promise callback
export const get_pets_list = createAsyncThunk(
 "pets/get_pets_list",
 async payload => await apiService.get_pets_list(payload)
)
// defining the initial state: pets data will be saved in the let entities' list
const initialState = { entities: [], api: { loading: "idle", error: null } }
 
// Creating the slice for the model Pet
const pets = createSlice({
 name: "pets",
 initialState: initialState,
 reducers: {},
 extraReducers: {
   [get_pets_list.pending]: (state, action) => {
     if (state.api.loading === "idle") {
       state.api.loading = "pending"
     }
   },
   [get_pets_list.fulfilled]: (state, action) => {
     if (state.api.loading === "pending") {
       // update Pets array with new pet list data
       state.entities = [...state.entities, ...action.payload.data]
       state.api.loading = "idle"
     }
   },
   [get_pets_list.rejected]: (state, action) => {
     if (state.api.loading === "pending") {
       state.api.error = action.error
       state.api.loading = "idle"
     }
   }
 }
})
export default {
 get_pets_list,
 slice: pets
}
```
 
In the example, the action passed to `createAsyncThunk` is `pets/get_pets_list`, since `pets` os the name of the slice and `get_pets_list` is the actual action name we want to use to represent the lifecycle of the async request.
This provided action in the thunk creation will generate these action types (which are handled by our slice):
 
- pending: 'pets/get_pets_list/pending': request was initiated
- fulfilled: 'pets/get_pets_list/fulfilled': request when through
- rejected: 'pets/get_pets_list/rejected': On error handling
 
For more information, please checkout the redux-toolkit documentation: https://redux-toolkit.js.org/api/createAsyncThunk
 
 
 
## custom/
For your custom state management needs, use the `custom/` directory. As long as you follow the pattern by creating slices in the format `<file_name>.slice.js` and exports all of your **named** thunks and a default with `export default { slice: <slice_name> }`. Here is an example of an slice file, using `createAsyncThunk` from Redux Toolkit:
 
```js
// users.slice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { api } from "./api"
 
export const getUsers = createAsyncThunk(
 "users/getUsers",
 async payload => {
   const response = await api.getUsers(payload)
   return response.data
 }
)
 
const initialState = { entities: [], api: { loading: "idle", error: null } }
const usersSlice = createSlice({
 name: "users",
 initialState: initialState,
 reducers: {},
 extraReducers: {
   [getUsers.pending]: (state, action) => {
     if (state.api.loading === "idle") {
       state.api.loading = "pending"
     }
   },
   [getUsers.fulfilled]: (state, action) => {
     if (state.api.loading === "pending") {
       state.entities = action.payload
       state.api.loading = "idle"
     }
   },
   [getUsers.rejected]: (state, action) => {
     if (state.api.loading === "pending") {
       state.api.error = action.error
       state.api.loading = "idle"
     }
   },
 }
})
 
export default { slice: usersSlice }
```
 
 
## Handling Thunk Results
 
[Table of contents](#table-of-contents)
 
The thunks generated by `createAsyncThunk` will always return a resolved promise with either the `fulfilled` action object or `rejected` action object inside, as appropriate. To consume the resulting value of your api call using the created thunks, there are two approaches, and depends if you are using the `connect()` function or React hooks in your component.
 
### connect()
 
`react-redux` provides the [`connect()`](https://react-redux.js.org/api/connect) function that allows connecting a React
component to the Redux store. This function accepts a `mapState` and a
`mapDispatch` function.
 
The first, `mapState` wraps the connected component with a component that
receives the function return as merged props.
 
The `mapDispatch` map enables dispatching actions from the component by
passing action creators into the component props.
 
```js
import React from "react";
import { View, Button, Text } from "react-native";
 
import { get_pets_list } from "@/store/petStoreService/pets.slice.js";

 
const PetsCounter = ({ pets, get_pets_list }) => (
 <View>
   <Text>There's {pets.length} pets in the database.</Text>
   <Button onClick={get_pets_list()}>Refresh</button>
 </View>
);
 
const mapState = state => {
 return { pets: state.pets.entities };
};
 
const mapDispatch = {
 get_pets_list,
};
 
export default connect(mapState, mapDispatch)(PetsCounter);
```
 
### Hooks
The Redux Toolkit library exports a `unwrapResult` function that can be used to extract the payload of a fulfilled action or to throw the error. This can be useful if you wish to access the updated values immediately after the dispatched action is fulfilled, as the current `state` might not be updated yet, as you can check in the code below:
 
```js
import React from "react";
import { View, Button, Text } from "react-native";
import { useSelector, useDispatch } from 'react-redux';
import { get_pets_list } from "@/store/petStoreService/pets.slice.js";
import { unwrapResult } from "@reduxjs/toolkit";
 
const PetsCounter = () => {
 const { entities, api } = useSelector((state) => state.pets)
 const dispatch = useDispatch()
 
 const onClick = () => {
 try {
     const resultAction = await dispatch(get_pets_list())
     // unwrapping values returned by the api call. You might notice that the value of pets (unwrapped)
     // is different than entities, since the state store might not have been updated yet
     const pets = unwrapResult(resultAction)
     console.log('success', `Refreshed pets list: ${pets.length} before was ${entities.length}`)
     // finish doing any logic with pets
   } catch (err) {
     console.log('error', `Fetch failed: ${err.message}`)
   }
 }
 
 return (
 <View>
   <Text>There are {entities.length} pets in the database.</Text>
   <Button onPress={onClick}>Refresh</Button>
 </View>
)
};
 
export default PetsCounter
```
 
 
# References
1. [createSlice docs](https://redux-toolkit.js.org/api/createSlice)
2. [createAsyncThunk docs](https://redux-toolkit.js.org/api/createAsyncThunk)
