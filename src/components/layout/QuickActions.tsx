
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

  return (
    <TooltipProvider>
      <div className="h-16 bg-background/80 backdrop-blur-sm border-b sticky top-0 z-50">
        <div className="h-full px-4 flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-2">
            {actions.map((action) => (
              <Tooltip key={action.href}>
                <TooltipTrigger asChild>
                  <Link to={action.href}>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full hover:bg-accent"
                    >
                      <action.icon className="h-5 w-5" />
                      <span className="sr-only">{action.label}</span>
                    </Button>
                  </Link>
                </TooltipTrigger>
                <TooltipContent>{action.label}</TooltipContent>
              </Tooltip>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <div className="relative w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Zoeken..."
                className="pl-8"
              />
            </div>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full hover:bg-accent relative"
                >
                  <Bell className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center">3</span>
                  <span className="sr-only">Notificaties</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Notificaties</TooltipContent>
            </Tooltip>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full hover:bg-accent gap-2">
                  <User className="h-5 w-5" />
                  <span className="hidden md:inline-block">John Doe</span>
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
