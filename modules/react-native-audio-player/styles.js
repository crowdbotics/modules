import { StyleSheet } from "react-native";

const circleStyle = (heightWidth) => ({
  borderRadius: heightWidth / 2,
  width: heightWidth,
  height: heightWidth,
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    backgroundColor: "#EAEAEC"
  },
  itemStyle: {
    marginTop: 5,
    paddingHorizontal: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "stretch",
    height: 70,
    borderBottomColor: "#333",
    borderWidth: 0,
    backgroundColor: "#172244",
    marginHorizontal: 10,
    borderRadius: 10

  },
  trackImgBox: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center"
  },
  trackDescBox: {
    flex: 5,
    paddingLeft: 10,
    marginLeft: 10,
    borderRadius: 5,
    display: "flex"
  },
  trackImg: {
    ...circleStyle(50)
  },
  titleBox: {
    flex: 2,
    justifyContent: "flex-end",
    alignItems: "flex-start"
  },
  subTitleBox: {
    flex: 2,
    justifyContent: "flex-start",
    alignItems: "flex-start"
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff"
  },
  subTitle: {
    fontSize: 15,
    color: "#fff"
  },
  listBox: {
    height: "100%"
  },
  playerBox: {
    position: "absolute",
    zIndex: 10,
    height: "50%",
    width: "100%",
    bottom: 0
  }
});

export default styles;
