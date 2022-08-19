import React, { useEffect, useState, useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Platform, Dimensions } from 'react-native';
import { useSelector, useDispatch } from "react-redux";
import CardStack, { Card } from 'react-native-card-stack-swiper';
import  {HomeHeader} from './home-header';
import LikeUnlikeSVG from './LikeUnlikeSVG';
import { OptionsContext, GlobalOptionsContext } from "@options";

import { profileRequest, allProfilesRequest, requestMatch, deniedMatch } from '../../api/redux';
import database, { firebase } from '@react-native-firebase/database';
import { SafeAreaView } from 'react-native-safe-area-context';

let deviceWidth = Dimensions.get('window').width 
let deviceHeight = Dimensions.get('window').height

export const HomeScreen = (props) => {
  const { navigation } = props;
  const t = {};
  const dispatch = useDispatch();
  const [matches, setMatches] = useState([])
  const [swiperSort, setSwiperSort] = useState([]);
  const store = useSelector((state) => state.App);

  // I need user here! where to get it from?
  // From store?
  console.log('store HomeScreen:', store);

  const user = store?.myProfile;

  useEffect(() => {
    dispatch(allProfilesRequest()).then(
      (res) => {
        setMatches(res.payload)
      }
    );
  }, []);

  const reference  =  database().ref('/matches');
  reference.on('value', (snapshot) => {
    console.log('snapshot', snapshot.val());
  });


  const swipeRight = (index) => {
    // TODO: send this user as a match to the backend
    // which user id to send to the backend
    // that the logged in user has matched with
    console.log('matches', matches,)
    let top_card_user = matches[index];
    top_card_user['match_requested'] = true;
    setMatches([...matches]);
    swiperSort.push(1);
    console.log('matches', matches)
    console.log('top_card_user', top_card_user);
    dispatch(
      requestMatch({
        match_for: top_card_user.id,
      })
    )
  }

  const swipeLeft = (index) => {
    console.log('swipe left', index);
    let top_card_user = matches[index];
    swiperSort.push(0);
    console.log('top_card_user', top_card_user);
    dispatch(
      deniedMatch({
        match_denied_with: top_card_user.id,
      })
    )
  }


  return (
      <SafeAreaView style={[{flex:1, backgroundColor: '#fff',} ]}>
        <HomeHeader navigation={navigation} user={user} />
        {matches && matches?.length > 0 &&
            <><CardStack
            style={styles.content}
            renderNoMoreCards={() => <Text style={{ fontWeight: '700', fontSize: 18, color: 'gray' }}>No more cards :(</Text>}
            ref={swiper => {
              t.swiper = swiper

            }}
            onSwiped={() => console.log('onSwiped')}
            onSwipedLeft={(index) => {
              swipeLeft(index=index);
            }}
            onSwipedRight={(index) => {
              // TODO: dispatch a match request
              swipeRight(index=index);
            }}
          > 
            {matches.map((item, index) => {
              return (
                <Card style={[styles.card, styles.card1]} user={item}>
                    <UserCard user={item} navigation={navigation}/>
                </Card>
              )
            })}
            
            
          </CardStack>

          <View style={styles.footer}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={[]} onPress={() => {
              console.log('swiperSort', t.swiper);
              if (swiperSort.pop() === 1) {
                t.swiper.goBackFromRight();
              }else{
                t.swiper.goBackFromLeft();
              }
              
            }}>
              <Image source={require('./assets/red.png')} resizeMode={'contain'} style={{ height: 60, width: 60 }} />
            </TouchableOpacity>
              <LikeUnlikeSVG style={styles.likeUnlike}  onPressTick={() => { t.swiper.swipeRight() }} 
              onPressCross={() => { t.swiper.swipeLeft() }}  />
            <TouchableOpacity style={[]} onPress={() => {
              t.swiper.swipeLeft()
            }}>
              <Image source={require('./assets/bolt.png')} resizeMode={'contain'} style={{ height: 60, width: 60 }} />
            </TouchableOpacity>
          </View>

          </View>
          </>
        }
        

        
      </SafeAreaView>

  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#f2f2f2',
  },
  content:{
    flex: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card:{
    width: '100%',
    height: deviceHeight - 310,
    borderRadius: 5,
    shadowColor: 'rgba(0,0,0,0.5)',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity:0.5,
  },
  card1: {
  },
  card2: {
  },
  label: {
    lineHeight: 400,
    textAlign: 'center',
    fontSize: 55,
    fontFamily: 'System',
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
  footer:{
    flex:1,
    justifyContent:'flex-start',
    alignItems: 'center',
  },
  buttonContainer:{
    flexDirection:'row',
    justifyContent: 'space-between',
  },
  button:{
    shadowColor: 'rgba(0,0,0,0.3)',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity:0.5,
    backgroundColor:'#fff',
    alignItems:'center',
    justifyContent:'center',
    zIndex: 0,
  },
  orange:{
    width:55,
    height:55,
    borderWidth:6,
    borderColor:'rgb(246,190,66)',
    borderRadius:55,
    marginTop:-15
  },
  green:{
    width:75,
    height:75,
    backgroundColor:'#fff',
    borderRadius:75,
    borderWidth:6,
    borderColor:'#01df8a',
  },
  red:{
    width:75,
    height:75,
    backgroundColor:'#fff',
    borderRadius:75,
    borderWidth:6,
    borderColor:'#fd267d',
  },
  cardImageSection: {
    flex: 5,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    padding: 10,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    bottom: -10,
    left: 15,
    position: 'absolute',
    resizeMode: 'cover',
    alignSelf: 'center',
    borderColor: '#fff',
    borderWidth: 3,
    backgroundColor: '#fff',
  },
  profileCoverImage: {
    width: '100%',
    height: '100%',
    borderRadius: 5,
  },
  userDetailsInnerRightContainer: {
    //flex: 1,
    flexDirection: "row",
    alignItems: "stretch",
    position: "absolute",
    zIndex: 11111,
    bottom: 20,
    backgroundColor: '#fff',
    borderRadius: 12,
    right: 15,
    paddingVertical: 5
  },
  usernameText: {
    fontWeight: "bold",
    fontSize: 20
  },
  postImage: {
    height: 30,
    width: 30
  },
  likeBtnContainer: {
    flexDirection: 'row', 
    marginHorizontal: 10, 
    alignItems: 'center',
  },
  unLikeBtnContainer: {
    flexDirection: 'row', 
    marginHorizontal: 10, 
    alignItems: 'center',
  },
  cardContainer: {
    flex: 1,
    width: 300,
    height: 470,
    borderRadius: 12
  },
  cardDescSection: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: '#f2f2f2',
    borderBottomRightRadius: 12,
    borderBottomLeftRadius: 12,
    zIndex: -1
  },
  likeUnlike: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 15,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    marginTop: -15,
  }
});


