
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Edit, Trash, GripVertical, Save, X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';

// Mock data for community rules
const initialRules = [
  {
    id: '1',
    title: 'Respectvolle communicatie',
    description: 'Behandel alle leden met respect. Scheldwoorden, intimidatie, discriminatie of pesten wordt niet getolereerd.',
    isActive: true,
    order: 1
  },
  {
    id: '2',
    title: 'Geen spam of advertenties',
    description: 'Het plaatsen van spam, ongewenste advertenties of irrelevante links is niet toegestaan.',
    isActive: true,
    order: 2
  },
  {
    id: '3',
    title: 'Relevante inhoud',
    description: 'Houd berichten en discussies relevant voor de dakdekkersgemeenschap en het platform.',
    isActive: true,
    order: 3
  },
  {
    id: '4',
    title: 'Geen inbreuk op auteursrecht',
    description: 'Plaats alleen inhoud waarvoor je de rechten hebt of die je mag delen.',
    isActive: true,
    order: 4
  }
];

export function CommunityRules() {
  const [rules, setRules] = useState(initialRules);
  const [editRule, setEditRule] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const handleAddRule = () => {
    setEditRule({ 
      id: '', 
      title: '', 
      description: '', 
      isActive: true, 
      order: rules.length + 1 
    });
    setIsEditMode(false);
    setIsDialogOpen(true);
  };

  const handleEditRule = (rule: any) => {
    setEditRule({...rule});
    setIsEditMode(true);
    setIsDialogOpen(true);
  };

  const handleSaveRule = () => {
    if (isEditMode) {
      setRules(rules.map(r => r.id === editRule.id ? editRule : r));
    } else {
      const newRule = {
        ...editRule,
        id: `rule-${Date.now()}`
      };
      setRules([...rules, newRule]);
    }
    setIsDialogOpen(false);
    setEditRule(null);
  };

  const handleDeleteRule = (id: string) => {
    setRules(rules.filter(rule => rule.id !== id));
  };

  const handleToggleRule = (id: string) => {
    setRules(rules.map(rule => 
      rule.id === id ? {...rule, isActive: !rule.isActive} : rule
    ));
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <p className="text-muted-foreground">
          Beheer de regels en richtlijnen voor je community. Deze regels worden weergegeven voor gebruikers bij het aanmaken van een account en bij het plaatsen van berichten.
        </p>
        <Button onClick={handleAddRule}>
          <Plus className="h-4 w-4 mr-2" />
          Nieuwe regel
        </Button>
      </div>

      <div className="space-y-2">
        {rules.map((rule) => (
          <Card key={rule.id} className="border border-gray-200">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className="mt-1 text-gray-400">
                    <GripVertical className="h-5 w-5 cursor-move" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-lg">{rule.title}</h3>
                    <p className="text-gray-600 mt-1">{rule.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-2 mr-4">
                    <Switch 
                      checked={rule.isActive} 
                      onCheckedChange={() => handleToggleRule(rule.id)} 
                      id={`rule-active-${rule.id}`}
                    />
                    <Label htmlFor={`rule-active-${rule.id}`}>Actief</Label>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => handleEditRule(rule)}>
                    <Edit className="h-4 w-4" />
                    <span className="sr-only">Bewerken</span>
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleDeleteRule(rule.id)}>
                    <Trash className="h-4 w-4" />
                    <span className="sr-only">Verwijderen</span>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {isEditMode ? 'Regel bewerken' : 'Nieuwe regel toevoegen'}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="rule-title">Titel</Label>
              <Input 
                id="rule-title" 
                value={editRule?.title || ''} 
                onChange={(e) => setEditRule({...editRule, title: e.target.value})}
                placeholder="Bijv. Respectvolle communicatie"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="rule-description">Beschrijving</Label>
              <Textarea 
                id="rule-description" 
                value={editRule?.description || ''} 
                onChange={(e) => setEditRule({...editRule, description: e.target.value})}
                placeholder="Beschrijf de regel duidelijk"
                className="min-h-[100px]"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch 
                id="rule-active" 
                checked={editRule?.isActive || false}
                onCheckedChange={(checked) => setEditRule({...editRule, isActive: checked})}
              />
              <Label htmlFor="rule-active">Regel actief</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Annuleren
            </Button>
            <Button onClick={handleSaveRule}>
              {isEditMode ? 'Bijwerken' : 'Toevoegen'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
