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
  
  const SignupScreen = () => {
    const navigation = useNavigation();
    const [secureEntry, setSecureEntry] = useState(true);
  
    // State for user inputs
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const handleGoBack = () => {
      navigation.goBack();
    };
  
    const handleSignup = async () => {
      const userData = {
        username,
        email,
        password,
      };
  
      try {
        const response = await axios.post(
          'http://10.0.2.2:8080/api/users',
          userData
        );
  
        if (response.status === 201) {
          Alert.alert('Success', 'User created successfully!');
          navigation.navigate('LOGIN'); // Navigate to Login on successful sign-up
        }
      } catch (error) {
        if (error.response) {
          if (error.response.status === 409) {
            Alert.alert('Error', error.response.data); // Handle conflict errors
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
            <TouchableOpacity style={styles.backButtonWrapper} onPress={handleGoBack}>
              <Ionicons name={'arrow-back-outline'} size={25} color={colors.primary} />
            </TouchableOpacity>
            <View style={styles.textContainer}>
              <Text style={styles.headingText}>Let's get</Text>
              <Text style={styles.headingText}>Started</Text>
            </View>
            {/* form */}
            <View style={styles.formContainer}>
              {/* Username Input */}
              <View style={styles.inputContainer}>
                <Ionicons name="person-outline" size={30} color={colors.secondary} />
                <TextInput
                  style={styles.TextInput}
                  placeholder="Enter your Username"
                  placeholderTextColor={colors.secondary}
                  value={username}
                  onChangeText={setUsername}
                />
              </View>
              {/* Email Input */}
              <View style={styles.inputContainer}>
                <Ionicons name="mail-outline" size={30} color={colors.secondary} />
                <TextInput
                  style={styles.TextInput}
                  placeholder="Enter your Email"
                  placeholderTextColor={colors.secondary}
                  keyboardType="email-address"
                  value={email}
                  onChangeText={setEmail}
                />
              </View>
              {/* Password Input */}
              <View style={styles.inputContainer}>
                <Ionicons name="lock-closed-outline" size={30} color={colors.secondary} />
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
              <TouchableOpacity
                style={styles.signupButtonWrapper}
                onPress={handleSignup}
              >
                <Text style={styles.signupText}>SIGN-UP</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    );
  };
  
  export default SignupScreen;
  
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
    signupButtonWrapper: {
      backgroundColor: colors.primary,
      borderRadius: 100,
      marginTop: 20,
    },
    signupText: {
      color: colors.white,
      fontSize: 20,
      fontFamily: fonts.SemiBold,
      textAlign: 'center',
      padding: 10,
    },
  });
  