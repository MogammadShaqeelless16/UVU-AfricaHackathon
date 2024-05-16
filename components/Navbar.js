import React, { useState } from 'react';
import { View, TouchableOpacity, Platform, StyleSheet, Text } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const menuItems = [
  { label: 'Profile', icon: 'user', screen: 'Profile' },
  { label: 'Home', icon: 'home', screen: 'Home' },
  { label: 'Map', icon: 'map', screen: 'MapScreen' },
];

const Navbar = ({ navigation }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // New state for sidebar

  const handleMenuItemPress = (screen) => {
    if (screen === 'Profile') {
      toggleSidebar(); // Open sidebar for Profile
    } else {
      navigation.navigate(screen);
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
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

      {/* Sidebar */}
      {isSidebarOpen && (
        <TouchableOpacity
          style={styles.sidebar}
          onPress={toggleSidebar} // Close sidebar when clicked outside
          activeOpacity={1} // Prevents TouchableOpacity from becoming transparent
        >
          <View style={styles.sidebarContent}>
            <Text style={styles.sidebarText}>Username: DummyUsername</Text>
            <Text style={styles.sidebarText}>Points: 100</Text>
          </View>
        </TouchableOpacity>
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
  sidebar: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: '100%', // Full width of the screen
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Semi-transparent background
    zIndex: 1, // Ensure sidebar is above other content
  },
  sidebarContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20, // Adjust padding as needed
    marginTop: Platform.OS === 'ios' ? 40 : 20, // Match navbar's top padding
  },
  sidebarText: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 10,
  },
});


export default Navbar;