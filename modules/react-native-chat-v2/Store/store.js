// @ts-ignore
import create from 'zustand';
export const uuid = '1'; // uuidv4()
export const user = {
    _id: uuid,
    name: 'Vlad Rimsha',
    avatar: 'https://ca.slack-edge.com/T2R0TP3DM-UDU3PDY81-25eda549c0b1-512',
};
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
        contacts: [
            { _id: '1', name: 'John', avatar: '' },
            { _id: '2', name: 'Jane', avatar: '' }
        ],
        user,
    },
    dispatch: newState => setState((oldState) => ({ state: { ...oldState.state, ...newState } }))
}));
