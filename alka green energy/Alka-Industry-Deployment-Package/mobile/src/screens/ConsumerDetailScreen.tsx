import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useConsumerStore } from '../store/useConsumerStore';

interface Props {
  onNavigate: (screen: string) => void;
}

export const ConsumerDetailScreen: React.FC<Props> = ({ onNavigate }) => {
  const { selectedConsumer, toggleRTSStatus, toggleNPStatus } = useConsumerStore();

  if (!selectedConsumer) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No consumer selected</Text>
      </View>
    );
  }

  const c = selectedConsumer;

  return (
    <View style={styles.container}>
      {/* Top Bar */}
      <View style={styles.headerBar}>
        <TouchableOpacity style={styles.backBtn} onPress={() => onNavigate('Consumers')}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Consumer Details</Text>
        <TouchableOpacity style={styles.editBtn}>
          <Text style={styles.editIcon}>✏️</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.scrollContent}>
        {/* Main Card from Photo */}
        <View style={styles.headerCard}>
          <View style={styles.avatarRow}>
            <View style={styles.avatarCircle}>
              <Text style={styles.avatarText}>
                {c.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
              </Text>
            </View>

            <View style={styles.nameCol}>
              <Text style={styles.name}>{c.name}</Text>
              <Text style={styles.phone}>+91 {c.phone}</Text>
              <Text style={styles.meta}>{c.consumer_number} | {c.discom_name}</Text>
            </View>
          </View>

          {/* Large Dual Status Toggle Cards */}
          <View style={styles.dualToggleRow}>
            {/* RTS Status Toggle */}
            <TouchableOpacity
              style={[styles.statusToggleBtn, c.rts_status === 'DONE' ? styles.rtsDoneBg : styles.rtsPendingBg]}
              onPress={() => toggleRTSStatus(c.id)}
            >
              <Text style={styles.toggleIcon}>{c.rts_status === 'DONE' ? '✓' : '⏳'}</Text>
              <View>
                <Text style={styles.toggleLabel}>RTS Status</Text>
                <Text style={styles.toggleValue}>{c.rts_status === 'DONE' ? 'Done' : 'Pending'}</Text>
              </View>
            </TouchableOpacity>

            {/* National Portal Toggle */}
            <TouchableOpacity
              style={[styles.statusToggleBtn, c.national_portal_status === 'DONE' ? styles.npDoneBg : styles.npPendingBg]}
              onPress={() => toggleNPStatus(c.id)}
            >
              <Text style={styles.toggleIcon}>{c.national_portal_status === 'DONE' ? '✓' : '⏳'}</Text>
              <View>
                <Text style={styles.toggleLabel}>National Portal</Text>
                <Text style={styles.toggleValue}>{c.national_portal_status === 'DONE' ? 'Approved' : 'Pending'}</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Documents Section */}
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Documents</Text>
          <TouchableOpacity onPress={() => onNavigate('DocumentUpload')}>
            <Text style={styles.manageDocsLink}>Manage →</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.docsCard}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.docsScroll}>
            {/* Aadhaar */}
            <TouchableOpacity style={styles.docTile} onPress={() => onNavigate('DocumentUpload')}>
              <Text style={styles.docTileIcon}>🪪</Text>
              <Text style={styles.docTileName}>Aadhaar</Text>
              <Text style={styles.docTileCount}>2/2</Text>
            </TouchableOpacity>

            {/* Solar Panel */}
            <TouchableOpacity style={styles.docTile} onPress={() => onNavigate('DocumentUpload')}>
              <Text style={styles.docTileIcon}>☀️</Text>
              <Text style={styles.docTileName}>Solar Panel</Text>
              <Text style={styles.docTileCount}>5/10</Text>
            </TouchableOpacity>

            {/* Inverter */}
            <TouchableOpacity style={styles.docTile} onPress={() => onNavigate('DocumentUpload')}>
              <Text style={styles.docTileIcon}>🔌</Text>
              <Text style={styles.docTileName}>Inverter</Text>
              <Text style={styles.docTileCount}>1/2</Text>
            </TouchableOpacity>

            {/* Plant Photos */}
            <TouchableOpacity style={styles.docTile} onPress={() => onNavigate('DocumentUpload')}>
              <Text style={styles.docTileIcon}>📍</Text>
              <Text style={styles.docTileName}>Plant Photos</Text>
              <Text style={styles.docTileCount}>1/2</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>

        {/* Recent Activity Timeline */}
        <Text style={styles.sectionTitle}>Recent Activity</Text>
        <View style={styles.timelineCard}>
          <View style={styles.timelineItem}>
            <View style={styles.greenDot} />
            <View style={styles.timelineContent}>
              <Text style={styles.timelineTitle}>Document uploaded - Plant Photo</Text>
              <Text style={styles.timelineTime}>Apr 25, 2025 10:30 AM</Text>
            </View>
          </View>

          <View style={styles.timelineItem}>
            <View style={styles.greenDot} />
            <View style={styles.timelineContent}>
              <Text style={styles.timelineTitle}>RTS status updated to Done</Text>
              <Text style={styles.timelineTime}>Apr 24, 2025 03:15 PM</Text>
            </View>
          </View>
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
  editBtn: { padding: 4 },
  editIcon: { fontSize: 18 },
  content: { flex: 1 },
  scrollContent: { padding: 16, paddingBottom: 40 },
  emptyContainer: { flex: 1, backgroundColor: '#0F172A', justifyContent: 'center', alignItems: 'center' },
  emptyText: { color: '#94A3B8' },
  headerCard: {
    backgroundColor: '#FFFFFF', // White header card from image
    borderRadius: 20,
    padding: 18,
    shadowColor: '#0F172A',
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 4,
    marginBottom: 16,
  },
  avatarRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  avatarCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#0F172A',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: { color: '#FFFFFF', fontSize: 16, fontWeight: '800' },
  nameCol: { flex: 1 },
  name: { fontSize: 17, fontWeight: '900', color: '#0F172A' },
  phone: { fontSize: 12, color: '#475569', marginTop: 2 },
  meta: { fontSize: 11, color: '#94A3B8', marginTop: 2 },
  dualToggleRow: { flexDirection: 'row', gap: 10 },
  statusToggleBtn: {
    flex: 1,
    borderRadius: 14,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  rtsDoneBg: { backgroundColor: '#10B981' }, // Green card from photo
  rtsPendingBg: { backgroundColor: '#F59E0B' },
  npDoneBg: { backgroundColor: '#3B82F6' },
  npPendingBg: { backgroundColor: '#60A5FA' }, // Light blue card from photo
  toggleIcon: { fontSize: 20, color: '#FFFFFF' },
  toggleLabel: { fontSize: 10, fontWeight: '700', color: '#FFFFFF', opacity: 0.9 },
  toggleValue: { fontSize: 14, fontWeight: '900', color: '#FFFFFF', marginTop: 1 },
  sectionHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  sectionTitle: { color: '#FFFFFF', fontSize: 15, fontWeight: '800', marginBottom: 8, marginTop: 4 },
  manageDocsLink: { color: '#F59E0B', fontSize: 12, fontWeight: '700' },
  docsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    marginBottom: 16,
  },
  docsScroll: { gap: 10 },
  docTile: {
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingHorizontal: 14,
    paddingVertical: 10,
    alignItems: 'center',
    minWidth: 80,
  },
  docTileIcon: { fontSize: 22, marginBottom: 4 },
  docTileName: { fontSize: 11, fontWeight: '700', color: '#0F172A' },
  docTileCount: { fontSize: 10, color: '#10B981', fontWeight: '800', marginTop: 2 },
  timelineCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
  },
  timelineItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    paddingVertical: 8,
  },
  greenDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#10B981',
    marginTop: 4,
  },
  timelineContent: { flex: 1 },
  timelineTitle: { fontSize: 13, fontWeight: '700', color: '#0F172A' },
  timelineTime: { fontSize: 11, color: '#94A3B8', marginTop: 2 },
});
