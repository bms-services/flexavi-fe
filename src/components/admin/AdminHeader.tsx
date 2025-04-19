import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
interface AdminHeaderProps {
  title: string;
}
export function AdminHeader({
  title
}: AdminHeaderProps) {
  return <div className="flex justify-between items-center">
      <h1 className="text-2xl font-bold">{title}</h1>
      
    </div>;
}