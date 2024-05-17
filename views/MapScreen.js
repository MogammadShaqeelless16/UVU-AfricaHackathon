import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Navbar from '../components/Navbar';
import Map from 'ol/Map';
import OLView from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { fromLonLat } from 'ol/proj';
import { Vector as VectorLayer } from 'ol/layer';
import { Vector as VectorSource } from 'ol/source';
import { Icon, Style } from 'ol/style';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'; // Import the MaterialCommunityIcons

const MapScreen = ({ navigation }) => {
  const [map, setMap] = useState(null);

  useEffect(() => {
    // Initialize map
    const newMap = new Map({
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

    setMap(newMap);

    return () => {
      // Cleanup
      if (map) {
        map.setTarget(null);
      }
    };
  }, []);

  useEffect(() => {
    if (!map) return;

    // Try to get user's current location
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        // Update map view to user's location
        const view = map.getView();
        view.setCenter(fromLonLat([longitude, latitude]));
        view.setZoom(15); // Zoom to street level

        // Add marker for user's location
        const marker = new Feature({
          geometry: new Point(fromLonLat([longitude, latitude])),
        });

        const markerStyle = new Style({
          image: new Icon({
            // No need for require here, just specify the icon name
            src: '', // No need for asset
            scale: 0.05, // Adjust scale of marker icon
          }),
        });

        marker.setStyle(markerStyle);

        const vectorLayer = new VectorLayer({
          source: new VectorSource({
            features: [marker],
          }),
        });

        map.addLayer(vectorLayer);
      },
      (error) => {
        console.error('Error getting user location:', error);
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }, [map]);

  return (
    <View style={styles.container}>
      <Navbar navigation={navigation} />
      <View style={styles.map}>
        <div id="map" style={{ flex: 1 }} />
        {/* Use a MaterialCommunityIcons marker for user's location */}
        <MaterialCommunityIcons name="map-marker" size={40} color="red" style={{ position: 'absolute', top: '50%', left: '50%', marginLeft: -20, marginTop: -40 }} />
      </View>
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
    position: 'relative',
  },
});

export default MapScreen;
