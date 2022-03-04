import React from 'react';
import { Button, View, Text, Pressable } from 'react-native';
// @ts-ignore
import { createStackNavigator } from "@react-navigation/stack"
import Channel from '../Screens/Channel';
import Channels from '../Screens/Channels';
import CreateChannel from '../Screens/CreateChannel';
import CreateChannelDetails from '../Screens/CreateChannelDetails';
import ChannelDetails from '../Screens/ChannelDetails';
import EditChannelDetails from '../Screens/EditChannelDetails';
import AddMember from '../Screens/AddMember';
import options from '../options'

const Stack = createStackNavigator();

const Navigator = () => {
  return <Stack.Navigator>
    <Stack.Screen options={{ headerShown: false }} name="Channels" component={Channels} />

    <Stack.Screen name="Channel" component={Channel}
      options={({ navigation, route }) => ({
        headerRight: () => <View style={options.NavigationStyle.headerRight}>
          <Pressable onPress={() => navigation.navigate('ChannelDetails', { item: route.params.item })}>
            <Text>Details</Text>
          </Pressable>
        </View>
      })}
    />
    <Stack.Screen name="ChannelDetails" component={ChannelDetails} options={({ navigation, route }) => ({
      headerRight: () => <View style={options.NavigationStyle.headerRight}>
        <Pressable onPress={() => navigation.navigate('EditChannelDetails', { item: route.params.item })}>
          <Text>Edit</Text>
        </Pressable>
      </View>
    })} />
    <Stack.Screen name="EditChannelDetails" options={{
      title: 'Edit'
    }} component={EditChannelDetails} />
    <Stack.Screen name="CreateChannel" component={CreateChannel} options={{ title: 'New Group' }} />
    <Stack.Screen name="CreateChannelDetails" component={CreateChannelDetails} options={{ title: 'New Group' }} />
    <Stack.Screen name="AddMember" component={AddMember} options={{ title: 'Contacts' }} />
  </Stack.Navigator>;
};
export default Navigator