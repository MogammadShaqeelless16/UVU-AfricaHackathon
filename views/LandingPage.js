import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Linking } from 'react-native';
import Navbar from '../components/Navbar'; // Adjust the path as needed
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'; // Import the MaterialCommunityIcons

const LandingPage = ({ navigation }) => {
  // Define an object with team members' names and their LinkedIn usernames or profile URLs
  const teamMembers = [
    { name: 'Phindile Dhlamini', linkedin: 'phindile-dhlamini' },
    { name: 'Kopano Maluleke', linkedin: 'kopano-maluleke' },
    { name: 'Safiyyah Slinger', linkedin: 'safiyyah-slinger' },
    { name: 'Bafana Madume', linkedin: 'bafana' },
    { name: 'Jason Madume', linkedin: 'bafana' },
    { name: 'Shaqeel Less', linkedin: 'shaqeel-less' },
  ];

  // Function to open LinkedIn profile when a team member's name is pressed
  const handleLinkedInPress = (linkedinUsername) => {
    const linkedinURL = `https://www.linkedin.com/in/${linkedinUsername}`;
    Linking.openURL(linkedinURL);
  };

  return (
    <View style={styles.container}>
      {/* <Navbar navigation={navigation} /> */}
      <View style={styles.content}>
        {/* Logo */}
        <Image source={require('../assets/icon.png')} style={styles.logo} />
        <Text style={styles.title}>Welcome to Our App!</Text>
        <Text style={styles.description}>
          Discover how our app works and make the most out of it.
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
      {/* Meet the Team section */}
      <View style={styles.teamSection}>
        <Text style={styles.sectionTitle}>OUR TEAM</Text>
        {/* Map over team members and render their names with LinkedIn icons */}
        {teamMembers.map((member, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleLinkedInPress(member.linkedin)}
            style={styles.teamMemberContainer}
          >
            <Text style={styles.teamMember}>{member.name}</Text>
            <MaterialCommunityIcons
              name="linkedin"
              size={20}
              color="#0077b5"
              style={styles.linkedinIcon}
            />
          </TouchableOpacity>
        ))}
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
    padding: 20,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#c60076',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
  },
  teamSection: {
    backgroundColor: '#ffffff',
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  teamMemberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  teamMember: {
    fontSize: 16,
    marginRight: 10,
  },
  linkedinIcon: {
    marginLeft: 'auto',
  },
});

export default LandingPage;
