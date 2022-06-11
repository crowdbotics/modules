import React, { useState, useEffect, useContext } from "react";
import { Text, StyleSheet, View, TextInput, Image, ScrollView } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import {getFollowers, followUser} from '../api';
import { GlobalOptionsContext } from "@options";


const FollowersList = (params) => {
  const [followers, setFollowers] = useState([]);
  const [allFollowers, setAllFollowers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const gOptions = useContext(GlobalOptionsContext);
  const BASE_URL = gOptions.url
  useEffect(() => {
    getFollowers(BASE_URL, setLoading).then((data) => {
      console.log("---------sss", data)
      setFollowers(data?.results);
      setAllFollowers(data?.results);
    })
  }, [loading]);
  const alpha = Array.from(Array(26)).map((e, i) => i + 65);
  const alphabets = alpha.map((x) => String.fromCharCode(x));

  useEffect(() => {
    if (searchQuery.length > 0) {
      setFollowers(allFollowers.filter((follower) => follower.name.toLowerCase().includes(searchQuery.toLowerCase())));
    }else{
      setFollowers(allFollowers);
    }
  }
  , [searchQuery]);

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.searchBar}>
          <Text style={styles.searchText}>Search</Text>
          <View style={{ borderWidth: 1, borderRadius: 10, borderColor: "#C4C4C4", flexDirection: "row", alignItems: "center" }}>
            <View style={{ width: "90%" }}>
              <Input placeholder="Enter" setValue={setSearchQuery}/>
            </View>
            <Image source={require("../assets/search.png")}/>
          </View>
        </View>
        <View>
          <Text style={styles.text}>{followers.length} Followers</Text>
        </View>
        {alphabets.map((alpha) => {
          return (
            <>
              {followers.filter((follower) => follower.name.charAt(0).toUpperCase() === alpha).length > 0 && (
                <View style={styles.frequently}>
                  <Text style={styles.frequentlyText}>{alpha}</Text>
                </View>
              )}
              <View>
                {followers.filter((follower) => follower.name.charAt(0).toUpperCase() === alpha).map((follower) => {
                  return (
                    <Follower id={follower.id} name={follower.name} bgcolor={follower.bgcolor} 
                    follow={follower.follow} setLoading={setLoading}/>
                  )
                }
                )}
              </View>
            </>
          )
        }
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  searchBar: {
    padding: 20
  },
  searchText: {
    marginLeft: 10,
    marginBottom: 10
  },
  text: {
    marginLeft: 30,
    marginBottom: 10
  },
  frequently: {
    height: 50,
    width: "100%",
    backgroundColor: "#DADADA",
    flexDirection: "column",
    justifyContent: "center"
  },
  frequentlyText: {
    marginLeft: 30,
    color: "#8F8D86"
  }

});

export default FollowersList;

const Follower = (props) => {
  const { id, name, bgcolor, follow, setLoading } = props;
  return (
    <View style={FollowerStyles.follower}>
      <View style={FollowerStyles.main}>
        <View style={[FollowerStyles.image, { backgroundColor: props.bgcolor }]}>
          <Image source={require("../assets/edit.png")}/>
        </View>
        <Text>{name}</Text>
      </View>
      {!follow && 
      <TouchableOpacity onPress={()=>{followUser(id, setLoading)}}>
        <Text>Follow Back</Text>
      </TouchableOpacity>
      }
    </View>
  );
};
const FollowerStyles = StyleSheet.create({
  follower: {
    marginHorizontal: 20,

    borderBottomWidth: 0.5,
    borderBottomColor: "rgba(0,0,0,0.5)",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    justifyContent: "space-between"

  },
  main: {
    flexDirection: "row",
    alignItems: "center"
  },
  image: {
    height: 60,
    width: 60,
    borderRadius: 30,
    marginRight: 15,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  }
});

const Input = (props) => {
  return (
    <View>
      <TextInput
        style={textStyles.input}
        placeholder={props.placeholder}
        value={props.value}
        onChangeText={(num) => props.setValue(num)}
        placeholderTextColor='#ddd'
        editable={props.editable !== false}
      />
      {props.errorText ? <Text style={textStyles.error}>{props.errorText}</Text> : null}
    </View>
  );
};

const textStyles = StyleSheet.create({
  input: {
    backgroundColor: "#fff",
    height: 53,
    color: "#000",
    borderRadius: 10,
    fontSize: 14,
    paddingHorizontal: 10
  },
  error: {
    fontSize: 13,
    color: "#FA060D",
    paddingTop: 8
  }
});