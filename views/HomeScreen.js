import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Modal, Button } from 'react-native';
import axios from 'axios';
import SwipeCards from 'react-native-swipe-cards';
import Navbar from '../components/Navbar';

const HomeScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  const [currentPostIndex, setCurrentPostIndex] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);

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
    console.log("Yes:", post.title.rendered);
    setCurrentPostIndex(currentPostIndex + 1);
  };

  const handleNope = (post) => {
    console.log("No:", post.title.rendered);
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

      {/* Button to open the modal */}
      <Button title="Show Info" onPress={() => setModalVisible(true)} />

      {/* Modal Popup */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>This is the information popup!</Text>
            <Button title="Close" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
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
    color: '#555',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 15,
  },
});

export default HomeScreen;