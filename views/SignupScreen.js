import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';

const SignupScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const BASE_URL = 'https://shaqeel.wordifysites.com/wp-json/wp/v2';
  const USERNAME = 'Jason1014';
  const PASSWORD = 'OY29 oeu8 8JB7 Ssht rVTe cSia';

  // Create an instance of axios with authentication details
  const axiosInstance = axios.create({
    baseURL: BASE_URL,
    auth: {
      username: USERNAME,
      password: PASSWORD,
    },
  });

  const handleSignup = async () => {
    try {
      const response = await axiosInstance.post('/users/register', {
        username: username,
        email: email,
        password: password,
      });
      // Handle successful signup (e.g., redirect to landing page)
      console.log('Signup successful:', response.data);
      navigation.navigate('LandingPage'); // Redirect to the landing page after successful signup
    } catch (error) {
      // Handle signup failure (e.g., display error message)
      console.error('Signup failed:', error.response.data);
      // Display error message to the user
      setError(error.response.data.message || 'Signup failed. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Sign Up" onPress={handleSignup} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 16,
    borderRadius: 4,
  },
  error: {
    color: 'red',
    marginBottom: 16,
    textAlign: 'center',
  },
});

export default SignupScreen;
