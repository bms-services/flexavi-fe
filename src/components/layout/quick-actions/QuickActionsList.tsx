
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, FileText, Folder, Receipt } from 'lucide-react';
import { QuickActionItem } from './QuickActionItem';
import { ReceiptUploadDialog } from './ReceiptUploadDialog';
import type { QuickAction } from './types/quickActions';

export const QuickActionsList = () => {
  const navigate = useNavigate();
  const [openReceiptUpload, setOpenReceiptUpload] = React.useState(false);

  const actions: QuickAction[] = [
    {
      icon: Calendar,
      label: 'Afspraak maken',
      href: '/appointments',
      onClick: (e: React.MouseEvent) => {
        e.preventDefault();
        navigate('/appointments');
      },
    },
    {
      icon: FileText,
      label: 'Offerte maken',
      href: '/quotes/create',
      onClick: (e: React.MouseEvent) => {
        e.preventDefault();
        navigate('/quotes/create');
      },
    },
    {
      icon: FileText,
      label: 'Factuur maken',
      href: '/invoices/create',
      onClick: (e: React.MouseEvent) => {
        e.preventDefault();
        navigate('/invoices/create');
      },
    },
    {
      icon: FileText,
      label: 'Werkopdracht maken',
      href: '/workagreements/create',
      onClick: (e: React.MouseEvent) => {
        e.preventDefault();
        navigate('/workagreements/create');
      },
    },
    {
      icon: Receipt,
      label: 'Bon uploaden',
      href: '#',
      onClick: (e: React.MouseEvent) => {
        e.preventDefault();
        setOpenReceiptUpload(true);
      },
    },
    {
      icon: Folder,
      label: 'Project maken',
      href: '/projects',
      onClick: (e: React.MouseEvent) => {
        e.preventDefault();
        navigate('/projects');
        setTimeout(() => {
          const projectsPage = document.querySelector('[data-create-project-button]');
          if (projectsPage) {
            (projectsPage as HTMLButtonElement).click();
          }
        }, 100);
      },
    },
  ];

  return (
    <>
      {actions.map((action) => (
        <QuickActionItem key={action.label} action={action} />
      ))}
      
      <ReceiptUploadDialog 
        open={openReceiptUpload}
        onOpenChange={setOpenReceiptUpload}
      />
    </>
  );
};
