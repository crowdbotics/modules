import React, { Component } from 'react';
import {
  Text,
  FlatList,
  View,
  TouchableOpacity,
  ImageBackground
} from 'react-native';
import { styles } from "./styles";
import { connect } from "react-redux";
import reducer from "./store/reducers"
import { article_list } from "./store/actions";

class ArticleList extends Component {
  componentDidMount() {
    this.props.load();
  }

  renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        this.props.navigation.navigate(this.props.detail, { id: item.id })
      }}>
      <ImageBackground source={{ uri: item.image }} style={styles.image}>
        <View style={styles.card}>
          <Text style={styles.text}>
            {item.title}
          </Text>
          <Text style={styles.author}>
            {item.author}
          </Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );

  render() {
    const { articles } = this.props;
    return (
      <FlatList
        data={articles}
        renderItem={this.renderItem}
        keyExtractor={item => `${item.id}`}
      />
    );

  }
}

const mapStateToProps = (state, ownProps) => {
  const detail = ownProps.navigation.getParam("detail", "Article");

  return {
    detail: detail,
    articles: state.articlesReducer.articles,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    load: () => dispatch(article_list())
  }
}

export default {
  name: "Articles",
  screen: connect(mapStateToProps, mapDispatchToProps)(ArticleList),
  reducer: reducer,
  actions: [article_list]
}
