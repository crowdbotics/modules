// @ts-ignore
import create from 'zustand';
import { users } from './storage';
const randIndex = Math.floor(Math.random() * users.length)
export const uuid = users[randIndex]._id; // uuidv4()
export const user = users[randIndex]
export var ChannelType={
  Direct:0,
  Group:1
};

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
