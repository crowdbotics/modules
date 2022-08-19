import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  FlatList
} from "react-native";

const CourseCategoryList = () => {
  const [search, setSearch] = useState("");
  const [courseList, setCourseList] = useState([]);
  useEffect(() => {
    setCourseList([
      {
        id: 1,
        name: "Course Name",
        description: "Web Design for Beginners",
        enrolledCount: 48,
        rating: 4.7,
        isfavorite: false,
        image: require("./assets/courseThumbnail1.png")
      },
      {
        id: 2,
        name: "Course Name",
        description: "Web Design for Beginners",
        enrolledCount: 48,
        rating: 4.7,
        isfavorite: true,
        image: require("./assets/courseThumbnail2.png")
      },
      {
        id: 3,
        name: "Course Name",
        description: "Web Design for Beginners",
        enrolledCount: 48,
        rating: 4.7,
        isfavorite: true,
        image: require("./assets/courseThumbnail1.png")
      },
      {
        id: 4,
        name: "Course Name",
        description: "Web Design for Beginners",
        enrolledCount: 48,
        rating: 4.7,
        isfavorite: true,
        image: require("./assets/courseThumbnail2.png")
      },
      {
        id: 5,
        name: "Course Name",
        description: "Web Design for Beginners",
        enrolledCount: 48,
        rating: 4.7,
        isfavorite: true,
        image: require("./assets/courseThumbnail1.png")
      },
      {
        id: 6,
        name: "Course Name",
        description: "Web Design for Beginners",
        enrolledCount: 48,
        rating: 4.7,
        isfavorite: true,
        image: require("./assets/courseThumbnail2.png")
      }
    ]);
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Input
          text={"Search"}
          value={search}
          onChange={x => setSearch(x)}
          icon={require("./assets/searchBarIcon.png")}
        />
      </View>
      <View style={styles.separator}>
        <Text style={styles.separatorText}>Design and User Experience</Text>
        <Image source={require("./assets/filterIcon.png")} />
      </View>
      <FlatList
        style={styles.courseList}
        data={courseList}
        renderItem={({ item }) => <Course course={item} />}
        numColumns={2}
        keyExtractor={item => item.id.toString()}
        columnWrapperStyle={styles.columnWrapper}
      />
      <Footer
        images={[
          require("./assets/homeIconActive.png"),
          require("./assets/starIcon.png"),
          require("./assets/searchIcon.png"),
          require("./assets/settingsIcon.png"),
          require("./assets/bellIcon.png")
        ]}
        active={3}
        hideTitle={true}
      />
    </View>
  );
};

const Course = ({ course }) => {
  return (
    <View style={courseStyles.container}>
      <Image source={course.image} style={styles.courseImage} />
      <Text style={courseStyles.name}>{course.name}</Text>
      <Text style={courseStyles.description}>{course.description}</Text>
      <View style={courseStyles.enrolledInfoContainer}>
        <Image source={require("./assets/enrolledUsers.png")} />
        <Text style={courseStyles.enrolledInfoText}>
          {course.enrolledCount} enrolled
        </Text>
      </View>
      {course.isfavorite
        ? (
        <Image
          source={require("./assets/favIcon.png")}
          style={courseStyles.favIcon}
        />
          )
        : null}
      <Text style={courseStyles.rating}>{course.rating}</Text>
    </View>
  );
};

const courseStyles = StyleSheet.create({
  container: {
    marginBottom: 10
  },
  name: {
    fontSize: 14,
    marginVertical: 5,
    fontWeight: "bold"
  },
  description: {
    fontSize: 12,
    color: "#B6B6B6",
    marginBottom: 5
  },
  enrolledInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5
  },
  enrolledInfoText: {
    fontSize: 12,
    color: "#27AE60",
    marginLeft: 5
  },
  favIcon: {
    position: "absolute",
    left: 10,
    top: 10
  },
  rating: {
    position: "absolute",
    top: 10,
    right: 10,
    fontSize: 10,
    color: "#000",
    backgroundColor: "#FFD500",
    paddingHorizontal: 5,
    paddingVertical: 1,
    borderRadius: 50
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  heading: {
    fontSize: 20
  },
  searchContainer: {
    paddingHorizontal: 20
  },
  separator: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  separatorText: {
    fontSize: 18,
    color: "#22292E"
  },
  courseList: {
    flex: 1,
    marginBottom: 60
  },
  columnWrapper: {
    justifyContent: "space-around"
  }
});

export default CourseCategoryList;

const Footer = props => {
  const generator = props.hideTitle ? props.images : props.titles;
  return (
    <View style={footerStyles.footer}>
      {generator.map((title, index) => (
        <View style={footerStyles.footerItem} key={index}>
          <Image
            style={footerStyles.footerImage}
            source={props.images[index]}
          />
          {props.hideTitle
            ? null
            : (
            <Text
              style={[
                footerStyles.footerItemText,
                index === props.active ? footerStyles.active : null
              ]}>
              {title}
            </Text>
              )}
        </View>
      ))}
    </View>
  );
};

const footerStyles = StyleSheet.create({
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: "#C4C4C4",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20
  },
  footerItem: {
    alignItems: "center",
    justifyContent: "center",
    height: "100%"
  },
  footerItemText: {
    fontSize: 13,
    color: "#fff",
    marginTop: 5
  },
  footerImage: {
    width: 20,
    height: 20,
    resizeMode: "contain"
  },
  active: {
    color: "#000"
  }
});

const Input = props => {
  return (
    <View style={inputStyles.inputContainer}>
      {props.text
        ? (
        <Text style={inputStyles.inputText}>{props.text}</Text>
          )
        : null}

      <TextInput
        style={inputStyles.input}
        placeholder={props.placeholder ? props.placeholder : "Enter"}
        value={props.value}
        onChangeText={text => props.onChange(text)}
        placeholderTextColor={
          props.placeholderTextColor ? props.placeholderTextColor : "#9B9B9B"
        }
        editable={props.editable !== false}
        autoCapitalize="none"
        autoCorrect={false}
      />
      {props.errorText
        ? (
        <Text style={inputStyles.error}>{props.errorText}</Text>
          )
        : null}
      {props.icon
        ? (
        <Image
          source={props.icon}
          style={
            props.text ? inputStyles.iconWithText : inputStyles.iconWithoutText
          }
        />
          )
        : null}
      <View style={styles.children}>{props.children}</View>
    </View>
  );
};

const inputStyles = StyleSheet.create({
  inputContainer: {
    flexDirection: "column",
    justifyContent: "center",
    marginHorizontal: 5
  },
  inputText: {
    fontSize: 16,
    marginLeft: 20,
    color: "#111112"
  },
  input: {
    borderWidth: 1,
    borderColor: "#e6e6e6",
    borderRadius: 10,
    padding: 10,
    paddingLeft: 20,
    marginVertical: 10,
    width: "100%",
    height: 50
  },
  iconWithText: {
    position: "absolute",
    right: 30,
    top: 50
  },
  iconWithoutText: {
    position: "absolute",
    right: 30,
    top: 28
  },
  children: {}
});
