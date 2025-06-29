import mongoose from 'mongoose';

const quoteRequestSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: [true, 'Nom is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true
  },
  telephone: {
    type: String,
    trim: true
  },
  entreprise: {
    type: String,
    trim: true
  },
  metier: {
    type: String,
    trim: true
  },
  besoins: {
    type: [String],
    default: []
  },
  message: {
    type: String,
    required: [true, 'Message is required'],
    trim: true
  },
  region: {
    type: String,
    trim: true
  },
  departement: {
    type: String,
    trim: true
  },
  status: {
    type: String,
    enum: ['new', 'assigned', 'contacted', 'completed', 'rejected'],
    default: 'new'
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  notes: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

const QuoteRequest = mongoose.model('QuoteRequest', quoteRequestSchema);

export default QuoteRequest;