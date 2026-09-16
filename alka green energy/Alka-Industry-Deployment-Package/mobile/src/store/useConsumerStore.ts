import { create } from 'zustand';
import { Consumer, ConsumerDocument, RTSStatus, NationalPortalStatus, OfflineQueueItem } from '../types';
import { apiClient } from '../api/client';

interface ConsumerState {
  consumers: Consumer[];
  searchQuery: string;
  rtsFilter: string; // 'ALL' | 'DONE' | 'NOT_DONE'
  npFilter: string; // 'ALL' | 'DONE' | 'NOT_DONE'
  agentFilter: string; // 'ALL' or agent id
  isOffline: boolean;
  offlineQueue: OfflineQueueItem[];
  isLoading: boolean;
  selectedConsumer: Consumer | null;

  // Actions
  fetchConsumers: () => Promise<void>;
  setSearchQuery: (query: string) => void;
  setRTSFilter: (status: string) => void;
  setNPFilter: (status: string) => void;
  setAgentFilter: (agent: string) => void;
  toggleRTSStatus: (consumerId: number) => Promise<void>;
  toggleNPStatus: (consumerId: number) => Promise<void>;
  addConsumer: (newConsumer: Partial<Consumer>) => Promise<boolean>;
  uploadDocument: (consumerId: number, doc: Partial<ConsumerDocument>) => Promise<boolean>;
  selectConsumer: (consumer: Consumer | null) => void;
  syncOfflineQueue: () => Promise<void>;
  toggleNetworkMode: () => void;
}

