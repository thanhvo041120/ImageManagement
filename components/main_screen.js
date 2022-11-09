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
import { validateUrl } from "../validation";

let images = [
  {
    id: 1,
    uri: "https://st2.depositphotos.com/2001755/5408/i/950/depositphotos_54081723-stock-photo-beautiful-nature-landscape.jpg",
  },
  {
    id: 2,
    uri: "https://images.pexels.com/photos/414102/pexels-photo-414102.jpeg?cs=srgb&dl=pexels-pixabay-414102.jpg&fm=jpg",
  },
  {
    id: 3,
    uri: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
  },
  {
    id: 4,
    uri: "https://pbs.twimg.com/profile_images/464182833364234240/Wc3ljeQU_400x400.jpeg",
  },
];
const WIDTH = Dimensions.get("screen").width;
const HEIGHT = Dimensions.get("screen").height;

const styles = StyleSheet.create({
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

export const MainScreen = ({ navigation }) => {
  const scrollXAxis = useRef(new Animated.Value(0)).current;
  const [imageIndex, setImageIndex] = useState(0);
  const [inputUrl, setInputUrl] = useState("");
  const ref = useRef();
  const onPress = useCallback((index) => {
    ref?.current?.scrollToOffset({
      offset: index * WIDTH,
    });
    setImageIndex(index);
  });

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
    images.push({
      id: images.length + 1,
      uri: inputUrl,
    });
    Alert.alert("New", "New image was added to the end of list", [
      {
        text: "Close",
        style: "cancel",
      },
    ]);
    setInputUrl("");
  };
  const onMove = () => {
    navigation.navigate("Exercise3");
  };
  useEffect(() => {
    const unsubcribe = navigation.addListener("focus", () => {
      setInputUrl("");
    });
    return unsubcribe;
  }, [navigation]);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.imagesSide}>
          <Animated.FlatList
            data={images}
            ref={ref}
            keyExtractor={(item) => item.id}
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
                    source={{ uri: item.uri }}
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
          {imageIndex >= images.length - 1 ? (
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
        <View style={{ width: "100%", alignItems: "center", marginTop: 20 }}>
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
              To Exercise 3
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
