import { useGetProductCategories } from "@/zustand/hooks/useProduct";
import { ProductCategoryRes } from "@/zustand/types/productT";
import { PlusIcon, XIcon } from "lucide-react";
import { useEffect } from "react";
import { Offcanvas, initTWE } from "tw-elements";
import { Button } from "../ui/button";
import { indexColor } from "@/utils/generateColor";


interface ProductCategoryProps {
    handleCreateCategory: () => void;
    handleEditCategory: (id: ProductCategoryRes) => void;
    handleDeleteCategory: (id: string) => void;
    getProductCategoryZ: ReturnType<typeof useGetProductCategories>;
}

export default function ProductCategoryCanvas({
    handleCreateCategory,
    handleEditCategory,
    handleDeleteCategory,
    getProductCategoryZ
}: ProductCategoryProps) {

    useEffect(() => {
        initTWE({ Offcanvas });
    }, []);

    return (
        <div
            className="!my-0 invisible fixed bottom-0 right-0 top-0 z-[1045] flex w-96 max-w-full translate-x-full flex-col border-none bg-white bg-clip-padding text-neutral-700 shadow-sm outline-none transition duration-300 ease-in-out data-[twe-offcanvas-show]:transform-none dark:bg-body-dark dark:text-white"
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

                {getProductCategoryZ.isSuccess && getProductCategoryZ.data.result.data.length > 0 ? (
                    <div className="flex flex-wrap gap-3">
                        {getProductCategoryZ.data.result.data.map((category, index) => {
                            const colorClass = indexColor[index % indexColor.length];
                            return (
                                <div
                                    key={category.id}
                                    className={`flex items-center justify-between gap-3 px-2 py-1 rounded-full min-w-1/2 ${colorClass}`}
                                    onClick={() => handleEditCategory(category)}
                                    role="button"
                                >
                                    <span className="font-normal text-[14px]">{category.name}</span>
                                    <button
                                        className="rounded-full p-0.5 bg-red-500 hover:bg-red-600 text-white focus:outline-none"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            e.preventDefault();
                                            handleDeleteCategory(category.id)
                                        }}
                                    >
                                        <XIcon className="h-3 w-3" />
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <p className="text-center text-gray-500">Geen categorieën gevonden.</p>
                )}
            </div>
        </div>

    );
};