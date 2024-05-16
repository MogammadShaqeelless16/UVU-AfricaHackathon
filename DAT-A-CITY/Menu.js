import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Animated, PanResponder } from 'react-native';

const Menu = () => {
  const [profiles, setProfiles] = useState([
    { id: 1, name: 'John', age: 25, bio: 'Likes hiking and reading.' },
    { id: 2, name: 'Jane', age: 28, bio: 'Enjoys painting and cooking.' },
    { id: 3, name: 'Alex', age: 23, bio: 'Passionate about traveling.' }
  ]);
  const [currentProfileIndex, setCurrentProfileIndex] = useState(0);
  const position = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gestureState) => {
        position.setValue({ x: gestureState.dx, y: 0 });
      },
      onPanResponderRelease: (event, gestureState) => {
        if (gestureState.dx > 120) {
          handleSwipeRight();
        } else if (gestureState.dx < -120) {
          handleSwipeLeft();
        } else {
          Animated.spring(position, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: false,
          }).start();
        }
      },
    })
  ).current;

  const handleSwipeLeft = () => {
    Animated.timing(position, {
      toValue: { x: -500, y: 0 },
      duration: 200,
      useNativeDriver: false,
    }).start(() => {
      setCurrentProfileIndex((currentProfileIndex + 1) % profiles.length);
      position.setValue({ x: 0, y: 0 });
    });
  };

  const handleSwipeRight = () => {
    Animated.timing(position, {
      toValue: { x: 500, y: 0 },
      duration: 200,
      useNativeDriver: false,
    }).start(() => {
      setCurrentProfileIndex((currentProfileIndex - 1 + profiles.length) % profiles.length);
      position.setValue({ x: 0, y: 0 });
    });
  };

  return (
    <View style={styles.container}>
      {profiles.length > 0 ? (
        <Animated.View
          style={[styles.profileCard, {
            transform: [{ translateX: position.x }],
          }]}
          {...panResponder.panHandlers}
        >
          <Text style={styles.bio} selectable={false}>{profiles[currentProfileIndex].bio}</Text>
        </Animated.View>
      ) : (
        <Text>No more profiles to swipe!</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 20,
    width: '80%',
    height: '60%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bio: {
    fontSize: 18,
    userSelect: 'none', // Prevent text selection
  },
});

export default Menu;
