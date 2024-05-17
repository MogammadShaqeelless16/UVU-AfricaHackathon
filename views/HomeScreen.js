import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Modal, Button, ImageBackground } from 'react-native';
import axios from 'axios';
import SwipeCards from 'react-native-swipe-cards';
import { FontAwesome } from '@expo/vector-icons'; // Import FontAwesome
import Navbar from '../components/Navbar';

const HomeScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  const [currentPostIndex, setCurrentPostIndex] = useState(0);
  const [points, setPoints] = useState(50); // Initial points set to 50
  const [modalVisible, setModalVisible] = useState(false); // State for modal visibility
  const [arrowsVisible, setArrowsVisible] = useState(true); // State for arrow visibility
  const [selectedPost, setSelectedPost] = useState(null); // Selected post for modal content

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
    // Add 10 points
    setPoints(points + 10);
    setCurrentPostIndex(currentPostIndex + 1);
    setSelectedPost(post); // Set the selected post for modal content
    setModalVisible(true); // Show the info modal when swiped right
    setArrowsVisible(false); // Hide arrows on swipe
  };

  const handleNope = (post) => {
    console.log("No:", post.title.rendered);
    setCurrentPostIndex(currentPostIndex + 1);
    setArrowsVisible(false); // Hide arrows on swipe
  };

  const handleLeftArrow = () => {
    if (currentPostIndex > 0) {
      setCurrentPostIndex(currentPostIndex - 1);
    }
  };

  const handleRightArrow = () => {
    if (currentPostIndex < posts.length - 1) {
      setCurrentPostIndex(currentPostIndex + 1);
    }
  };

  const handleSwipeComplete = () => {
    setArrowsVisible(true); // Show arrows after swipe completes
  };

  return (
    <ImageBackground
      source={require('../assets/city centre.jpg')} // Local image path
      style={styles.backgroundImage}
    >
      <Navbar navigation={navigation} />
      <View style={styles.swipeCardsContainer}>
        {/* Left Arrow */}
        {arrowsVisible && (
          <TouchableOpacity style={styles.leftArrowContainer} onPress={handleLeftArrow}>
            <FontAwesome name="hand-o-left" size={65} color="#fff" />
          </TouchableOpacity>
        )}

        {/* SwipeCards component */}
        <SwipeCards
          cards={posts}
          renderCard={(post) => {
            // Extract the image URL from the post content
            const regex = /<img.*?src=['"](.*?)['"]/;
            const match = regex.exec(post.content.rendered);
            const imageUrl = match ? match[1] : null;

            return (
              <TouchableOpacity
                style={styles.card}
                onPress={() => navigation.navigate('PostDetails', { postId: post.id })}
              >
                {imageUrl && (
                  <Image
                    source={{ uri: imageUrl }}
                    style={styles.image}
                  />
                )}
                <Text style={styles.title}>{post.title.rendered}</Text>
              </TouchableOpacity>
            );
          }}
          handleYup={handleYup}
          handleNope={handleNope}
          cardRemoved={handleSwipeComplete}
          stack={false}
          loop={false}
        />

        {/* Right Arrow */}
        {arrowsVisible && (
          <TouchableOpacity style={styles.rightArrowContainer} onPress={handleRightArrow}>
            <FontAwesome name="hand-o-right" size={65} color="#fff" />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.pointsContainer}>
        <Text style={styles.points}>Points: {points}</Text>
      </View>

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
            {selectedPost && (
              <View>
                <Text style={styles.modalTitle}>{selectedPost.title.rendered}</Text>
                <Text style={styles.modalContent} dangerouslySetInnerHTML={{ __html: selectedPost.content.rendered }}></Text>
              </View>
            )}
            <Button title="Close" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>

      {/* Navigate to Shop Button */}
      <TouchableOpacity
        style={styles.shopButton}
        onPress={() => navigation.navigate('Shop')}
      >
        <FontAwesome name="shopping-cart" size={30} color="#fff" />
      </TouchableOpacity>
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
    flexDirection: 'row', // Horizontal layout
    justifyContent: 'center',
    alignItems: 'center', // Ensure cards are centered vertically
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
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalView: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    elevation: 5,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  leftArrowContainer: {
    position: 'absolute',
    left: 20,
    top: '50%',
    transform: [{ translateY: -20 }], // Adjust the icon position vertically
  },
  rightArrowContainer: {
    position: 'absolute',
    right: 20,
    top: '50%',
    transform: [{ translateY: -20 }], // Adjust the icon position vertically
  },
  shopButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#000', // Adjust button background color as needed
    padding: 10,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default HomeScreen;
