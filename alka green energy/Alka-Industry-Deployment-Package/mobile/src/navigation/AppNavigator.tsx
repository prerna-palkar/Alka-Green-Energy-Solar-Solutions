import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import { useAuthStore } from '../store/useAuthStore';
import { SplashScreen } from '../screens/SplashScreen';
import { LoginScreen } from '../screens/LoginScreen';
import { DashboardScreen } from '../screens/DashboardScreen';
import { ConsumerListScreen } from '../screens/ConsumerListScreen';
import { AddConsumerScreen } from '../screens/AddConsumerScreen';
import { ConsumerDetailScreen } from '../screens/ConsumerDetailScreen';
import { DocumentUploadScreen } from '../screens/DocumentUploadScreen';
import { CameraScreen } from '../screens/CameraScreen';
import { OfflineSyncScreen } from '../screens/OfflineSyncScreen';
import { ProfileScreen } from '../screens/ProfileScreen';

export const AppNavigator: React.FC = () => {
  const [showSplash, setShowSplash] = useState(true);
  const { isAuthenticated } = useAuthStore();
  const [currentScreen, setCurrentScreen] = useState('Dashboard');

  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />;
  }

  if (!isAuthenticated) {
    return <LoginScreen />;
  }

  const renderScreen = () => {
    switch (currentScreen) {
      case 'Dashboard':
        return <DashboardScreen onNavigate={setCurrentScreen} />;
      case 'Consumers':
        return <ConsumerListScreen onNavigate={setCurrentScreen} />;
      case 'AddConsumer':
        return <AddConsumerScreen onNavigate={setCurrentScreen} />;
      case 'ConsumerDetail':
        return <ConsumerDetailScreen onNavigate={setCurrentScreen} />;
      case 'DocumentUpload':
        return <DocumentUploadScreen onNavigate={setCurrentScreen} />;
      case 'Camera':
        return <CameraScreen onNavigate={setCurrentScreen} />;
      case 'OfflineSync':
        return <OfflineSyncScreen onNavigate={setCurrentScreen} />;
      case 'Profile':
        return <ProfileScreen onNavigate={setCurrentScreen} />;
      default:
        return <DashboardScreen onNavigate={setCurrentScreen} />;
    }
  };

  const isFullscreen = currentScreen === 'Camera';

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0F172A" />

      {/* Screen Viewport */}
      <View style={styles.viewport}>{renderScreen()}</View>

      {/* Bottom Navigation Bar matching photo mockup */}
      {!isFullscreen && (
        <View style={styles.navBar}>
          <TouchableOpacity style={styles.navItem} onPress={() => setCurrentScreen('Dashboard')}>
            <Text style={[styles.navIcon, currentScreen === 'Dashboard' && styles.navIconActive]}>🏠</Text>
            <Text style={[styles.navText, currentScreen === 'Dashboard' && styles.navTextActive]}>Dashboard</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.navItem} onPress={() => setCurrentScreen('Consumers')}>
            <Text style={[styles.navIcon, currentScreen === 'Consumers' && styles.navIconActive]}>👥</Text>
            <Text style={[styles.navText, currentScreen === 'Consumers' && styles.navTextActive]}>Consumers</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.navItemAdd} onPress={() => setCurrentScreen('AddConsumer')}>
            <View style={styles.addBtnCircle}>
              <Text style={styles.addBtnIcon}>➕</Text>
            </View>
            <Text style={[styles.navText, currentScreen === 'AddConsumer' && styles.navTextActive]}>Add</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.navItem} onPress={() => setCurrentScreen('OfflineSync')}>
            <Text style={[styles.navIcon, currentScreen === 'OfflineSync' && styles.navIconActive]}>☁️</Text>
            <Text style={[styles.navText, currentScreen === 'OfflineSync' && styles.navTextActive]}>Sync</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.navItem} onPress={() => setCurrentScreen('Profile')}>
            <Text style={[styles.navIcon, currentScreen === 'Profile' && styles.navIconActive]}>👤</Text>
            <Text style={[styles.navText, currentScreen === 'Profile' && styles.navTextActive]}>Profile</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
  viewport: {
    flex: 1,
  },
  navBar: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF', // Clean White bottom nav bar from reference image
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    paddingVertical: 8,
    paddingHorizontal: 12,
    justifyContent: 'space-around',
    alignItems: 'center',
    shadowColor: '#0F172A',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 4,
  },
  navItem: {
    alignItems: 'center',
    flex: 1,
  },
  navItemAdd: {
    alignItems: 'center',
    flex: 1,
  },
  addBtnCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#0F172A',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 2,
  },
  addBtnIcon: {
    fontSize: 14,
    color: '#FFFFFF',
  },
  navIcon: {
    fontSize: 18,
    color: '#64748B',
  },
  navIconActive: {
    color: '#2563EB', // Active blue indicator from photo
  },
  navText: {
    color: '#64748B',
    fontSize: 10,
    marginTop: 2,
    fontWeight: '600',
  },
  navTextActive: {
    color: '#2563EB',
    fontWeight: '800',
  },
});
