
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Shield, FileEdit, Info, Mail, Search, Calendar, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface RecentMembersProps {
  onMakeAdmin?: (memberId: number) => void;
}

export function RecentMembers({ onMakeAdmin }: RecentMembersProps) {
  const { toast } = useToast();
  
  const [members, setMembers] = useState([
    { 
      id: 1, 
      name: 'Jan Jansen', 
      email: 'jan@dakbedrijf.nl', 
      plan: 'Professional', 
      status: 'active', 
      joined: '2024-04-15',
      company: 'Jansen Dakwerken',
      phone: '0612345678',
      lastActive: '2024-04-22',
      location: 'Amsterdam'
    },
    { 
      id: 2, 
      name: 'Piet Peters', 
      email: 'piet@dakwerk.nl', 
      plan: 'Starter', 
      status: 'active', 
      joined: '2024-04-14',
      company: 'Peters Dakservice',
      phone: '0623456789',
      lastActive: '2024-04-20',
      location: 'Rotterdam'
    },
    { 
      id: 3, 
      name: 'Klaas Krol', 
      email: 'klaas@dakexpert.nl', 
      plan: 'Enterprise', 
      status: 'blocked', 
      joined: '2024-04-13',
      company: 'Krol Dakspecialist',
      phone: '0634567890',
      lastActive: '2024-04-10',
      location: 'Utrecht'
    },
    { 
      id: 4, 
      name: 'Lisa van Dijk', 
      email: 'lisa@dakpro.nl', 
      plan: 'Professional', 
      status: 'active', 
      joined: '2024-04-12',
      company: 'Van Dijk Dakwerken',
      phone: '0645678901',
      lastActive: '2024-04-21',
      location: 'Den Haag'
    },
    { 
      id: 5, 
      name: 'Mark Visser', 
      email: 'mark@dakmeester.nl', 
      plan: 'Enterprise', 
      status: 'active', 
      joined: '2024-04-10',
      company: 'Visser Dakconstructies',
      phone: '0656789012',
      lastActive: '2024-04-19',
      location: 'Eindhoven'
    },
  ]);
  
  const [nameFilter, setNameFilter] = useState('');
  const [emailFilter, setEmailFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [planFilter, setPlanFilter] = useState('all');
  const [freeMonths, setFreeMonths] = useState(1);
  const [selectedMember, setSelectedMember] = useState<any>(null);
  const [showDetailDialog, setShowDetailDialog] = useState(false);

  const handleBlockUser = (memberId: number) => {
    setMembers(members.map(member => 
      member.id === memberId 
        ? {...member, status: member.status === 'active' ? 'blocked' : 'active'} 
        : member
    ));
    
    const member = members.find(m => m.id === memberId);
    if (member) {
      toast({
        title: `Lid ${member.status === 'active' ? 'geblokkeerd' : 'gedeblokkeerd'}`,
        description: `${member.name} is succesvol ${member.status === 'active' ? 'geblokkeerd' : 'gedeblokkeerd'}.`,
      });
    }
  };

  const handleGiveFreeMonths = (memberId: number, months: number) => {
    const member = members.find(m => m.id === memberId);
    toast({
      title: `Gratis maanden toegekend`,
      description: `${months} gratis maanden toegevoegd voor ${member?.name}.`,
    });
  };
  
  const handleViewDetails = (member: any) => {
    setSelectedMember(member);
    setShowDetailDialog(true);
  };

  const handleSendEmail = (memberId: number) => {
    const member = members.find(m => m.id === memberId);
    toast({
      title: "Email verzonden",
      description: `Er is een email verzonden naar ${member?.name} (${member?.email}).`,
    });
  };

  const filteredMembers = members.filter(member => {
    const matchesName = member.name.toLowerCase().includes(nameFilter.toLowerCase());
    const matchesEmail = member.email.toLowerCase().includes(emailFilter.toLowerCase());
    const matchesStatus = statusFilter === 'all' || member.status === statusFilter;
    const matchesPlan = planFilter === 'all' || member.plan === planFilter;
    return matchesName && matchesEmail && matchesStatus && matchesPlan;
  });
  
  const getPlanBadge = (plan: string) => {
    switch(plan) {
      case 'Starter':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Starter</Badge>;
      case 'Professional': 
        return <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">Professional</Badge>;
      case 'Enterprise':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Enterprise</Badge>;
      default:
        return <Badge variant="outline">{plan}</Badge>;
    }
  };

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          Ledenlijst
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div>
            <Label htmlFor="nameFilter">Naam</Label>
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                id="nameFilter"
                placeholder="Filter op naam"
                value={nameFilter}
                onChange={(e) => setNameFilter(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="emailFilter">Email</Label>
            <div className="relative">
              <Mail className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                id="emailFilter"
                placeholder="Filter op email"
                value={emailFilter}
                onChange={(e) => setEmailFilter(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="statusFilter">Status</Label>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter op status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Alle statussen</SelectItem>
                <SelectItem value="active">Actief</SelectItem>
                <SelectItem value="blocked">Geblokkeerd</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="planFilter">Pakket</Label>
            <Select value={planFilter} onValueChange={setPlanFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter op pakket" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Alle pakketten</SelectItem>
                <SelectItem value="Starter">Starter</SelectItem>
                <SelectItem value="Professional">Professional</SelectItem>
                <SelectItem value="Enterprise">Enterprise</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="rounded-md border overflow-hidden">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead>Naam</TableHead>
                <TableHead>Bedrijf</TableHead>
                <TableHead>Pakket</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Lid Sinds</TableHead>
                <TableHead className="text-right">Acties</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMembers.map((member) => (
                <TableRow key={member.id} className="hover:bg-muted/30">
                  <TableCell>
                    <div className="font-medium">{member.name}</div>
                    <div className="text-sm text-muted-foreground">{member.email}</div>
                  </TableCell>
                  <TableCell>{member.company}</TableCell>
                  <TableCell>{getPlanBadge(member.plan)}</TableCell>
                  <TableCell>
                    <Badge variant={member.status === 'active' ? 'success' : 'destructive'} className="capitalize">
                      {member.status === 'active' ? 'Actief' : 'Geblokkeerd'}
                    </Badge>
                  </TableCell>
                  <TableCell>{member.joined}</TableCell>
                  <TableCell>
                    <div className="flex justify-end space-x-2">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleViewDetails(member)}
                      >
                        <Info className="h-4 w-4" />
                      </Button>
                      
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleSendEmail(member.id)}
                      >
                        <Mail className="h-4 w-4" />
                      </Button>
                      
                      {onMakeAdmin && (
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => onMakeAdmin(member.id)}
                        >
                          <Shield className="h-4 w-4" />
                        </Button>
                      )}
                      
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <Calendar className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                          <DialogHeader>
                            <DialogTitle>Gratis Periode Toekennen</DialogTitle>
                            <DialogDescription>
                              Geef een aantal maanden gratis abonnement aan {member.name}.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="months" className="text-right">
                                Maanden
                              </Label>
                              <Input
                                id="months"
                                type="number"
                                min="1"
                                max="12"
                                value={freeMonths}
                                onChange={(e) => setFreeMonths(parseInt(e.target.value))}
                                className="col-span-3"
                              />
                            </div>
                          </div>
                          <DialogFooter>
                            <Button onClick={() => handleGiveFreeMonths(member.id, freeMonths)}>Bevestigen</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>

                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="icon" className={member.status === 'active' ? 'text-destructive' : 'text-green-600'}>
                            <FileEdit className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              {member.status === 'active' ? 'Lid Blokkeren' : 'Lid Deblokkeren'}
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              {member.status === 'active' 
                                ? `Weet je zeker dat je ${member.name} wilt blokkeren? Het lid zal geen toegang meer hebben tot het platform.`
                                : `Weet je zeker dat je ${member.name} wilt deblokkeren? Het lid krijgt weer toegang tot het platform.`}
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Annuleren</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleBlockUser(member.id)}>
                              {member.status === 'active' ? 'Blokkeren' : 'Deblokkeren'}
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Member details dialog */}
        {selectedMember && (
          <Dialog open={showDetailDialog} onOpenChange={setShowDetailDialog}>
            <DialogContent className="sm:max-w-[550px]">
              <DialogHeader>
                <DialogTitle>Ledenprofiel</DialogTitle>
                <DialogDescription>
                  Gedetailleerde informatie over {selectedMember.name}
                </DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4 py-4">
                <div className="space-y-2">
                  <Label className="text-muted-foreground">Naam</Label>
                  <p className="font-medium">{selectedMember.name}</p>
                </div>
                <div className="space-y-2">
                  <Label className="text-muted-foreground">Email</Label>
                  <p className="font-medium">{selectedMember.email}</p>
                </div>
                <div className="space-y-2">
                  <Label className="text-muted-foreground">Bedrijf</Label>
                  <p className="font-medium">{selectedMember.company}</p>
                </div>
                <div className="space-y-2">
                  <Label className="text-muted-foreground">Telefoon</Label>
                  <p className="font-medium">{selectedMember.phone}</p>
                </div>
                <div className="space-y-2">
                  <Label className="text-muted-foreground">Locatie</Label>
                  <p className="font-medium">{selectedMember.location}</p>
                </div>
                <div className="space-y-2">
                  <Label className="text-muted-foreground">Pakket</Label>
                  <p className="font-medium">{selectedMember.plan}</p>
                </div>
                <div className="space-y-2">
                  <Label className="text-muted-foreground">Status</Label>
                  <p className="font-medium capitalize">{selectedMember.status}</p>
                </div>
                <div className="space-y-2">
                  <Label className="text-muted-foreground">Lid Sinds</Label>
                  <p className="font-medium">{selectedMember.joined}</p>
                </div>
                <div className="space-y-2 col-span-2">
                  <Label className="text-muted-foreground">Laatst Actief</Label>
                  <p className="font-medium">{selectedMember.lastActive}</p>
                </div>
              </div>
              <DialogFooter>
                <Button 
                  variant="outline" 
                  onClick={() => setShowDetailDialog(false)}
                >
                  Sluiten
                </Button>
                <Button 
                  onClick={() => {
                    handleSendEmail(selectedMember.id);
                    setShowDetailDialog(false);
                  }}
                >
                  Email Versturen
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </CardContent>
    </Card>
  );
}
