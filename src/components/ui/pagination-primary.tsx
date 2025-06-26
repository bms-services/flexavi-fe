import { SelectPrimary } from './select-primary';
import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationEllipsis, PaginationLink, PaginationNext } from './pagination';
import { Meta, ParamGlobal } from '@/zustand/types/apiT';


interface PaginationPrimaryProps {
    params: Partial<ParamGlobal>;
    meta: Meta;
    onPageChange: (value: number) => void;
    onPerPageChange: (value: number) => void;
}

const PaginationPrimary = ({
    onPageChange,
    onPerPageChange,
    meta,
    params,
    ...props
}: PaginationPrimaryProps) => {
    const { last_page = 1, total, from, to } = meta || {};
    const { page = 1, per_page } = params;

    const perPageOptions = [
        { value: '6', label: '6' },
        { value: '12', label: '12' },
        { value: '24', label: '24' },
        { value: '50', label: '50' },
    ];

    const generatePages = () => {
        const pages = []
        for (let i = 1; i <= last_page; i++) {
            if (
                i === 1 ||
                i === last_page ||
                (i >= page - 1 && i <= page + 1)
            ) {
                pages.push(i)
            } else if (
                i === page - 2 ||
                i === page + 2
            ) {
                pages.push("ellipsis")
            }
        }
        return pages
    }

    return (
        <div className="flex flex-col md:flex-row gap-4 justify-between sm:items-center mt-6 space-x-2">
            <Pagination>
                <PaginationContent>
                    {page > 1 && (
                        <PaginationItem>
                            <PaginationPrevious onClick={(e) => {
                                e.preventDefault()
                                onPageChange(page - 1)
                            }} />
                        </PaginationItem>
                    )}

                    {generatePages().map((item, index) =>
                        item === "ellipsis" ? (
                            <PaginationItem key={`ellipsis-${index}`}>
                                <PaginationEllipsis />
                            </PaginationItem>
                        ) : (
                            <PaginationItem key={item}>
                                <PaginationLink
                                    isActive={item === page}
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault()
                                        onPageChange(item as number)
                                    }}
                                >
                                    {item}
                                </PaginationLink>
                            </PaginationItem>
                        )
                    )}

                    {page < last_page && (
                        <PaginationItem>
                            <PaginationNext onClick={(e) => {
                                e.preventDefault()
                                onPageChange(page + 1)
                            }} />
                        </PaginationItem>
                    )}
                </PaginationContent>
            </Pagination>

            <div className='flex items-center gap-2'>
                <span className="text-gray-700">
                    {from} - {to} van {total} resultaten
                </span>
                <SelectPrimary
                    options={perPageOptions}
                    placeholder="Selecteer aantal per pagina"
                    onValueChange={(value) => onPerPageChange(Number(value))}
                    value={String(per_page)}
                />
            </div>
        </div>
    );
};

export default PaginationPrimary;
