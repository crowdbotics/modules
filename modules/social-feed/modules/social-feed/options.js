import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  hr: {
    marginTop: 20,
    marginBottom: 20,
    borderBottomColor: "black",
    borderBottomWidth: 1
  },
  container: {
    flex: 1,
    height: 100,
    padding: 13
  },
  selectedSheet: { flex: 1, borderRadius: 11 },
  // commentComponent
  commentTextInput: { flexDirection: "row", marginHorizontal: -25 },
  replyLikeButton: { flexDirection: "row", borderWidth: 0, padding: 5 },
  commentReplyMain: {
    flexDirection: "row",
    alignItems: "stretch",
    justifyContent: "space-between"
  },
  commentReplyButton: { borderWidth: 0, padding: 5 },
  commentLikeButton: { flexDirection: "row", borderWidth: 0, padding: 5 },
  singleCommentHeader: {
    flexDirection: "row",
    alignItems: "stretch",
    justifyContent: "space-between"
  },
  commentMainContainer: {
    margin: 5,
    marginBottom: 100,
    backgroundColor: "white",
    padding: 10
  },
  commentContainer: {
    display: "flex",
    flexDirection: "column",
    marginBottom: 10
  },
  commentUserContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10
  },
  commentUserImageContainer: {
    height: 30,
    width: 30,
    borderRadius: 15,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10
  },
  commentUserImage: {
    height: 15,
    width: 15
  },
  commentUserText: {
    color: "#3B566E",
    marginLeft: 0
  },
  commentText: {
    color: "#6F8BA4",
    marginBottom: 10,
    marginTop: 10,
    marginLeft: 5
  },
  commentReplyContainer: {
    display: "flex",
    flexDirection: "column",
    marginLeft: 10
  },
  commentReplyUserContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10
  },
  commentReplyUserImageContainer: {
    height: 30,
    width: 30,
    borderRadius: 15,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10
  },
  commentReplyUserImage: {
    height: 15,
    width: 15
  },
  commentReplyUserText: {
    color: "#3B566E",
    marginLeft: 0
  },
  commentReplyText: {
    color: "#6F8BA4",
    marginBottom: 5,
    marginTop: 5,
    marginLeft: 5
  },
  replyInput: {
    borderWidth: 1,
    borderColor: "#DEE2E6",
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: "#F9FAFC"
  },
  replyButton: {
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10
  },
  commentSubmitButton: {
    borderRadius: 8,
    paddingVertical: 10,
    justifyContent: "center",
    alignItems: "center",
    flex: 0.16,
    marginVertical: 10,
    backgroundColor: "#0c0c0c"
  },
  // postDetailsComponent
  postDetailsContainer: {
    flexDirection: "row",
    alignItems: "stretch",
    justifyContent: "space-between"
  },
  postUserImageContainer: {
    height: 30,
    width: 30,
    borderRadius: 15,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10
  },
  userImageStyles: {
    height: 15,
    width: 15
  },
  userNameText: {
    color: "#3B566E",
    marginLeft: 0
  },
  postImage: {
    flex: 1,
    width: "100%",
    height: "100%",
    overflow: "hidden",
    borderRadius: 10
  },
  postcontainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 10
  },
  leftContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },
  imageIcons: {
    height: 12,
    width: 12
  },
  mh10: {
    marginHorizontal: 10
  },
  // SocialProfile
  profileImageContainer: {
    backgroundColor: "lightgray",
    height: 70,
    width: 70,
    borderRadius: 35,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  galleryPost: {
    borderRadius: 10,
    width: "100%",
    height: "100%",
    backgroundColor: "#FCF1D6",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 5
  },
  editIcon: {
    height: "100%",
    width: "100%",
    borderRadius: 10
  },
  socialProfileContainer: {
    padding: 10,
    height: "100%",
    backgroundColor: "white"
  },

  followingSection: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 20
  },
  socialHeaderContainer: {
    display: "flex",
    flexDirection: "column",
    alignSelf: "center",
    alignItems: "center"
  },
  socialHeaderText: {
    marginTop: 15,
    fontSize: 16,
    fontWeight: "bold"
  },
  headerSubText: {
    marginTop: 5,
    fontSize: 12,
    color: "#C4C4C4"
  },
  postIcon: {
    width: 15,
    height: 15,
    marginBottom: 5,
    shadowColor: "#0000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 1.3,
    shadowRadius: 3.84
  },
  followingIcon: {
    width: 15,
    height: 15,
    marginBottom: 5
  },
  textarea: {
    display: "flex",
    alignItems: "center"
  },
  followingText: {
    fontSize: 14
  },
  pt30: {
    paddingTop: 30
  },
  pt10: {
    paddingTop: 5
  },
  galleryRow: {
    display: "flex"
  },
  postItemView: {
    height: 120,
    width: "33%",
    paddingHorizontal: 3,
    marginVertical: 5
  },
  columnRow: {
    width: "33%"
  },
  smallPostcolumn: {
    height: 120,
    width: "100%",
    padding: 3
  },
  largePost: {
    height: 240,
    width: "67%",
    padding: 3
  },
  // MyFeed
  usernameContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingVertical: 10
  },
  userImageContainer: {
    height: 30,
    width: 30,
    borderRadius: 15,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10
  },
  userImage: {
    height: 15,
    width: 15
  },
  userText: {
    color: "#3B566E"
  },
  userPostImage: {
    height: 200,
    width: "100%",
    borderRadius: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10
  },
  postText: {
    display: "flex",
    justifyContent: "center",
    color: "#6F8BA4",
    marginVertical: 10
  },
  mr10: {
    marginRight: 10
  },
  feedContainer: { padding: 10, height: "100%", backgroundColor: "#FFF" },
  createPostHeader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    padding: 10,
    height: 70
  },
  headerImage: { height: 20, width: 20 },
  feedSearchBar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    // borderBottomWidth: 1,
    // borderBottomColor: "#e6e6e6",
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: "#FFF",
    flex: 1
  },
  feedSearchInput: {
    flex: 1,
    fontSize: 16,
    color: "#000",
    paddingLeft: 10,
    textAlign: "center"
  },
  // Following
  followingUser: {
    marginHorizontal: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: "rgba(0,0,0,0.5)",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    justifyContent: "space-between"
  },
  followingUserMain: {
    flexDirection: "row",
    alignItems: "center"
  },
  followingUserImage: {
    height: 60,
    width: 60,
    borderRadius: 30,
    marginRight: 15,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  followingContainer: {
    flex: 1,
    backgroundColor: "#fff"
  },
  followingSearchView: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#C4C4C4",
    flexDirection: "row",
    alignItems: "center"
  },
  followingSearchBar: {
    padding: 20
  },
  followingSearchText: {
    marginLeft: 10,
    marginBottom: 10
  },
  followingSubheading: {
    marginLeft: 30,
    marginBottom: 10
  },
  frequentAlphabets: {
    height: 50,
    width: "100%",
    backgroundColor: "#DADADA",
    flexDirection: "column",
    justifyContent: "center"
  },
  frequentLetters: {
    marginLeft: 30,
    color: "#8F8D86"
  },
  // Followers
  followerSearchInput: {
    backgroundColor: "#fff",
    height: 53,
    color: "#000",
    borderRadius: 10,
    fontSize: 14,
    paddingHorizontal: 10
  },
  searchFollowerEnd: {
    fontSize: 13,
    color: "#FA060D",
    paddingTop: 8
  },
  follower: {
    marginHorizontal: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: "rgba(0,0,0,0.5)",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    justifyContent: "space-between"
  },
  followerMainView: {
    flexDirection: "row",
    alignItems: "center"
  },
  followerImageView: {
    height: 60,
    width: 60,
    borderRadius: 30,
    marginRight: 15,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  followersContainer: {
    flex: 1,
    backgroundColor: "#fff"
  },
  searchView: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#C4C4C4",
    flexDirection: "row",
    alignItems: "center"
  },
  searchBar: {
    padding: 20
  },
  searchText: {
    marginLeft: 10,
    marginBottom: 10
  },
  followersAmount: {
    marginLeft: 30,
    marginBottom: 10
  },
  frequently: {
    height: 50,
    width: "100%",
    backgroundColor: "#DADADA",
    flexDirection: "column",
    justifyContent: "center"
  },
  frequentlyText: {
    marginLeft: 30,
    color: "#8F8D86"
  },
  // Create Post
  createPostContainer: {
    padding: 10,
    height: "100%",
    backgroundColor: "white"
  },
  captionInput: {
    height: 60,
    borderColor: "gray",
    borderBottomWidth: 1,
    padding: 5,
    marginBottom: 10
  },
  imageLarge: {
    height: 230,
    borderColor: "gray",
    borderRadius: 12,
    borderWidth: 1,
    resizeMode: "contain",
    marginBottom: 10,
    marginTop: 10,
    backgroundColor: "#eee",
    justifyContent: "center"
  },
  AddMoreButton: {
    height: 100,
    width: 100,
    backgroundColor: "gray",
    padding: 5,
    borderRadius: 5,
    marginBottom: 10,
    justifyContent: "center",
    textAlign: "center",
    marginHorizontal: 10
  },
  AddMoreButtonText: {
    color: "white",
    fontSize: 20,
    textAlign: "center"
  },
  inactive: {
    backgroundColor: "gray"
  },
  SubmitPostButton: {
    height: 50,
    width: "100%",
    backgroundColor: "black",
    padding: 5,
    borderRadius: 5,
    justifyContent: "center",
    textAlign: "center",
    marginBottom: 10
  },
  SubmitPostButtonText: {
    color: "white",
    fontSize: 20,
    textAlign: "center"
  },
  image: {
    flex: 1,
    width: "100%",
    height: "100%",
    resizeMode: "contain",
    overflow: "hidden",
    borderRadius: 10
  },
  placeholderImage: { alignSelf: "center", width: 50, height: 42 },
  headerContainer: {
    display: "flex",
    flexDirection: "column",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center"
  },
  headerText: {
    marginTop: 15,
    fontSize: 16,
    fontWeight: "bold"
  },
  smallPost: {
    height: 120,
    width: "33%",
    paddingHorizontal: 3,
    marginVertical: 5
  }
});

// API Authentication token
const USER_TOKEN = "";
// APP's backend url
const BASE_URL = "";

export default {
  title: "App Menu",
  copy: "Routes available",
  styles: styles,
  USER_TOKEN: USER_TOKEN,
  BASE_URL: BASE_URL
};
