import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import { useConsumerStore } from '../store/useConsumerStore';

interface Props {
  onNavigate: (screen: string) => void;
}

export const DocumentUploadScreen: React.FC<Props> = ({ onNavigate }) => {
  const { selectedConsumer, uploadDocument } = useConsumerStore();
  const [capacity, setCapacity] = useState('4 kW');
  const [gpsText, setGpsText] = useState('GPS Captured: 19.0760° N, 72.8377° E');

  const handleCameraLaunch = () => {
    onNavigate('Camera');
  };

  const handleSave = () => {
    Alert.alert('Saved', 'All proof documents and GPS geotagged plant photos saved successfully!', [
      { text: 'View Details', onPress: () => onNavigate('ConsumerDetail') }
    ]);
  };

  return (
    <View style={styles.container}>
      {/* Top Bar */}
      <View style={styles.headerBar}>
        <TouchableOpacity style={styles.backBtn} onPress={() => onNavigate('ConsumerDetail')}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Documents & Photos</Text>
        <TouchableOpacity style={styles.cameraIconHeader} onPress={handleCameraLaunch}>
          <Text style={styles.cameraIconHeaderText}>📷</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.scrollContent}>
        {/* Main Document & Photo Studio List Card from Photo */}
        <View style={styles.studioCard}>
          {/* 1. Aadhaar Card */}
          <View style={styles.docRow}>
            <View style={styles.docLeftIcon}>
              <Text style={styles.docIconText}>🪪</Text>
            </View>
            <View style={styles.docInfoCol}>
              <Text style={styles.docTitle}>Aadhaar Card</Text>
              <Text style={styles.docSub}>Front & Back (Max 2)</Text>
            </View>
            <View style={styles.checkBadgeGreen}>
              <Text style={styles.checkIcon}>✓</Text>
            </View>
            <Text style={styles.countText}>2/2</Text>
          </View>

          {/* 2. Solar Panel Serial */}
          <View style={styles.docRowVertical}>
            <View style={styles.rowTop}>
              <View style={styles.docLeftIcon}>
                <Text style={styles.docIconText}>☀️</Text>
              </View>
              <View style={styles.docInfoCol}>
                <Text style={styles.docTitle}>Solar Panel Serial</Text>
                <Text style={styles.docSub}>Max 10 photos</Text>
              </View>
              <TouchableOpacity style={styles.checkBadgeGreen} onPress={handleCameraLaunch}>
                <Text style={styles.checkIcon}>✓</Text>
              </TouchableOpacity>
              <Text style={styles.countText}>5/10</Text>
            </View>
            {/* Thumbnails */}
            <View style={styles.thumbRow}>
              <Image source={{ uri: "https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=300&q=80" }} style={styles.thumb} />
              <Image source={{ uri: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=300&q=80" }} style={styles.thumb} />
              <TouchableOpacity style={styles.addThumbBtn} onPress={handleCameraLaunch}>
                <Text style={styles.addThumbIcon}>➕</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* 3. Inverter Serial */}
          <View style={styles.docRowVertical}>
            <View style={styles.rowTop}>
              <View style={styles.docLeftIcon}>
                <Text style={styles.docIconText}>🔌</Text>
              </View>
              <View style={styles.docInfoCol}>
                <Text style={styles.docTitle}>Inverter Serial</Text>
                <Text style={styles.docSub}>Max 2 photos</Text>
              </View>
              <TouchableOpacity style={styles.checkBadgeGreen} onPress={handleCameraLaunch}>
                <Text style={styles.checkIcon}>✓</Text>
              </TouchableOpacity>
              <Text style={styles.countText}>1/2</Text>
            </View>
            {/* Thumbnails */}
            <View style={styles.thumbRow}>
              <Image source={{ uri: "https://images.unsplash.com/photo-1542336391-ae2936d8efe4?auto=format&fit=crop&w=300&q=80" }} style={styles.thumb} />
              <TouchableOpacity style={styles.addThumbBtn} onPress={handleCameraLaunch}>
                <Text style={styles.addThumbIcon}>➕</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* 4. Inverter Capacity Pills */}
          <View style={styles.docRowVertical}>
            <View style={styles.rowTop}>
              <View style={styles.docLeftIcon}>
                <Text style={styles.docIconText}>⚡</Text>
              </View>
              <View style={styles.docInfoCol}>
                <Text style={styles.docTitle}>Inverter Capacity</Text>
              </View>
            </View>

            <View style={styles.capPillsRow}>
              {['3 kW', '4 kW', '5 kW', 'Custom'].map((cap) => (
                <TouchableOpacity
                  key={cap}
                  style={[styles.capPill, capacity === cap && styles.capPillActive]}
                  onPress={() => setCapacity(cap)}
                >
                  <Text style={[styles.capPillText, capacity === cap && styles.capPillTextActive]}>{cap}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* 5. Plant Photo (GPS Geotagged) */}
          <View style={styles.docRowVertical}>
            <View style={styles.rowTop}>
              <View style={styles.docLeftIcon}>
                <Text style={styles.docIconText}>📍</Text>
              </View>
              <View style={styles.docInfoCol}>
                <Text style={styles.docTitle}>Plant Photo</Text>
                <Text style={styles.docSub}>Max 2 photos + GPS</Text>
              </View>
              <TouchableOpacity style={styles.checkBadgeGreen} onPress={handleCameraLaunch}>
                <Text style={styles.checkIcon}>✓</Text>
              </TouchableOpacity>
            </View>

            {/* GPS Tagged Thumbnail */}
            <View style={styles.gpsPhotoBox}>
              <Image source={{ uri: "https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=400&q=80" }} style={styles.plantPhotoThumb} />
              <View style={styles.gpsBanner}>
                <Text style={styles.gpsBannerText}>📍 {gpsText}</Text>
              </View>
            </View>
          </View>

          {/* Save Documents Button */}
          <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
            <Text style={styles.saveBtnText}>Save Documents</Text>
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
  cameraIconHeader: { padding: 4 },
  cameraIconHeaderText: { fontSize: 18 },
  content: { flex: 1 },
  scrollContent: { padding: 16, paddingBottom: 40 },
  studioCard: {
    backgroundColor: '#FFFFFF', // White card from image
    borderRadius: 20,
    padding: 18,
    shadowColor: '#0F172A',
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 4,
  },
  docRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  docRowVertical: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  rowTop: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  docLeftIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  docIconText: { fontSize: 16 },
  docInfoCol: { flex: 1 },
  docTitle: { fontSize: 14, fontWeight: '800', color: '#0F172A' },
  docSub: { fontSize: 11, color: '#94A3B8', marginTop: 1 },
  checkBadgeGreen: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#10B981',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  checkIcon: { color: '#FFFFFF', fontSize: 12, fontWeight: '900' },
  countText: { fontSize: 11, color: '#64748B', fontWeight: '700' },
  thumbRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 10,
    paddingLeft: 46,
  },
  thumb: {
    width: 44,
    height: 44,
    borderRadius: 8,
  },
  addThumbBtn: {
    width: 44,
    height: 44,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addThumbIcon: { fontSize: 14 },
  capPillsRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 10,
    paddingLeft: 46,
  },
  capPill: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  capPillActive: {
    backgroundColor: '#3B82F6', // Active Blue pill from photo
    borderColor: '#3B82F6',
  },
  capPillText: { fontSize: 12, fontWeight: '700', color: '#475569' },
  capPillTextActive: { color: '#FFFFFF', fontWeight: '800' },
  gpsPhotoBox: {
    marginTop: 10,
    marginLeft: 46,
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  plantPhotoThumb: {
    width: '100%',
    height: 100,
  },
  gpsBanner: {
    backgroundColor: '#0F172A',
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  gpsBannerText: {
    color: '#34D399',
    fontSize: 10,
    fontWeight: '700',
  },
  saveBtn: {
    backgroundColor: '#0F172A', // Dark Navy button from photo
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 20,
  },
  saveBtnText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
  },
});
