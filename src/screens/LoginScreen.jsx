import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
    Alert,
    KeyboardAvoidingView,
    ScrollView,
    TouchableWithoutFeedback,
    Keyboard,
    Platform,
  } from 'react-native';
  import React, { useState } from 'react';
  import Ionicons from 'react-native-vector-icons/Ionicons';
  import axios from 'axios';
  import { colors } from '../utils/colors';
  import { fonts } from '../utils/fonts';
  import { useNavigation } from '@react-navigation/native';
  
  const LoginScreen = () => {
    const navigation = useNavigation();
    const [secureEntry, setSecureEntry] = useState(true);
  
    // State for user inputs
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
  
    const handleGoBack = () => {
      navigation.goBack();
    };
  
    const handleSignup = () => {
      navigation.navigate('SignUp');
    };
  
    const handleLogin = async () => {
      const loginData = { username, password };
  
      try {
        const response = await axios.post(
          'http://10.0.2.2:8080/api/login',
          loginData
        ); // Use '10.0.2.2' for Android Emulator
        if (response.status === 200) {
          
          Alert.alert('Success', 'Login successful!');
          navigation.navigate('Welcome', { 
            userData: {
              username: response.data.username,
              email: response.data.email
            }
          });
        }
      } catch (error) {
        if (error.response) {
          if (error.response.status === 401) {
            Alert.alert('Error', 'Invalid credentials'); // Handle unauthorized error
          } else {
            Alert.alert(
              'Error',
              'An unexpected error occurred. Please try again.'
            );
          }
        } else {
          Alert.alert(
            'Error',
            'Unable to connect to the server. Please check your connection.'
          );
        }
      }
    };
  
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.container}
          keyboardVerticalOffset={60} // Adjust based on header height
        >
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <TouchableOpacity
              style={styles.backButtonWrapper}
              onPress={handleGoBack}
            >
              <Ionicons
                name="arrow-back-outline"
                size={25}
                color={colors.primary}
              />
            </TouchableOpacity>
            <View style={styles.textContainer}>
              <Text style={styles.headingText}>Hey,</Text>
              <Text style={styles.headingText}>Welcome</Text>
              <Text style={styles.headingText}>Back</Text>
            </View>
            {/* form */}
            <View style={styles.formContainer}>
              {/* Username Input */}
              <View style={styles.inputContainer}>
                <Ionicons
                  name="person-outline"
                  size={30}
                  color={colors.secondary}
                />
                <TextInput
                  style={styles.TextInput}
                  placeholder="Enter your Username"
                  placeholderTextColor={colors.secondary}
                  value={username}
                  onChangeText={setUsername}
                />
              </View>
              {/* Password Input */}
              <View style={styles.inputContainer}>
                <Ionicons
                  name="lock-closed-outline"
                  size={30}
                  color={colors.secondary}
                />
                <TextInput
                  style={styles.TextInput}
                  placeholder="Enter your Password"
                  placeholderTextColor={colors.secondary}
                  secureTextEntry={secureEntry}
                  value={password}
                  onChangeText={setPassword}
                />
                <TouchableOpacity onPress={() => setSecureEntry((prev) => !prev)}>
                  <Ionicons name="eye-outline" size={30} color={colors.secondary} />
                </TouchableOpacity>
              </View>
              <TouchableOpacity>
                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.loginButtonWrapper}
                onPress={handleLogin}
              >
                <Text style={styles.loginText}>LOGIN</Text>
              </TouchableOpacity>
              <View style={styles.footerContainer}>
                <Text style={styles.accountText}>Don’t have an account?</Text>
                <TouchableOpacity onPress={handleSignup}>
                  <Text style={styles.signupText}>Sign up</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    );
  };
  
  export default LoginScreen;
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.white,
      padding: 20,
    },
    backButtonWrapper: {
      height: 40,
      width: 40,
      backgroundColor: colors.gray,
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
    textContainer: {
      marginVertical: 20,
    },
    headingText: {
      fontSize: 32,
      color: colors.primary,
      fontFamily: fonts.SemiBold,
    },
    formContainer: {
      marginTop: 20,
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: colors.secondary,
      borderRadius: 100,
      paddingHorizontal: 20,
      padding: 2,
      marginVertical: 10,
    },
    TextInput: {
      flex: 1,
      paddingHorizontal: 10,
      fontFamily: fonts.Light,
    },
    forgotPasswordText: {
      textAlign: 'right',
      color: colors.primary,
      fontFamily: fonts.SemiBold,
      marginVertical: 10,
    },
    loginButtonWrapper: {
      backgroundColor: colors.primary,
      borderRadius: 100,
      marginTop: 20,
    },
    loginText: {
      color: colors.white,
      fontSize: 20,
      fontFamily: fonts.SemiBold,
      textAlign: 'center',
      padding: 10,
    },
    footerContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: 20,
      gap: 5,
    },
    accountText: {
      color: colors.primary,
      fontFamily: fonts.Regular,
    },
    signupText: {
      color: colors.primary,
      fontFamily: fonts.Bold,
    },
  });
  