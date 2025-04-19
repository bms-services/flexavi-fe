
import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, FileText, Folder } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export const QuickActionsList = () => {
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
    <>
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
    </>
  );
};
