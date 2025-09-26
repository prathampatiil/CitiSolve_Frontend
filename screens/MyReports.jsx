// screens/MyReports.jsx
import React from 'react';
import { ScrollView, Text, View, Image, StyleSheet } from 'react-native';
import CustomButton from '../components/CustomButton';
import { useReports } from '../context/ReportContext';

export default function MyReports({ navigation }) {
  const { reports, upvoteReport } = useReports();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>📑 My Reports</Text>

      {reports.length === 0 ? (
        <Text style={styles.emptyText}>No reports yet.</Text>
      ) : (
        reports.map((item, i) => (
          <View key={item.id || i} style={styles.reportCard}>
            <View style={styles.row}>
              <View style={{ flex: 1 }}>
                <Text style={styles.reportTitle}>{item.title}</Text>
                <Text style={styles.reportDescription}>{item.description}</Text>
              </View>

              {item.image && (
                <Image
                  source={{ uri: item.image }}
                  style={styles.thumbnail}
                />
              )}
            </View>

            <View style={styles.metaRow}>
              <Text style={styles.metaText}>
                📌 Status: <Text style={styles.status}>{item.status}</Text>
              </Text>
              <Text style={styles.metaText}>👍 {item.upvotes}</Text>
            </View>

            <View style={styles.buttonWrapper}>
              <CustomButton
                title="⬆ Upvote"
                color="#f59e0b"
                onPress={() => upvoteReport(i)}
              />
            </View>
          </View>
        ))
      )}
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
    marginBottom: 20,
    fontWeight: '700',
    textAlign: 'center',
    color: '#0f172a',
  },
  emptyText: {
    textAlign: 'center',
    color: '#64748b',
    marginTop: 40,
    fontSize: 16,
  },
  reportCard: {
    backgroundColor: '#fff',
    padding: 16,
    marginVertical: 10,
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
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 6,
    marginBottom: 10,
  },
  metaText: {
    fontSize: 13,
    color: '#334155',
  },
  status: {
    fontWeight: '600',
    color: '#0ea5e9',
  },
  buttonWrapper: {
    marginTop: 6,
  },
});