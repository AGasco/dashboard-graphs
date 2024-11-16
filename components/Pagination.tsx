'use client';
import React, { useMemo } from 'react';
import { Button } from './ui';

interface Props {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange
}: Props) => {
  const totalPages = useMemo(
    () => Math.ceil(totalItems / itemsPerPage),
    [totalItems, itemsPerPage]
  );

  const handlePrevious = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  return (
    <div className="flex items-center justify-center mt-4 space-x-4">
      <Button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className="px-4 disabled:bg-gray-300"
      >
        Previous
      </Button>
      <span>
        {currentPage} / {totalPages}
      </span>
      <Button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="px-4 disabled:bg-gray-300"
      >
        Next
      </Button>
    </div>
  );
};

export default Pagination;
