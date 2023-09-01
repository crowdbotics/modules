import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  hr: {
    marginTop: 20,
    marginBottom: 20,
    borderBottomColor: "black",
    borderBottomWidth: 1,
  },
  container: {
    flex: 1,
    height: 100,
    padding: 13,
  },
  selectedSheet: { flex: 1, borderRadius: 11 },
  //Followers
  followerSearchInput: {
    backgroundColor: "#fff",
    height: 53,
    color: "#000",
    borderRadius: 10,
    fontSize: 14,
    paddingHorizontal: 10,
  },
  searchFollowerEnd: {
    fontSize: 13,
    color: "#FA060D",
    paddingTop: 8,
  },
  follower: {
    marginHorizontal: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: "rgba(0,0,0,0.5)",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    justifyContent: "space-between",
  },
  followerMainView: {
    flexDirection: "row",
    alignItems: "center",
  },
  followerImageView: {
    height: 60,
    width: 60,
    borderRadius: 30,
    marginRight: 15,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  followersContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  searchView: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#C4C4C4",
    flexDirection: "row",
    alignItems: "center",
  },
  searchBar: {
    padding: 20,
  },
  searchText: {
    marginLeft: 10,
    marginBottom: 10,
  },
  followersAmount: {
    marginLeft: 30,
    marginBottom: 10,
  },
  frequently: {
    height: 50,
    width: "100%",
    backgroundColor: "#DADADA",
    flexDirection: "column",
    justifyContent: "center",
  },
  frequentlyText: {
    marginLeft: 30,
    color: "#8F8D86",
  },
  // Create Post
  createPostContainer: {
    padding: 10,
    height: "100%",
    backgroundColor: "white",
  },
  captionInput: {
    height: 60,
    borderColor: "gray",
    borderBottomWidth: 1,
    padding: 5,
    marginBottom: 10,
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
    justifyContent: "center",
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
    marginHorizontal: 10,
  },
  AddMoreButtonText: {
    color: "white",
    fontSize: 20,
    textAlign: "center",
  },
  inactive: {
    backgroundColor: "gray",
  },
  SubmitPostButton: {
    height: 50,
    width: "100%",
    backgroundColor: "black",
    padding: 5,
    borderRadius: 5,
    justifyContent: "center",
    textAlign: "center",
    marginBottom: 10,
  },
  SubmitPostButtonText: {
    color: "white",
    fontSize: 20,
    textAlign: "center",
  },
  image: {
    flex: 1,
    width: "100%",
    height: "100%",
    resizeMode: "contain",
    overflow: "hidden",
    borderRadius: 10,
  },
  placeholderImage: { alignSelf: "center", width: 50, height: 42 },
  headerContainer: {
    display: "flex",
    flexDirection: "column",
    alignSelf: "center",
    alignItems: "center",
  },
  headerText: {
    marginTop: 15,
    fontSize: 16,
    fontWeight: "bold",
  },
  headerSubText: {
    marginTop: 5,
    fontSize: 12,
    color: "#C4C4C4",
  },
  postIcon: {
    width: 15,
    height: 15,
    marginBottom: 5,

    shadowColor: "#0000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1.3,
    shadowRadius: 3.84,
  },
  followingIcon: {
    width: 15,
    height: 15,
    marginBottom: 5,
  },
  textarea: {
    display: "flex",
    alignItems: "center",
  },
  followingText: {
    fontSize: 14,
  },
  pt30: {
    paddingTop: 30,
  },
  pt10: {
    paddingTop: 5,
  },
  galleryRow: {
    display: "flex",
  },
  smallPost: {
    height: 120,
    width: "33%",
    paddingHorizontal: 3,
    marginVertical: 5,
  },
  columnRow: {
    width: "33%",
  },
  smallPostcolumn: {
    height: 120,
    width: "100%",
    padding: 3,
  },
  largePost: {
    height: 240,
    width: "67%",
    padding: 3,
  },
});

const USER_TOKEN = "d73f809b5ba4b09d2d5b64a81045c8fe2aceae53";

export const localOptions = {
  USER_TOKEN: USER_TOKEN,
};

export default {
  title: "App Menu",
  copy: "Routes available",
  styles: styles,
  localOptions: localOptions,
};
