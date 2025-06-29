import React, { useEffect, useState } from 'react';
import { Bell } from 'lucide-react';
import { getUnreadCount } from '../api/messages';

interface NotificationBadgeProps {
  onClick?: () => void;
}

const NotificationBadge: React.FC<NotificationBadgeProps> = ({ onClick }) => {
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    // Fetch unread messages count
    const fetchUnreadCount = async () => {
      try {
        const count = await getUnreadCount();
        setUnreadCount(count);
      } catch (error) {
        console.error('Failed to fetch unread messages count:', error);
      }
    };

    fetchUnreadCount();

    // Set up polling for unread messages (every 60 seconds)
    const interval = setInterval(fetchUnreadCount, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <button 
      className="p-1 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100 relative"
      onClick={onClick}
    >
      <Bell className="h-6 w-6" />
      {unreadCount > 0 && (
        <span className="absolute top-0 right-0 block h-4 w-4 rounded-full bg-red-500 ring-2 ring-white text-white text-xs flex items-center justify-center">
          {unreadCount > 9 ? '9+' : unreadCount}
        </span>
      )}
    </button>
  );
};

export default NotificationBadge;