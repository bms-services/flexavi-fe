
import React from 'react';
import { TooltipProvider } from '@/components/ui/tooltip';
import { SearchBox } from './quick-actions/SearchBox';
import { QuickActionsList } from './quick-actions/QuickActionsList';
import { NotificationsPopover } from './quick-actions/NotificationsPopover';
import { UserMenu } from './quick-actions/UserMenu';

const QuickActions = () => {
  return (
    <TooltipProvider>
      <div className="h-16 bg-background/80 backdrop-blur-sm border-b sticky top-0 z-50">
        <div className="h-full px-[24px] flex items-center justify-between gap-4 mx-auto">
          <div className="flex-1 flex items-center gap-1 md:gap-2 overflow-x-auto scrollbar-hide max-w-[60%] sm:max-w-none">
            <QuickActionsList />
          </div>

          <div className="flex items-center gap-1 md:gap-3">
            <SearchBox />
            <NotificationsPopover />
            <UserMenu />
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default QuickActions;
