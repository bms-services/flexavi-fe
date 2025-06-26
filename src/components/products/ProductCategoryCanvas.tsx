import { useGetProductCategories } from "@/zustand/hooks/useProduct";
import { ProductCategoryRes } from "@/zustand/types/productT";
import { PencilIcon, PlusIcon, TrashIcon, XIcon } from "lucide-react";
import { useCallback, useEffect, useMemo } from "react";
import { Offcanvas, initTWE } from "tw-elements";
import { Button } from "../ui/button";
import TableTanstack, { CustomColumnDef } from "../ui/table-tanstack";
import { ParamGlobal } from "@/zustand/types/apiT";


interface ProductCategoryProps {
    handleCreateCategory: () => void;
    handleEditCategory: (id: ProductCategoryRes) => void;
    handleDeleteCategory: (id: string) => void;
    getProductCategoryZ: ReturnType<typeof useGetProductCategories>;
    params: ParamGlobal;
    setParams: React.Dispatch<React.SetStateAction<ParamGlobal>>;
}

export default function ProductCategoryCanvas({
    handleCreateCategory,
    handleEditCategory,
    handleDeleteCategory,
    getProductCategoryZ,
    params,
    setParams
}: ProductCategoryProps) {

    useEffect(() => {
        initTWE({ Offcanvas });
    }, []);

    const columns = useMemo<CustomColumnDef<ProductCategoryRes>[]>(() => [
        { accessorKey: "name", header: "Name", cell: info => info.getValue() },
        { accessorKey: "description", header: "Description", cell: info => info.getValue() },
        {
            accessorKey: "products_count",
            header: "Product Count",
        },
        {
            id: "actions",
            meta: { className: "text-center align-middle" },
            header: "",
            cell: ({ row }) => (
                <div className="flex items-center space-x-2">
                    <Button
                        variant="link"
                        size="sm"
                        onClick={() => handleEditCategory(row.original)}
                    >
                        <PencilIcon className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="link"
                        size="sm"
                        onClick={() => handleDeleteCategory(row.original.id)}
                    >
                        <TrashIcon className="h-4 w-4 text-danger" />
                    </Button>
                </div>
            )
        }
    ], []);

    const data = useMemo(() => {
        return getProductCategoryZ.data?.result.data ?? [];
    }, [getProductCategoryZ.data]);

    const meta = useMemo(() => {
        return getProductCategoryZ.data?.result.meta;
    }, [getProductCategoryZ.data]);

    const handleParamsChange = useCallback(
        (changed: Partial<ParamGlobal>) => setParams(prev => ({ ...prev, ...changed })),
        [setParams]
    );

    return (
        <div
            className="!my-0 invisible fixed bottom-0 rounded-[4px] right-0 top-0 z-[1045] flex w-full sm:w-1/2 max-w-full translate-x-full flex-col border-none bg-white bg-clip-padding text-neutral-700 shadow-sm outline-none transition duration-300 ease-in-out data-[twe-offcanvas-show]:transform-none dark:bg-body-dark dark:text-white"
            tabIndex={-1}
            id="productCategoryCanvas"
            aria-labelledby="productCategoryCanvasLabel"
            data-twe-offcanvas-init>
            <div className="flex items-center justify-between p-4">
                <h5
                    className="mb-0 font-semibold leading-normal"
                    id="productCategoryCanvasLabel">
                    Categorieën
                </h5>
                <button
                    type="button"
                    className="box-content rounded-none border-none text-neutral-500 hover:text-neutral-800 hover:no-underline focus:text-neutral-800 focus:opacity-100 focus:shadow-none focus:outline-none dark:text-neutral-400 dark:hover:text-neutral-300 dark:focus:text-neutral-300"
                    data-twe-offcanvas-dismiss
                    aria-label="Close">
                    <span className="[&>svg]:h-6 [&>svg]:w-6">
                        <XIcon className="h-6 w-6" />
                    </span>
                </button>
            </div>
            <div className="offcanvas-body flex-grow overflow-y-auto p-4 space-y-4">
                <Button
                    variant={"outline"}
                    onClick={handleCreateCategory}
                    className="w-full flex items-center justify-center space-x-2 mb-4"
                >
                    <PlusIcon className="h-4 w-4" />
                    <span className="ml-2">Nieuwe Categorie</span>
                </Button>

                <TableTanstack
                    columns={columns}
                    data={data}
                    meta={meta}
                    isLoading={getProductCategoryZ.isLoading}
                    params={params}
                    onParamsChange={handleParamsChange}
                />
            </div>
        </div>

    );
};