import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import * as Location from 'expo-location';

const App = () => {
  const [location, setLocation] = useState<any>(null);
  const [locationsList, setLocationsList] = useState<any[]>([]);

  useEffect(() => {
    // Aquí puedes cargar las ubicaciones almacenadas desde AsyncStorage o SQLite
    // y actualizar el estado locationsList
  }, []);

  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.error('Permiso de ubicación denegado');
      return;
    }

    let currentLocation = await Location.getCurrentPositionAsync({});
    setLocation(currentLocation);
    // Agregar la nueva ubicación a la lista
    setLocationsList((prevLocations) => [currentLocation.coords, ...prevLocations]);
  };

  const renderLocationItem = ({ item }: { item: any }) => (
    <View style={styles.locationItem}>
      <Text>Latitud: {item.latitude}</Text>
      <Text>Longitud: {item.longitude}</Text>
      {/* Aquí puedes mostrar la dirección postal si lo deseas */}
    </View>
  );

  return (
    <View style={styles.container}>
      <Button title="LOCATION NOW" onPress={getLocation} />
      {location && (
        <View style={styles.locationInfo}>
          <Text>Última ubicación:</Text>
          <Text>Latitud: {location.coords.latitude}</Text>
          <Text>Longitud: {location.coords.longitude}</Text>
        </View>
      )}
      <Text style={styles.locationsTitle}>Ubicaciones almacenadas:</Text>
      <FlatList
        data={locationsList}
        renderItem={renderLocationItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  locationInfo: {
    marginTop: 20,
    marginBottom: 10,
  },
  locationsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  locationItem: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
  },
});

export default App;
