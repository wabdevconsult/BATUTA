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
  location?: {
    address: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  clientId: {
    _id: string;
    name: string;
    email?: string;
    phone?: string;
    address?: string;
  } | string;
  technicianId?: {
    _id: string;
    firstName: string;
    lastName: string;
    email?: string;
    phone?: string;
  } | string;
  warranty?: {
    startDate?: string;
    endDate?: string;
    provider?: string;
    details?: string;
  };
  specifications?: Record<string, any>;
  notes?: string;
  attachments?: Array<{
    name: string;
    url: string;
    type: string;
    uploadedAt: string;
  }>;
  maintenanceHistory?: Array<{
    date: string;
    type: 'installation' | 'preventive' | 'corrective' | 'inspection';
    technicianId?: string;
    description: string;
    cost?: number;
  }>;
  createdBy?: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
  } | string;
  createdAt?: string;
  updatedAt?: string;
}