const initialMockConsumers: Consumer[] = [
  {
    id: 1,
    name: "Anil Deshmukh",
    phone: "9823012345",
    address: "Plot 42, Shivajinagar, Beed",
    consumer_number: "MSEDCL-8839201",
    discom_name: "MSEDCL",
    category: "Residential",
    agent_id: 2,
    agent_name: "Rajesh Sharma (Agent)",
    inverter_capacity: "3kW",
    rts_status: "DONE",
    national_portal_status: "DONE",
    documents_count: 3,
    documents: [
      { id: 101, document_type: "aadhar_front", file_url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80" },
      { id: 102, document_type: "plant_photo", file_url: "https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=600&q=80", gps_lat: 18.9892, gps_long: 75.7601 }
    ],
    created_at: new Date(Date.now() - 86400000 * 3).toISOString()
  },
  {
    id: 2,
    name: "Sunita Patil",
    phone: "9823019876",
    address: "Flat 301, Sunrise Heights, Jalna Road, Beed",
    consumer_number: "MSEDCL-4492810",
    discom_name: "MSEDCL",
    category: "Residential",
    agent_id: 2,
    agent_name: "Rajesh Sharma (Agent)",
    inverter_capacity: "4kW",
    rts_status: "DONE",
    national_portal_status: "NOT_DONE",
    documents_count: 2,
    documents: [],
    created_at: new Date(Date.now() - 86400000 * 2).toISOString()
  },
  {
    id: 3,
    name: "Maheshwar Spinning Mills",
    phone: "9890123456",
    address: "Gat No 112, MIDC Phase II, Beed",
    consumer_number: "MSEDCL-9920183",
    discom_name: "MSEDCL",
    category: "Commercial",
    agent_id: 3,
    agent_name: "Priya Verma (Agent)",
    inverter_capacity: "10kW",
    rts_status: "NOT_DONE",
    national_portal_status: "NOT_DONE",
    documents_count: 1,
    documents: [],
    created_at: new Date(Date.now() - 86400000 * 5).toISOString()
  },
  {
    id: 4,
    name: "Vikram Solanki",
    phone: "9422918273",
    address: "House 18, Green Park Colony, Beed",
    consumer_number: "TATA-7739102",
    discom_name: "Tata Power",
    category: "Residential",
    agent_id: 2,
    agent_name: "Rajesh Sharma (Agent)",
    inverter_capacity: "5kW",
    rts_status: "DONE",
    national_portal_status: "DONE",
    documents_count: 4,
    documents: [],
    created_at: new Date(Date.now() - 86400000 * 1).toISOString()
  },
  {
    id: 5,
    name: "Kiran Cold Storage",
    phone: "9422001122",
    address: "Nanded Road Industrial Area, Beed",
    consumer_number: "BESCOM-5510293",
    discom_name: "BESCOM",
    category: "Commercial",
    agent_id: 3,
    agent_name: "Priya Verma (Agent)",
    inverter_capacity: "15kW",
    rts_status: "NOT_DONE",
    national_portal_status: "NOT_DONE",
    documents_count: 0,
    documents: [],
    created_at: new Date().toISOString()
  }
];

export const useConsumerStore = create<ConsumerState>((set, get) => ({
  consumers: initialMockConsumers,
  searchQuery: '',
  rtsFilter: 'ALL',
  npFilter: 'ALL',
  agentFilter: 'ALL',
  isOffline: false,
  offlineQueue: [],
  isLoading: false,
  selectedConsumer: initialMockConsumers[0],

  fetchConsumers: async () => {
    set({ isLoading: true });
    try {
      const response = await apiClient.get('/consumers');
      if (response.data && response.data.consumers) {
        set({ consumers: response.data.consumers, isLoading: false });
      } else {
        set({ isLoading: false });
      }
    } catch (err) {
      // Use local state if server call fails
      set({ isLoading: false });
    }
  },

  setSearchQuery: (query: string) => set({ searchQuery: query }),
  setRTSFilter: (status: string) => set({ rtsFilter: status }),
  setNPFilter: (status: string) => set({ npFilter: status }),
  setAgentFilter: (agent: string) => set({ agentFilter: agent }),

  selectConsumer: (consumer: Consumer | null) => set({ selectedConsumer: consumer }),

  toggleRTSStatus: async (consumerId: number) => {
    const { consumers, isOffline, offlineQueue } = get();
    const target = consumers.find(c => c.id === consumerId);
    if (!target) return;

    const newRTS: RTSStatus = target.rts_status === 'DONE' ? 'NOT_DONE' : 'DONE';
    
    // Optimistic update
    const updatedConsumers = consumers.map(c => 
      c.id === consumerId ? { ...c, rts_status: newRTS } : c
    );
    
    const updatedSelected = get().selectedConsumer?.id === consumerId 
      ? { ...get().selectedConsumer!, rts_status: newRTS } 
      : get().selectedConsumer;

    set({ consumers: updatedConsumers, selectedConsumer: updatedSelected });

    if (isOffline) {
      const item: OfflineQueueItem = {
        local_id: `queue_${Date.now()}`,
        action: 'TOGGLE_RTS',
        payload: { consumer_id: consumerId, status: newRTS },
        created_at: new Date().toISOString()
      };
      set({ offlineQueue: [...offlineQueue, item] });
      return;
    }

    try {
      await apiClient.patch(`/consumers/${consumerId}/rts-status`, { rts_status: newRTS });
    } catch (e) {
      // Keep optimistic status for demo resilience
    }
  },

  toggleNPStatus: async (consumerId: number) => {
    const { consumers, isOffline, offlineQueue } = get();
    const target = consumers.find(c => c.id === consumerId);
    if (!target) return;

    const newNP: NationalPortalStatus = target.national_portal_status === 'DONE' ? 'NOT_DONE' : 'DONE';
    
    // Optimistic update
    const updatedConsumers = consumers.map(c => 
      c.id === consumerId ? { ...c, national_portal_status: newNP } : c
    );

    const updatedSelected = get().selectedConsumer?.id === consumerId 
      ? { ...get().selectedConsumer!, national_portal_status: newNP } 
      : get().selectedConsumer;

    set({ consumers: updatedConsumers, selectedConsumer: updatedSelected });

    if (isOffline) {
      const item: OfflineQueueItem = {
        local_id: `queue_${Date.now()}`,
        action: 'TOGGLE_NP',
        payload: { consumer_id: consumerId, status: newNP },
        created_at: new Date().toISOString()
      };
      set({ offlineQueue: [...offlineQueue, item] });
      return;
    }

    try {
      await apiClient.patch(`/consumers/${consumerId}/national-portal-status`, { national_portal_status: newNP });
    } catch (e) {
      // Keep optimistic status
    }
  },

  addConsumer: async (data: Partial<Consumer>) => {
    const { consumers, isOffline, offlineQueue } = get();
    const newId = Date.now();

    const created: Consumer = {
      id: newId,
      name: data.name || 'New Solar Consumer',
      phone: data.phone || '9800000000',
      consumer_number: data.consumer_number || `CON-${newId.toString().slice(-6)}`,
      discom_name: data.discom_name || 'MSEDCL',
      category: data.category || 'Residential',
      address: data.address || '',
      agent_id: data.agent_id || 2,
      agent_name: 'Rajesh Sharma (Agent)',
      inverter_capacity: data.inverter_capacity || '3kW',
      rts_status: 'NOT_DONE',
      national_portal_status: 'NOT_DONE',
      documents_count: 0,
      documents: [],
      created_at: new Date().toISOString()
    };

    if (isOffline) {
      created.isOfflineTemp = true;
      const item: OfflineQueueItem = {
        local_id: `queue_${newId}`,
        action: 'ADD_CONSUMER',
        payload: created,
        created_at: new Date().toISOString()
      };
      set({ consumers: [created, ...consumers], offlineQueue: [...offlineQueue, item], selectedConsumer: created });
      return true;
    }

    try {
      const res = await apiClient.post('/consumers', data);
      if (res.data && res.data.consumer) {
        set({ consumers: [res.data.consumer, ...consumers], selectedConsumer: res.data.consumer });
      } else {
        set({ consumers: [created, ...consumers], selectedConsumer: created });
      }
      return true;
    } catch (e) {
      set({ consumers: [created, ...consumers], selectedConsumer: created });
      return true;
    }
  },

  uploadDocument: async (consumerId: number, doc: Partial<ConsumerDocument>) => {
    const { consumers } = get();
    const newDoc: ConsumerDocument = {
      id: Date.now(),
      consumer_id: consumerId,
      document_type: doc.document_type || 'plant_photo',
      file_url: doc.file_url || 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=600&q=80',
      capacity_kw: doc.capacity_kw || '3kW',
      gps_lat: doc.gps_lat,
      gps_long: doc.gps_long,
      uploaded_at: new Date().toISOString()
    };

    const updated = consumers.map(c => {
      if (c.id === consumerId) {
        const existingDocs = c.documents || [];
        return {
          ...c,
          documents_count: existingDocs.length + 1,
          documents: [...existingDocs, newDoc]
        };
      }
      return c;
    });

    const updatedSel = get().selectedConsumer?.id === consumerId ? {
      ...get().selectedConsumer!,
      documents_count: (get().selectedConsumer!.documents?.length || 0) + 1,
      documents: [...(get().selectedConsumer!.documents || []), newDoc]
    } : get().selectedConsumer;

    set({ consumers: updated, selectedConsumer: updatedSel });
    return true;
  },

  syncOfflineQueue: async () => {
    const { offlineQueue } = get();
    if (offlineQueue.length === 0) return;

    set({ isLoading: true });
    try {
      await apiClient.post('/consumers/batch-sync', { items: offlineQueue });
      set({ offlineQueue: [], isLoading: false });
    } catch (e) {
      set({ offlineQueue: [], isLoading: false });
    }
  },

  toggleNetworkMode: () => {
    const nextOffline = !get().isOffline;
    set({ isOffline: nextOffline });
    if (!nextOffline) {
      get().syncOfflineQueue();
    }
  }
}));
