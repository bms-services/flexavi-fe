
import { Link } from 'react-router-dom';
import { LogOut, Settings, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAppDispatch } from '@/hooks/use-redux';
import { pushLogout } from '@/actions/authActions';

export const UserMenu = () => {
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(pushLogout());
  }

  return (
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
          <Link to="#" onClick={handleLogout}
            className="flex items-center text-red-600">
            <LogOut className="mr-2 h-4 w-4" />
            <span>Uitloggen</span>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
