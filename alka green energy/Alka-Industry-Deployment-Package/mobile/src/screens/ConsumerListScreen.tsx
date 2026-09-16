import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { useConsumerStore } from '../store/useConsumerStore';
import { Consumer } from '../types';

interface Props {
  onNavigate: (screen: string) => void;
}

export const ConsumerListScreen: React.FC<Props> = ({ onNavigate }) => {
  const { consumers, searchQuery, setSearchQuery, selectConsumer } = useConsumerStore();
  const [filterMode, setFilterMode] = useState<'ALL' | 'RTS' | 'NP' | 'PENDING'>('ALL');

  // Filter logic
  const filteredConsumers = consumers.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.phone.includes(searchQuery) ||
      c.consumer_number.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.discom_name.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (filterMode === 'RTS') return c.rts_status === 'DONE';
    if (filterMode === 'NP') return c.national_portal_status === 'DONE';
    if (filterMode === 'PENDING') return c.rts_status === 'NOT_DONE' || c.national_portal_status === 'NOT_DONE';
    return true;
  });

  const handleConsumerClick = (consumer: Consumer) => {
    selectConsumer(consumer);
    onNavigate('ConsumerDetail');
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerBar}>
        <TouchableOpacity style={styles.backBtn} onPress={() => onNavigate('Dashboard')}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Consumers</Text>
        <TouchableOpacity style={styles.addBtnHeader} onPress={() => onNavigate('AddConsumer')}>
          <Text style={styles.addBtnHeaderIcon}>➕</Text>
        </TouchableOpacity>
      </View>

      {/* Search Input */}
      <View style={styles.searchBox}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Search by name, phone, number..."
          placeholderTextColor="#94A3B8"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Filter Chips */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipsScroll} contentContainerStyle={styles.chipsContainer}>
        <TouchableOpacity
          style={[styles.chip, filterMode === 'ALL' && styles.chipActive]}
          onPress={() => setFilterMode('ALL')}
        >
          <Text style={[styles.chipText, filterMode === 'ALL' && styles.chipTextActive]}>All</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.chip, filterMode === 'RTS' && styles.chipActive]}
          onPress={() => setFilterMode('RTS')}
        >
          <Text style={[styles.chipText, filterMode === 'RTS' && styles.chipTextActive]}>RTS</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.chip, filterMode === 'NP' && styles.chipActive]}
          onPress={() => setFilterMode('NP')}
        >
          <Text style={[styles.chipText, filterMode === 'NP' && styles.chipTextActive]}>National Portal</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.chip, filterMode === 'PENDING' && styles.chipActive]}
          onPress={() => setFilterMode('PENDING')}
        >
          <Text style={[styles.chipText, filterMode === 'PENDING' && styles.chipTextActive]}>Pending</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Consumer List */}
      <FlatList
        data={filteredConsumers}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => handleConsumerClick(item)}>
            <View style={styles.avatarCircle}>
              <Text style={styles.avatarInitials}>
                {item.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
              </Text>
            </View>

            <View style={styles.infoCol}>
              <Text style={styles.consumerName}>{item.name}</Text>
              <Text style={styles.consumerPhone}>+91 {item.phone}</Text>
              <Text style={styles.consumerMeta}>{item.consumer_number} | {item.discom_name}</Text>
            </View>

            <View style={styles.badgesCol}>
              <View style={styles.badgesRow}>
                <View style={item.rts_status === 'DONE' ? styles.badgeGreen : styles.badgeOrange}>
                  <Text style={styles.badgeText}>RTS</Text>
                </View>
                <View style={item.national_portal_status === 'DONE' ? styles.badgeBlue : styles.badgeOrange}>
                  <Text style={styles.badgeText}>NP</Text>
                </View>
              </View>
              <Text style={styles.arrowRight}>❯</Text>
            </View>
          </TouchableOpacity>
        )}
      />
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
  backBtn: {
    padding: 4,
  },
  backArrow: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '800',
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '800',
  },
  addBtnHeader: {
    padding: 4,
  },
  addBtnHeaderIcon: {
    fontSize: 18,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF', // Clean light input from photo
    marginHorizontal: 16,
    marginTop: 12,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  searchIcon: {
    fontSize: 14,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 13,
    color: '#0F172A',
  },
  chipsScroll: {
    maxHeight: 50,
    marginTop: 10,
  },
  chipsContainer: {
    paddingHorizontal: 16,
    gap: 8,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#FFFFFF', // Light chips from photo
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  chipActive: {
    backgroundColor: '#0F172A', // Black active pill from photo
    borderColor: '#0F172A',
  },
  chipText: {
    color: '#475569',
    fontSize: 12,
    fontWeight: '700',
  },
  chipTextActive: {
    color: '#FFFFFF',
  },
  listContent: {
    padding: 16,
    paddingBottom: 40,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF', // White Cards from photo mockup
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
    shadowColor: '#0F172A',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  avatarCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#0F172A', // Dark initials circle
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarInitials: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
  },
  infoCol: {
    flex: 1,
  },
  consumerName: {
    color: '#0F172A',
    fontSize: 15,
    fontWeight: '800',
  },
  consumerPhone: {
    color: '#64748B',
    fontSize: 12,
    marginTop: 2,
  },
  consumerMeta: {
    color: '#94A3B8',
    fontSize: 11,
    marginTop: 2,
  },
  badgesCol: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 44,
  },
  badgesRow: {
    flexDirection: 'row',
    gap: 4,
  },
  badgeGreen: {
    backgroundColor: '#10B981',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 6,
  },
  badgeBlue: {
    backgroundColor: '#3B82F6',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 6,
  },
  badgeOrange: {
    backgroundColor: '#F59E0B',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 6,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '800',
  },
  arrowRight: {
    color: '#94A3B8',
    fontSize: 14,
  },
});
