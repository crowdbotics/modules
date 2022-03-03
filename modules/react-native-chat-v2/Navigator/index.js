import React from 'react';
import { Button, View, Text } from 'react-native';
// @ts-ignore
import { createStackNavigator } from "@react-navigation/stack"
import Channel from '../Screens/Channel';
import Channels from '../Screens/Channels';
import CreateChannel from '../Screens/CreateChannel';
import CreateChannelDetails from '../Screens/CreateChannelDetails';
import Contacts from '../Screens/Contacts';
import ChannelDetails from '../Screens/ChannelDetails';
import EditChannelDetails from '../Screens/EditChannelDetails';
import AddMember from '../Screens/AddMember';
// @ts-ignore
import { NavigationStyle } from './styles';

const Stack = createStackNavigator();

const Navigator = () => {
  return <Stack.Navigator>
    <Stack.Screen options={{ headerShown: false }} name="Channels" component={Channels} />

    <Stack.Screen name="Channel" component={Channel}/>
    <Stack.Screen name="ChannelDetails" component={ChannelDetails} options={({ navigation, route }) => ({
      headerRight: () => <View style={NavigationStyle.headerRight}>
        <Button title="Edit" onPress={() => navigation.navigate('EditChannelDetails', { item: route.params.item })} />
      </View>
    })} />
    <Stack.Screen name="EditChannelDetails" options={{
      title: 'Edit'
    }} component={EditChannelDetails} />
    <Stack.Screen name="Contacts" component={Contacts} options={({ route }) => ({ title: route.params?.title ?? 'Create' })} />
    <Stack.Screen name="CreateChannel" component={CreateChannel} options={{ title: 'New Group' }} />
    <Stack.Screen name="CreateChannelDetails" component={CreateChannelDetails} options={{ title: 'New Group' }} />
    <Stack.Screen name="AddMember" component={AddMember} options={{ title: 'Contacts' }} />
  </Stack.Navigator>;
};
export default Navigator