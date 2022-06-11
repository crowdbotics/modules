import * as React from "react"
import {useState, useEffect, useContext, useRef} from 'react';
import {
  Text,
  View,
  Image,
  ScrollView,
  StyleSheet,
  TouchableHighlight,
  TextInput,
  ActivityIndicator
} from 'react-native'
import { OptionsContext, GlobalOptionsContext } from "@options";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import ActionSheet from "react-native-actionsheet";
import { pickFromCamera, pickFromGallery, uploadImage } from "../../camera/utils";
import {userToken} from '../api';

const CreatePostScreen = ({navigation, route}) => {

  const actionSheet = useRef(null);
  const [userProfile, setUserProfile] = useState({});
  const [loading, setLoading] = useState(false);
  const gOptions = useContext(GlobalOptionsContext);
  const BASE_URL = gOptions.url
  const get_user_profile = () => {
      
  }

  useEffect(() => {
    get_user_profile();
  }, []);
  
  const [images, setImages] = useState([]);
  const [res, setRes] = useState([]);
  const [caption, setCaption] = useState("");
  const ImagePickerOptions = ["Take Photo", "Choose from Gallery", "Cancel"];
  console.log("sdas", images);
  
  const createPost = (res) => {
    setLoading(true);
    const data = new FormData();
    res = res?.[0]
    data.append("caption", caption);
    data.append("media", {
      name: `rnd-${res?.path}`,
      type: "image/jpg",
      uri: res.path,
      data: res.data
    });
    fetch(`${BASE_URL}/modules/social-feed/create-post/`,{
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Token ${userToken}`
      },
      body: data
    }).then((response) => response.json())
      .then((json) => {navigation.navigate("Home")})
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }



  return (
    <ScrollView>
      <ActionSheet
        ref={actionSheet}
        title={"Select Image"}
        options={ImagePickerOptions}
        cancelButtonIndex={2}
        onPress={async (index) => {
          let res;
          switch (index) {
            case 0:
              res = await pickFromCamera();
              break;
            case 1:
              res = await pickFromGallery(cropWidth=400, cropHeight=230);
              break;
          }
          if (res) {
            setImages(["data:image/png;base64,"+res?.data])
            setRes([res])
          }
        }}
      />
      <View style={styles.container}>
        <View style={styles.formContainer}>
          
          <View>
            <Text style={styles.headerText}>Image</Text>
            <TouchableOpacity style={styles.imageLarge} onPress={() => actionSheet.current.show()}>
              {images.length > 0 ? (
                <Image source={{ uri: images[0] }} style={styles.imageLarge} />
             ) : (
                <Image style={styles.placeholderImage} source={require('./assets/add-photo.png')} />
              )}
            </TouchableOpacity>
            
            {/* <View style={{flexDirection: 'row', }}>
              <FlatList
                data={images}
                renderItem={({ item }) => (
                  <TouchableOpacity style={styles.AddMoreButton} onPress={()=>{console.log("asa")}}>
                    <Text style={styles.AddMoreButtonText}>+</Text>
                  </TouchableOpacity>
                )}
                keyExtractor={item => item}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              />
            </View> */}
            
            <View>
            <View>
              <Text style={styles.headerText} >Caption</Text>
              <TextInput 
                style={styles.textInput} 
                placeholder="What's on your mind?" multiline={true}
                onChangeText={(text) => setCaption(text)}
                value={caption}
                />
            </View>
            <TouchableOpacity style={[styles.SubmitPostButton, (images.length == 0 || !caption ) ? styles.inactive : {backgroundColor: 'black'}]} onPress={()=>{ caption && images.length >0 && createPost(res)}}>
            {loading ? <ActivityIndicator/>:<Text style={styles.SubmitPostButtonText}>Create Post</Text>}
            </TouchableOpacity>
            </View>
            
          </View>
        </View>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 10,
    height: "100%",
    backgroundColor: "white"
  },
  textInput:{
    height: 60,
    borderColor: "gray",
    borderBottomWidth: 1,
    padding: 5,
    marginBottom: 10
  },
  imageLarge: {
    height: 230,
    borderColor: "gray",
    borderRadius: 12,
    borderWidth: 1,
    resizeMode: 'contain',
    marginBottom: 10,
    marginTop: 10,
    backgroundColor: '#eee',
    justifyContent: 'center',
  },
  AddMoreButton: {
    height: 100,
    width: 100,
    backgroundColor: "gray",
    padding: 5,
    borderRadius: 5,
    marginBottom: 10,
    justifyContent: 'center',
    textAlign: 'center',
    marginHorizontal: 10
  },
  AddMoreButtonText: {
    color: "white",
    fontSize: 20,
    textAlign: "center"
  },
  inactive: {
    backgroundColor: "gray",
  },
  SubmitPostButton: {
    height: 50,
    width: "100%",
    backgroundColor: "black",
    padding: 5,
    borderRadius: 5,
    justifyContent: 'center',
    textAlign: 'center',
    marginBottom: 10
  },
  SubmitPostButtonText: {
    color: "white",
    fontSize: 20,
    textAlign: "center"
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    overflow: 'hidden',
    borderRadius: 10,
  },
  placeholderImage: {alignSelf: 'center', width: 50, height: 42},
  headerContainer: {
    display: "flex",
    flexDirection: "column",
    alignSelf: "center",
    alignItems: "center"
  },
  headerText: {
    marginTop: 15,
    fontSize: 16,
    fontWeight: "bold"
  },
  headerSubText: {
    marginTop: 5,
    fontSize: 12,
    color: "#C4C4C4"
  },
  postIcon: {
    width: 15,
    height: 15,
    marginBottom: 5,

    shadowColor: "#0000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 1.3,
    shadowRadius: 3.84
  },
  followingIcon: {
    width: 15,
    height: 15,
    marginBottom: 5
  },
  textarea: {
    display: "flex",
    alignItems: "center"
  },
  followingText: {
    fontSize: 14,
  },
  pt30: {
    paddingTop: 30
  },
  pt10: {
    paddingTop: 5
  },
  galleryRow: {
    display: "flex",
    // flexDirection: "row",
    // flexWrap: "wrap",
  },
  smallPost: {
    height: 120,
    width: "33%",
    paddingHorizontal: 3,
    marginVertical: 5
  },
  columnRow: {
    width: "33%"
  },
  smallPostcolumn: {
    height: 120,
    width: "100%",
    padding: 3
  },
  largePost: {
    height: 240,
    width: "67%",
    padding: 3
  }
});

export default CreatePostScreen;

