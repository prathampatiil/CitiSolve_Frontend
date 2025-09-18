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
    { title: 'Garbage Dump', icon: 'trash-outline' },
    { title: 'Garbage Vehicle Not Arrived', icon: 'car-outline' },
    { title: 'Burning Garbage in Open Space', icon: 'flame-outline' },
    { title: 'Sweeping Not Done', icon: 'brush-outline' },
    { title: 'Sewage Overflow', icon: 'water-outline' },
    { title: 'Potholes or Road Holes', icon: 'construct-outline' },
    { title: 'Public Toilet Issues', icon: 'male-female-outline' },
    { title: 'Open Manholes or Drains', icon: 'warning-outline' },
    { title: 'Debris / Construction Material', icon: 'hammer-outline' },
    { title: 'Dead Animals', icon: 'paw-outline' },
  ];

  const handleCategoryPress = (category) => {
    setModalVisible(false);
    navigation.navigate('New Report', { category: category.title });
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
        <Text style={styles.title}>User Dashboard</Text>

        <CustomButton title="New Report" onPress={() => navigation.navigate('New Report')} />
        <CustomButton title="My Reports" onPress={() => navigation.navigate('My Reports')} />
      </ScrollView>

      {/* Floating + FAB */}
      <TouchableOpacity style={styles.fab} onPress={() => setModalVisible(true)}>
        <Ionicons name="add" size={32} color="#fff" />
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
                  style={styles.categoryRow}
                  onPress={() => handleCategoryPress(item)}
                >
                  <Ionicons name={item.icon} size={28} color="#007AFF" style={{ marginBottom: 6 }} />
                  <Text style={{ fontSize: 14, textAlign: 'center' }}>{item.title}</Text>
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
  container: { flex: 1, backgroundColor: '#f9f9f9' },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginVertical: 20,
    textAlign: 'center',
  },
  fab: {
    position: 'absolute',
    bottom: 28,
    right: 20,
    backgroundColor: '#007AFF',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 15,
    textAlign: 'center',
  },
  categoryRow: {
    flex: 1,
    alignItems: 'center',
    padding: 14,
    margin: 6,
    backgroundColor: '#f1f1f1',
    borderRadius: 10,
  },
});
