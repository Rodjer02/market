interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  currentPage,
  onPageChange,
}) => {
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div className="pagination flex ">
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`flex justify-center items-center w-7 h-7  mx-1 ${
            currentPage === page ? "font-bold bg-blue-700" : ""
          } hover:bg-blue-700 transition-colors bg-blue-600 rounded`}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
