import React from "react";

function Pagination({ page, total, limit, setPage }) {
  const totalPages = Math.ceil(total / limit);
  console.log("Total page ", totalPages);
  return (

    <div className="w-full flex items-center justify-center mt-12">
      <div className="join">
        {totalPages > 0 &&
          [...Array(totalPages)].map((val, index) => (
            <input
              className={`join-item btn btn-square btn-sm ${
                page === index + 1 ? "checked" : ""
              }`}
              type="radio"
              onClick={() => setPage(index + 1)}
              name="options"
              aria-label={index + 1}
              key={index}
              checked={page === index + 1}
            />
          ))}
      </div>
    </div>
  );
}

export default Pagination;