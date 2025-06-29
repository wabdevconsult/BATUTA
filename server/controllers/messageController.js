import Message from '../models/Message.js';
import User from '../models/User.js';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { validationResult } from 'express-validator';

dotenv.config();

// Configure email transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.example.com',
  port: process.env.SMTP_PORT || 587,
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER || 'user@example.com',
    pass: process.env.SMTP_PASS || 'password'
  }
});

// Mock data for demo mode
const mockMessages = [
  {
    _id: '507f1f77bcf86cd799439051',
    sender: {
      _id: '507f1f77bcf86cd799439012',
      firstName: 'Admin',
      lastName: 'BATUTA',
      email: 'admin@batuta.fr'
    },
    recipient: {
      _id: '507f1f77bcf86cd799439013',
      firstName: 'Technicien',
      lastName: 'BATUTA',
      email: 'tech@batuta.fr'
    },
    subject: 'Nouvelle intervention à planifier',
    content: 'Bonjour, pouvez-vous planifier une intervention chez le client Dupont pour la semaine prochaine ? Merci.',
    read: true,
    createdAt: new Date('2025-05-15T10:30:00'),
    updatedAt: new Date('2025-05-15T10:30:00')
  },
  {
    _id: '507f1f77bcf86cd799439052',
    sender: {
      _id: '507f1f77bcf86cd799439013',
      firstName: 'Technicien',
      lastName: 'BATUTA',
      email: 'tech@batuta.fr'
    },
    recipient: {
      _id: '507f1f77bcf86cd799439012',
      firstName: 'Admin',
      lastName: 'BATUTA',
      email: 'admin@batuta.fr'
    },
    subject: 'Re: Nouvelle intervention à planifier',
    content: 'Bonjour, c\'est noté. Je vais contacter le client pour convenir d\'une date. Cordialement.',
    read: false,
    parentMessage: '507f1f77bcf86cd799439051',
    createdAt: new Date('2025-05-15T11:15:00'),
    updatedAt: new Date('2025-05-15T11:15:00')
  },
  {
    _id: '507f1f77bcf86cd799439053',
    sender: {
      _id: '507f1f77bcf86cd799439014',
      firstName: 'Client',
      lastName: 'BATUTA',
      email: 'client@batuta.fr'
    },
    recipient: {
      _id: '507f1f77bcf86cd799439012',
      firstName: 'Admin',
      lastName: 'BATUTA',
      email: 'admin@batuta.fr'
    },
    subject: 'Question sur ma facture',
    content: 'Bonjour, j\'ai une question concernant ma dernière facture. Pourriez-vous me donner plus de détails sur le poste "Fournitures diverses" ? Merci d\'avance.',
    read: false,
    createdAt: new Date('2025-05-16T09:45:00'),
    updatedAt: new Date('2025-05-16T09:45:00')
  }
];

