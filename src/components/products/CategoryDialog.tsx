
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ProductCategoryReq } from "@/zustand/types/productT";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

interface CategoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  productCategoryId?: string;
  onSave: (data: ProductCategoryReq) => void;
}

export function CategoryDialog({
  open,
  onOpenChange,
  productCategoryId,
  onSave,
}: CategoryDialogProps) {
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFormContext<ProductCategoryReq>();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit(onSave)}>
          <DialogHeader>
            <DialogTitle>
              {productCategoryId ? "Categorie Bewerken" : "Nieuwe Categorie"}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Input
              id="title"
              label="Titel"
              rules={{
                register,
                name: "name",
                options: {
                  required: t('productCategory.error.required.name')
                },
                errors,
              }}
            />
            <Textarea
              id="description"
              label="Omschrijving"
              rules={{
                register,
                name: "description",
                options: {
                },
                errors,
              }}
            />
          </div>
          <DialogFooter>
            <Button type="submit">{productCategoryId ? "Opslaan" : "Toevoegen"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
