
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Upload, X } from "lucide-react";

type Benefit = {
  id: string;
  text: string;
};

type PartnerFormData = {
  name: string;
  description: string;
  logo?: File;
  benefits: Benefit[];
  website: string;
  phone: string;
};

interface AddPartnerDialogProps {
  isEdit?: boolean;
  partner?: PartnerFormData;
}

export function AddPartnerDialog({ isEdit, partner }: AddPartnerDialogProps) {
  const [formData, setFormData] = useState<PartnerFormData>(partner || {
    name: '',
    description: '',
    benefits: [],
    website: '',
    phone: '',
  });
  const [benefits, setBenefits] = useState<Benefit[]>(partner?.benefits || []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Partner data:', { ...formData, benefits });
    // Reset form after submit if not editing
    if (!isEdit) {
      setFormData({
        name: '',
        description: '',
        benefits: [],
        website: '',
        phone: '',
      });
      setBenefits([]);
    }
  };

  const addBenefit = () => {
    setBenefits([...benefits, { id: crypto.randomUUID(), text: '' }]);
  };

  const removeBenefit = (id: string) => {
    setBenefits(benefits.filter(benefit => benefit.id !== id));
  };

  const updateBenefit = (id: string, text: string) => {
    setBenefits(benefits.map(benefit => 
      benefit.id === id ? { ...benefit, text } : benefit
    ));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, logo: e.target.files[0] });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          {isEdit ? "Partner Bewerken" : "Partner Toevoegen"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Partner Bewerken" : "Nieuwe Partner Toevoegen"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 pt-4">
          <div className="space-y-2">
            <Label htmlFor="name">Partner Naam</Label>
            <Input 
              id="name" 
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Beschrijving</Label>
            <Textarea 
              id="description" 
              value={formData.description}
              onChange={e => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="logo">Logo Upload</Label>
            <div className="flex items-center gap-4">
              <Input
                id="logo"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => document.getElementById('logo')?.click()}
                className="w-full"
              >
                <Upload className="h-4 w-4 mr-2" />
                Logo Uploaden
              </Button>
              {formData.logo && (
                <span className="text-sm text-muted-foreground">
                  {formData.logo.name}
                </span>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Voordelen</Label>
              <Button type="button" variant="outline" size="sm" onClick={addBenefit}>
                <Plus className="h-4 w-4 mr-2" />
                Voordeel Toevoegen
              </Button>
            </div>
            <div className="space-y-3">
              {benefits.map((benefit) => (
                <div key={benefit.id} className="flex gap-2">
                  <Input
                    value={benefit.text}
                    onChange={(e) => updateBenefit(benefit.id, e.target.value)}
                    placeholder="Voer een voordeel in..."
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeBenefit(benefit.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="website">Website</Label>
            <Input
              id="website"
              type="url"
              placeholder="https://"
              value={formData.website}
              onChange={e => setFormData({ ...formData, website: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Telefoon</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+31 6 12345678"
              value={formData.phone}
              onChange={e => setFormData({ ...formData, phone: e.target.value })}
            />
          </div>

          <Button type="submit" className="w-full">
            {isEdit ? "Partner Bijwerken" : "Partner Toevoegen"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
