import React from "react";
import { Text, View, ImageBackground } from "react-native";
import { useSelector } from "react-redux";
import { styles } from "./styles";

function Article({ route }) {
  const id = route.params?.id;
  const article = useSelector(state =>
    state.Articles.articles[id]
  );

  return (
    <View>
      {article && (
        <View>
          <ImageBackground source={{ uri: article.image }} style={styles.image}>
            <View style={styles.card}>
              <Text style={styles.text}>{article.title}</Text>
              <Text style={styles.author}>{article.author}</Text>
            </View>
          </ImageBackground>
          <Text style={styles.body}>{article.body}</Text>
        </View>
      )}
    </View>
  );
}

export default Article;
