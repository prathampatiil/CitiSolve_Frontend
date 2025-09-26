// screens/AdminHome.jsx
import React from 'react';
import { ScrollView, Text, View, Image, StyleSheet } from 'react-native';
import CustomButton from '../components/CustomButton';
import { useReports } from '../context/ReportContext';

export default function AdminHome({ navigation }) {
  const { reports, updateStatus } = useReports();
  const pendingReports = reports.filter((r) => r.status === 'Pending');

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Admin Dashboard</Text>
      <Text style={styles.subtitle}>Pending Reports:</Text>

      {pendingReports.length === 0 && (
        <Text style={{ textAlign: 'center', marginTop: 20 }}>
          No pending reports right now.
        </Text>
      )}

      {pendingReports.map((item, index) => {
        const globalIndex = reports.indexOf(item);
        return (
          <View key={item.id || index} style={styles.reportCard}>
            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{item.title}</Text>
            <Text>{item.description}</Text>
            {item.image && (
              <Image
                source={{ uri: item.image }}
                style={{
                  width: 100,
                  height: 80,
                  borderRadius: 8,
                  marginTop: 5,
                }}
              />
            )}
            <Text style={{ marginTop: 5 }}>Status: {item.status}</Text>
            <View style={styles.buttonRow}>
              <CustomButton
                title="✅Accept"
                color="#22c55e"
                onPress={() => updateStatus(globalIndex, 'Accepted')}
              />
              <CustomButton
                title="❌Decline"
                color="#ef4444"
                onPress={() => updateStatus(globalIndex, 'Declined')}
              />
            </View>
          </View>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 36,
    paddingBottom: 40,
    backgroundColor: '#f8fafc',
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
    fontWeight: '700',
    textAlign: 'center',
    color: '#0f172a',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 18,
    textAlign: 'center',
    color: '#475569',
    fontWeight: '500',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 30,
    fontSize: 15,
    color: '#64748b',
  },
  reportCard: {
    backgroundColor: '#fff',
    padding: 16,
    marginVertical: 8,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  reportTitle: {
    fontWeight: '700',
    fontSize: 16,
    color: '#1e293b',
    marginBottom: 4,
  },
  reportDescription: {
    fontSize: 14,
    color: '#475569',
    marginBottom: 6,
  },
  thumbnail: {
    width: 90,
    height: 70,
    borderRadius: 8,
    marginLeft: 10,
  },
  statusText: {
    marginTop: 6,
    fontSize: 13,
    color: '#334155',
  },
  statusPending: {
    fontWeight: '600',
    color: '#f59e0b',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
});