import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Navbar from '../components/Navbar';
import Map from 'ol/Map';
import OLView from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';

const MapScreen = ({ navigation }) => {
  useEffect(() => {
    // Initialize map
    const map = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new OLView({
        center: [0, 0],
        zoom: 2,
      }),
    });

    // Try to get user's current location
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        map.getView().setCenter([longitude, latitude]);
        map.getView().setZoom(10); // Set zoom level according to your preference
      },
      (error) => {
        console.error('Error getting user location:', error);
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }, []);

  return (
    <View style={styles.container}>
      <Navbar navigation={navigation} />
      <div id="map" style={styles.map}></div>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    overflow: 'hidden',
  },
});

export default MapScreen;
