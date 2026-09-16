import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { useConsumerStore } from '../store/useConsumerStore';

interface Props {
  onNavigate: (screen: string) => void;
}

export const OfflineSyncScreen: React.FC<Props> = ({ onNavigate }) => {
  const { isOffline, offlineQueue, syncOfflineQueue, isLoading } = useConsumerStore();

  const handleSync = async () => {
    await syncOfflineQueue();
    Alert.alert('Synced', 'Offline queue synced with Flask backend!');
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerBar}>
        <TouchableOpacity style={styles.backBtn} onPress={() => onNavigate('Dashboard')}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Offline Sync</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.scrollContent}>
        {/* Main White Sync Card from Photo */}
        <View style={styles.syncCard}>
          {/* Cloud Icon Graphic */}
          <View style={styles.cloudGraphicBox}>
            <Text style={styles.cloudIconBig}>☁️</Text>
            <Text style={styles.pendingOpsText}>2 pending operations</Text>
          </View>

          {/* Sync Status Row */}
          <View style={styles.statusRow}>
            <View>
              <Text style={styles.statusLabel}>Sync Status</Text>
              <Text style={styles.statusSub}>Last sync: Never</Text>
            </View>
            <View style={styles.offlineBadge}>
              <Text style={styles.redDot}>🔴</Text>
              <Text style={styles.offlineBadgeText}>Offline</Text>
            </View>
          </View>

          {/* Pending Operations List */}
          <Text style={styles.listHeaderTitle}>Pending Operations</Text>
          <View style={styles.opsList}>
            {/* Op 1 */}
            <View style={styles.opItem}>
              <View style={styles.opIconBoxYellow}>
                <Text style={styles.opIcon}>👤</Text>
              </View>
              <View style={styles.opInfo}>
                <Text style={styles.opTitle}>Add Consumer</Text>
                <Text style={styles.opTime}>Apr 25, 2025 11:20 AM</Text>
              </View>
            </View>

            {/* Op 2 */}
            <View style={styles.opItem}>
              <View style={styles.opIconBoxYellow}>
                <Text style={styles.opIcon}>✏️</Text>
              </View>
              <View style={styles.opInfo}>
                <Text style={styles.opTitle}>Update Status</Text>
                <Text style={styles.opTime}>Apr 25, 2025 10:45 AM</Text>
              </View>
            </View>

            {/* Op 3 */}
            <View style={styles.opItem}>
              <View style={styles.opIconBoxBlue}>
                <Text style={styles.opIcon}>📄</Text>
              </View>
              <View style={styles.opInfo}>
                <Text style={styles.opTitle}>Upload Document</Text>
                <Text style={styles.opTime}>Apr 25, 2025 10:30 AM</Text>
              </View>
            </View>
          </View>

          {/* Green Sync Now Button */}
          <TouchableOpacity style={styles.syncBtnGreen} onPress={handleSync} disabled={isLoading}>
            {isLoading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.syncBtnText}>Sync Now</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0F172A' },
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#1E293B',
  },
  backBtn: { padding: 4 },
  backArrow: { color: '#FFFFFF', fontSize: 22, fontWeight: '800' },
  headerTitle: { color: '#FFFFFF', fontSize: 18, fontWeight: '800' },
  content: { flex: 1 },
  scrollContent: { padding: 16, paddingBottom: 40 },
  syncCard: {
    backgroundColor: '#FFFFFF', // White card from photo
    borderRadius: 20,
    padding: 20,
    shadowColor: '#0F172A',
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 4,
  },
  cloudGraphicBox: {
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  cloudIconBig: { fontSize: 50 },
  pendingOpsText: { fontSize: 14, fontWeight: '800', color: '#0F172A', marginTop: 8 },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  statusLabel: { fontSize: 13, fontWeight: '800', color: '#0F172A' },
  statusSub: { fontSize: 11, color: '#94A3B8', marginTop: 2 },
  offlineBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  redDot: { fontSize: 10 },
  offlineBadgeText: { color: '#EF4444', fontSize: 12, fontWeight: '800' },
  listHeaderTitle: { fontSize: 13, fontWeight: '800', color: '#0F172A', marginTop: 14, marginBottom: 10 },
  opsList: { gap: 10 },
  opItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  opIconBoxYellow: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#FEF3C7',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  opIconBoxBlue: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#DBEAFE',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  opIcon: { fontSize: 16 },
  opInfo: { flex: 1 },
  opTitle: { fontSize: 13, fontWeight: '800', color: '#0F172A' },
  opTime: { fontSize: 11, color: '#94A3B8', marginTop: 1 },
  syncBtnGreen: {
    backgroundColor: '#10B981', // Bright Green Button from photo
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 24,
  },
  syncBtnText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
  },
});
