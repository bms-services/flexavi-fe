
import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, FileText, Folder } from 'lucide-react';
import { Button } from '@/components/ui/button';
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
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
        <div className="bg-background/80 backdrop-blur-sm shadow-lg rounded-full px-6 py-3 border flex items-center gap-2">
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
      </div>
    </TooltipProvider>
  );
};

export default QuickActions;
