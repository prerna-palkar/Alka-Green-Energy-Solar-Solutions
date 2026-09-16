import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { useConsumerStore } from '../store/useConsumerStore';
import { ConsumerCategory, DiscomName } from '../types';

interface Props {
  onNavigate: (screen: string) => void;
}

export const AddConsumerScreen: React.FC<Props> = ({ onNavigate }) => {
  const { addConsumer } = useConsumerStore();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [consumerNumber, setConsumerNumber] = useState('');
  const [discomName, setDiscomName] = useState<DiscomName>('MSEDCL');
  const [category, setCategory] = useState<ConsumerCategory>('Residential');
  const [capacity, setCapacity] = useState('3kW');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const discomOptions: DiscomName[] = ['MSEDCL', 'Tata Power', 'BESCOM', 'Adani Electricity', 'Torrent Power'];
  const categoryOptions: ConsumerCategory[] = ['Residential', 'Commercial'];
  const capacityOptions = ['3kW', '4kW', '5kW', '10kW', 'Custom'];

  const handleSubmit = async () => {
    if (!name.trim()) {
      Alert.alert('Validation Error', 'Please enter consumer name.');
      return;
    }
    if (!phone.trim() || phone.length < 10) {
      Alert.alert('Validation Error', 'Please enter a valid 10-digit mobile phone number.');
      return;
    }
    if (!consumerNumber.trim()) {
      Alert.alert('Validation Error', 'Please enter connection/consumer number.');
      return;
    }

    setIsSubmitting(true);

    await addConsumer({
      name: name.trim(),
      phone: phone.trim(),
      consumer_number: consumerNumber.trim(),
      discom_name: discomName,
      category: category,
      inverter_capacity: capacity,
    });

    setIsSubmitting(false);

    Alert.alert('Success', 'Consumer registered successfully!', [
      { text: 'Upload Documents', onPress: () => onNavigate('DocumentUpload') },
      { text: 'View Details', onPress: () => onNavigate('ConsumerDetail') },
    ]);
  };

  return (
    <View style={styles.container}>
      {/* Top Bar */}
      <View style={styles.headerBar}>
        <TouchableOpacity style={styles.backBtn} onPress={() => onNavigate('Consumers')}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add Consumer</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.scrollContent}>
        <View style={styles.formCard}>
          {/* Consumer Name */}
          <Text style={styles.label}>Consumer Name *</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter consumer name"
            placeholderTextColor="#94A3B8"
            value={name}
            onChangeText={setName}
          />

          {/* Mobile Phone */}
          <Text style={styles.label}>Mobile Phone *</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter mobile number"
            placeholderTextColor="#94A3B8"
            keyboardType="phone-pad"
            maxLength={10}
            value={phone}
            onChangeText={setPhone}
          />

          {/* Connection Number */}
          <Text style={styles.label}>Connection Number *</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter connection number"
            placeholderTextColor="#94A3B8"
            value={consumerNumber}
            onChangeText={setConsumerNumber}
          />

          {/* DISCOM Utility */}
          <Text style={styles.label}>DISCOM Utility *</Text>
          <View style={styles.pillsRow}>
            {discomOptions.map((opt) => (
              <TouchableOpacity
                key={opt}
                style={[styles.pill, discomName === opt && styles.pillActive]}
                onPress={() => setDiscomName(opt)}
              >
                <Text style={[styles.pillText, discomName === opt && styles.pillTextActive]}>{opt}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Category */}
          <Text style={styles.label}>Category *</Text>
          <View style={styles.pillsRow}>
            {categoryOptions.map((cat) => (
              <TouchableOpacity
                key={cat}
                style={[styles.pill, category === cat && styles.pillActive]}
                onPress={() => setCategory(cat)}
              >
                <Text style={[styles.pillText, category === cat && styles.pillTextActive]}>{cat}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Inverter Capacity */}
          <Text style={styles.label}>Inverter Capacity *</Text>
          <View style={styles.pillsRow}>
            {capacityOptions.map((cap) => (
              <TouchableOpacity
                key={cap}
                style={[styles.pill, capacity === cap && styles.pillActiveGold]}
                onPress={() => setCapacity(cap)}
              >
                <Text style={[styles.pillText, capacity === cap && styles.pillTextActiveGold]}>{cap}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Save Consumer Button */}
          <TouchableOpacity style={styles.saveBtn} onPress={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.saveBtnText}>Save Consumer</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A', // Dark Navy
  },
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
  formCard: {
    backgroundColor: '#FFFFFF', // White form container from image
    borderRadius: 20,
    padding: 20,
    shadowColor: '#0F172A',
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 4,
  },
  label: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
    marginTop: 12,
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 14,
    color: '#0F172A',
  },
  pillsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  pill: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#F1F5F9',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  pillActive: {
    backgroundColor: '#0F172A',
    borderColor: '#0F172A',
  },
  pillActiveGold: {
    backgroundColor: '#F59E0B',
    borderColor: '#F59E0B',
  },
  pillText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#475569',
  },
  pillTextActive: {
    color: '#FFFFFF',
    fontWeight: '800',
  },
  pillTextActiveGold: {
    color: '#0F172A',
    fontWeight: '800',
  },
  saveBtn: {
    backgroundColor: '#0F172A', // Dark Navy button from photo
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 24,
  },
  saveBtnText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
  },
});
