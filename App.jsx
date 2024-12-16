import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./src/screens/HomeScreen";
import LoginScreen from "./src/screens/LoginScreen";
import SignupScreen from "./src/screens/SignupScreen";
import WelcomeScreen from "./src/screens/WelcomeScreen";
import AccountScreen from "./src/screens/AccountScreen";
import FightCase from "./src/screens/FightCase";
import GameScreen from "./src/screens/GameScreen";
import ChatbotScreen from "./src/screens/ChatbotScreen";
import SentimentScreen from "./src/screens/SentimentScreen";
import CrosswordScreen from "./src/screens/CrosswordScreen";

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name={"HOME"} component={HomeScreen} />
        <Stack.Screen name={"LOGIN"} component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignupScreen} />
        <Stack.Screen name="Welcome" component={WelcomeScreen}/>
        <Stack.Screen name="Chatbot" component={ChatbotScreen}/>
        <Stack.Screen name="Account" component={AccountScreen}/>
        <Stack.Screen name='Fight' component={FightCase}/>
        <Stack.Screen name='GameScreen' component={GameScreen} />
        <Stack.Screen name='sentiment' component={SentimentScreen}/>
        <Stack.Screen name='Crossword' component={CrosswordScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});
