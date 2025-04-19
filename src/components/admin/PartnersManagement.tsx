
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Plus, UserPlus } from 'lucide-react';

export function PartnersManagement() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Partners Beheer</h2>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Partner Toevoegen
        </Button>
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
                <TableHead>Type</TableHead>
                <TableHead>Korting</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actie</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Marketing Bureau XYZ</TableCell>
                <TableCell>Marketing</TableCell>
                <TableCell>20%</TableCell>
                <TableCell>
                  <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">
                    Actief
                  </span>
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm">Bewerken</Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
