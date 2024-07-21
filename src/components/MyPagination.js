import React from 'react';
import { Pagination } from 'react-bootstrap';

function pagination(c, m) {
  var current = c,
    last = m,
    delta = 2,
    left = current - delta,
    right = current + delta + 1,
    range = [],
    rangeWithDots = [],
    l;

  for (let i = 1; i <= last; i++) {
    if (i === 1 || i === last || (i >= left && i < right)) {
      range.push(i);
    }
  }

  for (let i of range) {
    if (l) {
      if (i - l === 2) {
        rangeWithDots.push(l + 1);
      } else if (i - l !== 1) {
        rangeWithDots.push('...');
      }
    }
    rangeWithDots.push(i);
    l = i;
  }

  return rangeWithDots;
}
function backToTop() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

const MyPagination = ({ itemsPerPage, totalItems, paginate, currentPage }) => {
  const numPages = Math.ceil(totalItems / itemsPerPage);
  var rangeWithDots = pagination(currentPage, numPages);

  return (
    <Pagination>
      {/* Previous Button */}
      <Pagination.Prev
        onClick={() => paginate(currentPage - 1)}
        disabled={currentPage === 1}
      />
      {/* Numbers */}
      {rangeWithDots.map(page => (
        <>
          {page !== '...' ? (
            <Pagination.Item
              key={page}
              active={page === currentPage}
              onClick={() => {
                paginate(page);
                backToTop();
              }}
            >
              {page}
            </Pagination.Item>
          ) : (
            <Pagination.Ellipsis />
          )}
        </>
      ))}
      {/* Next Button */}
      <Pagination.Next
        onClick={() => paginate(currentPage + 1)}
        disabled={currentPage === numPages}
      />
    </Pagination>
  );
};

export default MyPagination;
