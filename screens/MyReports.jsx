// screens/MyReports.jsx
import React from 'react';
import { ScrollView, Text, View, Image, StyleSheet } from 'react-native';
import CustomButton from '../components/CustomButton';
import { useReports } from '../context/ReportContext';

export default function MyReports({ navigation }) {
  const { reports, upvoteReport } = useReports();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>My Reports</Text>
      {reports.length === 0 ? (
        <Text style={{ textAlign: 'center', color: '#666', marginTop: 30 }}>No reports yet.</Text>
      ) : (
        reports.map((item, i) => (
          <View key={item.id || i} style={styles.reportCard}>
            <Text style={{ fontWeight: 'bold' }}>{item.title}</Text>
            <Text>{item.description}</Text>
            {item.image && (
              <Image source={{ uri: item.image }} style={{ width: 100, height: 80, borderRadius: 8, marginTop: 5 }} />
            )}
            <Text>Status: {item.status}</Text>
            <Text>Upvotes: {item.upvotes}</Text>
            <View style={{ marginTop: 8 }}>
              <CustomButton title="Upvote" color="#FF9500" onPress={() => upvoteReport(i)} />
            </View>
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, paddingHorizontal: 20, paddingTop: 36, paddingBottom: 40, backgroundColor: '#F0F4F8' },
  title: { fontSize: 22, marginBottom: 16, fontWeight: '700', textAlign: 'center' },
  reportCard: { backgroundColor: '#fff', padding: 12, marginVertical: 8, borderRadius: 10, borderWidth: 1, borderColor: '#E5E7EB' },
});
