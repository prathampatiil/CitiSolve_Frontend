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
  container: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 40,
    backgroundColor: '#f8fafc',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 18,
    textAlign: 'center',
    color: '#0f172a',
  },
  empty: {
    textAlign: 'center',
    color: '#64748b',
    marginTop: 40,
    fontSize: 16,
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 14,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  cardTitle: {
    fontWeight: '700',
    fontSize: 16,
    marginBottom: 4,
    color: '#1e293b',
  },
  cardDesc: {
    fontSize: 14,
    color: '#475569',
    marginBottom: 6,
  },
  cardStatus: {
    marginTop: 6,
    fontWeight: '600',
    color: '#334155',
  },
  statusAccepted: {
    color: '#22c55e',
  },
  statusAssigned: {
    color: '#3b82f6',
  },
  assignedText: {
    marginTop: 6,
    fontSize: 14,
    fontWeight: '500',
    color: '#0f172a',
  },
  assignLabel: {
    marginTop: 10,
    marginBottom: 6,
    fontWeight: '600',
    color: '#1e293b',
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
});