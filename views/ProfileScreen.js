// ProfileScreen.js
import React from 'react';
import { View, Text, StyleSheet, Image, Button } from 'react-native';
import Navbar from '../components/Navbar';

const ProfileScreen = ({ navigation }) => {
  const user = {
    name: 'Bafana Madume',
    email: 'bafanagift14@gmail.com',
    profilePicture: 'https://via.placeholder.com/150',
  };

  return (
    <View style={styles.container}>
      <Navbar navigation={navigation} />
      <View style={styles.content}>
        <Image source={{ uri: user.profilePicture }} style={styles.profilePicture} />
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.email}>{user.email}</Text>
        {/* <Button title="Edit Profile" onPress={() => navigation.navigate('EditProfile')} /> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0fb5ce',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profilePicture: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#fff',
  },
  email: {
    fontSize: 18,
    marginBottom: 20,
    color: '#fff',
  },
});

export default ProfileScreen;



// // import React, { useState, useEffect } from 'react';
// // import { View, Text, StyleSheet, Image, Button, ActivityIndicator } from 'react-native';
// // import Navbar from '../components/Navbar';

// // const ProfileScreen = ({ navigation }) => {
// //   const [user, setUser] = useState(null);
// //   const [isLoading, setIsLoading] = useState(false);
// //   const [error, setError] = useState(null);

// //   useEffect(() => {
// //     const fetchUserData = async () => {
// //       setIsLoading(true);
// //       try {
// //         const response = await fetch('https://your-api-endpoint.com/user'); // Replace with your actual API endpoint
// //         if (!response.ok) {
// //           throw new Error('Failed to fetch user data');
// //         }
// //         const data = await response.json();
// //         setUser(data);
// //       } catch (error) {
// //         setError(error.message);
// //       } finally {
// //         setIsLoading(false);
// //       }
// //     };

// //     fetchUserData();
// //   }, []);

// //   return (
// //     <View style={styles.container}>
// //       <Navbar navigation={navigation} />
// //       {isLoading && (
// //         <View style={styles.loadingContainer}>
// //           <ActivityIndicator size="large" color="#0000ff" />
// //           <Text>Loading user data...</Text>
// //         </View>
// //       )}
// //       {error && <Text style={styles.error}>{error}</Text>}
// //       {user && (
// //         <View style={styles.content}>
// //           <View style={styles.profileSection}>
// //             <Image source={{ uri: user.profilePicture }} style={styles.profilePicture} />
// //           </View>
// //           <View style={styles.infoSection}>
// //             <Text style={styles.name}>{user.name}</Text>
// //             <Text style={styles.email}>{user.email}</Text>
// //             {user.bio && <Text style={styles.bio}>{user.bio}</Text>}
// //           </View>
// //           <Button title="Edit Profile" onPress={() => navigation.navigate('EditProfile')} />
// //         </View>
// //       )}
// //     </View>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     backgroundColor: '#f0f0f0',
// //   },
// //   loadingContainer: {
// //     flex: 1,
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //   },
// //   content: {
// //     flex: 1,
// //     padding: 20,
// //   },
// //   profileSection: {
// //     alignItems: 'center',
// //     marginBottom: 20,
// //   },
// //   profilePicture: {
// //     width: 100,
// //     height: 100,
// //     borderRadius: 50,
// //   },
// //   infoSection: {
// //     alignItems: 'center',
// //     marginBottom: 20,
// //   },
// //   name: {
// //     fontSize: 24,
// //     fontWeight: 'bold',
// //   },
// //   email: {
// //     fontSize: 18,
// //     color: '#808080',
// //   },
// //   bio: {
// //     fontSize: 16,
// //     marginTop: 5,
// //     textAlign: 'center',
// //   },
// //   error: {
// //     color: 'red',
// //     textAlign: 'center',
// //     marginTop: 20,
// //   },
// // });

// // export default ProfileScreen;
