import React, { useEffect } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import Navbar from '../components/Navbar';

const MapScreen = ({ navigation }) => {
  useEffect(() => {
    if (Platform.OS === 'web') {
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/leaflet@1.7.1/dist/leaflet.js';
      script.async = true;
      document.body.appendChild(script);
      script.onload = () => {
        const mapContainer = document.createElement('div');
        mapContainer.id = 'map';
        mapContainer.style.width = '100%';
        mapContainer.style.height = '100%';
        document.getElementById('mapContainer').appendChild(mapContainer);

        const script2 = document.createElement('script');
        script2.text = `
          var map = L.map('map').fitWorld();
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
          map.locate({setView: true, maxZoom: 16});
          function onLocationFound(e) {
            map.setView(e.latlng, 16);
            var radius = e.accuracy / 2;
            L.marker(e.latlng).addTo(map)
              .bindPopup("You are within " + radius + " meters from this point").openPopup();
            L.circle(e.latlng, radius).addTo(map);
          }
          map.on('locationfound', onLocationFound);
          function onLocationError(e) {
            alert(e.message);
          }
          map.on('locationerror', onLocationError);
        `;
        document.body.appendChild(script2);
      };
    }
  }, []);

  return (
    <View style={styles.container}>
      <Navbar navigation={navigation} />
      <View style={styles.content}>
        <View id="mapContainer" style={styles.mapContainer}></View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapContainer: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    overflow: 'hidden',
  },
});

export default MapScreen;
