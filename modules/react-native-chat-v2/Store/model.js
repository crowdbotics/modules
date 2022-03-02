export default (state, dispatch) => ({
  message: payload => {
    // channel, subscription, timetoken, message, publisher
    const channelMessages = state.messages[payload.channel] || [];
    state.messages[payload.channel] = [...channelMessages, payload.message];
    dispatch({ messages: state.messages });
  },
  file: envelop => {
  },
  presence: event => {
    // action, channel, occupancy, state
  },
  signal: signal => {
  },
  objects: objectEvent => {
  },
  messageAction: messageAction => {
  },
  status: status => {
    dispatch({ status });
  }
});

