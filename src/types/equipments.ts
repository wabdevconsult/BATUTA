import { User } from './auth';
import { Client } from './clients';

export interface Attachment {
  name: string;
  url: string;
  type: string;
  uploadedAt: string;
}

export interface Location {
  address: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface Warranty {
  startDate?: string;
  endDate?: string;
  provider?: string;
  details?: string;
}

export interface MaintenanceRecord {
  date: string;
  type: 'installation' | 'preventive' | 'corrective' | 'inspection';
  technicianId?: string | User;
  description: string;
  cost?: number;
}

export interface Equipment {
  _id: string;
  name: string;
  type: string;
  brand?: string;
  model?: string;
  serialNumber?: string;
  installationDate?: string;
  lastMaintenanceDate?: string;
  nextMaintenanceDate?: string;
  status: 'operational' | 'maintenance_required' | 'under_maintenance' | 'defective' | 'retired';
  location?: Location;
  clientId: string | Client;
  technicianId?: string | User;
  warranty?: Warranty;
  specifications?: Record<string, any>;
  notes?: string;
  attachments?: Attachment[];
  maintenanceHistory?: MaintenanceRecord[];
  createdBy: string | User;
  createdAt: string;
  updatedAt: string;
}

export interface NewEquipment {
  name: string;
  type: string;
  brand?: string;
  model?: string;
  serialNumber?: string;
  installationDate?: string;
  lastMaintenanceDate?: string;
  nextMaintenanceDate?: string;
  status: 'operational' | 'maintenance_required' | 'under_maintenance' | 'defective' | 'retired';
  location?: Location;
  clientId: string;
  technicianId?: string;
  warranty?: Warranty;
  specifications?: Record<string, any>;
  notes?: string;
  attachments?: Attachment[];
}