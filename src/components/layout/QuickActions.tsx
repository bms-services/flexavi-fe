import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, FileText, Folder, Bell, Search, Settings, LogOut, User, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

interface Notification {
  id: number;
  title: string;
  description: string;
  timestamp: string;
  isRead: boolean;
}

const QuickActions = () => {
  const { toast } = useToast();
  const [notifications, setNotifications] = useState<Notification[]>([
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

  const actions = [
    {
      icon: Calendar,
      label: 'Afspraak maken',
      href: '/appointments/new',
    },
    {
      icon: FileText,
      label: 'Offerte maken',
      href: '/quotes/create',
    },
    {
      icon: FileText,
      label: 'Factuur maken',
      href: '/invoices/create',
    },
    {
      icon: FileText,
      label: 'Werkopdracht maken',
      href: '/workagreements/create',
    },
    {
      icon: Folder,
      label: 'Project maken',
      href: '/projects/new',
    },
  ];

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
    <TooltipProvider>
      <div className="h-16 bg-background/80 backdrop-blur-sm border-b sticky top-0 z-50">
        <div className="h-full px-4 flex items-center justify-between gap-4 max-w-7xl mx-auto">
          <div className="flex-1 flex items-center gap-1 md:gap-2 overflow-x-auto scrollbar-hide max-w-[60%] sm:max-w-none">
            {actions.map((action) => (
              <Tooltip key={action.href}>
                <TooltipTrigger asChild>
                  <Link to={action.href}>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full hover:bg-accent min-w-10"
                    >
                      <action.icon className="h-4 w-4 md:h-5 md:w-5" />
                      <span className="sr-only">{action.label}</span>
                    </Button>
                  </Link>
                </TooltipTrigger>
                <TooltipContent>{action.label}</TooltipContent>
              </Tooltip>
            ))}
          </div>

          <div className="flex items-center gap-1 md:gap-3">
            <div className="relative hidden md:block w-48 lg:w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Zoeken..."
                className="pl-8"
              />
            </div>

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

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  className="rounded-full hover:bg-accent h-9 md:h-10 px-2 md:px-3"
                >
                  <User className="h-4 w-4 md:h-5 md:w-5" />
                  <span className="hidden md:inline-block ml-2 text-sm">John Doe</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem asChild>
                  <Link to="/settings" className="flex items-center">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Instellingen</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/auth/login" className="flex items-center text-red-600">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Uitloggen</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default QuickActions;
