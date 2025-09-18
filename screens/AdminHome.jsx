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
                title="Accept"
                color="#34C759"
                onPress={() => updateStatus(globalIndex, 'Accepted')}
              />
              <CustomButton
                title="Decline"
                color="#FF3B30"
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
  container: { flexGrow: 1, paddingHorizontal: 20, paddingTop: 40, backgroundColor: '#f9f9f9' },
  title: { fontSize: 22, marginBottom: 10, fontWeight: '700', textAlign: 'center' },
  subtitle: { fontSize: 16, marginVertical: 10, textAlign: 'center', color: '#333' },
  reportCard: {
    backgroundColor: '#fff',
    padding: 12,
    marginVertical: 5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  buttonRow: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 6 },
});
