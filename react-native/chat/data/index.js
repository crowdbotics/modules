import populateSeeds from './dataGenerator';
import users from './raw/users';
import articles from './raw/articles';
import notifications from './raw/notifications';
import conversations from './raw/conversations';
import cards from './raw/cards';

class DataProvider {
  getUser(id = 1) {
    return users.find(x => x.id === id);
  }

  getUsers() {
    return users;
  }

  getNotifications() {
    return notifications;
  }

  getArticles(type = 'article') {
    return articles.filter(x => x.type === type);
  }

  getArticle(id) {
    return articles.find(x => x.id === id);
  }


  getConversation(userId = 1) {
    return conversations.find(x => x.withUser.id === userId);
  }

  getChatList() {
    return conversations;
  }

  getComments(postId = 1) {
    return this.getArticle(postId).comments;
  }

  getCards() {
    return cards;
  }

  populateData() {
    populateSeeds();
  }
}

export const data = new DataProvider();
