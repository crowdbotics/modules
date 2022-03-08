// @ts-ignore
import create from 'zustand';
import { users } from './storage';
const randIndex = 0 //Math.floor(Math.random() * users.length)
export const uuid = users[randIndex]._id; // uuidv4()
export const user = users[randIndex]
export var ChannelType;
(function (ChannelType) {
  ChannelType[ChannelType["Direct"] = 0] = "Direct";
  ChannelType[ChannelType["Group"] = 1] = "Group";
})(ChannelType || (ChannelType = {}));
export const useStore = create(setState => ({
  state: {
    channels: {},
    messages: {},
    members: {},
    contacts: users,
    user,
  },
  dispatch: newState => setState((oldState) => ({ state: { ...oldState.state, ...newState } }))
}));
