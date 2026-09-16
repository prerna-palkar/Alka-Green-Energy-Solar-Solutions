import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

interface Props {
  onFinish: () => void;
}

export const SplashScreen: React.FC<Props> = ({ onFinish }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      {/* Sun & Panel Brand Logo */}
      <View style={styles.logoContainer}>
        <View style={styles.sunGraphic}>
          <Text style={styles.sunRays}>☀️</Text>
          <View style={styles.panelGrid}>
            <View style={styles.gridLineH} />
            <View style={styles.gridLineV} />
          </View>
        </View>
        
        <Text style={styles.brandTitle}>Alka Green Energy</Text>
        <Text style={styles.brandSubtitle}>Solar Rooftop Solutions</Text>
      </View>

      {/* Tagline */}
      <View style={styles.taglineBox}>
        <Text style={styles.tagline}>Clean Energy <Text style={styles.taglineDivider}>|</Text> Better Tomorrow</Text>
      </View>

      {/* House & Leaf Vector Graphic Illustration at Bottom */}
      <View style={styles.illustrationBox}>
        <View style={styles.houseOutline}>
          <View style={styles.roofLine} />
          <View style={styles.solarPanelOnRoof}>
            <Text style={styles.roofPanelText}>⚡</Text>
          </View>
          <View style={styles.sproutLeaf}>
            <Text style={styles.leafIcon}>🌱</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A', // Dark Navy
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 60,
    paddingHorizontal: 24,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 80,
  },
  sunGraphic: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#F59E0B22',
    borderWidth: 2,
    borderColor: '#F59E0B',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  sunRays: {
    fontSize: 54,
  },
  panelGrid: {
    position: 'absolute',
    width: 50,
    height: 30,
    borderWidth: 1,
    borderColor: '#60A5FA',
    backgroundColor: '#1E3A8A66',
    borderRadius: 4,
  },
  gridLineH: {
    position: 'absolute',
    top: 14,
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: '#60A5FA',
  },
  gridLineV: {
    position: 'absolute',
    left: 24,
    top: 0,
    bottom: 0,
    width: 1,
    backgroundColor: '#60A5FA',
  },
  brandTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: 1,
    textAlign: 'center',
  },
  brandSubtitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#94A3B8',
    marginTop: 6,
    letterSpacing: 0.5,
  },
  taglineBox: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#1E293B',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#334155',
  },
  tagline: {
    color: '#E2E8F0',
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 1.5,
  },
  taglineDivider: {
    color: '#F59E0B',
    fontWeight: '900',
  },
  illustrationBox: {
    alignItems: 'center',
    marginBottom: 20,
  },
  houseOutline: {
    width: 140,
    height: 80,
    borderBottomWidth: 2,
    borderColor: '#38BDF8',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  roofLine: {
    position: 'absolute',
    top: 10,
    width: 100,
    height: 2,
    backgroundColor: '#38BDF8',
    transform: [{ rotate: '-25deg' }],
  },
  solarPanelOnRoof: {
    width: 44,
    height: 24,
    backgroundColor: '#3B82F6',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#93C5FD',
  },
  roofPanelText: {
    fontSize: 12,
  },
  sproutLeaf: {
    position: 'absolute',
    right: -10,
    bottom: 0,
  },
  leafIcon: {
    fontSize: 24,
  },
});
