import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  textInput: {
    paddingVertical: 4,
    paddingHorizontal: 4
  },
  section: {
    paddingHorizontal: 8,
    paddingVertical: 8,
    marginVertical: 8,
    marginHorizontal: 8,
    backgroundColor: "white",
    borderRadius: 6
  }
});
export const NavigationStyle = StyleSheet.create({
  title: {
    fontSize: 16
  },
  headerRight: {
    marginTop: 5,
    paddingRight: 16
  }
});
export const ListViewStyle = StyleSheet.create({
  container: {
    paddingVertical: 8,
    paddingHorizontal: 8
  },
  title: {
    color: "#333",
    fontSize: 16,
    fontWeight: "600",
    paddingBottom: 4
  },
  subtitle: {
    color: "#3d3d3d",
    fontSize: 16,
    paddingBottom: 4,
    paddingTop: 6
  },
  circle: {
    backgroundColor: "#faa",
    borderRadius: 50,
    width: 50,
    height: 50,
    marginRight: 8
  },
  separator: {
    borderBottomWidth: 0.3,
    borderBottomColor: "lightgrey",
    width: "100%",
    paddingBottom: 12
  }
});

const PUBNUB_PUB = "Your pubnub publish key";
const PUBNUB_SUB = "Your pubnub subscribe key";
const FILESTACK_KEY = "AAPKloXQDQy61KlIW09M6z";

const user = {
  name: "Mark Kelley",
  _id: "user_a00001",
  avatar: "https://randomuser.me/api/portraits/men/1.jpg"
};

export const users = [
  {
    name: "Anna Gordon",
    _id: "user_a00002",
    avatar: "https://randomuser.me/api/portraits/women/1.jpg"
  },
  {
    name: "Luis Griffin",
    _id: "user_a00003",
    avatar: "https://randomuser.me/api/portraits/men/2.jpg"
  },
  {
    name: "Sue Flores",
    _id: "user_a00004",
    avatar: "https://randomuser.me/api/portraits/women/2.jpg"
  }
];

export default {
  PUBNUB_SUB: PUBNUB_SUB,
  PUBNUB_PUB: PUBNUB_PUB,
  ENDPOINT: "https://www.filestackapi.com/api",
  FILESTACK_KEY: FILESTACK_KEY,
  ListViewStyle: ListViewStyle,
  NavigationStyle: NavigationStyle,
  user: user,
  users: users,
  styles: styles
};
