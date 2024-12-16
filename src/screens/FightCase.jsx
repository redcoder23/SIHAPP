import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, SafeAreaView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';

const FightCase = () => {
    // Predefined text to be sent
    const PREDEFINED_INPUT = "Consider the case *Ramana Dayaram Shetty vs The International Airport Authority of India* decided on May 4, 1979. Your task is to reconstruct the case proceedings in a detailed, step-by-step narrative format.\nFor each significant part of the case:\n1. Present the case proceedings in a clear and engaging way.\n2. Ask an analytical or opinion-based question related to the preceding part. These questions should be concise and fall into one of the following categories:\n   - Agree/Disagree type\n   - Analytical opinion type (e.g., \"Who do you think is right? or Do you think this was moral according to this or that law\")\n   - Predictive questions (e.g., \"What do you think could happen next this or that ? \")\n3. Keep it interactive like the user feels immersed in the case\n4. Do not wait for user answers; proceed directly to the next part of the case after each question.And every question must end with symbol \"#\"\n5. Conclude the output with a summary of the case, its key points, and the actual verdict delivered by the court.\n\nEnsure a conversational tone that engages the user and guides them through the case while prompting thought and reflection on the legal, ethical, and practical dimensions of the case.";

    const [responses, setResponses] = useState([]);
    const [currentResponseIndex, setCurrentResponseIndex] = useState(0);
    const [loading, setLoading] = useState(false);
    const [finished, setFinished] = useState(false);

    const handleSubmit = async () => {
        setLoading(true);
        try {
            // First API call with predefined input
            const response1 = await axios.post('https://3e34-34-125-150-83.ngrok-free.app/generate', { input: PREDEFINED_INPUT });
            const output = response1.data.output;

            // Second API call with the required data structure
            const response2 = await axios.post('http://10.0.2.2:8080/api/responses', { 
                userInput: PREDEFINED_INPUT, 
                response: output 
            });
            setResponses([
                response2.data.question1, 
                response2.data.question2, 
                response2.data.question3, 
                response2.data.question4
            ]);
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
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <TouchableOpacity 
                    style={styles.startButton} 
                    onPress={handleSubmit} 
                    disabled={loading || responses.length > 0}
                >
                    <LinearGradient
                        colors={['#FF6B6B', '#4ECDC4']}
                        style={styles.gradientButton}
                        start={{x: 0, y: 0}}
                        end={{x: 1, y: 0}}
                    >
                        <Text style={styles.startButtonText}>Start Legal Adventure</Text>
                    </LinearGradient>
                </TouchableOpacity>

                {responses.length > 0 && !finished && (
                    <View style={styles.contentContainer}>
                        <Text style={styles.responseText}>
                            {responses[currentResponseIndex] || "No response available."}
                        </Text>
                        
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity 
                                style={[styles.gameButton, styles.agreeButton]} 
                                onPress={handleResponseClick}
                            >
                                <Text style={styles.buttonText}>I Agree</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                style={[styles.gameButton, styles.disagreeButton]} 
                                onPress={handleResponseClick}
                            >
                                <Text style={styles.buttonText}>I Disagree</Text>
                            </TouchableOpacity>
                        </View>

                        <Image 
                            source={require('../assets/kid.jpg')} 
                            style={styles.characterImage} 
                            resizeMode="contain" 
                        />
                    </View>
                )}
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#f0f0f0',
    },
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    contentContainer: {
        width: '100%',
        alignItems: 'center',
        paddingTop: 40,
    },
    responseText: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 20,
        paddingHorizontal: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 20,
    },
    characterImage: {
        width: '100%',
        height: 300,
        borderRadius: 10,
    },
    gameButton: {
        flex: 1,
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 5,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    agreeButton: {
        backgroundColor: '#4CAF50', // Green
    },
    disagreeButton: {
        backgroundColor: '#F44336', // Red
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    startButton: {
        width: '80%',
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
        elevation: 8,
        borderRadius: 15,
    },
    gradientButton: {
        borderRadius: 15,
        paddingVertical: 15,
        paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    startButtonText: {
        color: 'white',
        fontSize: 20,
        fontWeight: '900', // Ultra-bold
        letterSpacing: 1.2, // Slight letter spacing
        textTransform: 'uppercase', // All caps for more impact
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: {width: 1, height: 1},
        textShadowRadius: 2,
    },
});

export default FightCase;