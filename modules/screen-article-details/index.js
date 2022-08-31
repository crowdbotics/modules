import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  TextInput,
  Pressable
} from "react-native";

const ArticleDetails = () => {
  const [comment, setComment] = useState("");
  const [article, setArticle] = useState({});
  const [comments, setComments] = useState([]);
  useEffect(() => {
    setArticle({
      title: "Article name",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa faucibus nisi egestas quis etiam nec feugiat. Scelerisque pellentesque at in accumsan cras tristique at id. At nullam lectus sapien nulla. At egestas cursus elit, tortor mattis gravida ornare proin ipsum. Duis purus turpis libero tristique dignissim.",
      authorName: "Author name",
      authorImage: require("./assets/authorImage.png"),
      image: require("./assets/articleImage.png"),
      date: "Jul 04",
      readTime: "15 min read",
      commentsCount: "1.2k"
    });
    setComments([
      {
        user: {
          name: "Username",
          image: require("./assets/userImage.png")
        },
        comment: "Dueotep Leo semper nunc eget varius et."
      },
      {
        user: {
          name: "Username",
          image: require("./assets/userImage.png")
        },
        comment: "Dueotep Leo semper nunc eget varius et."
      }
    ]);
  }, []);
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.articleContainer}>
          <View style={styles.imageContainer}>
            <Image style={styles.articleImage} source={article.image} />
          </View>
          <View style={styles.heading}>
            <Text style={styles.title}>{article.title}</Text>
            <View style={styles.headingIcons}>
              <Image
                style={styles.icon}
                source={require("./assets/copyIcon.png")}
              />
              <Image
                style={styles.icon}
                source={require("./assets/readIcon.png")}
              />
              <Image
                style={styles.icon}
                source={require("./assets/newIcon.png")}
              />
            </View>
          </View>
          <Text style={styles.articleDescription}>{article.description}</Text>
          <View style={styles.authorContainer}>
            <Image style={styles.authorImage} source={article.authorImage} />
            <View>
              <Text style={styles.authorName}>{article.authorName}</Text>
              <Text style={styles.articleDetails}>
                {article.date} - {article.readTime}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.commentsContainer}>
          <View style={styles.commentsHeader}>
            <Text style={styles.commentsHeaderText}>Comments</Text>
            <View style={styles.headingIcons}>
              <Text>{article.commentsCount}</Text>
              <Image
                style={styles.icon}
                source={require("./assets/commentIcon.png")}
                resizeMode="contain"
              />
            </View>
          </View>
          {comments.map((item, index) => (
            <Comment key={index} comment={item} />
          ))}
          <View style={styles.commentsFooter}>
            <Text style={styles.footerText}>See more</Text>
            <Image
              source={require("./assets/dropdownIcon.png")}
              style={styles.dropdownIcon}
            />
          </View>
        </View>
        <Input
          text="Write comment"
          placeholder="Write a comment"
          value={comment}
          onChangeText={setComment}
          textArea={true}
          containerStyle={styles.inputContainer}
        >
          <Pressable style={styles.button}>
            <Text style={styles.btnText}>Submit</Text>
          </Pressable>
        </Input>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  articleContainer: {
    marginHorizontal: 25,
    marginVertical: 10
  },
  imageContainer: {
    elevation: 5,
    width: 340,
    height: 170,
    shadowColor: "rgba(0,0,0,0.5)",
    backgroundColor: "#fff",
    borderRadius: 10,
    alignSelf: "center"
  },
  articleImage: {
    width: "100%",
    height: "100%",
    borderRadius: 10
  },
  heading: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10
  },
  title: {
    fontSize: 16
  },
  headingIcons: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  icon: {
    width: 15,
    height: 25,
    marginHorizontal: 5,
    resizeMode: "contain"
  },
  articleDescription: {
    fontSize: 13,
    textAlign: "justify"
  },
  authorContainer: {
    flexDirection: "row",
    marginVertical: 10,
    alignItems: "center"
  },
  authorImage: {
    width: 50,
    height: 50,
    marginRight: 15,
    borderRadius: 30
  },
  articleDetails: {
    fontSize: 12
  },
  authorName: {
    fontSize: 18
  },
  commentsContainer: {
    marginHorizontal: 20
  },
  commentsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10
  },
  commentsHeaderText: {
    fontSize: 14,
    color: "#333333",
    textTransform: "uppercase"
  },
  commentsFooter: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center"
  },
  footerText: {
    fontSize: 12,
    color: "#333333"
  },
  dropdownIcon: {
    marginTop: 4,
    height: 15,
    width: 15
  },
  inputContainer: {
    flexDirection: "column",
    justifyContent: "center",
    marginHorizontal: 20
  },
  inputText: {
    fontSize: 14,
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
    height: 100
  },
  button: {
    backgroundColor: "#fff",
    borderRadius: 10,
    borderColor: "#EA4335",
    borderWidth: 1,
    height: 35,
    width: 80,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
    alignSelf: "flex-end"
  },
  btnText: {
    color: "#EA4335"
  }
});

export default ArticleDetails;

const Comment = ({ comment }) => {
  return (
    <View style={commentStyles.commentContainer}>
      <Image style={commentStyles.commentImage} source={comment.user.image} />
      <View style={commentStyles.commentDescription}>
        <View style={commentStyles.usernameContainer}>
          <Text>{comment.user.name}</Text>
          <View style={commentStyles.headingIcons}>
            <Image
              style={commentStyles.icon}
              source={require("./assets/likeIcon.png")}
              resizeMode="contain"
            />
            <Image
              style={commentStyles.icon}
              source={require("./assets/dislikeIcon.png")}
              resizeMode="contain"
            />
            <Image
              style={commentStyles.icon}
              source={require("./assets/redFlagIcon.png")}
              resizeMode="contain"
            />
          </View>
        </View>
        <Text style={commentStyles.commentText}>{comment.comment}</Text>
      </View>
    </View>
  );
};

const commentStyles = StyleSheet.create({
  commentContainer: {
    flexDirection: "row",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e5e5",
    alignItems: "center"
  },
  commentImage: {
    width: 70,
    height: 70,
    marginRight: 15,
    borderRadius: 60
  },
  commentDescription: {
    flex: 1,
    justifyContent: "space-between",
    height: 50
  },
  usernameContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  commentText: {
    color: "#231F20"
  },
  headingIcons: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  icon: {
    width: 20,
    height: 20,
    marginHorizontal: 5,
    resizeMode: "contain"
  }
});
const Input = (props) => {
  return (
    <View style={[inputStyles.inputContainer, props.containerStyle]}>
      {props.text
        ? (
        <Text style={inputStyles.inputText}>{props.text}</Text>
          )
        : null}

      <TextInput
        style={[
          inputStyles.input,
          props.style,
          props.textArea ? inputStyles.textArea : null
        ]}
        placeholder={props.placeholder ? props.placeholder : "Enter"}
        value={props.value}
        onChangeText={(text) => props.onChange(text)}
        placeholderTextColor={
          props.placeholderTextColor ? props.placeholderTextColor : "#9B9B9B"
        }
        editable={props.editable !== false}
        autoCapitalize="none"
        autoCorrect={false}
        multiline={!!props.textArea}
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
    flex: 1
  },
  inputText: {
    fontSize: 14,
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
  textArea: {
    height: 150
  },
  children: {}
});
