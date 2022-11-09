import React, { useEffect, useState, useRef } from "react";
import { View, StyleSheet, Text, Button, Alert } from "react-native";
import { Camera, CameraType } from "expo-camera";
import { CameraButtons } from "./button";

export const CameraScreen = ({
  setShow,
  setImageTaken,
}) => {
  const [typeCamera, setTypeCamera] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const cameraRef = useRef(null);
  if (!permission) {
    return <View />;
  }
  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          This application want to access your camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  const onChangeCameraType = () => {
    setTypeCamera((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  };

  const takePhoto = async () => {
    if (cameraRef) {
      let newPhoto = await cameraRef.current.takePictureAsync({
        allowsEditing: true,
        aspect: [4,3],
        quality: 1,
      });
      return newPhoto;
    }
  };
//   const [location, setLocation] = useState(null);

//   const getPermissionToDefineLocation = async () => {
//     let { status } = await Location.requestForegroundPermissionsAsync();
//     if (status !== "granted") {
//       return;
//     }
//     let location = await Location.getCurrentPositionAsync({});
//     setLocation(location);
//   };
//   useEffect(() => {
//     getPermissionToDefineLocation();
//   }, []);

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={typeCamera} ref={cameraRef}>
        <CameraButtons
          iconName={"md-camera-reverse-outline"}
          size={40}
          color={"white"}
          onPress={onChangeCameraType}
        />

        <CameraButtons
          iconName={"camera-outline"}
          size={40}
          color={"white"}
          onPress={async () => {
            const photo = await takePhoto();
            setImageTaken(photo.uri);
            setShow(false);
          }}
        />
        <CameraButtons
          iconName={"close-circle-outline"}
          size={40}
          color={"white"}
          onPress={() => {
            setShow(false);
          }}
        />
      </Camera>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
    justifyContent: "center",
    width: "100%",
  },
  camera: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-end",
  },
  close: {
    position: "absolute",
  },
});
