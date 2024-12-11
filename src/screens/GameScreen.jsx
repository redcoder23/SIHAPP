import { StyleSheet, Text, View, Button } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

const GameScreen = () => {
  const navigation = useNavigation();

  const handleFightCase = () => {
    navigation.navigate('Fight');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Game Screen</Text>
      <Button title="Fight Your Own Case" onPress={handleFightCase} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});

export default GameScreen; 