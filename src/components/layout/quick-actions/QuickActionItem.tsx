
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { QuickAction } from './types/quickActions';

interface QuickActionItemProps {
  action: QuickAction;
}

export const QuickActionItem: React.FC<QuickActionItemProps> = ({ action }) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Link to={action.href} onClick={action.onClick}>
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
  );
};
