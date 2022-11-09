import React from "react";
import { useRef, useState, useCallback, useEffect } from "react";
import {
  Alert,
  Animated,
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { addImage, getImages } from "../db";
import { validateUrl } from "../validation";
import { CameraScreen } from "./camera";
const WIDTH = Dimensions.get("screen").width;

export const Screen = ({ navigation }) => {
  const scrollXAxis = useRef(new Animated.Value(0)).current;
  const [imageIndex, setImageIndex] = useState(0);
  const [inputUrl, setInputUrl] = useState("");
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const [imageTaken, setImageTaken] = useState(null);
  const ref = useRef();
  const onPress = useCallback((index) => {
    ref?.current?.scrollToOffset({
      offset: index * WIDTH,
    });
    setImageIndex(index);
  });

  const showCamera = () => {
    setShow(true);
  };
  const onGetUrl = (value) => {
    setInputUrl(value);
  };
  const onPressAddUrl = () => {
    if (!validateUrl(inputUrl)) {
      Alert.alert("Alert", "Url is invalid, Enter new url", [
        {
          text: "Close",
          style: "cancel",
        },
      ]);

      setInputUrl("");
      return;
    }
    addImage(inputUrl);
    Alert.alert("New", "New image was added to the end of list", [
      {
        text: "Close",
        style: "cancel",
        onPress: () => {
          setInputUrl("");
          navigation.reset({
            index: 0,
            routes: [
              {
                name: "Exercise3",
              },
            ],
          });
        },
      },
    ]);
  };
  const addImageTakenToDatabase = () => {
    addImage(imageTaken);
    Alert.alert("New", "New image was added to the end of list", [
      {
        text: "Close",
        style: "cancel",
        onPress: () => {
          setInputUrl("");
          setImageTaken(null);
          navigation.reset({
            index: 0,
            routes: [
              {
                name: "Exercise3",
              },
            ],
          });
        },
      },
    ]);
  };
  const cancelSaveImage = () => {
    setImageTaken(null);
    navigation.reset({
      index: 0,
      routes: [
        {
          name: "Exercise3",
        },
      ],
    });
  };
  const onMove = () => {
    navigation.navigate("Exercise2");
  };
  useEffect(() => {
    const unsubcribe = navigation.addListener("focus", () => {
      setInputUrl("");
      getImages(setData);
    });
    return unsubcribe;
  }, [navigation]);
  return (
    <SafeAreaView style={styles.screen}>
      {show ? (
        <View style={styles.cameraContainer}>
          <CameraScreen setImageTaken={setImageTaken} setShow={setShow} />
        </View>
      ) : (
        <SafeAreaView style={styles.container}>
          <ScrollView>
            <View style={styles.imagesSide}>
              {data.length === 0 ? (
                <View>
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: "bold",
                      color: "#FFFFFF",
                    }}
                  >
                    No Data
                  </Text>
                </View>
              ) : (
                <Animated.FlatList
                  data={data}
                  ref={ref}
                  keyExtractor={(item) => item["id"]}
                  horizontal
                  pagingEnabled
                  bounces={false}
                  scrollEnabled={false}
                  showsHorizontalScrollIndicator={false}
                  onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollXAxis } } }],
                    { useNativeDriver: false }
                  )}
                  renderItem={({ item }) => {
                    return (
                      <View style={styles.image}>
                        <Image
                          source={{ uri: item["url"] }}
                          style={{
                            flex: 1,
                            resizeMode: "cover",
                            marginHorizontal: 15,
                            borderRadius: 15,
                          }}
                        />
                      </View>
                    );
                  }}
                />
              )}
            </View>
            <View style={styles.buttonsContainer}>
              {imageIndex == 0 ? (
                <TouchableOpacity disabled style={styles.buttonBackMuted}>
                  <Text style={styles.buttonTxt}>Back</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => onPress(imageIndex - 1)}
                  style={styles.buttonBack}
                >
                  <Text style={styles.buttonTxt}>Back</Text>
                </TouchableOpacity>
              )}
              {imageIndex >= data.length - 1 ? (
                <TouchableOpacity disabled style={styles.buttonNextMuted}>
                  <Text style={styles.buttonTxt}>Next</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => onPress(imageIndex + 1)}
                  style={styles.buttonNext}
                >
                  <Text style={styles.buttonTxt}>Next</Text>
                </TouchableOpacity>
              )}
            </View>
            <View
              style={{ width: "100%", alignItems: "center", marginTop: 20 }}
            >
              <View
                style={{
                  borderWidth: 2,
                  borderColor: "#219ebc",
                  width: 280,
                  borderRadius: 10,
                }}
              >
                <TextInput
                  style={{ padding: 10 }}
                  placeholder="URL"
                  value={inputUrl}
                  onChangeText={(value) => onGetUrl(value)}
                />
              </View>
              <TouchableOpacity
                onPress={onPressAddUrl}
                style={{
                  marginTop: 10,
                  backgroundColor: "#219ebc",
                  width: 280,
                  height: 50,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 10,
                  marginBottom: 20,
                }}
              >
                <Text
                  style={{ fontSize: 15, color: "#FFFFFF", fontWeight: "bold" }}
                >
                  Add URL
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={showCamera}
                style={{
                  marginTop: 10,
                  backgroundColor: "#219ebc",
                  width: 280,
                  height: 50,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 10,
                  marginBottom: 20,
                }}
              >
                <Text
                  style={{ fontSize: 15, color: "#FFFFFF", fontWeight: "bold" }}
                >
                  Camera
                </Text>
              </TouchableOpacity>
              {imageTaken && (
                <View style={{ width: "100%", alignItems: "center" }}>
                  <View style={styles.image}>
                    <Image
                      source={{ uri: imageTaken }}
                      style={{
                        flex: 1,
                        resizeMode: "cover",
                        marginHorizontal: 15,
                        borderRadius: 15,
                        marginBottom: 30,
                      }}
                    />
                  </View>

                  <Text
                    style={{
                      flex: 1,
                      marginBottom: 10,
                    }}
                  >
                    (URL: {imageTaken})
                  </Text>
                  <TouchableOpacity
                    onPress={addImageTakenToDatabase}
                    style={{
                      backgroundColor: "#219ebc",
                      width: 280,
                      height: 50,
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: 10,
                      marginBottom: 20,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 15,
                        color: "#FFFFFF",
                        fontWeight: "bold",
                      }}
                    >
                      Add to database
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={cancelSaveImage}
                    style={{
                      backgroundColor: "#219ebc",
                      width: 280,
                      height: 50,
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: 10,
                      marginBottom: 20,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 15,
                        color: "#FFFFFF",
                        fontWeight: "bold",
                      }}
                    >
                      Cancel
                    </Text>
                  </TouchableOpacity>
                </View>
              )}

              <TouchableOpacity
                onPress={onMove}
                style={{
                  marginTop: 10,
                  backgroundColor: "#219ebc",
                  width: 280,
                  height: 50,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 10,
                  marginBottom: 20,
                }}
              >
                <Text
                  style={{ fontSize: 15, color: "#FFFFFF", fontWeight: "bold" }}
                >
                  To Exercise 2
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </SafeAreaView>
      )}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
  },
  cameraContainer: {
    width: "100%",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    marginTop: 20,
  },
  imagesSide: {
    width: WIDTH,
    height: WIDTH * 0.9,
  },
  image: {
    width: WIDTH,
    height: WIDTH * 0.9,
  },
  buttonsContainer: {
    width: "100%",
    height: 60,
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
    alignItems: "center",
  },
  buttonBack: {
    alignItems: "center",
    justifyContent: "center",
    height: 45,
    width: 90,
    backgroundColor: "#219ebc",
    borderRadius: 10,
    marginRight: 20,
  },
  buttonBackMuted: {
    alignItems: "center",
    justifyContent: "center",
    height: 45,
    width: 90,
    backgroundColor: "#999999",
    borderRadius: 10,
    marginRight: 20,
  },
  buttonNext: {
    alignItems: "center",
    justifyContent: "center",
    height: 45,
    width: 90,
    backgroundColor: "#219ebc",
    borderRadius: 10,
    marginLeft: 20,
  },
  buttonNextMuted: {
    alignItems: "center",
    justifyContent: "center",
    height: 45,
    width: 90,
    backgroundColor: "#999999",
    borderRadius: 10,
    marginLeft: 20,
  },
  buttonTxt: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
});
