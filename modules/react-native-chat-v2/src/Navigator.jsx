import React from 'react';
import { Button, View } from 'react-native';
import { createStackNavigator } from "@react-navigation/stack"
import Channel from './Channel';
import Channels from './Channels';
import CreateChannel from './CreateChannel';
import CreateChannelDetails from './CreateChannelDetails';
import Contacts from './Contacts';
import ChannelDetails from './ChannelDetails';
import EditChannelDetails from './EditChannelDetails';
import AddMember from './AddMember';
import { NavigationStyle } from './styles';
import { CreateButton } from "./components/IconButton";
const Stack = createStackNavigator();
export default () => {
    return <Stack.Navigator>
      <Stack.Screen name="Channels" component={Channels} options={({ navigation }) => ({
        headerTitleStyle: NavigationStyle.title,
        contentStyle: { backgroundColor: 'white' },
        headerRight: () => <View style={NavigationStyle.headerRight}>
            <CreateButton onPress={() => navigation.navigate('Contacts')}/>
          </View>
    })}/>
      <Stack.Screen name="Channel" component={Channel} options={({ navigation, route }) => ({
        headerRight: () => <View style={NavigationStyle.headerRight}>
              <Button onPress={() => navigation.navigate('ChannelDetails', { item: route.params.item })} title="Details"/>
            </View>
    })}/>
      <Stack.Screen name="ChannelDetails" component={ChannelDetails} options={({ navigation, route }) => ({
        headerRight: () => <View style={NavigationStyle.headerRight}>
              <Button title="Edit" onPress={() => navigation.navigate('EditChannelDetails', { item: route.params.item })}/>
            </View>
    })}/>
      <Stack.Screen name="EditChannelDetails" options={{
        title: 'Edit'
    }} component={EditChannelDetails}/>
      <Stack.Screen name="Contacts" component={Contacts} options={({ route }) => ({ title: route.params?.title ?? 'Create' })}/>
      <Stack.Screen name="CreateChannel" component={CreateChannel} options={{ title: 'New Group' }}/>
      <Stack.Screen name="CreateChannelDetails" component={CreateChannelDetails} options={{ title: 'New Group' }}/>
      <Stack.Screen name="AddMember" component={AddMember} options={{ title: 'Contacts' }}/>
    </Stack.Navigator>;
};
