import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import * as AuthSession from 'expo-auth-session';
import { auth0Domain, auth0ClientId, redirectUri } from '../auth0Config';
import jwtDecode from 'jwt-decode';

const LoginScreen = ({ navigation }) => {
  const [userInfo, setUserInfo] = useState(null);

  const handleLogin = async () => {
    const authUrl = `https://${auth0Domain}/authorize?client_id=${auth0ClientId}&redirect_uri=${redirectUri}&response_type=id_token&scope=openid%20profile%20email&nonce=randomstring`;

    const result = await AuthSession.startAsync({ authUrl });

    if (result.type === 'success') {
      const { id_token } = result.params;
      const decoded = jwtDecode(id_token);
      setUserInfo(decoded);
      navigation.replace('Home'); // Navigate to Home screen after successful login
    }
  };

  return (
    <View style={styles.container}>
      {userInfo ? (
        <View>
          <Text style={styles.text}>Welcome, {userInfo.name}</Text>
        </View>
      ) : (
        <Pressable onPress={handleLogin} style={styles.button}>
          <Text style={styles.buttonText}>Login with Auth0</Text>
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0fb5ce',
  },
  text: {
    fontSize: 18,
    color: '#fff',
  },
  button: {
    backgroundColor: '#c60076',
    padding: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default LoginScreen;
