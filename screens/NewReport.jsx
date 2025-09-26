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
    setTitle('');
    setDescription('');
    setImage(null);
    navigation.navigate('Dashboard');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>New Report</Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 6,marginTop:20, marginBottom: 2 }} // tighter gap
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
        placeholderTextColor="#94a3b8"
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

      <CustomButton title="Pick Image from Gallery" onPress={pickImage} color="#0ea5e9" />
      <CustomButton title="Take Photo" onPress={takePhoto} color="#6366f1" />
      <CustomButton title="Submit Report" onPress={submitReport} color="#22c55e" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 18,
    paddingTop: 28,
    paddingBottom: 40,
    backgroundColor: '#f1f5f9',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4, // reduced from 8
    textAlign: 'center',
    color: '#0f172a',
  },
  categoryButton: {
    height: 45, // slightly smaller
    paddingHorizontal: 10,
    backgroundColor: '#e2e8f0',
    borderRadius: 14,
    marginRight: 6,
    justifyContent: 'center',
  },
  categoryButtonSelected: {
    backgroundColor: '#0ea5e9',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  categoryText: {
    color: '#334155',
    fontSize: 11,
    fontWeight: '500',
  },
  categoryTextSelected: {
    color: '#fff',
    fontWeight: '700',
  },
  input: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: '#cbd5e1',
    marginBottom: 10, // slightly tighter
    fontSize: 15,
    color: '#0f172a',
  },
  imagePreview: {
    width: '100%',
    height: 180,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
});