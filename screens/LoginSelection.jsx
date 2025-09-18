import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CustomButton from '../components/CustomButton';

export default function LoginSelection({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to UrbanEye</Text>
      <Text style={{ textAlign: 'center', marginBottom: 20 }}>
        Please choose how you want to log in.
      </Text>
      <CustomButton title="User Login" onPress={() => navigation.navigate('UserAuth')} />
      <CustomButton title="Admin Login" color="#FF9500" onPress={() => navigation.navigate('AdminAuth')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f5f7',
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1E1E1E',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 30,
  },
  button: {
    width: '90%',
    paddingVertical: 14,
    borderRadius: 12,
    marginVertical: 10,
    backgroundColor: '#007AFF',
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  adminButton: {
    backgroundColor: '#e2ad63ff',
  },
});
