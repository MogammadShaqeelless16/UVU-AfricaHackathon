import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      {/* Replace 'splash.gif' with the actual filename of your GIF */}
      <Image source={require('../assets/splash.gif')} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff', // Adjust background color as needed
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain', // Adjust image resizing mode as needed
  },
});

export default SplashScreen;
