// screens/NewReport.jsx
import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import CustomButton from '../components/CustomButton';
import { useReports } from '../context/ReportContext';

const CATEGORIES = [
  'Garbage Dump',
  'Garbage Vehicle Not Arrived',
  'Garbage Burning in Open Space',
  'Sweeping Not Done',
  'Sewage Overflow',
  'Potholes or Road Holes',
  'Public Toilet Issues',
  'Open Manholes or Drains',
  'Debris / Construction Material',
  'Dead Animals',
];

export default function NewReport({ navigation, route }) {
  const { addReport } = useReports();
  const routeCategory = route?.params?.category ?? '';
  const [title, setTitle] = useState(routeCategory || '');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (routeCategory) setTitle(routeCategory);
  }, [routeCategory]);

  const pickImage = async () => {
    const res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.9,
    });
    if (!res.canceled) setImage(res.assets[0].uri);
  };

  const takePhoto = async () => {
    if (Platform.OS === 'web') {
      alert('Camera not supported on web.');
      return;
    }
    const perm = await ImagePicker.requestCameraPermissionsAsync();
    if (perm.status !== 'granted') {
      alert('Camera permission required!');
      return;
    }
    const res = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 0.9,
    });
    if (!res.canceled) setImage(res.assets[0].uri);
  };

  const submitReport = () => {
    if (!title || !description) {
      alert('Please fill title and description.');
      return;
    }
    addReport({ title, description, image });
    // clear
    setTitle('');
    setDescription('');
    setImage(null);
    // go back to dashboard (drawer screen "Dashboard")
    navigation.navigate('Dashboard');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>New Report</Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 6, marginBottom: 14 }}
      >
        {CATEGORIES.map((c, i) => {
          const selected = c === title;
          return (
            <TouchableOpacity
              key={i}
              onPress={() => setTitle(c)}
              style={[styles.categoryButton, selected && styles.categoryButtonSelected]}
            >
              <Text style={[styles.categoryText, selected && styles.categoryTextSelected]}>
                {c}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />

      <TextInput
        style={[styles.input, { height: 100 }]}
        placeholder="Description"
        multiline
        value={description}
        onChangeText={setDescription}
      />

      {image && <Image source={{ uri: image }} style={styles.imagePreview} />}

      <CustomButton title="Pick Image from Gallery" onPress={pickImage} />
      <CustomButton title="Take Photo" onPress={takePhoto} />
      <CustomButton title="Submit Report" onPress={submitReport} color="#34C759" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, paddingHorizontal: 18, paddingTop: 30, backgroundColor: '#f9f9f9' },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 16, textAlign: 'center' },
  categoryButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#eee',
    borderRadius: 20,
    marginRight: 8,
  },
  categoryButtonSelected: { backgroundColor: '#007AFF' },
  categoryText: { color: '#333', fontSize: 13 },
  categoryTextSelected: { color: '#fff', fontWeight: '700' },
  input: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginBottom: 12,
  },
  imagePreview: { width: '100%', height: 170, borderRadius: 10, marginBottom: 12 },
});