// @desc    Get all messages for current user
// @route   GET /api/messages
// @access  Private
export const getMessages = async (req, res) => {
  try {
    if (process.env.NODE_ENV === 'development') {
      // Return mock data for development mode
      let filteredMessages = mockMessages.filter(message => 
        message.sender._id === req.user.id || message.recipient._id === req.user.id
      );
      
      return res.json(filteredMessages);
    }

    const messages = await Message.find({
      $or: [
        { recipient: req.user.id, isDeleted: false },
        { sender: req.user.id, isDeleted: false }
      ]
    })
    .sort({ createdAt: -1 })
    .populate('sender', 'firstName lastName email')
    .populate('recipient', 'firstName lastName email');
    
    res.json(messages);
  } catch (error) {
    console.error('Get messages error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get unread messages count
// @route   GET /api/messages/unread
// @access  Private
export const getUnreadCount = async (req, res) => {
  try {
    if (process.env.NODE_ENV === 'development') {
      // Return mock data for development mode
      const unreadCount = mockMessages.filter(message => 
        message.recipient._id === req.user.id && !message.read
      ).length;
      
      return res.json({ count: unreadCount });
    }

    const count = await Message.countDocuments({
      recipient: req.user.id,
      read: false,
      isDeleted: false
    });
    
    res.json({ count });
  } catch (error) {
    console.error('Get unread count error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get message by ID
// @route   GET /api/messages/:id
// @access  Private
export const getMessageById = async (req, res) => {
  try {
    if (process.env.NODE_ENV === 'development') {
      // Return mock data for development mode
      const message = mockMessages.find(message => message._id === req.params.id);
      
      if (!message) {
        return res.status(404).json({ message: 'Message not found' });
      }
      
      // Check if user is sender or recipient
      if (message.sender._id !== req.user.id && message.recipient._id !== req.user.id) {
        return res.status(403).json({ message: 'Access denied' });
      }
      
      // Mark as read if user is recipient and message is unread
      if (message.recipient._id === req.user.id && !message.read) {
        message.read = true;
      }
      
      return res.json(message);
    }

    const message = await Message.findById(req.params.id)
      .populate('sender', 'firstName lastName email')
      .populate('recipient', 'firstName lastName email')
      .populate('parentMessage');
    
    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }
    
    // Check if user is sender or recipient
    if (message.sender.toString() !== req.user.id && message.recipient.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    // Mark as read if user is recipient and message is unread
    if (message.recipient.toString() === req.user.id && !message.read) {
      message.read = true;
      await message.save();
    }
    
    res.json(message);
  } catch (error) {
    console.error('Get message error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Send a new message
// @route   POST /api/messages
// @access  Private
export const sendMessage = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { recipient, subject, content, parentMessage } = req.body;

    if (process.env.NODE_ENV === 'development') {
      // Return mock data for development mode
      const recipientUser = mockMessages.find(m => m.sender._id === recipient || m.recipient._id === recipient);
      
      if (!recipientUser) {
        return res.status(404).json({ message: 'Recipient not found' });
      }
      
      const recipientData = recipientUser.sender._id === recipient ? 
        recipientUser.sender : recipientUser.recipient;
      
      const senderData = mockMessages.find(m => m.sender._id === req.user.id)?.sender || {
        _id: req.user.id,
        firstName: req.user.firstName || 'User',
        lastName: req.user.lastName || 'Test',
        email: req.user.email
      };
      
      const newMessage = {
        _id: `mock-message-${Date.now()}`,
        sender: senderData,
        recipient: recipientData,
        subject,
        content,
        read: false,
        parentMessage: parentMessage || null,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      // In a real app, we would save this to the database
      // For demo, we'll just return it
      
      return res.status(201).json(newMessage);
    }

    // Check if recipient exists
    const recipientUser = await User.findById(recipient);
    if (!recipientUser) {
      return res.status(404).json({ message: 'Recipient not found' });
    }
    
    // Create new message
    const newMessage = new Message({
      sender: req.user.id,
      recipient,
      subject,
      content,
      parentMessage: parentMessage || null
    });
    
    await newMessage.save();
    
    // Populate sender and recipient for response
    const populatedMessage = await Message.findById(newMessage._id)
      .populate('sender', 'firstName lastName email')
      .populate('recipient', 'firstName lastName email');
    
    // Send email notification to recipient
    try {
      await transporter.sendMail({
        from: `"BATUTA CRM" <${process.env.SMTP_USER}>`,
        to: recipientUser.email,
        subject: `Nouveau message: ${subject}`,
        html: `
          <h2>Vous avez reçu un nouveau message</h2>
          <p><strong>De:</strong> ${req.user.firstName} ${req.user.lastName}</p>
          <p><strong>Sujet:</strong> ${subject}</p>
          <p><strong>Message:</strong></p>
          <p>${content}</p>
          <p>Connectez-vous à votre compte BATUTA pour répondre.</p>
        `
      });
    } catch (emailError) {
      console.error('Failed to send email notification:', emailError);
      // Continue even if email fails
    }
    
    res.status(201).json(populatedMessage);
  } catch (error) {
    console.error('Send message error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Mark message as read
// @route   PUT /api/messages/:id/read
// @access  Private
export const markAsRead = async (req, res) => {
  try {
    if (process.env.NODE_ENV === 'development') {
      // Return mock data for development mode
      const message = mockMessages.find(message => message._id === req.params.id);
      
      if (!message) {
        return res.status(404).json({ message: 'Message not found' });
      }
      
      // Check if user is recipient
      if (message.recipient._id !== req.user.id) {
        return res.status(403).json({ message: 'Access denied' });
      }
      
      message.read = true;
      
      return res.json(message);
    }

    const message = await Message.findById(req.params.id);
    
    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }
    
    // Check if user is recipient
    if (message.recipient.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    message.read = true;
    await message.save();
    
    res.json(message);
  } catch (error) {
    console.error('Mark as read error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete message (soft delete)
// @route   DELETE /api/messages/:id
// @access  Private
export const deleteMessage = async (req, res) => {
  try {
    if (process.env.NODE_ENV === 'development') {
      // Return mock data for development mode
      const message = mockMessages.find(message => message._id === req.params.id);
      
      if (!message) {
        return res.status(404).json({ message: 'Message not found' });
      }
      
      // Check if user is sender or recipient
      if (message.sender._id !== req.user.id && message.recipient._id !== req.user.id) {
        return res.status(403).json({ message: 'Access denied' });
      }
      
      // Soft delete
      message.isDeleted = true;
      
      return res.json({ message: 'Message deleted successfully' });
    }

    const message = await Message.findById(req.params.id);
    
    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }
    
    // Check if user is sender or recipient
    if (message.sender.toString() !== req.user.id && message.recipient.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    // Soft delete
    message.isDeleted = true;
    await message.save();
    
    res.json({ message: 'Message deleted successfully' });
  } catch (error) {
    console.error('Delete message error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get conversation history
// @route   GET /api/messages/conversation/:userId
// @access  Private
export const getConversation = async (req, res) => {
  try {
    const otherUserId = req.params.userId;
    
    if (process.env.NODE_ENV === 'development') {
      // Return mock data for development mode
      const conversation = mockMessages.filter(message => 
        (message.sender._id === req.user.id && message.recipient._id === otherUserId) ||
        (message.sender._id === otherUserId && message.recipient._id === req.user.id)
      ).sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      
      return res.json(conversation);
    }

    // Check if other user exists
    const otherUser = await User.findById(otherUserId);
    if (!otherUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Get conversation
    const conversation = await Message.find({
      $or: [
        { sender: req.user.id, recipient: otherUserId, isDeleted: false },
        { sender: otherUserId, recipient: req.user.id, isDeleted: false }
      ]
    })
    .sort({ createdAt: 1 })
    .populate('sender', 'firstName lastName email')
    .populate('recipient', 'firstName lastName email');
    
    res.json(conversation);
  } catch (error) {
    console.error('Get conversation error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};