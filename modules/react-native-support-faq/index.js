import * as React from 'react';
import { Text, View, TextInput, Image, ScrollView } from 'react-native';
import Accordion from './components/Accordion';
import options from "./options";
// @ts-ignore
import searchIcon from "./searchIcon.png";

const SupportFaq = () => {
  return (
    <ScrollView>
      <View style={options.styles.container}>
        <View style={options.styles.topHead}>
          <Text style={options.styles.mainHeading}>Support & FAQ</Text>
        </View>
        <View style={options.styles.searchArea}>
          <View style={options.styles.searchInput}>
            <Image style={options.styles.searchIcon} source={searchIcon} />
            <TextInput
              style={options.styles.searchInput}
              placeholder="Search here"
            />
          </View>
        </View>

        <Accordion />

      </View>
    </ScrollView>
  );
}

export default {
  title: "Support & Faq",
  navigator: SupportFaq
}
