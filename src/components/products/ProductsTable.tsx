import React, { useMemo, useCallback } from "react";
// import { leadStatusMap } from "@/types";
import TableTanstack, { CustomColumnDef } from "../ui/table-tanstack";
import { formatEuro, formatIsoToDate, formatPercentage } from "@/utils/format";
import { ApiError, ApiSuccessPaginated, ParamGlobal } from "@/zustand/types/apiT";
import { UseQueryResult } from "@tanstack/react-query";
import { ProductRes } from "@/zustand/types/productT";

interface ProductsTableProps {
  params: ParamGlobal;
  setParams: React.Dispatch<React.SetStateAction<ParamGlobal>>;
  onShow?: (row: ProductRes) => void;
  onEdit?: (row: ProductRes) => void;
  onDelete?: (rows: ProductRes[]) => void;
  onArchive?: (rows: ProductRes[]) => void;
  getProductsZ: UseQueryResult<ApiSuccessPaginated<ProductRes>, ApiError>
}

export const ProductsTable: React.FC<ProductsTableProps> = ({ params, setParams, onShow, onEdit, onDelete, onArchive, getProductsZ }) => {
  const data = getProductsZ.data?.result.data ?? [];
  const meta = getProductsZ.data?.result.meta;

  const columns = useMemo<CustomColumnDef<ProductRes>[]>(() => [
    { accessorKey: "title", header: "Titel", cell: info => info.getValue() },
    { accessorKey: "unit", header: "Eenheid", cell: info => info.getValue() },
    { accessorKey: "price", header: "Prijs", cell: info => formatEuro(info.getValue() as string) },
    { accessorKey: "btw_percentage", header: "BTW", cell: info => formatPercentage(info.getValue() as string) },
    {
      accessorKey: "category.name",
      header: "Categorie",
      cell: info => info.row.original.category?.name ?? "-",
    },
    {
      accessorKey: "created_at",
      header: "Aangemaakt",
      cell: info => formatIsoToDate(info.row.original.created_at),
    },
  ], []);

  /**
   * Handles changes to the table parameters such as pagination, sorting, and filtering.
   * 
   * @param changed - Partial object containing the parameters that have changed.
   * This function merges the new parameters with the existing ones in the state.
   */
  const handleParamsChange = useCallback(
    (changed: Partial<ParamGlobal>) => setParams(prev => ({ ...prev, ...changed })),
    [setParams]
  );


  /**
   * Maps the lead status to filter options for the table.
   * 
   * @returns An array of objects containing value and label for each lead status.
   */
  // const statusFilterOptions = Object.entries(leadStatusMap).map(
  //   ([value, { label }]) => ({ value, label })
  // );

  return (
    <div className="space-y-4">
      <TableTanstack
        columns={columns}
        data={data}
        meta={meta}
        isLoading={getProductsZ.isLoading}
        // isLoadingAction={deleteLeadZ.isPending || deleteLeadZ.isPending}
        params={params}
        onParamsChange={handleParamsChange}
        onEdit={onEdit}
        // onShow={onShow}
        onDelete={onDelete}
        onArchive={onArchive}
      // filterOptions={{
      //   status: {
      //     label: "Status",
      //     options: statusFilterOptions,
      //   }
      // }}
      />
    </div>
  );
};