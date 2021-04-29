import React, { useEffect } from "react"
import {
  Text,
  FlatList,
  View,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView
} from "react-native"
import { styles } from "./styles"
import { slice, article_list } from "./store"
import { useSelector, useDispatch } from "react-redux"
import { createStackNavigator } from "@react-navigation/stack"
import Article from "./article"

const ArticlesList = ({ route, navigation }) => {
  const detail = route.params?.detail || "Article"
  const articles = useSelector(state =>
    Object.entries(state.Articles.articles).map(([, entry]) => entry)
  )
  const dispatch = useDispatch()

  useEffect(async () => {
    dispatch(article_list()).catch(e => console.log(e.message))
  }, [detail])

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate(detail, { id: item.id })
      }}
    >
      <ImageBackground source={{ uri: item.image }} style={styles.image}>
        <View style={styles.card}>
          <Text style={styles.text}>{item.title}</Text>
          <Text style={styles.author}>{item.author}</Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  )

  return (
    <SafeAreaView>
      <FlatList
        data={articles}
        renderItem={renderItem}
        keyExtractor={item => `${item.id}`}
      />
    </SafeAreaView>
  )
}

const Stack = createStackNavigator()

const ArticlesNavigator = () => (
  <Stack.Navigator headerMode="none" initialRouteName="Articles">
    <Stack.Screen name="Articles" component={ArticlesList} />
    <Stack.Screen name="Article" component={Article} />
  </Stack.Navigator>
)

export default {
  title: "Articles",
  navigator: ArticlesNavigator,
  slice
}
