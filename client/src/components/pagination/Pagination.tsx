import React from 'react';

interface PaginationProps {
  total: number;
  limit: number;
  page: number;
  setPage: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  total,
  limit,
  page,
  setPage,
}) => {
  const numPages = Math.ceil(total / limit);

  const handlePrevPage = () => {
    setPage(page - 1);
  };

  const handleNextPage = () => {
    setPage(page + 1);
  };

  const handlePageClick = (pageNum: number) => {
    setPage(pageNum);
  };

  return (
    <div>
      <button onClick={handlePrevPage} disabled={page === 1}>
        &lt;
      </button>
      {[...Array(numPages)].map((_, index) => (
        <button
          key={index}
          onClick={() => handlePageClick(index + 1)}
          disabled={page === index + 1}
        >
          {index + 1}
        </button>
      ))}
      <button onClick={handleNextPage} disabled={page === numPages}>
        &gt;
      </button>
    </div>
  );
};

export default Pagination;
