import React, { useState, useEffect } from 'react';
import { View, Text, Image, Button, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import axios from 'axios';

const ShopScreen = ({ navigation }) => {
  const [badges, setBadges] = useState([]);
  const [points, setPoints] = useState(50); // Example initial points

  useEffect(() => {
    const fetchBadges = async () => {
      try {
        const response = await axios.get('https://example.com/api/badges');
        setBadges(response.data);
      } catch (error) {
        console.error('Error fetching badges:', error);
      }
    };

    fetchBadges();
  }, []);

  const handlePurchase = (badge) => {
    if (points >= badge.price) {
      setPoints(points - badge.price);
      alert(`You have purchased the ${badge.name} badge!`);
    } else {
      alert('Not enough points to purchase this badge.');
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.badgeContainer}>
      <Image source={{ uri: item.imageUrl }} style={styles.badgeImage} />
      <Text style={styles.badgeName}>{item.name}</Text>
      <Text style={styles.badgePrice}>Price: {item.price} points</Text>
      <Button title="Buy" onPress={() => handlePurchase(item)} />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.points}>Points: {points}</Text>
      <FlatList
        data={badges}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.badgeList}
      />
      <Button title="Back to Home" onPress={() => navigation.navigate('Home')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  points: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  badgeList: {
    paddingBottom: 16,
  },
  badgeContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  badgeImage: {
    width: 100,
    height: 100,
    marginBottom: 8,
  },
  badgeName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  badgePrice: {
    fontSize: 14,
    marginBottom: 8,
  },
});

export default ShopScreen;