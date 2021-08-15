import React, { useRef, useContext, useEffect, useState } from 'react';
import { Text, View, TouchableOpacity, FlatList, ImageBackground, } from 'react-native';
import { styles } from './styles';
import ActionSheet from 'react-native-actionsheet'
import { pickFromCamera, pickFromGallery, uploadImage} from './cameraUtils'
import { GlobalOptionsContext } from "@options";

const Camera = ({ navigation }) => {
  // More info on all the options is below in the API Reference... just some common use cases shown here
  const actionSheet = useRef(null);
  const gOptions = useContext(GlobalOptionsContext);
  const [isLoading, setLoading] = useState(false);
  const ImagePickerOptions = ['Take Photo', 'Choose from Gallery', 'Cancel'];
  const [data, setData] = useState([]);

  const fetch_images = () => {
    fetch(`${gOptions.url}/modules/camera/photos/user/`)
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    fetch_images()
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity>
      <ImageBackground source={{ uri: `${gOptions.url}/${item.image}` }} style={styles.image}>
      </ImageBackground>
    </TouchableOpacity>
  )

  return (
    <View
      style={{
        flex: 1,
      }}>
      

      <FlatList
            data={data}
            keyExtractor={({ id }, index) => id}
            renderItem={renderItem}
          />
      <ActionSheet
        useNativeDriver={false}
        ref={actionSheet}
        title={'Select Image'}
        options={ImagePickerOptions}
        cancelButtonIndex={2}
        onPress={async (index) => {
          if (index != 2) {
            if (index == 0) {
              let res = await pickFromCamera();
              console.log('pickFromCamera res', res);
              // TODO: Upload Image
              res && uploadImage(res, gOptions).then(()=>{
                fetch_images()
              })
            } else if (index == 1) {
              let res = await pickFromGallery();
              console.log('_pickFromGallery res', res);
              // TODO: Upload Image
              res && uploadImage(res, gOptions).then(()=>{
                fetch_images()
              })
            }
          }
        }}
      />
      <TouchableOpacity onPress={() => { actionSheet.current.show() }} style={styles.photoBtn}>
        <Text style={styles.photoBtnTxt}>+ Take Photo</Text>
      </TouchableOpacity>
    </View>
  );
};

export default {
  title: "Camera",
  navigator: Camera
}
