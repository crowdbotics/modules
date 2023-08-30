import React from "react";

import ImgBackUrl from "./assets/back.png";

import ImgChessUrl from "./assets/chess.png";

import ImgDownUrl from "./assets/down.png";

import ImgGrayStarUrl from "./assets/gray-star.png";

import ImgMiniStarUrl from "./assets/mini-star.png";

import ImgNotiUrl from "./assets/noti.png";

import ImgStarUrl from "./assets/star.png";

import ImgTimerUrl from "./assets/timer.png";

import ImgUserUrl from "./assets/user.png";

import { Text, StyleSheet, View, Image, ScrollView, TextInput } from "react-native";

const BusinessReviewsRatingsScreen = () => {
  const ImgBack = Image.resolveAssetSource(ImgBackUrl).uri;
  const ImgChess = Image.resolveAssetSource(ImgChessUrl).uri;
  const ImgDown = Image.resolveAssetSource(ImgDownUrl).uri;
  const ImgGrayStar = Image.resolveAssetSource(ImgGrayStarUrl).uri;
  const ImgMiniStar = Image.resolveAssetSource(ImgMiniStarUrl).uri;
  const ImgNoti = Image.resolveAssetSource(ImgNotiUrl).uri;
  const ImgStar = Image.resolveAssetSource(ImgStarUrl).uri;
  const ImgTimer = Image.resolveAssetSource(ImgTimerUrl).uri;
  const ImgUser = Image.resolveAssetSource(ImgUserUrl).uri;

  return (
    <ScrollView style={styles.mainContainer}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Image source={{ uri: ImgBack }} style={styles.back} />
          <Text style={styles.heading}>Reviews/Ratings</Text>
          <Text />
        </View>
        <Text style={styles.subHeading}>Average guest review</Text>
        <View style={styles.starsReviewSection}>
          <View style={styles.subSection}>
            <Text style={styles.sectionText}>Stars</Text>
            <View style={styles.starContainer}>
              <Image source={{ uri: ImgMiniStar }} style={styles.star} />
              <Image source={{ uri: ImgMiniStar }} style={styles.star} />
              <Image source={{ uri: ImgMiniStar }} style={styles.star} />
              <Image source={{ uri: ImgMiniStar }} style={styles.star} />
              <Image source={{ uri: ImgMiniStar }} style={styles.lastStar} />
            </View>
          </View>
          <Text style={styles.rating}>4.0</Text>
        </View>
        <View style={styles.starsReviewSection1}>
          <View style={styles.subSection}>
            <Text style={styles.reviewText}>Reviews</Text>
            <View style={styles.aveContainer}>
              <Text>4.4</Text>
              <Text style={styles.aveLabel}>average</Text>
            </View>
          </View>
          <Image source={{ uri: ImgDown }} style={styles.downImg} />
        </View>

        <View style={styles.reviewsStarWrapper}>
          <Text style={styles.starReview1}>1 Star reviews</Text>
          <View style={styles.reviewsStarContainer}>
            <View style={styles.starsContainer}>
              <Image source={{ uri: ImgStar }} style={styles.reviewStar} />
              <Image source={{ uri: ImgGrayStar }} style={styles.reviewStar} />
              <Image source={{ uri: ImgGrayStar }} style={styles.reviewStar} />
              <Image source={{ uri: ImgGrayStar }} style={styles.reviewStar} />
              <Image source={{ uri: ImgGrayStar }} style={styles.reviewStar} />
            </View>
            <Text style={styles.reviewStarText}>Poor</Text>
          </View>
          <Text style={styles.starReview1}>2 Star reviews</Text>
          <View style={styles.reviewsStarContainer}>
            <View style={styles.starsContainer}>
              <Image source={{ uri: ImgStar }} style={styles.reviewStar} />
              <Image source={{ uri: ImgStar }} style={styles.reviewStar} />
              <Image source={{ uri: ImgGrayStar }} style={styles.reviewStar} />
              <Image source={{ uri: ImgGrayStar }} style={styles.reviewStar} />
              <Image source={{ uri: ImgGrayStar }} style={styles.reviewStar} />
            </View>
            <Text style={styles.reviewStarText}>Bad</Text>
          </View>
          <Text style={styles.starReview1}>3 Star reviews</Text>
          <View style={styles.reviewsStarContainer}>
            <View style={styles.starsContainer}>
              <Image source={{ uri: ImgStar }} style={styles.reviewStar} />
              <Image source={{ uri: ImgStar }} style={styles.reviewStar} />
              <Image source={{ uri: ImgStar }} style={styles.reviewStar} />
              <Image source={{ uri: ImgGrayStar }} style={styles.reviewStar} />
              <Image source={{ uri: ImgGrayStar }} style={styles.reviewStar} />
            </View>
            <Text style={styles.reviewStarText}>Good</Text>
          </View>
          <Text style={styles.starReview1}>4 Star reviews</Text>
          <View style={styles.reviewsStarContainer}>
            <View style={styles.starsContainer}>
              <Image source={{ uri: ImgStar }} style={styles.reviewStar} />
              <Image source={{ uri: ImgStar }} style={styles.reviewStar} />
              <Image source={{ uri: ImgStar }} style={styles.reviewStar} />
              <Image source={{ uri: ImgStar }} style={styles.reviewStar} />
              <Image source={{ uri: ImgGrayStar }} style={styles.reviewStar} />
            </View>
            <Text style={styles.reviewStarText}>Very good</Text>
          </View>
          <Text style={styles.starReview1}>5 Star reviews</Text>
          <View style={styles.reviewsStarContainer}>
            <View style={styles.starsContainer}>
              <Image source={{ uri: ImgStar }} style={styles.reviewStar} />
              <Image source={{ uri: ImgStar }} style={styles.reviewStar} />
              <Image source={{ uri: ImgStar }} style={styles.reviewStar} />
              <Image source={{ uri: ImgStar }} style={styles.reviewStar} />
              <Image source={{ uri: ImgStar }} style={styles.reviewStar} />
            </View>
            <Text style={styles.reviewStarText}>Excellent</Text>
          </View>
        </View>
        <Text style={styles.text}>Username</Text>
        <View style={[styles.textInput, { marginBottom: 10 }]}>
          <Input placeholder='Enter' />
        </View>
        <Text style={styles.mr10}>User review</Text>
        <View style={[styles.textInput, { height: 150 }]}>
          <Input placeholder="Enter" multiline={true} />
        </View>
        <Text style={styles.starReview1}>User star review</Text>
        <View style={styles.reviewsStarContainer}>
          <View style={styles.starsContainer}>
            <Image source={{ uri: ImgStar }} style={styles.reviewStar} />
            <Image source={{ uri: ImgStar }} style={styles.reviewStar} />
            <Image source={{ uri: ImgStar }} style={styles.reviewStar} />
            <Image source={{ uri: ImgStar }} style={styles.reviewStar} />
            <Image source={{ uri: ImgGrayStar }} style={styles.reviewStar} />
          </View>
          <Text style={styles.reviewStarText}>Very good</Text>
        </View>

      </View>
      <View style={styles.bottom}>
        <Image source={{ uri: ImgChess }} style={styles.bottomImg} />
        <Image source={{ uri: ImgTimer }} style={styles.bottomImg} />
        <Image source={{ uri: ImgNoti }} style={styles.bottomImg} />
        <Image source={{ uri: ImgUser }} style={styles.bottomImg} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainContainer: { backgroundColor: "#FFF" },
  container: {
    flex: 1,
    marginHorizontal: 10
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 30,
    marginTop: 15,
    marginBottom: 40
  },
  back: { width: 11.25, height: 20, resizeMode: "contain", marginLeft: -20 },
  heading: { fontSize: 16, color: "#000" },
  subHeading: {
    fontSize: 14,
    fontWeight: "500",
    marginHorizontal: 10,
    marginTop: 10,
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
    paddingBottom: 10
  },
  starsReviewSection: {
    marginHorizontal: 3,
    paddingHorizontal: 7,
    borderRadius: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
    paddingBottom: 15,
    marginBottom: 20
  },

  starsReviewSection1: {
    marginHorizontal: 10,
    borderRadius: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 15,
    marginBottom: 20,
    paddingHorizontal: 3
  },
  subSection: {
    display: "flex",
    flexDirection: "column"
  },
  sectionText: {
    fontSize: 22,
    fontWeight: "400",
    marginBottom: 5
  },
  starContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "55%"
  },
  rating: {
    marginRight: 10,
    fontSize: 26,
    fontWeight: "600"
  },
  star: { height: 16.7, width: 17.49 },
  lastStar: { height: 16.7, width: 17.49, opacity: 0.4 },
  aveContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "38%"
  },
  reviewText: {
    fontSize: 18,
    fontWeight: "400",
    marginBottom: 5
  },
  aveLabel: { fontSize: 14, color: "#7C7C7C" },
  downImg: { height: 15, width: 12, marginRight: 10, resizeMode: "contain" },
  reviewsStarWrapper: {
    paddingTop: 10,
    paddingBottom: 20,
    borderRadius: 10,
    shadowColor: "#7C7C7C",
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 15,
    backgroundColor: "#fff",
    marginBottom: 30,
    marginTop: -15
  },
  reviewsStarContainer: {
    marginHorizontal: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderColor: "#C4C4C4",
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 15
  },
  starsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "50%"
  },
  reviewStar: { width: 26.7, height: 25.48, resizeMode: "contain" },
  reviewStarText: { fontSize: 11, fontWeight: "300" },
  starReview1: { fontSize: 14, fontWeight: "400", marginLeft: 25, marginVertical: 5 },
  mr10: {
    marginLeft: 25,
    marginBottom: 10
  },
  textInput: { borderWidth: 1, borderRadius: 10, borderColor: "#C4C4C4", marginBottom: 10, marginHorizontal: 7, paddingHorizontal: 4 },
  text: { paddingLeft: 25, paddingBottom: 10 },
  bottom: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: 20, paddingHorizontal: 45, borderTopWidth: 0.5, borderTopColor: "#000", backgroundColor: "#fff", marginTop: 40 },
  bottomImg: { width: 24, height: 24, resizeMode: "contain" }
});

const Input = (props) => {
  return (
    <View style={InputStyles.container}>
      <TextInput
        style={InputStyles.input}
        placeholder={props.placeholder}
        value={props.value}
        onChangeText={(num) => props.setValue(num)}
        placeholderTextColor='#000'
        multiline={props.multiline}
        numberOfLines={props.multiline ? 10 : null}
        editable={props.editable !== false}
      />
    </View>
  );
};

const InputStyles = StyleSheet.create({
  container: {
    width: "100%",
    borderRadius: 10
  },
  input: {
    backgroundColor: "#fff",
    height: 49,
    color: "#000",
    fontSize: 14
  },
  error: {
    fontSize: 13,
    color: "#FA060D",
    paddingTop: 8
  }
});

export default BusinessReviewsRatingsScreen;
