export default (state, dispatch) => ({
  message: payload => {
    // channel, subscription, timetoken, message, publisher
    const channelMessages = state.messages[payload.channel] || [];
    state.messages[payload.channel] = [...channelMessages, payload.message];
    dispatch({ messages: state.messages });
  },
  file: envelop => {
    const channelMessages = state.messages[envelop.channel] || [];
    state.messages[envelop.channel] = [...channelMessages, {
      _id: envelop.file.id,
      name: envelop.file.name,
      [envelop.message.type]: envelop.file.url,
      createdAt: new Date((envelop.timetoken / 10000000) * 1000),
      user: state.user
    }];
    dispatch({ messages: state.messages });
  },
  presence: event => {
    // action, channel, occupancy, state
    if (event.channel in state.channels) {
      state.channels[event.channel].last_seen = event?.state?.last_seen
      dispatch({ channels: state.channels });
    }
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

