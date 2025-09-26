// App.js
import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { ReportProvider } from './context/ReportContext';
import theme from './theme';

// Screens
import SplashScreen from './screens/SplashScreen';
import Onboarding from './screens/Onboarding';
import LoginSelection from './screens/LoginSelection';
import UserAuth from './screens/UserAuth';
import AdminAuth from './screens/AdminAuth';

// Drawers
import UserDrawer from './navigation/UserDrawer';
import AdminDrawer from './navigation/AdminDrawer';

const Stack = createNativeStackNavigator();

// Custom Navigation Theme (aligns with theme.jsx)
const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: theme.colors.background,
  },
};

export default function App() {
  return (
    <ReportProvider>
      <NavigationContainer theme={navTheme}>
        <StatusBar barStyle="dark-content" backgroundColor={theme.colors.background} />
        <Stack.Navigator
          screenOptions={{ headerShown: false }}
          initialRouteName="Splash"
        >
          {/* Splash & Onboarding */}
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="Onboarding" component={Onboarding} />
          <Stack.Screen name="LoginSelection" component={LoginSelection} />

          {/* Logins */}
          <Stack.Screen name="UserAuth" component={UserAuth} />
          <Stack.Screen name="AdminAuth" component={AdminAuth} />

          {/* Main App */}
          <Stack.Screen name="UserDrawer" component={UserDrawer} />
          <Stack.Screen name="AdminDrawer" component={AdminDrawer} />
        </Stack.Navigator>
      </NavigationContainer>
    </ReportProvider>
  );
}
