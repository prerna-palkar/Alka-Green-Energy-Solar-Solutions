export type UserRole = 'ADMIN' | 'AGENT';

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  is_active: boolean;
  created_at: string;
}

export type RTSStatus = 'DONE' | 'NOT_DONE';
export type NationalPortalStatus = 'DONE' | 'NOT_DONE';
export type ConsumerCategory = 'Residential' | 'Commercial';
export type DiscomName = 'MSEDCL' | 'Tata Power' | 'BESCOM' | 'Adani Electricity' | 'Torrent Power' | 'Other';

export interface ConsumerDocument {
  id?: number;
  consumer_id?: number;
  document_type: 'aadhar_front' | 'aadhar_back' | 'panel_serial' | 'inverter_serial' | 'inverter_capacity' | 'plant_photo';
  file_url: string;
  capacity_kw?: string;
  photo_count?: number;
  gps_lat?: number | null;
  gps_long?: number | null;
  uploaded_at?: string;
}

export interface AuditLog {
  id: number;
  consumer_id?: number;
  user_id?: number;
  user_name: string;
  action: string;
  details?: string;
  timestamp: string;
}

export interface Consumer {
  id: number;
  name: string;
  phone: string;
  address?: string;
  consumer_number: string;
  discom_name: DiscomName | string;
  category: ConsumerCategory | string;
  agent_id?: number;
  agent_name?: string;
  created_by_id?: number;
  created_by_name?: string;
  inverter_capacity?: string;
  rts_status: RTSStatus;
  national_portal_status: NationalPortalStatus;
  documents_count?: number;
  documents?: ConsumerDocument[];
  audit_trail?: AuditLog[];
  created_at?: string;
  updated_at?: string;
  isOfflineTemp?: boolean;
}

export interface OfflineQueueItem {
  local_id: string;
  action: 'ADD_CONSUMER' | 'TOGGLE_RTS' | 'TOGGLE_NP' | 'UPLOAD_DOC';
  payload: any;
  created_at: string;
}
