// navigation/UserDrawer.jsx
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';

// screens for user
import UserDashboard from '../screens/UserDashboard.jsx';
import NewReport from '../screens/NewReport.jsx';
import MyReports from '../screens/MyReports.jsx';

const Drawer = createDrawerNavigator();

// ---- Custom Drawer Content ----
function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      {/* Profile Header */}
      <View style={styles.profileSection}>
        <Image
          source={{
            uri: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
          }}
          style={styles.avatar}
        />
        <Text style={styles.username}>John Doe</Text>
        <Text style={styles.email}>john@example.com</Text>
      </View>

      {/* Drawer Items */}
      <View style={{ flex: 1, paddingTop: 10 }}>
        <DrawerItemList {...props} />
      </View>

      {/* Logout Button */}
      <View style={styles.logoutContainer}>
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => props.navigation.replace('LoginSelection')}
        >
          <Ionicons name="log-out-outline" size={20} color="#fff" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
}

// ---- Main Drawer Navigator ----
export default function UserDrawer() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: true,
        drawerActiveBackgroundColor: '#4e9bde',
        drawerActiveTintColor: '#fff',
        drawerInactiveTintColor: '#333',
        drawerLabelStyle: {
          fontSize: 15,
          marginLeft: 0,
        },
        drawerItemStyle: { paddingVertical: 5 }, // fixes overlap
      }}
    >
      <Drawer.Screen
        name="Dashboard"
        component={UserDashboard}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="home-outline" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="New Report"
        component={NewReport}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="add-circle-outline" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="My Reports"
        component={MyReports}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="document-text-outline" size={22} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

// ---- Styles ----
const styles = StyleSheet.create({
  profileSection: {
    paddingVertical: 30,
    paddingHorizontal: 15,
    backgroundColor: '#4e9bde',
    alignItems: 'center',
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginBottom: 10,
  },
  username: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  email: {
    fontSize: 12,
    color: '#eee',
  },
  logoutContainer: {
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  logoutButton: {
    flexDirection: 'row',
    backgroundColor: '#e74c3c',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutText: {
    color: '#fff',
    fontSize: 15,
    marginLeft: 8,
  },
});
