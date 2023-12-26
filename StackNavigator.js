import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet } from "react-native";
import React from "react";
import All from "./screens/All";
import LoadingScreen from "./screens/LoadingScreen";
import LoadingScreen1 from "./screens/LoadingScreen1";
import { NavigationContainer } from "@react-navigation/native";
const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Load"
          component={LoadingScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="All" component={All} />
        <Stack.Screen
          name="Load1"
          component={LoadingScreen1}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;

const styles = StyleSheet.create({});
