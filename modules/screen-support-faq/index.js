import React, { Fragment } from "react";
import { Text, View, TextInput, Image, ScrollView, StyleSheet } from "react-native";

const FAQList = [{
  title: "FAQ Information",
  data: [
    "Varius tincidunt.",
    "Volutpat euismod ut tempus.",
    "Et nulla quis nullam dui.",
    "Eget gravida tellus molestie."]
}, {
  title: "Diam proin at.",
  data: []
}, {
  title: "Aliquam ut habitant.",
  data: []
}, {
  title: "Eget nibh massa.",
  data: []
}, {
  title: "Interdum ut cursus.",
  data: []
}];

const SupportFaq = () => {
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.topHead}>
          <Text style={styles.mainHeading}>Support & FAQ</Text>
        </View>
        <View style={styles.searchArea}>
          <View style={styles.searchInput}>
            <Image style={styles.searchIcon} source={require("./assets/searchIcon.png")} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search here"
            />
          </View>
        </View>

        <Accordion />

      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  topHead: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  mainHeading: {
    fontSize: 22
  },
  container: {
    padding: 20,
    backgroundColor: "#fff"
  },
  searchArea: {
    marginTop: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  searchInput: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F6F6F6",
    height: 40,
    borderRadius: 10,
    margin: 10,
    width: "70%"
  },
  searchIcon: {
    margin: 5,
    marginLeft: 7,
    height: 13,
    width: 13,
    resizeMode: "stretch",
    alignItems: "center"
  }
});

export default SupportFaq;

const Accordion = () => {
  return <Fragment>
    {
      FAQList.map((FAQ, index) => (
        <View key={index} style={accordionStyles.faqCard}>
          <View style={accordionStyles.faqsection}>
            <Text style={accordionStyles.subHeading}>{FAQ.title}</Text>
            <Image style={accordionStyles.downIcon} resizeMode="contain" source={ require("./assets/chevrondown.png")} />
          </View>
          {
            FAQ.data.map((item, i) => (
              <View key={i} style={accordionStyles.accordian}>
                <View style={accordionStyles.accordianlist}>
                  <Image style={accordionStyles.arrowIcon} resizeMode="contain" source={require("./assets/arrow.png")} />
                  <Text style={accordionStyles.smallHeading}>{item}</Text>
                </View>
              </View>
            ))
          }

        </View>
      ))
    }
  </Fragment>;
};

const accordionStyles = StyleSheet.create({
  faqCard: {
    display: "flex",
    height: "auto",
    marginHorizontal: 10,
    marginTop: 30,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "white",
    shadowColor: "lightgray",
    elevation: 5
  },
  faqsection: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 12
  },
  subHeading: {
    fontSize: 16,
    color: "#231F20",
    fontWeight: "bold"
  },
  accordian: {
    marginTop: 10
  },
  accordianlist: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5
  },
  arrowIcon: {
    height: 13,
    width: 8,
    margin: 5
  },
  smallHeading: {
    fontSize: 12,
    color: "#231F20"
  },
  downIcon: {
    height: 12,
    width: 12
  }
});
