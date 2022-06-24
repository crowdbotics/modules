import { GlobalOptionsContext, OptionsContext } from "@options";
import { useNavigation } from "@react-navigation/native";
import React, { useCallback, useContext, useEffect, useState } from "react";
import {
  FlatList, Image, Text, TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Images } from "./assets";
import constants from "./constants";
import { FAQItem } from "./FAQItem";
import { faqList, slice } from "./store";

const FAQ = () => {
  const options = useContext(OptionsContext);
  const globalOptions = useContext(GlobalOptionsContext);
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState("");
  const [pageNo, setPageNo] = useState(1);
  const faqData = useSelector(state => state.Faq);
  const { faq, api } = faqData;
  const list = faq?.results ?? [];
  const [filteredList, setFilteredList] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(faqList({ baseUrl: globalOptions.url, page: pageNo }));
  }, [pageNo, faqList]);

  useEffect(() => {
    if (api.loading == constants.LOADING_IDLE) {
      setFilteredList(list)
    }
  }, [faqData])

  const searchHandler = useCallback((text) => {
    const newList = list.filter(d => d.question.toLowerCase().includes(text.toLowerCase()))
    setFilteredList(newList);
    setSearchText(text);
  }, [list, setFilteredList, setSearchText]);

  const searchView = useCallback(() => {
    return (
      <View style={options.styles.searchSection}>
        <Image style={options.styles.searchIcon} source={Images.searchIcon}
          resizeMode='contain' />
        <TextInput
          style={options.styles.input}
          placeholder="Search here"
          onChangeText={searchHandler}
          placeholderTextColor={options.colors.darkGray}
          value={searchText}
        />
      </View>
    );
  }, [searchHandler, searchText]);

  const fetchMoreData = () => {
    if (faq?.next && searchText.length === 0) {
      console.log(faq?.next);
      if (faq.next != pageNo)
        setPageNo(faq?.next);
    }
  }

  const _renderItem = useCallback(
    ({ item }) => {
      return <FAQItem {...item}
        prefixQuestion={faq?.prefix_question}
        prefixAnswer={faq?.prefix_answer}
        isExpanded={faq?.isExpanded} />
    }
    , [faq]);


  return (
    <View style={options.styles.container}>
      <View style={options.styles.heading}>
        <TouchableOpacity style={{ padding: 5 }} onPress={() => navigation.goBack()}>
          <Image style={options.styles.backIcon} source={Images.backIcon} resizeMode='contain' />
        </TouchableOpacity>
        <Text style={options.styles.title}>{options.title}</Text>
      </View>
      <FlatList
        data={filteredList}
        renderItem={_renderItem}
        keyExtractor={item => item.id}
        style={options.styles.list}
        ListHeaderComponent={searchView()}
        onEndReachedThreshold={0.1}
        onEndReached={fetchMoreData}
        showsVerticalScrollIndicator={false} />
    </View>
  );
}

export default {
  title: "Support & FAQ",
  navigator: FAQ,
  slice
};