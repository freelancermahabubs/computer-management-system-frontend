import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const Pagination = ({ page, setPage, pageSize, meta }) => {
  const { t } = useTranslation();
  const totalPages = Math.ceil(meta?.total / pageSize);

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const ellipsis = <li key="ellipsis" className="page-item disabled"><span className="page-link">...</span></li>;

    if (totalPages <= 6) {
      // Display all pages
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(
          <li
            key={i}
            className={`page-item ${page === i ? 'active' : ''}`}
          >
            <Link className="page-link" onClick={() => setPage(i)}>
              {i}
            </Link>
          </li>
        );
      }
    } else {
      // Display first 3 pages
      for (let i = 1; i <= 3; i++) {
        pageNumbers.push(
          <li
            key={i}
            className={`page-item ${page === i ? 'active' : ''}`}
          >
            <Link className="page-link" onClick={() => setPage(i)}>
              {i}
            </Link>
          </li>
        );
      }

      // Display ellipsis with values in between
      const start = Math.max(4, page - 1);
      const end = Math.min(totalPages - 2, page + 1);

      if (start > 4) {
        pageNumbers.push(ellipsis);
      }

      for (let i = start; i <= end; i++) {
        pageNumbers.push(
          <li
            key={i}
            className={`page-item ${page === i ? 'active' : ''}`}
          >
            <Link className="page-link" onClick={() => setPage(i)}>
              {i}
            </Link>
          </li>
        );
      }

      if (end < totalPages - 2) {
        pageNumbers.push(ellipsis);
      }

      // Display last 2 pages
      for (let i = totalPages - 1; i <= totalPages; i++) {
        pageNumbers.push(
          <li
            key={i}
            className={`page-item ${page === i ? 'active' : ''}`}
          >
            <Link className="page-link" onClick={() => setPage(i)}>
              {i}
            </Link>
          </li>
        );
      }
    }

    return pageNumbers;
  };

  return (
    <div className="d-md-flex align-items-center">
      <div className="me-md-auto text-md-left text-center mb-2 mb-md-0">
        Showing {((page - 1) * pageSize) + 1} to{" "}
        {Math.min(page * pageSize, meta?.total)} of {meta?.total} entries
      </div>
      <ul className="pagination mb-0 justify-content-center">
        <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
          <Link className="page-link" onClick={() => setPage(page - 1)}>
          {t("Previous")}
          </Link>
        </li>
        {renderPageNumbers()}
        <li
          className={`page-item ${page * pageSize >= meta?.total ? 'disabled' : ''}`}
        >
          <Link className="page-link" onClick={() => setPage(page + 1)}>
            {t("Next")}
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
