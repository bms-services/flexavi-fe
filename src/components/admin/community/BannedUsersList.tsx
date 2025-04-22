
import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { UserX, UserCheck, Clock } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { formatDistance } from 'date-fns';
import { nl } from 'date-fns/locale';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';

// Mock data for banned users
const initialBannedUsers = [
  {
    id: '1',
    name: 'Peter Hendriks',
    email: 'peter@example.com',
    avatar: '',
    bannedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    bannedUntil: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000),
    reason: 'Herhaaldelijk plaatsen van ongepaste berichten na waarschuwingen.',
    bannedBy: 'Richard van Dam'
  },
  {
    id: '2',
    name: 'Kevin Smit',
    email: 'kevin@example.com',
    avatar: '',
    bannedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
    bannedUntil: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000),
    reason: 'Spam en promotionele links naar externe websites.',
    bannedBy: 'Richard van Dam'
  },
  {
    id: '3',
    name: 'Joris Klein',
    email: 'joris@example.com',
    avatar: '',
    bannedAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
    bannedUntil: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
    reason: 'Intimidatie van andere gebruikers.',
    bannedBy: 'Emma Janssen'
  }
];

export function BannedUsersList() {
  const [bannedUsers, setBannedUsers] = useState(initialBannedUsers);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [unbanDialog, setUnbanDialog] = useState(false);
  const [viewDetailsDialog, setViewDetailsDialog] = useState(false);

  const handleUnbanUser = (user: any) => {
    setSelectedUser(user);
    setUnbanDialog(true);
  };

  const handleViewDetails = (user: any) => {
    setSelectedUser(user);
    setViewDetailsDialog(true);
  };

  const confirmUnban = () => {
    setBannedUsers(bannedUsers.filter(user => user.id !== selectedUser.id));
    setUnbanDialog(false);
    setSelectedUser(null);
  };

  if (bannedUsers.length === 0) {
    return (
      <div className="text-center py-12">
        <UserCheck className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium">Geen geblokkeerde gebruikers</h3>
        <p className="text-muted-foreground">
          Er zijn momenteel geen geblokkeerde gebruikers in de community.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <p className="text-muted-foreground">
        Bekijk en beheer gebruikers die tijdelijk of permanent zijn geblokkeerd van de community.
      </p>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Gebruiker</TableHead>
            <TableHead>Geblokkeerd op</TableHead>
            <TableHead>Duur</TableHead>
            <TableHead>Reden</TableHead>
            <TableHead className="text-right">Acties</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bannedUsers.map((user) => (
            <TableRow key={user.id}>
              <TableCell>
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div>{user.name}</div>
                    <div className="text-sm text-muted-foreground">{user.email}</div>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                {formatDistance(user.bannedAt, new Date(), { addSuffix: true, locale: nl })}
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>
                    {formatDistance(user.bannedUntil, new Date(), { locale: nl })} resterend
                  </span>
                </div>
              </TableCell>
              <TableCell className="max-w-[250px] truncate">
                {user.reason}
              </TableCell>
              <TableCell className="text-right space-x-2">
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={() => handleViewDetails(user)}
                >
                  Details
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="text-green-600 hover:text-green-700 hover:bg-green-50"
                  onClick={() => handleUnbanUser(user)}
                >
                  <UserCheck className="h-4 w-4 mr-1" />
                  <span className="sr-only sm:not-sr-only sm:inline">Deblokkeren</span>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={viewDetailsDialog} onOpenChange={setViewDetailsDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <UserX className="h-5 w-5" />
              Geblokkeerde gebruiker details
            </DialogTitle>
          </DialogHeader>
          
          {selectedUser && (
            <div className="space-y-4 py-2">
              <div className="flex items-center space-x-3 mb-4">
                <Avatar className="h-12 w-12">
                  <AvatarFallback>{selectedUser.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium text-lg">{selectedUser.name}</h3>
                  <p className="text-muted-foreground">{selectedUser.email}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Geblokkeerd op</h4>
                  <p>{selectedUser.bannedAt.toLocaleDateString('nl-NL')}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Geblokkeerd tot</h4>
                  <p>{selectedUser.bannedUntil.toLocaleDateString('nl-NL')}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Duur</h4>
                  <p>{formatDistance(selectedUser.bannedUntil, selectedUser.bannedAt, { locale: nl })}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Geblokkeerd door</h4>
                  <p>{selectedUser.bannedBy}</p>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-1">Reden voor blokkade</h4>
                <p className="p-3 bg-gray-50 rounded-md">{selectedUser.reason}</p>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button onClick={() => setViewDetailsDialog(false)}>
              Sluiten
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={unbanDialog} onOpenChange={setUnbanDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Gebruiker deblokkeren</DialogTitle>
            <DialogDescription>
              Weet je zeker dat je deze gebruiker wilt deblokkeren? Ze krijgen weer toegang tot de community.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <h3 className="font-medium">{selectedUser?.name}</h3>
              <p className="text-sm text-muted-foreground">
                Geblokkeerd {selectedUser && formatDistance(selectedUser.bannedAt, new Date(), { addSuffix: true, locale: nl })}
              </p>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="unban-message">Berichtje (optioneel)</label>
              <Textarea 
                id="unban-message" 
                placeholder="Laat een bericht achter voor de gebruiker" 
                className="min-h-[100px]"
              />
            </div>
          </div>
          
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setUnbanDialog(false)}>
              Annuleren
            </Button>
            <Button onClick={confirmUnban}>
              Deblokkeren
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
