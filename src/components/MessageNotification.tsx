import React, { useState, useEffect, useRef } from 'react';
import { Bell, X, MessageCircle } from 'lucide-react';
import { useMessages } from '../hooks/useMessages';
import { useNavigate } from 'react-router-dom';
import { Message } from '../types/messages';

interface MessageNotificationProps {
  onClose?: () => void;
}

const MessageNotification: React.FC<MessageNotificationProps> = ({ onClose }) => {
  const { messages, unreadCount, markAsRead } = useMessages();
  const [isOpen, setIsOpen] = useState(false);
  const [newMessageNotification, setNewMessageNotification] = useState<Message | null>(null);
  const notificationRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Close notification when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Show notification when a new message arrives
  useEffect(() => {
    if (messages.length > 0) {
      const unreadMessages = messages.filter(msg => !msg.read);
      if (unreadMessages.length > 0) {
        setNewMessageNotification(unreadMessages[0]);
        
        // Auto-hide notification after 5 seconds
        const timer = setTimeout(() => {
          setNewMessageNotification(null);
        }, 5000);
        
        return () => clearTimeout(timer);
      }
    }
  }, [messages]);

  const handleViewMessage = (messageId: string) => {
    markAsRead(messageId);
    navigate(`/dashboard/messages`);
    setIsOpen(false);
    if (onClose) onClose();
  };

  const handleDismissNotification = () => {
    setNewMessageNotification(null);
  };

  return (
    <>
      {/* Notification bell with badge */}
      <div className="relative">
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="p-1 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100"
        >
          <MessageCircle className="h-6 w-6" />
          {unreadCount > 0 && (
            <span className="absolute top-0 right-0 block h-4 w-4 rounded-full bg-blue-500 ring-2 ring-white text-white text-xs flex items-center justify-center">
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          )}
        </button>
        
        {/* Dropdown notification panel */}
        {isOpen && (
          <div 
            ref={notificationRef}
            className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg z-50 overflow-hidden"
          >
            <div className="p-3 bg-blue-50 border-b border-blue-100 flex justify-between items-center">
              <h3 className="font-medium text-blue-800">Messages</h3>
              <span className="text-sm text-blue-600">{unreadCount} non lu{unreadCount > 1 ? 's' : ''}</span>
            </div>
            
            <div className="max-h-96 overflow-y-auto">
              {messages.length > 0 ? (
                <div className="divide-y divide-gray-100">
                  {messages.slice(0, 5).map(message => (
                    <div 
                      key={message._id} 
                      className={`p-3 hover:bg-gray-50 cursor-pointer ${!message.read ? 'bg-blue-50' : ''}`}
                      onClick={() => handleViewMessage(message._id)}
                    >
                      <div className="flex justify-between items-start">
                        <p className="text-sm font-medium text-gray-900">
                          {message.sender.firstName} {message.sender.lastName}
                        </p>
                        <span className="text-xs text-gray-500">
                          {new Date(message.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-sm font-medium text-gray-800 truncate">{message.subject}</p>
                      <p className="text-xs text-gray-500 truncate">{message.content}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 text-center text-gray-500">
                  Aucun message
                </div>
              )}
            </div>
            
            <div className="p-3 bg-gray-50 border-t border-gray-100 text-center">
              <button 
                onClick={() => {
                  navigate('/dashboard/messages');
                  setIsOpen(false);
                  if (onClose) onClose();
                }}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                Voir tous les messages
              </button>
            </div>
          </div>
        )}
      </div>
      
      {/* Toast notification for new messages */}
      {newMessageNotification && (
        <div className="fixed bottom-4 right-4 w-80 bg-white rounded-lg shadow-lg z-50 overflow-hidden">
          <div className="p-3 bg-blue-50 border-b border-blue-100 flex justify-between items-center">
            <h3 className="font-medium text-blue-800">Nouveau message</h3>
            <button 
              onClick={handleDismissNotification}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="p-3">
            <div className="flex justify-between items-start">
              <p className="text-sm font-medium text-gray-900">
                {newMessageNotification.sender.firstName} {newMessageNotification.sender.lastName}
              </p>
              <span className="text-xs text-gray-500">
                {new Date(newMessageNotification.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
            <p className="text-sm font-medium text-gray-800">{newMessageNotification.subject}</p>
            <p className="text-xs text-gray-500 line-clamp-2">{newMessageNotification.content}</p>
            <button 
              onClick={() => handleViewMessage(newMessageNotification._id)}
              className="mt-2 text-sm text-blue-600 hover:text-blue-800"
            >
              Voir le message
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default MessageNotification;