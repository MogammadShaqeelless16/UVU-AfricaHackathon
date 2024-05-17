import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ImageBackground } from 'react-native';
import axios from 'axios';
import SwipeCards from 'react-native-swipe-cards';
import Navbar from '../components/Navbar';

const HomeScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  const [currentPostIndex, setCurrentPostIndex] = useState(0);
  const [points, setPoints] = useState(50); // Initial points set to 50

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('https://shaqeel.wordifysites.com/wp-json/wp/v2/posts');
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching WordPress posts:', error);
      }
    };

    fetchPosts();
  }, []);

  const handleYup = (post) => {
    // Handle "yes" swipe action
    console.log("Yes:", post.title.rendered);
    // Add 10 points
    setPoints(points + 10);
    // Move to the next post
    setCurrentPostIndex(currentPostIndex + 1);
  };

  const handleNope = (post) => {
    // Handle "no" swipe action
    console.log("No:", post.title.rendered);
    // Move to the next post
    setCurrentPostIndex(currentPostIndex + 1);
  };

  return (
    <ImageBackground 
      source={require('../assets/city centre.jpg')} // Local image path
      style={styles.backgroundImage}
    >
      <Navbar navigation={navigation} />
      <View style={styles.swipeCardsContainer}>
        <SwipeCards
          cards={posts}
          renderCard={(post) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() => navigation.navigate('PostDetails', { postId: post.id })}
            >
              <Text style={styles.title}>{post.title.rendered}</Text>
              {post.featured_media && (
                <Image
                  source={{ uri: post.featured_media.source_url }}
                  style={styles.image}
                />
              )}
            </TouchableOpacity>
          )}
          handleYup={handleYup}
          handleNope={handleNope}
          cardRemoved={() => {}}
          stack={false}
          loop={false}
        />
      </View>
      <View style={styles.pointsContainer}>
        <Text style={styles.points}>Points: {points}</Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  swipeCardsContainer: {
    flex: 1,
    alignItems: 'center', // Ensure cards are centered
    justifyContent: 'center', // Ensure cards are centered
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    width: '90%',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  pointsContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  points: {
    fontSize: 18,
    color: '#fff', // Set points color to white
    fontWeight: 'bold',
    fontFamily: 'CustomFont', // Use the custom font
  },
});

export default HomeScreen;
