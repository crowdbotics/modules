import users from './raw/users';
import articles from './raw/articles';
import notifications from './raw/notifications';
import conversations from './raw/conversations';

const populateArticles = () => {
  articles.forEach(article => {
    const userArticle = article;
    const userId = articles.indexOf(article) % users.length;
    userArticle.user = users.find(x => x.id === userId) || users[0];

    userArticle.comments.map(comment => {
      const userComment = comment;
      const commentUserId = article.comments.indexOf(comment) % users.length;
      userComment.user = users.find(x => x.id === commentUserId) || users[0];
      return userComment;
    });
    return userArticle;
  });
};

const populateNotifications = () => {
  notifications.map(notification => {
    const userNotification = notification;
    const userId = notifications.indexOf(notification) % users.length;
    userNotification.user = users.find(x => x.id === userId) || users[0];
    return userNotification;
  });
};

const populateConversations = () => {
  conversations.map(conversation => {
    const userConversation = conversation;
    userConversation.withUser = users.find(x => x.id === conversation.withUserId) || users[0];
    return userConversation;
  });
};

const populateSeeds = () => {
  populateArticles();
  populateNotifications();
  populateConversations();
};

export default populateSeeds;
