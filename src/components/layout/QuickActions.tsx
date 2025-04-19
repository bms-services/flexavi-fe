import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, FileText, Folder, Bell, Search, Settings, LogOut, User, Check, PanelLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
import { useSidebar } from '@/components/ui/sidebar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

const QuickActions = () => {
  const { toggleSidebar } = useSidebar();
  const [notifications, setNotifications] = React.useState([
    { 
      id: 1, 
      title: 'Nieuwe offerte', 
      description: 'Er is een nieuwe offerte toegevoegd',
      time: '5 minuten geleden',
      isRead: false,
      type: 'info'
    },
    { 
      id: 2, 
      title: 'Afspraak herinnering', 
      description: 'Je hebt morgen een afspraak',
      time: '1 uur geleden',
      isRead: false,
      type: 'warning'
    },
    { 
      id: 3, 
      title: 'Factuur betaald', 
      description: 'Een factuur is zojuist betaald',
      time: '2 uur geleden',
      isRead: false,
      type: 'success'
    },
  ]);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, isRead: true } : notification
    ));
  };

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

  return (
    <TooltipProvider>
      <div className="h-16 bg-background/80 backdrop-blur-sm border-b sticky top-0 z-50">
        <div className="h-full px-4 flex items-center justify-between gap-4 max-w-7xl mx-auto">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full hover:bg-accent mr-2"
            onClick={toggleSidebar}
          >
            <PanelLeft className="h-4 w-4 md:h-5 md:w-5" />
            <span className="sr-only">Toggle Sidebar</span>
          </Button>

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
              <PopoverContent className="w-80 p-0" align="end">
                <div className="flex items-center justify-between px-4 py-3 border-b">
                  <h4 className="font-semibold">Notificaties</h4>
                  {unreadCount > 0 && (
                    <Badge variant="secondary" className="ml-2">
                      {unreadCount} nieuw
                    </Badge>
                  )}
                </div>
                <div className="max-h-[calc(100vh-200px)] overflow-auto">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={cn(
                        "flex items-start gap-3 p-4 hover:bg-accent/50 transition-colors relative",
                        !notification.isRead && "bg-accent/20"
                      )}
                    >
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium">{notification.title}</p>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-full hover:bg-background"
                            onClick={() => markAsRead(notification.id)}
                          >
                            <Check className="h-4 w-4" />
                            <span className="sr-only">Mark as read</span>
                          </Button>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {notification.description}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {notification.time}
                        </p>
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
