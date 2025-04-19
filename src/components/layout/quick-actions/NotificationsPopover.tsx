
import React from 'react';
import { Bell, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useToast } from '@/hooks/use-toast';

interface Notification {
  id: number;
  title: string;
  description: string;
  timestamp: string;
  isRead: boolean;
}

export const NotificationsPopover = () => {
  const { toast } = useToast();
  const [notifications, setNotifications] = React.useState<Notification[]>([
    { 
      id: 1, 
      title: 'Nieuwe offerte', 
      description: 'Er is een nieuwe offerte toegevoegd', 
      timestamp: '5 min geleden',
      isRead: false 
    },
    { 
      id: 2, 
      title: 'Afspraak herinnering', 
      description: 'Je hebt morgen een afspraak', 
      timestamp: '1 uur geleden',
      isRead: false 
    },
    { 
      id: 3, 
      title: 'Factuur betaald', 
      description: 'Een factuur is zojuist betaald', 
      timestamp: '2 uur geleden',
      isRead: false 
    },
  ]);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const markAsRead = (notificationId: number) => {
    setNotifications(notifications.map(notification =>
      notification.id === notificationId 
        ? { ...notification, isRead: true }
        : notification
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({
      ...notification,
      isRead: true
    })));
    toast({
      title: "Notificaties",
      description: "Alle notificaties zijn gemarkeerd als gelezen",
    });
  };

  return (
    <Popover>
      <Tooltip>
        <TooltipTrigger asChild>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full hover:bg-accent relative h-9 w-9 md:h-10 md:w-10"
            >
              <Bell className="h-4 w-4 md:h-5 md:w-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 h-3.5 w-3.5 md:h-4 md:w-4 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
              <span className="sr-only">Notificaties</span>
            </Button>
          </PopoverTrigger>
        </TooltipTrigger>
        <TooltipContent>Notificaties</TooltipContent>
      </Tooltip>
      <PopoverContent className="w-[380px] p-0" align="end">
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <h3 className="font-semibold">Notificaties</h3>
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              className="text-xs"
              onClick={markAllAsRead}
            >
              <Check className="mr-1 h-4 w-4" />
              Alles markeren als gelezen
            </Button>
          )}
        </div>
        <div className="max-h-[400px] overflow-y-auto">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-4 border-b last:border-0 hover:bg-accent/50 transition-colors ${
                notification.isRead ? 'bg-background' : 'bg-accent/20'
              }`}
              onClick={() => markAsRead(notification.id)}
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h4 className="text-sm font-medium mb-1">{notification.title}</h4>
                  <p className="text-sm text-muted-foreground">{notification.description}</p>
                  <span className="text-xs text-muted-foreground mt-2 block">
                    {notification.timestamp}
                  </span>
                </div>
                {!notification.isRead && (
                  <div className="h-2 w-2 rounded-full bg-blue-500 mt-2" />
                )}
              </div>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};
