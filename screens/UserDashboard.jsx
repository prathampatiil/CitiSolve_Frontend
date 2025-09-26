// screens/UserDashboard.jsx
import React, { useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CustomButton from '../components/CustomButton';

export default function UserDashboard({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);

  const categories = [
    { title: 'Garbage Dump', icon: 'trash-outline', color: '#0ea5e9' }, // bright blue
    { title: 'Garbage Vehicle Not Arrived', icon: 'car-outline', color: '#6366f1' }, // indigo
    { title: 'Burning Garbage in Open Space', icon: 'flame-outline', color: '#f97316' }, // orange
    { title: 'Sweeping Not Done', icon: 'brush-outline', color: '#10b981' }, // green
    { title: 'Sewage Overflow', icon: 'water-outline', color: '#3b82f6' }, // sky blue
    { title: 'Potholes or Road Holes', icon: 'construct-outline', color: '#8b5cf6' }, // purple
    { title: 'Public Toilet Issues', icon: 'male-female-outline', color: '#f43f5e' }, // pink/red
    { title: 'Open Manholes or Drains', icon: 'warning-outline', color: '#facc15' }, // yellow
    { title: 'Debris / Construction Material', icon: 'hammer-outline', color: '#22c55e' }, // green
    { title: 'Dead Animals', icon: 'paw-outline', color: '#6366f1' }, // indigo
  ];

  const handleCategoryPress = (category) => {
    setModalVisible(false);
    navigation.navigate('New Report', { category: category.title });
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
        <Text style={styles.title}>User Dashboard</Text>

        <CustomButton
          title="New Report"
          onPress={() => navigation.navigate('New Report')}
          color="#0ea5e9"
        />
        <CustomButton
          title="My Reports"
          onPress={() => navigation.navigate('My Reports')}
          color="#6366f1"
        />
      </ScrollView>

      {/* Floating + FAB */}
      <TouchableOpacity style={styles.fab} onPress={() => setModalVisible(true)}>
        <Ionicons name="add" size={32} color="#fff" /> {/* keep + icon white */}
      </TouchableOpacity>

      {/* Modal with Categories */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Select Category</Text>
            <FlatList
              data={categories}
              numColumns={2}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[styles.categoryRow, { backgroundColor: item.color + '22' }]} // light tint background
                  onPress={() => handleCategoryPress(item)}
                >
                  <Ionicons
                    name={item.icon}
                    size={28}
                    color={item.color}
                    style={{ marginBottom: 6 }}
                  />
                  <Text style={[styles.categoryText, { color: '#111' }]}>{item.title}</Text>
                </TouchableOpacity>
              )}
              contentContainerStyle={{ paddingBottom: 20 }}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f1f5f9' },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginVertical: 20,
    textAlign: 'center',
    color: '#0f172a',
  },
  fab: {
    position: 'absolute',
    bottom: 28,
    right: 20,
    backgroundColor: '#4db6ac', // keep FAB color slightly teal
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    maxHeight: '80%',
    elevation: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: -2 },
    shadowRadius: 8,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 20,
    textAlign: 'center',
    color: '#0f172a',
  },
  categoryRow: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    margin: 6,
    borderRadius: 12,
    minHeight: 80,
  },
  categoryText: {
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '600',
  },
});
