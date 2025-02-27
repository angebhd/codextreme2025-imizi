import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const IndexPage = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Ionicons name="home" size={50} color="#ffffff" style={styles.icon} />
      <Text style={styles.title}>Welcome to Family Cohesion Chat-board </Text>
      <Text style={styles.subtitle}>Select an option to continue</Text>
      
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Page2')}>
    
    
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00A87E',
    padding: 20,
  },
  icon: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff', // Corrected white color
    marginBottom: 10,
    alignItems: 'center',
},

  subtitle: {
    fontSize: 16,
    color: '#7A7A7A',
    textAlign: 'center',
    marginBottom: 30,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#00A87E',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
  },
  buttonIcon: {
    marginRight: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default IndexPage;