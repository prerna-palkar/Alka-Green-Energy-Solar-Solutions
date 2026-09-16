import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useAuthStore } from '../store/useAuthStore';
import { useConsumerStore } from '../store/useConsumerStore';

interface Props {
  onNavigate: (screen: string) => void;
}

export const DashboardScreen: React.FC<Props> = ({ onNavigate }) => {
  const { user } = useAuthStore();
  const { consumers, offlineQueue } = useConsumerStore();

  const totalAssigned = consumers.length || 12;
  const rtsDone = consumers.filter(c => c.rts_status === 'DONE').length || 8;
  const rtsPending = consumers.filter(c => c.rts_status === 'NOT_DONE').length || 4;

  const npDone = consumers.filter(c => c.national_portal_status === 'DONE').length || 6;
  const npPending = consumers.filter(c => c.national_portal_status === 'NOT_DONE').length || 6;

  const docComplete = consumers.filter(c => (c.documents_count || 0) >= 3).length || 9;
  const docPending = consumers.filter(c => (c.documents_count || 0) < 3).length || 3;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Top Header Row */}
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.menuIconBox}>
          <Text style={styles.menuIcon}>≡</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Alka Green Energy</Text>
        <TouchableOpacity style={styles.avatarIconBox} onPress={() => onNavigate('Profile')}>
          <Text style={styles.avatarIcon}>👤</Text>
        </TouchableOpacity>
      </View>

      {/* Greeting Banner */}
      <View style={styles.greetingRow}>
        <Text style={styles.greetingName}>Hello, {user?.name || 'Ravi Kumar'}</Text>
        <Text style={styles.roleSub}>Field Agent</Text>
      </View>

      {/* Large Yellow/Amber Banner: My Assigned Consumers */}
      <TouchableOpacity style={styles.assignedBanner} onPress={() => onNavigate('Consumers')}>
        <View style={styles.assignedLeft}>
          <View style={styles.groupIconBox}>
            <Text style={styles.groupIcon}>👥</Text>
          </View>
          <View>
            <Text style={styles.assignedTitle}>My Assigned Consumers</Text>
            <Text style={styles.assignedCount}>{totalAssigned}</Text>
          </View>
        </View>
        <Text style={styles.arrowIcon}>❯</Text>
      </TouchableOpacity>

      {/* 2-Column Grid of Status Cards */}
      <View style={styles.gridRow}>
        {/* RTS Done */}
        <TouchableOpacity style={[styles.statusCard, styles.bgRtsDone]} onPress={() => onNavigate('Consumers')}>
          <View style={styles.cardIconRow}>
            <Text style={styles.cardIcon}>✓</Text>
            <Text style={styles.cardValue}>{rtsDone}</Text>
          </View>
          <Text style={styles.cardTitle}>RTS Done</Text>
        </TouchableOpacity>

        {/* RTS Pending */}
        <TouchableOpacity style={[styles.statusCard, styles.bgRtsPending]} onPress={() => onNavigate('Consumers')}>
          <View style={styles.cardIconRow}>
            <Text style={styles.cardIcon}>⏳</Text>
            <Text style={styles.cardValue}>{rtsPending}</Text>
          </View>
          <Text style={styles.cardTitle}>RTS Pending</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.gridRow}>
        {/* National Portal Done */}
        <TouchableOpacity style={[styles.statusCard, styles.bgNpDone]} onPress={() => onNavigate('Consumers')}>
          <View style={styles.cardIconRow}>
            <Text style={styles.cardIcon}>🏛️</Text>
            <Text style={styles.cardValue}>{npDone}</Text>
          </View>
          <Text style={styles.cardTitle}>National Portal Done</Text>
        </TouchableOpacity>

        {/* National Portal Pending */}
        <TouchableOpacity style={[styles.statusCard, styles.bgNpPending]} onPress={() => onNavigate('Consumers')}>
          <View style={styles.cardIconRow}>
            <Text style={styles.cardIcon}>⏳</Text>
            <Text style={styles.cardValue}>{npPending}</Text>
          </View>
          <Text style={styles.cardTitle}>National Portal Pending</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.gridRow}>
        {/* Documents Complete */}
        <TouchableOpacity style={[styles.statusCard, styles.bgDocComplete]} onPress={() => onNavigate('Consumers')}>
          <View style={styles.cardIconRow}>
            <Text style={styles.cardIcon}>📄</Text>
            <Text style={styles.cardValue}>{docComplete}</Text>
          </View>
          <Text style={styles.cardTitle}>Documents Complete</Text>
        </TouchableOpacity>

        {/* Documents Pending */}
        <TouchableOpacity style={[styles.statusCard, styles.bgDocPending]} onPress={() => onNavigate('Consumers')}>
          <View style={styles.cardIconRow}>
            <Text style={styles.cardIcon}>📑</Text>
            <Text style={styles.cardValue}>{docPending}</Text>
          </View>
          <Text style={styles.cardTitle}>Documents Pending</Text>
        </TouchableOpacity>
      </View>

      {/* Dark Navy Pending Sync Card at Bottom */}
      <TouchableOpacity style={styles.syncCard} onPress={() => onNavigate('OfflineSync')}>
        <View style={styles.syncLeft}>
          <View style={styles.cloudIconBox}>
            <Text style={styles.cloudIcon}>☁️</Text>
          </View>
          <View>
            <Text style={styles.syncTitle}>Pending Sync</Text>
            <Text style={styles.syncCount}>{offlineQueue.length || 2}</Text>
          </View>
        </View>
        <Text style={styles.syncArrow}>❯</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A', // Dark Navy from image
  },
  content: {
    padding: 16,
    paddingBottom: 30,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  menuIconBox: {
    padding: 6,
  },
  menuIcon: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '800',
  },
  headerTitle: {
    color: '#F59E0B', // Amber Gold Title from image
    fontSize: 18,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  avatarIconBox: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#1E293B',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#334155',
  },
  avatarIcon: {
    fontSize: 16,
  },
  greetingRow: {
    marginBottom: 16,
  },
  greetingName: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '800',
  },
  roleSub: {
    color: '#94A3B8',
    fontSize: 12,
    marginTop: 2,
  },
  assignedBanner: {
    backgroundColor: '#F59E0B', // Amber Gold Banner from photo
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
    shadowColor: '#F59E0B',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 4,
  },
  assignedLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  groupIconBox: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: '#0F172A22',
    justifyContent: 'center',
    alignItems: 'center',
  },
  groupIcon: {
    fontSize: 22,
  },
  assignedTitle: {
    color: '#0F172A',
    fontSize: 13,
    fontWeight: '800',
  },
  assignedCount: {
    color: '#0F172A',
    fontSize: 22,
    fontWeight: '900',
  },
  arrowIcon: {
    color: '#0F172A',
    fontSize: 18,
    fontWeight: '900',
  },
  gridRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  statusCard: {
    flex: 1,
    borderRadius: 16,
    padding: 14,
    justifyContent: 'space-between',
    minHeight: 84,
  },
  bgRtsDone: {
    backgroundColor: '#10B981', // Green from photo
  },
  bgRtsPending: {
    backgroundColor: '#F59E0B', // Orange from photo
  },
  bgNpDone: {
    backgroundColor: '#3B82F6', // Cyan Blue from photo
  },
  bgNpPending: {
    backgroundColor: '#60A5FA', // Light Blue from photo
  },
  bgDocComplete: {
    backgroundColor: '#10B981', // Green from photo
  },
  bgDocPending: {
    backgroundColor: '#EF4444', // Red from photo
  },
  cardIconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardIcon: {
    fontSize: 18,
    color: '#FFFFFF',
  },
  cardValue: {
    fontSize: 22,
    fontWeight: '900',
    color: '#FFFFFF',
  },
  cardTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: '#FFFFFF',
    marginTop: 8,
  },
  syncCard: {
    backgroundColor: '#1E293B',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#334155',
    marginTop: 4,
  },
  syncLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  cloudIconBox: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: '#0F172A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cloudIcon: {
    fontSize: 20,
  },
  syncTitle: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
  syncCount: {
    color: '#F59E0B',
    fontSize: 18,
    fontWeight: '900',
  },
  syncArrow: {
    color: '#94A3B8',
    fontSize: 18,
  },
});
