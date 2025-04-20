
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { AddPartnerDialog } from './partners/AddPartnerDialog';

export function PartnersManagement() {
  const mockPartner = {
    name: "Marketing Bureau XYZ",
    description: "Professionele marketing diensten",
    benefits: [
      { id: "1", text: "20% korting op alle diensten" },
      { id: "2", text: "Gratis marketing scan" }
    ],
    website: "https://xyz-marketing.nl",
    phone: "+31612345678"
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Partners Beheer</h2>
        <AddPartnerDialog />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Actieve Partners</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Partner Naam</TableHead>
                <TableHead>Website</TableHead>
                <TableHead>Telefoon</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actie</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>{mockPartner.name}</TableCell>
                <TableCell>{mockPartner.website}</TableCell>
                <TableCell>{mockPartner.phone}</TableCell>
                <TableCell>
                  <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">
                    Actief
                  </span>
                </TableCell>
                <TableCell>
                  <AddPartnerDialog isEdit partner={mockPartner} />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
