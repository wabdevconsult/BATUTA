import { User } from './auth';
import { Equipment } from './equipments';
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

export interface Installation {
  _id: string;
  name: string;
  description?: string;
  equipmentId: string | Equipment;
  clientId: string | Client;
  technicianId?: string | User;
  installationDate: string;
  completionDate?: string;
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
  location: Location;
  notes?: string;
  attachments?: Attachment[];
  createdBy: string | User;
  createdAt: string;
  updatedAt: string;
}

export interface NewInstallation {
  name: string;
  description?: string;
  equipmentId: string;
  clientId: string;
  technicianId?: string;
  installationDate: string;
  completionDate?: string;
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
  location: Location;
  notes?: string;
  attachments?: Attachment[];
}