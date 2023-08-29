import { GlobalOptionsContext, OptionsContext } from "@options";
import { useNavigation } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import {
  FlatList,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Divider } from "react-native-elements";
import { Images } from "./assets";
import { FAQItem } from "./FAQItem";
import { faqList, slice } from "./store";

const FAQ = () => {
  const options = useContext(OptionsContext);
  const globalOptions = useContext(GlobalOptionsContext);
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState("");
  const [pageNo, setPageNo] = useState(1);
  const faqData = useSelector((state) => state.Faq);
  const { faq } = faqData;
  const list = faq?.results ?? [];
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(faqList({ baseUrl: globalOptions.url, page: pageNo }));
  }, [pageNo, faqList]);

  const filterList = list.filter(
    (d) =>
      d.question.toLowerCase().includes(searchText.toLowerCase()) ||
      d.answer.toLowerCase().includes(searchText.toLowerCase())
  );

  const searchHandler = (text) => {
    setSearchText(text);
  };

  const searchView = () => {
    return (
      <View style={options.styles.searchSection}>
        <Image
          style={options.styles.searchIcon}
          source={Images.searchIcon}
          resizeMode="contain"
        />
        <TextInput
          style={options.styles.input}
          placeholder="Search here"
          onChangeText={searchHandler}
          placeholderTextColor={options.colors.darkGray}
          value={searchText}
        />
      </View>
    );
  };

  const fetchMoreData = () => {
    if (faq?.next && searchText.length === 0) {
      if (faq.next !== pageNo) setPageNo(faq?.next);
    }
  };

  const _renderItem = ({ item }) => {
    return (
      <FAQItem
        {...item}
        prefixQuestion={faq?.prefix_question}
        prefixAnswer={faq?.prefix_answer}
      />
    );
  };

  const separator = () => {
    return <Divider color={options.colors.darkCharcoal} />;
  };

  return (
    <View style={options.styles.container}>
      <View style={options.styles.heading}>
        <TouchableOpacity
          style={{ padding: 5 }}
          onPress={() => navigation.goBack()}
        >
          <Image
            style={options.styles.backIcon}
            source={Images.backIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <Text style={options.styles.title}>{options.title}</Text>
      </View>
      <FlatList
        data={filterList}
        renderItem={_renderItem}
        keyExtractor={(item) => item.id}
        style={options.styles.list}
        ListHeaderComponent={searchView()}
        onEndReachedThreshold={0.1}
        onEndReached={fetchMoreData}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={separator}
      />
    </View>
  );
};

export default {
  title: "Support & FAQ",
  navigator: FAQ,
  slice
};
