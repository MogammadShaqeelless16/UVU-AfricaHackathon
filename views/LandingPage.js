import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Navbar from '../components/Navbar'; // Adjust the path as needed

const LandingPage = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* <Navbar navigation={navigation} /> */}
      <View style={styles.content}>
        <Image source={{ uri: './views/icon.png' }} style={styles.logo} />
        <Text style={styles.title}>Welcome to Our App!</Text>
        <Text style={styles.description}>
          Discover how our app works and make the most out of it.
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
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
    padding: 20,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#c60076',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
  },
});

export default LandingPage;
