import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';

interface Props {
  onNavigate: (screen: string) => void;
}

export const CameraScreen: React.FC<Props> = ({ onNavigate }) => {
  const [mode, setMode] = useState<'VIDEO' | 'PHOTO' | 'PORTRAIT'>('PHOTO');

  const handleShutter = () => {
    Alert.alert('Photo Captured', 'Rooftop plant photo captured with GPS geotag (Lat: 19.0760° N, Long: 72.8377° E)', [
      { text: 'Use Photo', onPress: () => onNavigate('DocumentUpload') }
    ]);
  };

  return (
    <View style={styles.container}>
      {/* Fullscreen Solar Viewfinder Image */}
      <Image
        source={{ uri: "https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1000&q=80" }}
        style={styles.viewfinder}
      />

      {/* Top Controls Overlay */}
      <View style={styles.topOverlay}>
        <TouchableOpacity style={styles.closeBtn} onPress={() => onNavigate('DocumentUpload')}>
          <Text style={styles.closeIcon}>✕</Text>
        </TouchableOpacity>
      </View>

      {/* Bottom Controls Overlay */}
      <View style={styles.bottomOverlay}>
        {/* Mode Selector */}
        <View style={styles.modeRow}>
          <TouchableOpacity onPress={() => setMode('VIDEO')}>
            <Text style={[styles.modeText, mode === 'VIDEO' && styles.modeActive]}>VIDEO</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setMode('PHOTO')}>
            <Text style={[styles.modeText, mode === 'PHOTO' && styles.modeActive]}>PHOTO</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setMode('PORTRAIT')}>
            <Text style={[styles.modeText, mode === 'PORTRAIT' && styles.modeActive]}>PORTRAIT</Text>
          </TouchableOpacity>
        </View>

        {/* Shutter Row */}
        <View style={styles.shutterRow}>
          {/* Gallery Thumb Preview */}
          <TouchableOpacity style={styles.galleryThumbBox} onPress={() => onNavigate('DocumentUpload')}>
            <Image
              source={{ uri: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=200&q=80" }}
              style={styles.galleryThumb}
            />
          </TouchableOpacity>

          {/* Shutter Button */}
          <TouchableOpacity style={styles.shutterBtnOuter} onPress={handleShutter}>
            <View style={styles.shutterBtnInner} />
          </TouchableOpacity>

          {/* Flip Camera Icon */}
          <TouchableOpacity style={styles.flipBtn}>
            <Text style={styles.flipIcon}>🔄</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000000' },
  viewfinder: { width: '100%', height: '100%', position: 'absolute' },
  topOverlay: {
    position: 'absolute',
    top: 40,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  closeBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#00000066',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeIcon: { color: '#FFFFFF', fontSize: 18, fontWeight: '800' },
  bottomOverlay: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  modeRow: {
    flexDirection: 'row',
    gap: 24,
    marginBottom: 20,
    backgroundColor: '#00000044',
    paddingHorizontal: 20,
    paddingVertical: 6,
    borderRadius: 16,
  },
  modeText: { color: '#94A3B8', fontSize: 12, fontWeight: '700' },
  modeActive: { color: '#F59E0B', fontWeight: '900' },
  shutterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: 30,
  },
  galleryThumbBox: {
    width: 44,
    height: 44,
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  galleryThumb: { width: '100%', height: '100%' },
  shutterBtnOuter: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 4,
    borderColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  shutterBtnInner: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#FFFFFF',
  },
  flipBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#00000066',
    justifyContent: 'center',
    alignItems: 'center',
  },
  flipIcon: { fontSize: 20 },
});
