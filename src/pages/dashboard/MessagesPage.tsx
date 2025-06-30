import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  MessageCircle, 
  Search, 
  Plus, 
  Trash2, 
  CheckCircle, 
  AlertCircle, 
  Mail, 
  Send, 
  ArrowLeft, 
  Reply, 
  User,
  X
} from 'lucide-react';
import { useMessages } from '../../hooks/useMessages';
import { useAuthStore } from '../../store/authStore';
import { Message, NewMessage } from '../../types/messages';

const MessagesPage = () => {
  const { messages, loading, error, fetchMessages, sendMessage, markAsRead, deleteMessage } = useMessages();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [composeMode, setComposeMode] = useState(false);
  const [replyMode, setReplyMode] = useState(false);
  const [success, setSuccess] = useState('');
  const { user } = useAuthStore();
  const navigate = useNavigate();

  // New message form state
  const [newMessage, setNewMessage] = useState<NewMessage>({
    recipient: '',
    subject: '',
    content: ''
  });

  // Reply form state
  const [replyContent, setReplyContent] = useState('');

  // List of users for recipient selection (in a real app, this would be fetched from the API)
  const [users, setUsers] = useState([
    { _id: '507f1f77bcf86cd799439012', firstName: 'Admin', lastName: 'BATUTA', email: 'admin@batuta.fr' },
    { _id: '507f1f77bcf86cd799439013', firstName: 'Technicien', lastName: 'BATUTA', email: 'tech@batuta.fr' },
    { _id: '507f1f77bcf86cd799439014', firstName: 'Client', lastName: 'BATUTA', email: 'client@batuta.fr' },
    { _id: '507f1f77bcf86cd799439015', firstName: 'Fournisseur', lastName: 'BATUTA', email: 'fournisseur@batuta.fr' }
  ]);

  useEffect(() => {
    // Refresh messages when the component mounts
   // fetchMessages();
  }, [fetchMessages]);

  // Filter messages based on search term
  const filteredMessages = messages.filter(message => 
    message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    message.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    `${message.sender.firstName} ${message.sender.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    `${message.recipient.firstName} ${message.recipient.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle message selection
  const handleSelectMessage = async (message: Message) => {
    setSelectedMessage(message);
    
    // Mark as read if the user is the recipient and the message is unread
    if (message.recipient._id === user?.id && !message.read) {
      await markAsRead(message._id);
    }
  };

  // Handle message deletion
  const handleDeleteMessage = async (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce message ?')) {
      await deleteMessage(id);
      if (selectedMessage?._id === id) {
        setSelectedMessage(null);
      }
      setSuccess('Message supprimé avec succès');
      setTimeout(() => setSuccess(''), 3000);
    }
  };

  // Handle new message form change
  const handleNewMessageChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewMessage(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle sending a new message
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await sendMessage(newMessage);
      setSuccess('Message envoyé avec succès');
      setComposeMode(false);
      setNewMessage({
        recipient: '',
        subject: '',
        content: ''
      });
      setTimeout(() => setSuccess(''), 3000);
    } catch (err: any) {
      console.error('Error sending message:', err);
    }
  };

  // Handle sending a reply
  const handleSendReply = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedMessage) return;
    
    try {
      const replyData: NewMessage = {
        recipient: selectedMessage.sender._id,
        subject: `Re: ${selectedMessage.subject}`,
        content: replyContent,
        parentMessage: selectedMessage._id
      };
      
      await sendMessage(replyData);
      setSuccess('Réponse envoyée avec succès');
      setReplyMode(false);
      setReplyContent('');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err: any) {
      console.error('Error sending reply:', err);
    }
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Messagerie</h1>
          <button 
            onClick={() => setComposeMode(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <Plus className="h-5 w-5" />
            <span>Nouveau message</span>
          </button>
        </div>

        {success && (
          <div className="mb-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-center">
            <CheckCircle className="h-5 w-5 mr-2" />
            <span>{success}</span>
          </div>
        )}

        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center">
            <AlertCircle className="h-5 w-5 mr-2" />
            <span>{error}</span>
          </div>
        )}

        {composeMode ? (
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Nouveau message</h2>
              <button 
                onClick={() => setComposeMode(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <form onSubmit={handleSendMessage} className="space-y-4">
              <div>
                <label htmlFor="recipient" className="block text-sm font-medium text-gray-700 mb-1">
                  Destinataire
                </label>
                <select
                  id="recipient"
                  name="recipient"
                  value={newMessage.recipient}
                  onChange={handleNewMessageChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Sélectionner un destinataire</option>
                  {users
                    .filter(u => u._id !== user?.id) // Don't show current user
                    .map(u => (
                      <option key={u._id} value={u._id}>
                        {u.firstName} {u.lastName} ({u.email})
                      </option>
                    ))
                  }
                </select>
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                  Sujet
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={newMessage.subject}
                  onChange={handleNewMessageChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Sujet du message"
                />
              </div>
              
              <div>
                <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  id="content"
                  name="content"
                  value={newMessage.content}
                  onChange={handleNewMessageChange}
                  required
                  rows={6}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Contenu du message"
                ></textarea>
              </div>
              
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setComposeMode(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center space-x-2"
                >
                  <Send className="h-4 w-4" />
                  <span>Envoyer</span>
                </button>
              </div>
            </form>
          </div>
        ) : selectedMessage ? (
          <div className="bg-white rounded-lg border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-start">
                <button 
                  onClick={() => setSelectedMessage(null)}
                  className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  <ArrowLeft className="h-5 w-5 text-gray-600" />
                </button>
                <div className="flex-1 ml-4">
                  <h2 className="text-xl font-semibold text-gray-900">{selectedMessage.subject}</h2>
                  <div className="flex flex-col sm:flex-row sm:items-center text-sm text-gray-500 mt-1">
                    <div className="flex items-center">
                      <span className="font-medium">De:</span>
                      <span className="ml-2">{selectedMessage.sender.firstName} {selectedMessage.sender.lastName}</span>
                      <span className="ml-2 text-gray-400">({selectedMessage.sender.email})</span>
                    </div>
                    <span className="hidden sm:inline mx-2">•</span>
                    <span>{formatDate(selectedMessage.createdAt)}</span>
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    <span className="font-medium">À:</span>
                    <span className="ml-2">{selectedMessage.recipient.firstName} {selectedMessage.recipient.lastName}</span>
                  </div>
                </div>
                <button 
                  onClick={() => handleDeleteMessage(selectedMessage._id)}
                  className="p-2 text-red-600 hover:text-red-800"
                  title="Supprimer"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>
            
            <div className="p-6 border-b border-gray-200">
              <div className="prose max-w-none">
                <p className="whitespace-pre-line">{selectedMessage.content}</p>
              </div>
            </div>
            
            {replyMode ? (
              <div className="p-6">
                <form onSubmit={handleSendReply} className="space-y-4">
                  <div>
                    <label htmlFor="replyContent" className="block text-sm font-medium text-gray-700 mb-1">
                      Votre réponse
                    </label>
                    <textarea
                      id="replyContent"
                      value={replyContent}
                      onChange={(e) => setReplyContent(e.target.value)}
                      required
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Écrivez votre réponse ici..."
                    ></textarea>
                  </div>
                  
                  <div className="flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={() => setReplyMode(false)}
                      className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
                    >
                      Annuler
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center space-x-2"
                    >
                      <Send className="h-4 w-4" />
                      <span>Envoyer</span>
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="p-6">
                <button
                  onClick={() => setReplyMode(true)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center space-x-2"
                >
                  <Reply className="h-5 w-5" />
                  <span>Répondre</span>
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <div className="mb-6 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Rechercher un message..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
              />
            </div>

            {loading ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
              </div>
            ) : filteredMessages.length > 0 ? (
              <div className="divide-y divide-gray-200">
                {filteredMessages.map((message) => (
                  <div 
                    key={message._id} 
                    className={`p-4 hover:bg-gray-50 cursor-pointer ${!message.read && message.recipient._id === user?.id ? 'bg-blue-50' : ''}`}
                    onClick={() => handleSelectMessage(message)}
                  >
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mr-4">
                        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                          <User className="h-5 w-5 text-gray-500" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className={`text-sm font-medium ${!message.read && message.recipient._id === user?.id ? 'text-blue-600' : 'text-gray-900'}`}>
                            {message.sender._id === user?.id ? `À: ${message.recipient.firstName} ${message.recipient.lastName}` : `De: ${message.sender.firstName} ${message.sender.lastName}`}
                          </p>
                          <span className="text-sm text-gray-500">{formatDate(message.createdAt)}</span>
                        </div>
                        <p className={`text-sm ${!message.read && message.recipient._id === user?.id ? 'font-semibold text-gray-900' : 'text-gray-500'}`}>
                          {message.subject}
                        </p>
                        <p className="text-sm text-gray-500 truncate">
                          {message.content}
                        </p>
                      </div>
                      <div className="ml-4 flex-shrink-0">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteMessage(message._id);
                          }}
                          className="text-red-600 hover:text-red-800"
                          title="Supprimer"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun message</h3>
                <p className="text-gray-500 mb-6">
                  {searchTerm ? 'Aucun message ne correspond à votre recherche.' : 'Vous n\'avez pas encore de messages.'}
                </p>
                <button
                  onClick={() => setComposeMode(true)}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                >
                  <Mail className="h-5 w-5 mr-2" />
                  Envoyer un message
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default MessagesPage;