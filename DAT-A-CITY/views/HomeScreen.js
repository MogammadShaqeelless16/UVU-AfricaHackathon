import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Navbar from '../components/Navbar';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Navbar navigation={navigation} />
      <View style={styles.content}>
        <Text style={styles.text}>Home Screen</Text>

        {/* Grid Layout */}
        <View style={styles.gridContainer}>
          {/* Row 1 */}
          <View style={styles.row}>
            {/* Column 1 */}
            <View style={styles.column}>
              <View style={styles.blockContainer}>
                <Text style={styles.blockTitle}>Quiz 1</Text>
                <Text style={styles.points}>100 points</Text>
                {/* Add any additional content for the quiz */}
              </View>
            </View>
            {/* Column 2 */}
            <View style={styles.column}>
              <View style={styles.blockContainer}>
                <Text style={styles.blockTitle}>Quiz 2</Text>
                <Text style={styles.points}>50 points</Text>
                {/* Add any additional content for the quiz */}
              </View>
            </View>
            {/* Column 3 */}
            <View style={styles.column}>
              <View style={styles.blockContainer}>
                <Text style={styles.blockTitle}>Quiz 3</Text>
                <Text style={styles.points}>75 points</Text>
                {/* Add any additional content for the quiz */}
              </View>
            </View>
          </View>

          {/* Row 2 */}
          <View style={styles.row}>
            {/* Column 1 */}
            <View style={styles.column}>
              <View style={styles.blockContainer}>
                <Text style={styles.blockTitle}>Quiz 4</Text>
                <Text style={styles.points}>120 points</Text>
                {/* Add any additional content for the quiz */}
              </View>
            </View>
            {/* Column 2 */}
            <View style={styles.column}>
              <View style={styles.blockContainer}>
                <Text style={styles.blockTitle}>Quiz 5</Text>
                <Text style={styles.points}>80 points</Text>
                {/* Add any additional content for the quiz */}
              </View>
            </View>
            {/* Column 3 */}
            <View style={styles.column}>
              <View style={styles.blockContainer}>
                <Text style={styles.blockTitle}>Quiz 6</Text>
                <Text style={styles.points}>90 points</Text>
                {/* Add any additional content for the quiz */}
              </View>
            </View>
          </View>

          {/* Row 3 */}
          <View style={styles.row}>
            {/* Column 1 */}
            <View style={styles.column}>
              <View style={styles.blockContainer}>
                <Text style={styles.blockTitle}>Quiz 7</Text>
                <Text style={styles.points}>60 points</Text>
                {/* Add any additional content for the quiz */}
              </View>
            </View>
            {/* Column 2 */}
            <View style={styles.column}>
              <View style={styles.blockContainer}>
                <Text style={styles.blockTitle}>Quiz 8</Text>
                <Text style={styles.points}>110 points</Text>
                {/* Add any additional content for the quiz */}
              </View>
            </View>
            {/* Column 3 */}
            <View style={styles.column}>
              <View style={styles.blockContainer}>
                <Text style={styles.blockTitle}>Quiz 9</Text>
                <Text style={styles.points}>70 points</Text>
                {/* Add any additional content for the quiz */}
              </View>
            </View>
          </View>
        </View>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0fb5ce',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
  },
  gridContainer: {
    flexDirection: 'column', // Main axis
    justifyContent: 'center', // Main axis
    alignItems: 'center', // Cross axis
  },
  row: {
    flexDirection: 'row', // Main axis
    justifyContent: 'center', // Main axis
    alignItems: 'center', // Cross axis
  },
  column: {
    flex: 1,
    justifyContent: 'center', // Main axis
    alignItems: 'center', // Cross axis
  },
  blockContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    width: '90%',
    // Add any additional styling as needed
  },
  blockTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  points: {
    fontSize: 16,
    color: '#888',
  },
});

export default HomeScreen;
