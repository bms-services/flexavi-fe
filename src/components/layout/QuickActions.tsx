
import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, FileText, Folder, Bell, Search, Settings, LogOut, User } from 'lucide-react';
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

const QuickActions = () => {
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

  const notifications = [
    { id: 1, title: 'Nieuwe offerte', description: 'Er is een nieuwe offerte toegevoegd' },
    { id: 2, title: 'Afspraak herinnering', description: 'Je hebt morgen een afspraak' },
    { id: 3, title: 'Factuur betaald', description: 'Een factuur is zojuist betaald' },
  ];

  return (
    <TooltipProvider>
      <div className="h-16 bg-background/80 backdrop-blur-sm border-b sticky top-0 z-50">
        <div className="h-full px-4 flex items-center justify-between gap-4 max-w-7xl mx-auto">
          {/* Quick Actions */}
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

          {/* Right side controls */}
          <div className="flex items-center gap-1 md:gap-3">
            {/* Search - hidden on mobile */}
            <div className="relative hidden md:block w-48 lg:w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Zoeken..."
                className="pl-8"
              />
            </div>

            {/* Notifications */}
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
                      <span className="absolute -top-1 -right-1 h-3.5 w-3.5 md:h-4 md:w-4 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center">
                        {notifications.length}
                      </span>
                      <span className="sr-only">Notificaties</span>
                    </Button>
                  </PopoverTrigger>
                </TooltipTrigger>
                <TooltipContent>Notificaties</TooltipContent>
              </Tooltip>
              <PopoverContent className="w-80 p-0" align="end">
                <div className="p-4 space-y-4">
                  {notifications.map((notification) => (
                    <div key={notification.id} className="space-y-1">
                      <h4 className="text-sm font-medium">{notification.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        {notification.description}
                      </p>
                    </div>
                  ))}
                </div>
              </PopoverContent>
            </Popover>

            {/* Profile Dropdown */}
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
