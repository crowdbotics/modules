// @ts-ignore
import create from "zustand";
import options from "../options";
export const uuid = options.user._id;
export const user = options.user;
export const ChannelType = {
  Direct: 0,
  Group: 1
};

export const useStore = create((setState) => ({
  state: {
    channels: {},
    messages: {},
    members: {},
    contacts: [options.user, ...options.users],
    user
  },
  dispatch: (newState) =>
    setState((oldState) => ({ state: { ...oldState.state, ...newState } }))
}));
