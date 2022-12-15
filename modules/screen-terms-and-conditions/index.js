import React, { useState, useEffect } from "react";
import { Text, StyleSheet, View, ScrollView } from "react-native";

const TermsAndConditionsScreen = (params) => {
  const [lastUpdated, setLastUpdated] = useState(null);
  const [firstPara, setFirstPara] = useState(null);
  const [secondPara, setSecondPara] = useState(null);
  const [thirdPara, setThirdPara] = useState(null);
  useEffect(() => {
    setLastUpdated("dd/mm//yyyy");
    setFirstPara(
      "I understand that uses my dolor sit amet, consectetur adipiscing elit. Viverra auctor laoreet sodales congue sit volutpat quisque. Mattis nisl in convallis sed et. Est turpis aliquam est, ut mattis nisi, amet feugiat. Aliquet odio consequat, nisl mauris ullamcorper malesuada velit sem dolor. Dui morbi porttitor integer felis, pellentesque quam. Et accumsan justo, massa tincidunt arcu fermentum est. Sed nibh id vel, diam ut feugiat nec, placerat mauris. Neque lorem netus lacinia elit est libero sed. Commodo viverra et, neque augue augue mauris, nunc ut nec."
    );
    setSecondPara(
      "I understand that uses my dolor sit amet, consectetur adipiscing elit. Viverra auctor laoreet sodales congue sit volutpat quisque. Mattis nisl in convallis sed et. Est turpis aliquam est, ut mattis nisi, amet feugiat. Aliquet odio consequat, nisl mauris ullamcorper malesuada velit sem dolor. Dui morbi porttitor integer felis, pellentesque quam. Et accumsan justo, massa tincidunt arcu fermentum est. Sed nibh id vel, diam ut feugiat nec, placerat mauris. Neque lorem netus lacinia elit est libero sed. Commodo viverra et, neque augue augue mauris, nunc ut nec."
    );
    setThirdPara(
      "I understand that uses my dolor sit amet, consectetur adipiscing elit. Viverra auctor laoreet sodales congue sit volutpat quisque. Mattis nisl in convallis sed et. Est turpis aliquam est, ut mattis nisi, amet feugiat. Aliquet odio consequat, nisl mauris ullamcorper malesuada velit sem dolor. Dui morbi porttitor integer felis, pellentesque quam. Et accumsan justo, massa tincidunt arcu fermentum est. Sed nibh id vel, diam ut feugiat nec, placerat mauris. Neque lorem netus lacinia elit est libero sed. Commodo viverra et, neque augue augue mauris, nunc ut nec."
    );
  }, []);
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.lastUpdated}>
          <Text style={styles.bold}>Last Updated:</Text>
          <Text style={styles.bold}>{lastUpdated}</Text>
        </View>
        <View style={styles.policyContainer}>
          <Text style={styles.policyText}>{firstPara}</Text>
        </View>
        <View style={styles.policyContainer}>
          <Text style={styles.policyText}>{secondPara}</Text>
        </View>
        <View style={styles.policyContainer}>
          <Text style={styles.policyText}>{thirdPara}</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    paddingHorizontal: 30
  },
  lastUpdated: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  bold: {
    fontWeight: "bold"
  },
  policyContainer: {
    marginTop: 10
  },
  policyText: {
    lineHeight: 20,
    textAlign: "justify"
  }
});
export default TermsAndConditionsScreen;
