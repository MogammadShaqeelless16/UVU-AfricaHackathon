// HomeScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Navbar from '../components/Navbar';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Navbar navigation={navigation} />
      <View style={styles.content}>
        <Text style={styles.text}>Home Screen</Text>
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
});

export default HomeScreen;
