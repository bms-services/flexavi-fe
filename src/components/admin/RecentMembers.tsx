
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MemberInvoices } from '@/components/admin/MemberInvoices';

export function RecentMembers() {
  const [members, setMembers] = useState([
    { id: 1, name: 'Jan Jansen', email: 'jan@dakbedrijf.nl', plan: 'Professional', status: 'active', joined: '2024-04-15' },
    { id: 2, name: 'Piet Peters', email: 'piet@dakwerk.nl', plan: 'Starter', status: 'active', joined: '2024-04-14' },
    { id: 3, name: 'Klaas Krol', email: 'klaas@dakexpert.nl', plan: 'Enterprise', status: 'blocked', joined: '2024-04-13' },
  ]);
  
  const [selectedMember, setSelectedMember] = useState(null);
  const [freeMonths, setFreeMonths] = useState(1);
  const [showInvoices, setShowInvoices] = useState(false);

  const handleBlockUser = (memberId) => {
    setMembers(members.map(member => 
      member.id === memberId 
        ? {...member, status: member.status === 'active' ? 'blocked' : 'active'} 
        : member
    ));
  };

  const handleGiveFreeMonths = (memberId, months) => {
    // Here you would implement the API call to add free months
    console.log(`Giving ${months} free months to member ${memberId}`);
    // For demo purposes, just show a success message
    alert(`${months} gratis maanden toegevoegd voor ${members.find(m => m.id === memberId).name}`);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Recente Leden</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Naam</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Abonnement</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Lid Sinds</TableHead>
                <TableHead>Acties</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {members.map((member) => (
                <TableRow key={member.id}>
                  <TableCell>{member.name}</TableCell>
                  <TableCell>{member.email}</TableCell>
                  <TableCell>{member.plan}</TableCell>
                  <TableCell>
                    <Badge variant={member.status === 'active' ? 'success' : 'destructive'}>
                      {member.status === 'active' ? 'Actief' : 'Geblokkeerd'}
                    </Badge>
                  </TableCell>
                  <TableCell>{member.joined}</TableCell>
                  <TableCell className="space-x-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">Gratis periode</Button>
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
                        <Button variant={member.status === 'active' ? 'destructive' : 'outline'} size="sm">
                          {member.status === 'active' ? 'Blokkeren' : 'Deblokkeren'}
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

                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => {
                        setSelectedMember(member);
                        setShowInvoices(true);
                      }}
                    >
                      Facturen
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {showInvoices && selectedMember && (
        <Dialog open={showInvoices} onOpenChange={setShowInvoices}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Facturen voor {selectedMember.name}</DialogTitle>
            </DialogHeader>
            <MemberInvoices memberId={selectedMember.id} />
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
