// screens/AdminReports.jsx
import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useReports } from '../context/ReportContext';

export default function AdminReports() {
  const { reports } = useReports();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>All Reports</Text>

      {reports.length === 0 ? (
        <Text style={styles.emptyText}>No reports yet.</Text>
      ) : (
        <FlatList
          data={reports}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardDesc}>{item.description}</Text>
              <Text style={styles.cardStatus}>
                Status: {item.status || 'Pending'}{item.coworker ? ` — Assigned to: ${item.coworker}` : ''}
              </Text>
              <Text style={styles.meta}>Upvotes: {item.upvotes || 0}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 12, textAlign: 'center' },
  emptyText: { textAlign: 'center', color: '#666', marginTop: 40 },
  card: { backgroundColor: '#f9f9f9', padding: 12, borderRadius: 8, marginBottom: 10, borderWidth: 1, borderColor: '#ddd' },
  cardTitle: { fontWeight: '700', fontSize: 16, marginBottom: 6 },
  cardDesc: { fontSize: 14, color: '#555' },
  cardStatus: { fontSize: 13, color: '#333', marginTop: 6 },
  meta: { fontSize: 12, color: '#888', marginTop: 6 },
});
