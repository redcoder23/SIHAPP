import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import axios from 'axios';

const SentimentScreen = () => {
  const [userInput, setUserInput] = useState('');
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://10.0.2.2:8080/api/sentiment', {
        text: userInput,
      });
      setResponseData(response.data);
      setError(''); // Clear any previous errors
    } catch (error) {
      console.error('Error fetching response:', error);
      setError('Failed to fetch sentiment data.'); // Set error message
    }
  };

  const calculatePercentages = () => {
    if (!responseData) return { negative_perc: 0, neutral_perc: 0, positive_perc: 0 };

    const { negative, neutral, positive } = responseData;
    const total = negative + neutral + positive;

    const negative_perc = total > 0 ? (negative / total) * 100 : 0;
    const neutral_perc = total > 0 ? (neutral / total) * 100 : 0;
    const positive_perc = total > 0 ? (positive / total) * 100 : 0;

    return { negative_perc, neutral_perc, positive_perc };
  };

  const { negative_perc, neutral_perc, positive_perc } = calculatePercentages();

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter your text"
        value={userInput}
        onChangeText={setUserInput}
      />
      <Button title="Submit" onPress={handleSubmit} />
      {error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        responseData && (
          <View style={styles.resultContainer}>
            <Text style={styles.resultText}>Negative: {negative_perc.toFixed(2)}%</Text>
            <Text style={styles.resultText}>Neutral: {neutral_perc.toFixed(2)}%</Text>
            <Text style={styles.resultText}>Positive: {positive_perc.toFixed(2)}%</Text>
          </View>
        )
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    width: '100%',
    paddingHorizontal: 10,
  },
  resultContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  resultText: {
    fontSize: 18,
    marginVertical: 5,
  },
  errorText: {
    color: 'red',
    marginTop: 10,
  },
});

export default SentimentScreen;
