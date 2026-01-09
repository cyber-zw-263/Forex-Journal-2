'use client';

import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  totalItems: number;
  pageSize: number;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  hasNextPage,
  hasPrevPage,
  totalItems,
  pageSize,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '16px',
        backgroundColor: 'var(--card-bg)',
        border: '1px solid var(--card-border)',
        borderRadius: '8px',
        marginTop: '20px',
      }}
    >
      <p style={{ fontSize: '13px', color: 'var(--neutral-color)', margin: 0 }}>
        Showing {startItem} to {endItem} of {totalItems} items
      </p>

      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={!hasPrevPage}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '36px',
            height: '36px',
            borderRadius: '6px',
            backgroundColor: hasPrevPage ? 'var(--purple-base)' : 'var(--panel-muted)',
            border: 'none',
            color: 'white',
            cursor: hasPrevPage ? 'pointer' : 'not-allowed',
            opacity: hasPrevPage ? 1 : 0.5,
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => {
            if (hasPrevPage) {
              e.currentTarget.style.backgroundColor = 'var(--purple-light)';
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--purple-base)';
          }}
          aria-label="Previous page"
        >
          <FiChevronLeft size={18} />
        </button>

        <div
          style={{
            display: 'flex',
            gap: '6px',
            alignItems: 'center',
          }}
        >
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '6px',
                backgroundColor: page === currentPage ? 'var(--purple-base)' : 'transparent',
                border: page === currentPage ? 'none' : `1px solid var(--card-border)`,
                color: page === currentPage ? 'white' : 'var(--neutral-color)',
                cursor: 'pointer',
                fontSize: '13px',
                fontWeight: page === currentPage ? '600' : '400',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                if (page !== currentPage) {
                  e.currentTarget.style.borderColor = 'var(--purple-base)';
                  e.currentTarget.style.color = 'var(--purple-base)';
                }
              }}
              onMouseLeave={(e) => {
                if (page !== currentPage) {
                  e.currentTarget.style.borderColor = 'var(--card-border)';
                  e.currentTarget.style.color = 'var(--neutral-color)';
                }
              }}
              aria-label={`Go to page ${page}`}
              aria-current={page === currentPage ? 'page' : undefined}
            >
              {page}
            </button>
          ))}
        </div>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={!hasNextPage}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '36px',
            height: '36px',
            borderRadius: '6px',
            backgroundColor: hasNextPage ? 'var(--purple-base)' : 'var(--panel-muted)',
            border: 'none',
            color: 'white',
            cursor: hasNextPage ? 'pointer' : 'not-allowed',
            opacity: hasNextPage ? 1 : 0.5,
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => {
            if (hasNextPage) {
              e.currentTarget.style.backgroundColor = 'var(--purple-light)';
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--purple-base)';
          }}
          aria-label="Next page"
        >
          <FiChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}
