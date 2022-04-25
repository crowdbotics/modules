import * as React from 'react';
import { Text, View, TextInput, Image, ScrollView } from 'react-native';
import options from "./options";
// @ts-ignore
import searchIcon from "./searchIcon.png";
// @ts-ignore
import chevronDown from "./chevrondown.png";
// @ts-ignore
import arrow from "./arrow.png";

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

        {
          options.FAQList.map((FAQ, index) => (
            <View key={index} style={options.styles.faqCard}>
              <View style={options.styles.faqsection}>
                <Text style={options.styles.subHeading}>{FAQ.title}</Text>
                <Image style={options.styles.downIcon} resizeMode="contain" source={chevronDown} />
              </View>
              {
                FAQ.data.map((item, i) => (
                  <View key={i} style={options.styles.accordian}>
                    <View style={options.styles.accordianlist}>
                      <Image style={options.styles.arrowIcon} resizeMode="contain" source={arrow} />
                      <Text style={options.styles.smallHeading}>{item}</Text>
                    </View>
                  </View>
                ))
              }

            </View>
          ))
        }

      </View>
    </ScrollView>
  );
}

export default {
  title: "Support & Faq",
  navigator: SupportFaq
}
