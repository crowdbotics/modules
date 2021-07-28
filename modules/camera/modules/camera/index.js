import React, { useRef, useContext } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import ActionSheet from 'react-native-actionsheet'
import { pickFromCamera, pickFromGallery, uploadImage} from './cameraUtils'
import { GlobalOptionsContext } from "@options";

const shCamera = ({ navigation }) => {
  // More info on all the options is below in the API Reference... just some common use cases shown here
  const actionSheet = useRef(null);
  const gOptions = useContext(GlobalOptionsContext);

  const ImagePickerOptions = ['Take Photo', 'Choose from Gallery', 'Cancel'];


  return (
    <View
      style={{
        flex: 1,
      }}>
      <View style={styles.heading}>
        <TouchableOpacity
          style={styles.touchableopacity}
          onPress={() => {
            navigation.goBack();
          }}>
        </TouchableOpacity>
        <Text style={styles.header}>Camera Module</Text>

      </View>
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
              res && uploadImage(res, gOptions)
            } else if (index == 1) {
              let res = await pickFromGallery();
              console.log('_pickFromGallery res', res);
              // TODO: Upload Image
              res && uploadImage(res, gOptions)
            }
          }
        }}
      />
      <TouchableOpacity onPress={() => { actionSheet.current.show() }} style={{ paddingVertical: 20, paddingHorizontal: 40, borderWidth: 1, backgroundColor: 'lightblue' }}>
        <Text>Take Photo</Text>
      </TouchableOpacity>
    </View>
  );
};

export default {
  title: "Camera",
  navigator: shCamera
}
