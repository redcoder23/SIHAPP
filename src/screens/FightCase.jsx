import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';

const FightCase = () => {
    const [userInput, setUserInput] = useState('');
    const [responses, setResponses] = useState([]);
    const [currentResponseIndex, setCurrentResponseIndex] = useState(0);
    const [loading, setLoading] = useState(false);
    const [finished, setFinished] = useState(false);

    const handleSubmit = async () => {
        setLoading(true);
        try {
            // First API call
            const response1 = await axios.post('https://d48f-34-16-194-128.ngrok-free.app/generate', { input: userInput });
            const output = response1.data.output;

            // Second API call with the required data structure
            const response2 = await axios.post('http://10.0.2.2:8080/api/responses', { userInput: userInput, response: output });
            setResponses([response2.data.question1, response2.data.question2, response2.data.question3, response2.data.question4]);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleResponseClick = () => {
        if (currentResponseIndex < responses.length - 1) {
            setCurrentResponseIndex(currentResponseIndex + 1);
        } else {
            setFinished(true);
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Enter your text"
                value={userInput}
                onChangeText={setUserInput}
            />
            <Button title="Submit" onPress={handleSubmit} disabled={loading} />
            <View style={styles.dialogueBox}>
                <Text>{finished ? "No more responses." : responses[currentResponseIndex]}</Text>
                <Button title="I Agree" onPress={handleResponseClick} disabled={finished} />
                <Button title="I Disagree" onPress={handleResponseClick} disabled={finished} />
            </View>
            <ScrollView contentContainerStyle={styles.questionsContainer}>
                {/* Existing questions display logic can be removed or modified as needed */}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    questionsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    questionBox: {
        width: '100%',
        borderWidth: 1,
        borderColor: 'black',
        padding: 20,
        marginBottom: 10,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    dialogueBox: {
        borderWidth: 1,
        borderColor: 'black',
        padding: 20,
        marginBottom: 20,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default FightCase;