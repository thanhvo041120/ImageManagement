import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export const CameraButtons = ({ iconName, text, size, color, onPress }) => {
  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Ionicons name={iconName} size={size} color={color} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    borderWidth: 1,
    borderColor: '#FFFFFF',
    borderRadius: 10,
    margin: 30
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
    padding: 5
  },
});
