import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import React from 'react';
import { colors } from '../utils/colors';
import { fonts } from '../utils/fonts';
import axios from 'axios';

const AccountScreen = ({ route, navigation }) => {
  const { user } = route.params || {};
  
  

  const handleDeleteAccount = async () => {
    Alert.alert(
      "Delete Account",
      "Are you sure you want to delete your account? This action cannot be undone.",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Delete",
          onPress: async () => {
            try {
              const response = await axios.delete(
                `http://10.0.2.2:8080/api/users/${user.username}`
              );
              
              if (response.status === 200) {
                Alert.alert('Success', 'Account deleted successfully');
                navigation.reset({
                  index: 0,
                  routes: [{ name: 'HOME' }],
                });
              }
            } catch (error) {
              if (error.response) {
                Alert.alert('Error', 'Failed to delete account. Please try again.');
              } else {
                Alert.alert(
                  'Error',
                  'Unable to connect to the server. Please check your connection.'
                );
              }
              console.error('Delete account error:', error);
            }
          },
          style: "destructive"
        }
      ]
    );
  };

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Logout",
          onPress: () => {
            navigation.reset({
              index: 0,
              routes: [{ name: 'HOME' }],
            });
          }
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Text style={styles.title}>My Account</Text>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Username:</Text>
          <Text style={styles.value}>{user?.username}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.value}>{user?.email}</Text>
        </View>
      </View>
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={[styles.button, styles.deleteButton]} 
          onPress={handleDeleteAccount}
        >
          <Text style={styles.buttonText}>Delete Account</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.button, styles.logoutButton]} 
          onPress={handleLogout}
        >
          <Text style={styles.buttonText}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AccountScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 20,
  },
  profileContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontFamily: fonts.SemiBold,
    color: colors.primary,
    marginBottom: 30,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    backgroundColor: colors.gray,
    padding: 15,
    borderRadius: 10,
    width: '100%',
  },
  label: {
    fontSize: 16,
    fontFamily: fonts.Medium,
    color: colors.primary,
    width: 100,
  },
  value: {
    fontSize: 16,
    fontFamily: fonts.Regular,
    color: "#000000",
    flex: 1,
  },
  buttonContainer: {
    marginBottom: 20,
  },
  button: {
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    alignItems: 'center',
  },
  deleteButton: {
    backgroundColor: '#ff4444',
  },
  logoutButton: {
    backgroundColor: colors.primary,
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontFamily: fonts.SemiBold,
  },
});