import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import axios from 'axios';
import Navbar from '../components/Navbar';

const HomeScreen = () => {
  const [posts, setPosts] = useState([]);

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

  return (
    <View style={styles.container}>
      <Navbar navigation={navigation} />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.text}>WordPress Posts</Text>
        {posts.map(post => (
          <TouchableOpacity
            key={post.id}
            style={styles.card}
            onPress={() => navigation.navigate('PostDetails', { postId: post.id })}
          >
            <Text style={styles.title}>{post.title.rendered}</Text>
            {/* Add more content from the post if needed */}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0fb5ce',
  },
  content: {
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
    marginTop: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    width: '90%',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default HomeScreen;