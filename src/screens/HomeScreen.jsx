import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { colors } from "../utils/colors";
import { fonts } from "../utils/fonts";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
  const navigation = useNavigation();

  const handleLogin = () => {
    navigation.navigate("LOGIN");
  };

  const handleSignup = () => {
    navigation.navigate("SignUp");
  };
  return (
    <View style={styles.container}>
      <View style={styles.topContent}>
        <Image source={require("../assets/newman.png")} style={styles.bannerImage} />
        <Text style={styles.title}>Nagrik aur Samvidhan</Text>
        <Text style={styles.subTitle}>
          Gaming Your Way to Constitutional Wisdom! 
        </Text>
      </View>
      <View style={styles.bottomContent}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              styles.loginButtonWrapper,
              { backgroundColor: colors.primary },
            ]}
            onPress={handleLogin}
          >
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.loginButtonWrapper]}
            onPress={handleSignup}
          >
            <Text style={styles.signupButtonText}>Sign-up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  topContent: {
    flex: 1,
    alignItems: "center",
  },
  bottomContent: {
    alignItems: "center",
    marginBottom: 40,
  },
  bannerImage: {
    marginVertical: 60,
    height: 200,
    width: 200,
  },
  title: {
    fontSize: 30,
    fontFamily: fonts.SemiBold,
    paddingHorizontal: 20,
    textAlign: "center",
    color: colors.primary,
    marginTop: 1,
  },
  subTitle: {
    fontSize: 16,
    paddingHorizontal: 20,
    textAlign: "center",
    color: colors.secondary,
    fontFamily: fonts.Medium,
    marginVertical: 20,
  },
  buttonContainer: {
    marginTop: 10,
    flexDirection: "row",
    borderWidth: 2,
    borderColor: colors.primary,
    width: "80%",
    height: 60,
    borderRadius: 100,
  },
  loginButtonWrapper: {
    justifyContent: "center",
    alignItems: "center",
    width: "50%",
    borderRadius: 98,
  },
  loginButtonText: {
    color: colors.white,
    fontSize: 18,
    fontFamily: fonts.SemiBold,
  },
  signupButtonText: {
    fontSize: 18,
    fontFamily: fonts.SemiBold,
  },
});
