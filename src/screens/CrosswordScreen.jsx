import { StyleSheet, Text, View, ScrollView, TextInput } from 'react-native';
import React, { useState } from 'react';

const GRID_SIZE = 15;

// Define white cells (cells that should accept input) based on answers
const whiteCells = {
  // Across answers
  '0-0': true, '0-1': true, '0-2': true, '0-3': true, // NAME
  '0-5': true, '0-6': true, '0-7': true, '0-8': true, '0-9': true, // THREE
  '0-11': true, '0-12': true, '0-13': true, '0-14': true, // SEVEN
  '3-0': true, '3-1': true, '3-2': true, '3-3': true, '3-4': true, '3-5': true, '3-6': true, '3-7': true, // AMBEDKAR
  '6-3': true, '6-4': true, '6-5': true, '6-6': true, '6-7': true, '6-8': true, '6-9': true, '6-10': true, // PRESIDENT

  // Down answers
  '0-0': true, '1-0': true, '2-0': true, '3-0': true, '4-0': true, '5-0': true, '6-0': true, '7-0': true, '8-0': true, '9-0': true, // CHANDRACHUD
  '0-5': true, '1-5': true, '2-5': true, '3-5': true, '4-5': true, '5-5': true, '6-5': true, '7-5': true, // FOURTEEN
  '0-11': true, '1-11': true, '2-11': true, '3-11': true, '4-11': true, // EIGHT
  '3-7': true, '4-7': true, '5-7': true, '6-7': true, // 1951
  '6-3': true, '7-3': true, '8-3': true, '9-3': true, '10-3': true, // DELHI
};

const numberedCells = {
  '0-0': 1,
  '0-5': 2,
  '0-11': 3,
  '3-0': 4,
  '6-3': 5,
};

const questions = {
  across: {
    1: "First Article of Indian Constitution deals with ___ of India",
    2: "Fundamental Rights are given in Part ___ of Constitution",
    3: "Number of fundamental rights originally provided",
    4: "Father of Indian Constitution",
    5: "Constitutional head of India",
  },
  down: {
    1: "First woman Chief Justice of India",
    2: "Article ___ deals with Right to Equality",
    3: "Number of schedules in original constitution",
    4: "First Amendment was made in year ___",
    5: "Parliament house is located in ___",
  }
};

