// screens/AssignWork.jsx
import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import CustomButton from '../components/CustomButton';
import { useReports } from '../context/ReportContext';

const COWORKERS = [
  'Garbage Dump Worker',
  'Garbage Vehicle Worker',
  'Garbage Burning Worker',
  'Sweeping Worker',
  'Sewage Worker',
  'Potholes Worker',
  'Public Toilet Worker',
  'Manhole/Drains Worker',
  'Debris Worker',
  'Dead Animals Worker',
];

export default function AssignWork() {
  const { reports, assignWork, updateStatus, undoStatus } = useReports();

  // show Accepted or Assigned
  const workReports = reports.filter((r) => r.status === 'Accepted' || r.status === 'Assigned');

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Assign Work</Text>

      {workReports.length === 0 ? (
        <Text style={styles.empty}>No accepted or assigned reports.</Text>
      ) : (
        workReports.map((item, idx) => {
          const index = reports.indexOf(item);
          return (
            <View key={item.id || idx} style={styles.card}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardDesc}>{item.description}</Text>
              <Text style={styles.cardStatus}>Status: {item.status}</Text>
              {item.coworker ? <Text style={{ marginTop: 6 }}>Assigned to: {item.coworker}</Text> : null}

              <Text style={{ marginTop: 8, marginBottom: 8, fontWeight: '600' }}>Assign to:</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 8 }}>
                {COWORKERS.map((cw, i) => (
                  <View key={i} style={{ marginRight: 8 }}>
                    <CustomButton title={cw} color="#4e9bde" onPress={() => assignWork(index, cw)} />
                  </View>
                ))}
              </ScrollView>

              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <CustomButton title="Mark Completed" color="#34C759" onPress={() => updateStatus(index, 'Completed')} />
                <CustomButton title="Undo" color="#8E8E93" onPress={() => undoStatus(index)} />
              </View>
            </View>
          );
        })
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, paddingHorizontal: 20, paddingTop: 30, backgroundColor: '#f9f9f9' },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 12, textAlign: 'center' },
  empty: { textAlign: 'center', color: '#666', marginTop: 30 },
  card: { backgroundColor: '#fff', padding: 12, borderRadius: 8, marginBottom: 12, borderWidth: 1, borderColor: '#ddd' },
  cardTitle: { fontWeight: '700', fontSize: 16, marginBottom: 6 },
  cardDesc: { fontSize: 14, color: '#555' },
  cardStatus: { marginTop: 6, fontWeight: '600' },
});
