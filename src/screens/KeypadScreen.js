import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

const KeypadScreen = ({ navigation }) => {
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);

  const numbers = [
    '1', '2', '3',
    '4', '5', '6',
    '7', '8', '9',
    '*', '0', '#'
  ];

  const handleNumberPress = (num) => {
    setInputValue(prev => prev + num);
  };

  const handleDelete = () => {
    setInputValue(prev => prev.slice(0, -1));
  };

  const handleSubmit = () => {
    if (inputValue === '*100#') {
      Alert.alert(
        "Emergency Services",
        "Select an option:\n1. Ambulance\n2. Police\n3. Fire Department\n4. Nearby Hospitals",
        [
          { text: "1", onPress: () => handleEmergencyService('ambulance') },
          { text: "2", onPress: () => handleEmergencyService('police') },
          { text: "3", onPress: () => handleEmergencyService('fire') },
          { text: "4", onPress: () => navigation.navigate('Hospitals') }
        ]
      );
    } else {
      Alert.alert("Error", "Invalid USSD code. Please try *100#");
    }
  };

  const handleEmergencyService = async (service) => {
    setLoading(true);
    const mockLocation = {
      coords: {
        latitude: 37.7749,
        longitude: -122.4194,
        address: "Padre conceicao College Of Engineering"
      }
    };

    try {
      const response = await fetch('http://localhost:3000/emergency', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          service,
          location: mockLocation.coords,
          timestamp: Date.now()
        }),
      });

      const data = await response.json();
      
      if (data.success) {
        Alert.alert(
          "Success",
          `Your location has been sent to ${service} services.\nThey will contact you shortly.\n\nLocation sent:\n${mockLocation.coords.address}`
        );
      }
    } catch (error) {
      Alert.alert(
        "Error",
        "Could not send location to emergency services. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.loadingText}>Sending location...</Text>
        </View>
      )}

      <View style={styles.inputContainer}>
        <Text style={styles.input}>{inputValue}</Text>
      </View>

      <View style={styles.keypad}>
        {numbers.map((num) => (
          <TouchableOpacity
            key={num}
            style={styles.key}
            onPress={() => handleNumberPress(num)}
          >
            <Text style={styles.keyText}>{num}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.bottomRow}>
        <TouchableOpacity
          style={[styles.key, styles.actionKey]}
          onPress={handleDelete}
        >
          <MaterialIcon name="backspace" size={28} color="#FFF" />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.key, styles.callButton]}
          onPress={handleSubmit}
        >
          <Icon name="call" size={28} color="#FFF" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F1F1', // Light background
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 20,
    paddingHorizontal: 10,
    marginBottom: 30,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0', // Lighter border color
  },
  input: {
    fontSize: 36,
    fontWeight: '300',
    color: '#333', // Darker text color
    textAlign: 'center',
  },
  keypad: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 20,
  },
  key: {
    width: '28%',
    aspectRatio: 1,
    borderRadius: 50,
    backgroundColor: '#F1F1F1', // Light background
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  keyText: {
    fontSize: 28,
    color: '#333', // Darker text color
    fontWeight: '400',
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
    alignItems: 'center',
  },
  actionKey: {
    backgroundColor: '#E0E0E0', // Light grey for backspace
    width: '40%',
    aspectRatio: 1,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  callButton: {
    backgroundColor: '#007AFF', // Primary color for call button
    width: '40%',
    aspectRatio: 1,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#007AFF',
  },
});

export default KeypadScreen;