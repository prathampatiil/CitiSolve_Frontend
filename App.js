// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { ReportProvider } from './context/ReportContext';

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

export default function App() {
  return (
    <ReportProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
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