const Crossword = () => {
  const [gridValues, setGridValues] = useState({});
  const [selectedCell, setSelectedCell] = useState(null);

  const handleCellPress = (row, col) => {
    const cellKey = `${row}-${col}`;
    if (whiteCells[cellKey]) {
      setSelectedCell(cellKey);
    }
  };

  const handleInputChange = (row, col, value) => {
    const cellKey = `${row}-${col}`;
    if (whiteCells[cellKey]) {
      setGridValues(prev => ({
        ...prev,
        [cellKey]: value.toUpperCase()
      }));
    }
  };

  const renderCell = (row, col) => {
    const cellKey = `${row}-${col}`;
    const isWhite = whiteCells[cellKey];
    const cellNumber = numberedCells[cellKey];
    const isSelected = selectedCell === cellKey;

    return (
      <View 
        key={cellKey} 
        style={[
          styles.cell,
          isWhite ? styles.whiteCell : styles.blackCell,
          isSelected && styles.selectedCell,
          styles.cellBorder
        ]}
      >
        {cellNumber && <Text style={styles.cellNumber}>{cellNumber}</Text>}
        {isWhite && (
          <TextInput
            style={styles.input}
            maxLength={1}
            value={gridValues[cellKey] || ''}
            onChangeText={(value) => handleInputChange(row, col, value)}
            onFocus={() => handleCellPress(row, col)}
            accessibilityLabel={`Cell ${cellKey}`}
          />
        )}
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Constitutional Crossword</Text>
        <Text style={styles.subtitle}>Test your knowledge of Indian Constitution</Text>
      </View>

      <View style={styles.mainContent}>
        <View style={styles.gridOuterContainer}>
          <View style={styles.gridContainer}>
            {Array(GRID_SIZE).fill().map((_, row) => (
              <View key={row} style={styles.row}>
                {Array(GRID_SIZE).fill().map((_, col) => renderCell(row, col))}
              </View>
            ))}
          </View>
        </View>
        
        <View style={styles.questionsContainer}>
          {['across', 'down'].map((direction) => (
            <View key={direction} style={styles.questionSection}>
              <View style={styles.questionHeaderContainer}>
                <Text style={styles.questionHeader}>{direction.charAt(0).toUpperCase() + direction.slice(1)}</Text>
              </View>
              {Object.entries(questions[direction]).map(([number, question]) => (
                <View key={`${direction}-${number}`} style={styles.questionCard}>
                  <Text style={styles.questionNumber}>{number}</Text>
                  <Text style={styles.question}>{question}</Text>
                </View>
              ))}
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f5f6fa',
    },
    mainContent: {
      borderWidth: 10,
      borderColor: '#1a237e',
      margin: 10,
      borderRadius: 20,
      backgroundColor: '#fff',
      paddingVertical: 15,
    },
    headerContainer: {
      backgroundColor: '#1a237e',
      padding: 15,
      alignItems: 'center',
      borderBottomLeftRadius: 30,
      borderBottomRightRadius: 30,
      marginBottom: 15,
      elevation: 5,
      borderWidth: 2,
      borderColor: '#fff',
    },
    title: {
      fontSize: 22,
      fontWeight: 'bold',
      color: '#ffffff',
      marginBottom: 5,
      textTransform: 'uppercase',
      letterSpacing: 1.5,
    },
    subtitle: {
      fontSize: 12,
      color: '#e8eaf6',
      fontStyle: 'italic',
    },
    gridOuterContainer: {
      padding: 8,
      alignItems: 'center',
    },
    gridContainer: {
      backgroundColor: '#ffffff',
      padding: 8,
      borderRadius: 12,
      elevation: 4,
      borderWidth: 2,
      borderColor: '#1a237e',
      transform: [{ scale: 0.9 }], // Makes the grid slightly smaller
    },
    row: {
      flexDirection: 'row',
    },
    cell: {
      width: 25, // Reduced from 32
      height: 25, // Reduced from 32
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
    },
    cellBorder: {
      borderWidth: 0.5, // Reduced border width
      borderColor: '#1a237e',
    },
    blackCell: {
      backgroundColor: '#2c3e50',
    },
    whiteCell: {
      backgroundColor: '#ffffff',
    },
    selectedCell: {
      backgroundColor: '#e3f2fd',
      borderColor: '#1a237e',
      borderWidth: 1,
    },
    cellNumber: {
      position: 'absolute',
      top: 1,
      left: 1,
      fontSize: 6, // Reduced from 8
      color: '#1a237e',
      fontWeight: 'bold',
      zIndex: 1,
    },
    input: {
      width: '100%',
      height: '100%',
      textAlign: 'center',
      fontSize: 12, // Reduced from 16
      padding: 0,
      color: '#1a237e',
      fontWeight: '600',
    },
    questionsContainer: {
      padding: 8,
      marginTop: 8,
    },
    questionSection: {
      marginBottom: 15,
      backgroundColor: '#ffffff',
      borderRadius: 12,
      padding: 10,
      elevation: 3,
      borderWidth: 2,
      borderColor: '#1a237e',
    },
    questionHeaderContainer: {
      backgroundColor: '#1a237e',
      padding: 10,
      borderRadius: 8,
      marginBottom: 12,
      elevation: 2,
    },
    questionHeader: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#ffffff',
      textAlign: 'center',
      letterSpacing: 1,
    },
    questionCard: {
      backgroundColor: '#f8f9fe',
      padding: 10,
      borderRadius: 8,
      marginBottom: 6,
      flexDirection: 'row',
      borderWidth: 1,
      borderColor: '#e0e0e0',
      borderLeftWidth: 4,
      borderLeftColor: '#1a237e',
    },
    questionNumber: {
      fontSize: 12,
      fontWeight: 'bold',
      color: '#1a237e',
      marginRight: 8,
      minWidth: 16,
    },
    question: {
      fontSize: 12,
      color: '#2c3e50',
      flex: 1,
      lineHeight: 18,
    },
  });
  
  export default Crossword;