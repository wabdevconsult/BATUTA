import mongoose from 'mongoose';

const equipmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  type: {
    type: String,
    required: [true, 'Type is required'],
    trim: true
  },
  brand: {
    type: String,
    trim: true
  },
  model: {
    type: String,
    trim: true
  },
  serialNumber: {
    type: String,
    trim: true
  },
  installationDate: {
    type: Date
  },
  lastMaintenanceDate: {
    type: Date
  },
  nextMaintenanceDate: {
    type: Date
  },
  status: {
    type: String,
    enum: ['operational', 'maintenance_required', 'under_maintenance', 'defective', 'retired'],
    default: 'operational'
  },
  location: {
    address: String,
    coordinates: {
      lat: Number,
      lng: Number
    }
  },
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client',
    required: true
  },
  technicianId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  warranty: {
    startDate: Date,
    endDate: Date,
    provider: String,
    details: String
  },
  specifications: {
    type: Object,
    default: {}
  },
  notes: {
    type: String
  },
  attachments: [{
    name: String,
    url: String,
    type: String,
    uploadedAt: {
      type: Date,
      default: Date.now
    }
  }],
  maintenanceHistory: [{
    date: Date,
    type: {
      type: String,
      enum: ['installation', 'preventive', 'corrective', 'inspection'],
    },
    technicianId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    description: String,
    cost: Number
  }],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

const Equipment = mongoose.model('Equipment', equipmentSchema);

export default Equipment;