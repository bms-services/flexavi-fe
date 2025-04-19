
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";

type PartnerFormData = {
  name: string;
  type: string;
  discount: string;
  description: string;
};

export function AddPartnerDialog() {
  const { register, handleSubmit, reset } = useForm<PartnerFormData>();

  const onSubmit = (data: PartnerFormData) => {
    console.log('Partner data:', data);
    reset();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Partner Toevoegen
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Nieuwe Partner Toevoegen</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 pt-4">
          <div className="space-y-2">
            <Label htmlFor="name">Partner Naam</Label>
            <Input id="name" {...register("name")} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="type">Type</Label>
            <Input id="type" {...register("type")} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="discount">Korting</Label>
            <Input id="discount" {...register("discount")} placeholder="bijv. 20%" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Beschrijving</Label>
            <Input id="description" {...register("description")} />
          </div>
          <Button type="submit" className="w-full">Partner Toevoegen</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