const UserCard = ({ user, navigation }) => {
  const { id, name, profile_pic, age,} = user;

  // Consume module's own options in this component
  const options = useContext(OptionsContext);
  return (
    <TouchableOpacity style={[{backgroundColor: options.colors.secondary}, styles.cardContainer]} onPress={()=>{
      navigation.navigate('Profile', {id: id});
    }}>
          <View style={styles.cardImageSection}>
            <Image
                source={{ uri: user?.profile_info?.cover_image }}
                resizeMode="cover"
                style={styles.profileCoverImage} />
              <Image
              source={{ uri: user?.profile_info?.profile_image }}
              resizeMode="cover"
              style={styles.profileImage} />
              <View style={styles.userDetailsInnerRightContainer}>
                <View style={styles.likeBtnContainer}>
                  <Text style={{ fontSize: 14, paddingHorizontal: 5 }}>
                    {user?.likes ? user?.likes : 0}
                  </Text>
                  <Image source={require("./assets/like.png")}/>
                </View>
                <View style={styles.unLikeBtnContainer}> 
                  <Text style={{ fontSize: 14, paddingRight: 5 }}>
                    {user?.dislikes ? user?.dislikes : 0}
                  </Text>
                  <Image source={require("./assets/unlike.png")}/>
                </View>
              </View>
          </View>
          <View style={styles.cardDescSection}>
              <Text style={{ fontWeight: 'bold', fontSize: 20 }}>
                  {user.name}
              </Text>
              {
                user?.match_requested ? <Text style={{ fontSize: 14, color: '#fd267d' }}>
                  Requested
                </Text> : null

              }
              <Text style={{ fontSize: 12 }}>
              {user?.profile_info?.city}, {user?.profile_info?.country}
              </Text>
          </View>
      </TouchableOpacity>
  )
}