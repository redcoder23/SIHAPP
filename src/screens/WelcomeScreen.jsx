import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

const WelcomeScreen = ({ navigation, route }) => {
  const { userData } = route.params || {};
  
  const handleNavigation = (screen) => {
    if (screen === 'Account') {
      navigation.navigate(screen, { user: userData });
    } else {
      navigation.navigate(screen);
    }
  };

  return (
    <View style={styles.container}>
      {/* Top Image */}
      <Image source={require('../assets/newman.png')} style={styles.image} />

      {/* Translucent Box */}
      <ScrollView contentContainerStyle={styles.translucentBox}>
        <Text style={styles.heading}>Nagrik Aur Samvidhan</Text>

        {/* Buttons */}
        {[
          { title: 'Interactive Storytelling', screen: 'Fight' },
          { title: 'Crossword', screen: 'Crossword' },
          { title: 'Sentiment Analysis', screen: 'sentiment' },
          'Account', 
          'Chatbot'
        ].map((item) => {
          const screen = typeof item === 'string' ? item : item.screen;
          const title = typeof item === 'string' ? item : item.title;
          
          return (
            <TouchableOpacity
              key={title}
              style={styles.button}
              onPress={() => handleNavigation(screen)}
            >
              <Text style={styles.buttonText}>{title}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff', // White background
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: 20,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    marginVertical: 20,
  },
  translucentBox: {
    width: '90%', // Adjusted width for better margins
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    justifyContent:'center'
  },
  heading: {
    fontSize: 40,
    color: '#000', // Black text
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#686D76', // Green button
    width: 250, 
    height:60,// Full width for buttons
    borderRadius: 10,
    paddingVertical: 12,
    marginVertical: 10, // Increased margin for better spacing
    alignItems: 'center',
    alignSelf:'center',
    shadowColor: '#000',
    shadowOffset: { width: 10, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonText: {
    color: '#000000', // White text
    fontSize: 20,
    fontWeight: '600',
  },
});