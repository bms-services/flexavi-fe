
import { useState } from "react";

export const usePagination = <T,>(items: T[], itemsPerPage: number) => {
  const [currentPage, setCurrentPage] = useState(1);
  
  const maxPage = Math.ceil(items.length / itemsPerPage);
  const paginatedItems = items.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const nextPage = () => setCurrentPage(p => Math.min(maxPage, p + 1));
  const prevPage = () => setCurrentPage(p => Math.max(1, p - 1));
  const goToPage = (page: number) => setCurrentPage(page);

  return {
    currentPage,
    maxPage,
    paginatedItems,
    nextPage,
    prevPage,
    goToPage
  };
};
