import express from 'express';
import { 
  getMessages, 
  getMessageById, 
  sendMessage, 
  markAsRead, 
  deleteMessage, 
  getUnreadCount,
  getConversation
} from '../controllers/messageController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';
import { check } from 'express-validator';

const router = express.Router();

// Apply authentication middleware to all routes
router.use(authenticateToken);

// Validation middleware
const messageValidation = [
  check('recipient', 'Recipient is required').not().isEmpty(),
  check('subject', 'Subject is required').not().isEmpty(),
  check('content', 'Content is required').not().isEmpty()
];

// Get all messages for current user
router.get('/', getMessages);

// Get unread messages count
router.get('/unread', getUnreadCount);

// Get conversation with another user
router.get('/conversation/:userId', getConversation);

// Get message by ID
router.get('/:id', getMessageById);

// Send a new message
router.post('/', messageValidation, sendMessage);

// Mark message as read
router.put('/:id/read', markAsRead);

// Delete message (soft delete)
router.delete('/:id', deleteMessage);

export default router;