import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
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
      <SwipeCards
        cards={posts}
        renderCard={(post) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('PostDetails', { postId: post.id })}
          >
            <Text style={styles.title}>{post.title.rendered}</Text>
            {/* Add more content from the post if needed */}
          </TouchableOpacity>
        )}
        handleYup={handleYup}
        handleNope={handleNope}
        cardRemoved={() => {}}
        stack={false}
        loop={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0fb5ce',
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
});

export default HomeScreen;