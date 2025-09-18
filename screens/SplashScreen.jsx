// screens/SplashScreen.jsx
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    const t = setTimeout(() => {
      navigation.replace('Onboarding');
    }, 2500);
    return () => clearTimeout(t);
  }, [navigation]);

  return (
    <View style={styles.splashContainer}>
      {/* Logo */}
      <Image
        source={require('../assets/citysolvelogo.jpg')}
        style={styles.logo}
      />
      {/* Tagline */}
      <Text style={styles.splashSubtitle}>Solving City Problems Together</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    marginBottom: 8,
  },
  splashSubtitle: {
    fontSize: 15,
    color: '#374151',
    marginTop: 0,
    textAlign: 'center',
  },
});
