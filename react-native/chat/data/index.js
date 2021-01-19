import users from './raw/users';
import conversations from './raw/conversations';

class DataProvider {
  getUser(id = 1) {
    return users.find(x => x.id === id);
  }

  getConversation(userId = 1) {
    return conversations.find(x => x.withUser.id === userId);
  }

  getChatList() {
    return conversations;
  }
}

export const data = new DataProvider();
