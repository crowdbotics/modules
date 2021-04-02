import React from 'react';
import { Text, View, ImageBackground } from 'react-native';
import { connect } from "react-redux";
import { styles } from "./styles";

function Article(props) {
  return (
    <View>
      <ImageBackground source={{ uri: props.article.image }} style={styles.image}>
        <View style={styles.card}>
          <Text style={styles.text}>
            {props.article.title}
          </Text>
          <Text style={styles.author}>
            {props.article.author}
          </Text>
        </View>
      </ImageBackground>
      <Text style={styles.body}>
        {props.article.body}
      </Text>
    </View>
  );
}

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.navigation.getParam("id", null);

  return {
    article: state.articlesReducer.articles.find(record => record.id == id)
  }
}

const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(Article)
