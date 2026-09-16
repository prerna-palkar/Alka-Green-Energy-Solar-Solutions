import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, Alert } from 'react-native';
import { useAuthStore } from '../store/useAuthStore';
import { useConsumerStore } from '../store/useConsumerStore';

interface Props {
  onNavigate: (screen: string) => void;
}

export const ProfileScreen: React.FC<Props> = ({ onNavigate }) => {
  const { user, logout } = useAuthStore();
  const { isOffline, toggleNetworkMode } = useConsumerStore();
  const [connectivityEngine, setConnectivityEngine] = useState(true);

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to log out?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Logout', style: 'destructive', onPress: () => logout() }
    ]);
  };

  return (
    <View style={styles.container}>
      {/* Top Bar */}
      <View style={styles.headerBar}>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.scrollContent}>
        {/* Main White Profile Card from Photo */}
        <View style={styles.profileCard}>
          {/* User Info Header */}
          <View style={styles.userHeader}>
            <View style={styles.avatarCircle}>
              <Text style={styles.avatarInitials}>RK</Text>
            </View>
            <View style={styles.userInfo}>
              <Text style={styles.userName}>{user?.name || 'Ravi Kumar'}</Text>
              <Text style={styles.userRole}>Field Agent</Text>
            </View>
          </View>

          {/* Menu Items List */}
          <View style={styles.menuList}>
            {/* My Information */}
            <TouchableOpacity style={styles.menuItem}>
              <View style={styles.menuLeft}>
                <Text style={styles.menuIcon}>👤</Text>
                <Text style={styles.menuTitle}>My Information</Text>
              </View>
              <Text style={styles.menuArrow}>❯</Text>
            </TouchableOpacity>

            {/* Role & Permissions */}
            <TouchableOpacity style={styles.menuItem}>
              <View style={styles.menuLeft}>
                <Text style={styles.menuIcon}>👮</Text>
                <Text style={styles.menuTitle}>Role & Permissions</Text>
              </View>
              <Text style={styles.menuArrow}>❯</Text>
            </TouchableOpacity>

            {/* Connectivity Engine Switch */}
            <View style={styles.menuItem}>
              <View style={styles.menuLeft}>
                <Text style={styles.menuIcon}>🌐</Text>
                <Text style={styles.menuTitle}>Connectivity Engine</Text>
              </View>
              <Switch
                value={connectivityEngine}
                onValueChange={(val) => {
                  setConnectivityEngine(val);
                  toggleNetworkMode();
                }}
                trackColor={{ false: '#CBD5E1', true: '#10B981' }}
                thumbColor="#FFFFFF"
              />
            </View>

            {/* App Settings */}
            <TouchableOpacity style={styles.menuItem}>
              <View style={styles.menuLeft}>
                <Text style={styles.menuIcon}>⚙️</Text>
                <Text style={styles.menuTitle}>App Settings</Text>
              </View>
              <Text style={styles.menuArrow}>❯</Text>
            </TouchableOpacity>

            {/* Help & Support */}
            <TouchableOpacity style={styles.menuItem}>
              <View style={styles.menuLeft}>
                <Text style={styles.menuIcon}>❓</Text>
                <Text style={styles.menuTitle}>Help & Support</Text>
              </View>
              <Text style={styles.menuArrow}>❯</Text>
            </TouchableOpacity>

            {/* Logout (Red Text) */}
            <TouchableOpacity style={[styles.menuItem, { borderBottomWidth: 0 }]} onPress={handleLogout}>
              <View style={styles.menuLeft}>
                <Text style={[styles.menuIcon, { color: '#EF4444' }]}>🚪</Text>
                <Text style={[styles.menuTitle, styles.logoutText]}>Logout</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0F172A' },
  headerBar: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#1E293B',
  },
  headerTitle: { color: '#FFFFFF', fontSize: 18, fontWeight: '800' },
  content: { flex: 1 },
  scrollContent: { padding: 16, paddingBottom: 40 },
  profileCard: {
    backgroundColor: '#FFFFFF', // White card from photo
    borderRadius: 20,
    padding: 20,
    shadowColor: '#0F172A',
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 4,
  },
  userHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
    marginBottom: 10,
  },
  avatarCircle: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: '#0F172A',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  avatarInitials: { color: '#FFFFFF', fontSize: 18, fontWeight: '800' },
  userInfo: { flex: 1 },
  userName: { fontSize: 18, fontWeight: '900', color: '#0F172A' },
  userRole: { fontSize: 12, color: '#64748B', marginTop: 2 },
  menuList: { gap: 4 },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  menuIcon: { fontSize: 18 },
  menuTitle: { fontSize: 14, fontWeight: '700', color: '#0F172A' },
  menuArrow: { color: '#94A3B8', fontSize: 14 },
  logoutText: { color: '#EF4444', fontWeight: '800' },
});
