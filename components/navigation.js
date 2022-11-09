import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MainScreen } from "./main_screen";
import { Screen } from "./screen";
import { NavigationContainer } from "@react-navigation/native";
import { CameraScreen } from "./camera";

const Stack = createNativeStackNavigator();
export const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Exercise2"
        screenOptions={{
          headerShown: true,
        }}
      >
        <Stack.Screen name="Exercise2" component={MainScreen} />
        <Stack.Screen name="Exercise3" component={Screen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
