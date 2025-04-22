
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
import { Plus, Edit, Trash, Shield } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Mock data for moderators
const initialModerators = [
  {
    id: '1',
    name: 'Richard van Dam',
    email: 'richard@example.com',
    avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=50&h=50',
    role: 'admin',
    isActive: true,
    addedAt: new Date('2023-01-15')
  },
  {
    id: '2',
    name: 'Emma Janssen',
    email: 'emma@example.com',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=50&h=50',
    role: 'moderator',
    isActive: true,
    addedAt: new Date('2023-03-22')
  },
  {
    id: '3',
    name: 'Thomas Visser',
    email: 'thomas@example.com',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=50&h=50',
    role: 'moderator',
    isActive: true,
    addedAt: new Date('2023-06-10')
  }
];

const roleLabels: Record<string, { label: string, color: string }> = {
  'admin': { label: 'Administrator', color: 'bg-purple-100 text-purple-800' },
  'moderator': { label: 'Moderator', color: 'bg-blue-100 text-blue-800' }
};

export function ModeratorsList() {
  const [moderators, setModerators] = useState(initialModerators);
  const [editModerator, setEditModerator] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const handleAddModerator = () => {
    setEditModerator({
      id: '',
      name: '',
      email: '',
      role: 'moderator',
      isActive: true,
      addedAt: new Date()
    });
    setIsEditMode(false);
    setIsDialogOpen(true);
  };

  const handleEditModerator = (mod: any) => {
    setEditModerator({...mod});
    setIsEditMode(true);
    setIsDialogOpen(true);
  };

  const handleSaveModerator = () => {
    if (isEditMode) {
      setModerators(moderators.map(m => m.id === editModerator.id ? editModerator : m));
    } else {
      const newModerator = {
        ...editModerator,
        id: `mod-${Date.now()}`
      };
      setModerators([...moderators, newModerator]);
    }
    setIsDialogOpen(false);
    setEditModerator(null);
  };

  const handleDeleteModerator = (id: string) => {
    setModerators(moderators.filter(moderator => moderator.id !== id));
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <p className="text-muted-foreground">
          Beheer moderators die verantwoordelijk zijn voor het handhaven van community regels.
        </p>
        <Button onClick={handleAddModerator}>
          <Plus className="h-4 w-4 mr-2" />
          Nieuwe moderator
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Naam</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Rol</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Acties</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {moderators.map((moderator) => (
            <TableRow key={moderator.id}>
              <TableCell>
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage src={moderator.avatar} alt={moderator.name} />
                    <AvatarFallback>{moderator.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span>{moderator.name}</span>
                </div>
              </TableCell>
              <TableCell>{moderator.email}</TableCell>
              <TableCell>
                <Badge className={roleLabels[moderator.role].color}>
                  {roleLabels[moderator.role].label}
                </Badge>
              </TableCell>
              <TableCell>
                {moderator.isActive ? (
                  <Badge className="bg-green-100 text-green-800">Actief</Badge>
                ) : (
                  <Badge className="bg-gray-100 text-gray-800">Inactief</Badge>
                )}
              </TableCell>
              <TableCell className="text-right space-x-2">
                <Button 
                  size="sm" 
                  variant="ghost" 
                  onClick={() => handleEditModerator(moderator)}
                >
                  <Edit className="h-4 w-4" />
                  <span className="sr-only">Bewerken</span>
                </Button>
                <Button 
                  size="sm" 
                  variant="ghost" 
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  onClick={() => handleDeleteModerator(moderator.id)}
                >
                  <Trash className="h-4 w-4" />
                  <span className="sr-only">Verwijderen</span>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              {isEditMode ? 'Moderator bewerken' : 'Nieuwe moderator toevoegen'}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="mod-name">Naam</Label>
              <Input 
                id="mod-name" 
                value={editModerator?.name || ''} 
                onChange={(e) => setEditModerator({...editModerator, name: e.target.value})}
                placeholder="Volledige naam"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="mod-email">Email</Label>
              <Input 
                id="mod-email" 
                type="email"
                value={editModerator?.email || ''} 
                onChange={(e) => setEditModerator({...editModerator, email: e.target.value})}
                placeholder="email@example.com"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="mod-role">Rol</Label>
              <Select 
                value={editModerator?.role || 'moderator'} 
                onValueChange={(value) => setEditModerator({...editModerator, role: value})}
              >
                <SelectTrigger id="mod-role">
                  <SelectValue placeholder="Selecteer een rol" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Administrator</SelectItem>
                  <SelectItem value="moderator">Moderator</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="mod-status">Status</Label>
              <Select 
                value={editModerator?.isActive ? 'active' : 'inactive'} 
                onValueChange={(value) => setEditModerator({...editModerator, isActive: value === 'active'})}
              >
                <SelectTrigger id="mod-status">
                  <SelectValue placeholder="Selecteer status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Actief</SelectItem>
                  <SelectItem value="inactive">Inactief</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Annuleren
            </Button>
            <Button onClick={handleSaveModerator}>
              {isEditMode ? 'Bijwerken' : 'Toevoegen'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
