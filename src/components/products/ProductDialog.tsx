
import { useEffect, useState } from "react";
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
import { ProductCategoryReq, ProductReq } from "@/zustand/types/productT";
import { Option, SelectSearchAsync } from "../ui/react-select/select-search-async";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { createProductCategoryService, getProductCategoriesService } from "@/zustand/services/productService";
import { InputCurrency } from "../ui/input-currency";
import { SelectSearchAsyncCreatable } from "../ui/react-select/select-search-async-creatable";

interface ProductDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  productId?: string;
  onSave: (product: ProductReq) => void;
}
export function ProductDialog({
  open,
  onOpenChange,
  productId,
  onSave,
}: ProductDialogProps) {
  const { t } = useTranslation();
  const [defaultOptions, setDefaultOptions] = useState<Option[]>([]);

  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useFormContext<ProductReq>();


  const [params, setParams] = useState({
    page: 1,
    per_page: 10,
    search: "",
    filters: {},
    sorts: {},
  });

  const loadOptions = async (inputValue: string) => {
    const response = await getProductCategoriesService({
      ...params,
      search: inputValue,
    });

    return response.result.data.map((item) => ({
      value: item.id,
      label: item.name
    }));
  };

  useEffect(() => {
    if (open) {
      loadOptions("").then(setDefaultOptions);
    }
  }, [open]);


  const handleCreateCategory = async (inputValue: string) => {
    const created = await createProductCategoryService({
      name: inputValue,
      description: "-",
    });

    const newOption: Option = {
      value: created.result.id,
      label: created.result.name,
    };

    setDefaultOptions((prev) => [newOption, ...prev]);
    setValue("category_id", newOption);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit(onSave)}>
          <DialogHeader>
            <DialogTitle>
              {productId ? "Product Bewerken" : "Nieuw Product"}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Input
              id="title"
              label="Titel"
              rules={{
                register,
                name: "title",
                options: { required: t('product.error.required.name') },
                errors,
              }}
            />
            <Textarea
              id="description"
              label="Omschrijving"
              rules={{
                register,
                name: "description",
                options: {},
                errors,
              }}
            />
            <SelectSearchAsyncCreatable
              id="category"
              label="Categorie"
              loadOptions={loadOptions}
              onCreateOption={handleCreateCategory}
              defaultOptions={defaultOptions}
              rules={{
                name: "category_id",
                control,
                options: { required: t('product.error.required.category') },
                errors,
              }}

            />
            <div className="grid grid-cols-2 gap-4">
              <Input
                id="unit"
                label="Eenheid"
                placeholder="bijv. Stuks, Meter, etc."
                rules={{
                  register,
                  name: "unit",
                  options: { required: t('product.error.required.unit') },
                  errors,
                }}
              />
              <InputCurrency
                id="price"
                label="Prijs per eenheid"
                rules={{
                  control,
                  name: "price",
                  options: { required: "Prijs is verplicht" },
                  errors,
                }}
              />
            </div>
            <InputCurrency
              id="vat"
              label="BTW percentage"
              isPercent
              rules={{
                control,
                name: "btw_percentage",
                options: {
                  required: t('product.error.required.vat'),
                  validate: {
                    range: value => {
                      const numValue = parseFloat(value as string);
                      return (numValue >= 0 && numValue <= 100) || t('product.error.range.vat');
                    }
                  }
                },
                errors,
              }}
            />
          </div>
          <DialogFooter>
            <Button type="submit">{productId ? "Opslaan" : "Toevoegen"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
