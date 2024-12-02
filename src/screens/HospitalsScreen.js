import React from 'react';
import { View, Text, StyleSheet, FlatList, Linking, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const HospitalsScreen = () => {
  const hospitals = [
    {
      id: '1',
      name: 'City General Hospital',
      address: '123 Medical Center Blvd',
      phone: '+1-555-0123',
      distance: '2.3 km'
    },
    {
      id: '2',
      name: 'St. Mary\'s Medical Center',
      address: '456 Healthcare Ave',
      phone: '+1-555-0124',
      distance: '3.1 km'
    },
    {
      id: '3',
      name: 'Memorial Hospital',
      address: '789 Emergency Road',
      phone: '+1-555-0125',
      distance: '4.5 km'
    },
  ];

  const handleCall = (phone) => {
    Linking.openURL(`tel:${phone}`);
  };

  const renderHospital = ({ item }) => (
    <View style={styles.hospitalCard}>
      <View style={styles.hospitalInfo}>
        <Text style={styles.hospitalName}>{item.name}</Text>
        <Text style={styles.hospitalAddress}>{item.address}</Text>
        <Text style={styles.hospitalDistance}>{item.distance}</Text>
      </View>
      <TouchableOpacity
        style={styles.callButton}
        onPress={() => handleCall(item.phone)}
      >
        <Text style={styles.callButtonText}>Call</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Nearby Hospitals</Text>
      <FlatList
        data={hospitals}
        renderItem={renderHospital}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5', // Light background
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 20,
    textAlign: 'center',
    color: '#333', // Darker text color for better contrast
  },
  list: {
    padding: 10,
  },
  hospitalCard: {
    backgroundColor: '#FFFFFF', // White card background
    borderRadius: 10, // Rounded corners
    padding: 15,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#ccc', // Subtle shadow for depth
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2, // Elevation for shadow effect
  },
  hospitalInfo: {
    flex: 1,
  },
  hospitalName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333', // Darker text color
  },
  hospitalAddress: {
    color: '#666',
    marginBottom: 3,
  },
  hospitalDistance: {
    color: '#007AFF', // Primary color for accent
  },
  callButton: {
    backgroundColor: '#007AFF', // Primary color for call button
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20, // Rounded call button
  },
  callButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default HospitalsScreen;