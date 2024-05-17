import React from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';
// import Navbar from '../components/Navbar';

const LandingPage = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* <Navbar navigation={navigation} /> */}
      <Image
        source={require('../assets/icon.png')}
        style={styles.logo}
      />
      <Text style={styles.title}>Welcome to Our App</Text>
      <Text style={styles.description}>Here's how our app works...</Text>
      <Button title="Login" onPress={() => navigation.navigate('Login')} />
      <Button title="Signup" onPress={() => navigation.navigate('Signup')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 32,
  },
});

export default LandingPage;