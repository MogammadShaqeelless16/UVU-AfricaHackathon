import { View, TouchableOpacity, Platform, StyleSheet, Text } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import React, { useState } from 'react';
const menuItems = [
  { label: 'Profile', icon: 'user', screen: 'Profile' },
  { label: 'Home', icon: 'home', screen: 'Home' },
  { label: 'Map', icon: 'map', screen: 'MapScreen' },
  { label: 'Chat', icon: 'comment', screen: 'ChatScreen' },
];

const Navbar = ({ navigation }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleMenuItemPress = (screen) => {
    navigation.navigate(screen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <View style={[styles.navbar, Platform.OS === 'ios' && styles.iosNavbar]}>
      <View style={styles.iconContainer}>
        {menuItems.map((item, index) => (
          <TouchableOpacity key={index} onPress={() => handleMenuItemPress(item.screen)}>
            <FontAwesome name={item.icon} size={26} style={[styles.icon, { color: '#ffffff' }]} />
          </TouchableOpacity>
        ))}
       
        {Platform.OS === 'ios' && (
          <TouchableOpacity onPress={toggleDropdown}>
            <FontAwesome name="caret-down" size={24} style={[styles.icon, { color: '#c60076' }]} />
          </TouchableOpacity>
        )}
      </View>
     
      {isDropdownOpen && Platform.OS === 'ios' && (
        <View style={styles.dropdown}>
          {menuItems.map((item, index) => (
            <TouchableOpacity key={index} onPress={() => handleMenuItemPress(item.screen)}>
              <Text style={styles.dropdownText}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    backgroundColor: '',
    paddingTop: Platform.OS === 'ios' ? 40 : 20,
    position: 'relative',
  },
  iosNavbar: {
    paddingTop: 40,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 25,
  },
  icon: {
    marginRight: 20,
  },
  dropdown: {
    position: 'absolute',
    top: 60, 
    right: 20,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  dropdownText: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default Navbar;