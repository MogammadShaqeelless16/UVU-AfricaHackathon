import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import axios from 'axios';
import SwipeCards from 'react-native-swipe-cards';
import Navbar from '../components/Navbar';

const HomeScreen = () => {
  const [posts, setPosts] = useState([]);
  const [currentPostIndex, setCurrentPostIndex] = useState(0);

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
    <View style={styles.container}>
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
                <a href={post.link} target="_blank" rel="noopener noreferrer">
                  <Image
                    source={{ uri: post.featured_media.source_url }}
                    style={styles.image}
                  />
                </a>
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
        <Text style={styles.points}>Points: 50</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0fb5ce',
  },
  swipeCardsContainer: {
    flex: 1,
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
    fontSize: 16,
    color: '#555', // Adjust the color as needed
  },
});

export default HomeScreen;