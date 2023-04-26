import {
  StyleSheet,
  Text,
  View,
  Modal,
  PermissionsAndroid,
  Platform,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import st from '../constant/styles';
import {colors, images} from '../constant/Theme';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {request, PERMISSIONS} from 'react-native-permissions';

const ImageUpload = (WrappedComponent, uploadImageToServer) => {
  return props => {
    const [filePath, setFilePath] = useState({});
    const [isModalVisible, setIsModalVisible] = useState(false);

    const toggleModalVisibility = () => {
      setIsModalVisible(false);
    };

    const checkCameraPermission = async () => {
  
        // if (Platform.OS === 'ios') {
        //   const result = await request(PERMISSIONS.IOS.CAMERA);

        //   if (result === 'granted') {
        //     handleTakePhoto();
        //   }
        // } 

        if (Platform.OS === 'android') {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
              title: '7Teen Camera Permission',
              message:
                '7Teen needs access to your camera ' +
                'so you can change your profile picture.',
              buttonNeutral: 'Ask Me Later',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('You can use the camera');
            await checkWriteToExternalPermission();
          } else {
            console.log('Camera permission denied');
          }
        }else return true
     
    };

    const checkWriteToExternalPermission = async () => {
      if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: '7Teen Storage Permission',
            message:
              '7Teen needs to write to your storage ' +
              'to save your picture in Gallery',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Storage permission approved');
          return true;
        } else {
          console.log('Storage permission denied');
          return false;
        }
      } catch (err) {
        console.warn(err);
        console.log(err)
      }
    } else return true;
    };

    const handleTakePhoto = async () => {
      const permissionsGranted = await checkCameraPermission();
      if (Platform.OS === 'android') {
      let isStoragePermitted = await checkWriteToExternalPermission();
      }

      console.log({permissionsGranted});
      let options = {
        title: 'Select Image',
        customButtons: [
          {
            name: 'customOptionKey',
            title: 'Choose Photo from Custom Option',
          },
        ],
        storageOptions: {
          skipBackup: true,
          path: 'images',
        },
      };
     
      launchCamera(options, response => {
        console.log('Response = ', response);

        if (response.didCancel) {
          console.log('User cancelled image picker');
          toggleModalVisibility()
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
          toggleModalVisibility()
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
          alert(response.customButton);
          toggleModalVisibility()
        } else {
          let source = response;
          toggleModalVisibility()
          uploadImageToServer(source);
          setFilePath(source);
        }
      });
    
    };

/////-------------------------
const requestCameraPermission = async () => {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Camera Permission',
          message: 'App needs camera permission',
        },
      );
      // If CAMERA Permission is granted
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn(err);
      return false;
    }
  } else return true;
};

const requestExternalWritePermission = async () => {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'External Storage Write Permission',
          message: 'App needs write permission',
        },
      );
      // If WRITE_EXTERNAL_STORAGE Permission is granted
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn(err);
      alert('Write permission err', err);
    }
    return false;
  } else return true;
};

const captureImage = async (type) => {
  let options = {
    mediaType: type,
    maxWidth: 300,
    maxHeight: 550,
    quality: 1,
    videoQuality: 'low',
    durationLimit: 30, //Video max duration in seconds
    saveToPhotos: true,
  };
  let isCameraPermitted = await requestCameraPermission();
  let isStoragePermitted = await requestExternalWritePermission();
  console.log({isCameraPermitted,isStoragePermitted})
  if (isCameraPermitted && isStoragePermitted) {
    launchCamera(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        alert('User cancelled camera picker');
        return;
      } else if (response.errorCode == 'camera_unavailable') {
        alert('Camera not available on device');
        return;
      } else if (response.errorCode == 'permission') {
        alert('Permission not satisfied');
        return;
      } else if (response.errorCode == 'others') {
        alert(response.errorMessage);
        return;
      }
      console.log('base64 -> ', response.base64);
      console.log('uri -> ', response.uri);
      console.log('width -> ', response.width);
      console.log('height -> ', response.height);
      console.log('fileSize -> ', response.fileSize);
      console.log('type -> ', response.type);
      console.log('fileName -> ', response.fileName);
      // setFilePath(response);
    });
  }else{
    console.log('--------------------fjfvjfn---')
  }
};





    /////////------------------------------

    const handleChooseFromGallery = () => {
      let options = {
        title: 'Select Image',
        customButtons: [
          {
            name: 'customOptionKey',
            title: 'Choose Photo from Custom Option',
          },
        ],
        storageOptions: {
          skipBackup: true,
          path: 'images',
        },
      };
      launchImageLibrary(options, response => {
        console.log('Response = ', response);

        if (response.didCancel) {
          console.log('User cancelled image picker');
          toggleModalVisibility()
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
          toggleModalVisibility()
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
          alert(response.customButton);
          toggleModalVisibility()
        } else {
          let source = response;
          uploadImageToServer(response);
          setFilePath(source);
          toggleModalVisibility()
        }
      });
    };

    return (
      <View>
        <WrappedComponent
          {...props}
          handleImageUpload={() => setIsModalVisible(!isModalVisible)}
        />

        <Modal
          animationType="slide"
          transparent
          visible={isModalVisible}
          presentationStyle="overFullScreen"
          onRequestClose={toggleModalVisibility}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={[st.tx18, st.txAlignC]}>Upload Profile</Text>

              <TouchableOpacity
                style={styles.cross_btn}
                onPress={() => toggleModalVisibility()}>
                <Text style={[st.tx18, {color: colors.secondary}]}>X</Text>
              </TouchableOpacity>

              <View style={styles.border} />

              <View style={[st.row, styles.contaier]}>
                <TouchableOpacity style={st.align_C} onPress={()=>handleTakePhoto()}>
                  <Image source={images.gra_camera} style={styles.icnsty} />
                  <Text style={[st.tx18, st.color_S]}>{'Take a photo'}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={st.align_C}
                  onPress={handleChooseFromGallery}>
                  <Image source={images.gallery} />
                  <Text style={[st.tx18, st.color_S]}>{'From Gallery'}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  };
};

export default ImageUpload;

const styles = StyleSheet.create({
  centeredView: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  border: {
    height: 1,
    backgroundColor: colors.danger,
  },
  icnsty: {
    width: 30,
    height: 30,
  },
  contaier: {
    justifyContent: 'space-around',
    paddingTop: 20,
  },
  cross_btn: {
    position: 'absolute',
    right: 20,
    top: 20,
  },
});
