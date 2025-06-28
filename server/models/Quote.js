import mongoose from 'mongoose';

const quoteSchema = new mongoose.Schema({
  quoteNumber: {
    type: String,
    required: true,
    unique: true
  },
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client',
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [{
    name: String,
    description: String,
    quantity: Number,
    unitPrice: Number,
    total: Number
  }],
  subtotal: {
    type: Number,
    required: true
  },
  taxRate: {
    type: Number,
    default: 20
  },
  taxAmount: {
    type: Number,
    required: true
  },
  total: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['draft', 'sent', 'accepted', 'rejected', 'expired'],
    default: 'draft'
  },
  validUntil: {
    type: Date
  },
  notes: {
    type: String
  }
}, {
  timestamps: true
});

const Quote = mongoose.model('Quote', quoteSchema);

export default Quote;