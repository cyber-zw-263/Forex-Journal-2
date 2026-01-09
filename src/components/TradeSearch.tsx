'use client';

import { useState, useCallback } from 'react';
import { FiSearch, FiX } from 'react-icons/fi';

interface TradeSearchProps {
  trades: any[];
  onSearch: (results: any[]) => void;
}

export default function TradeSearch({ trades, onSearch }: TradeSearchProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState<'all' | 'pair' | 'strategy' | 'notes'>('all');

  const handleSearch = useCallback((term: string, type: typeof searchType) => {
    if (!term.trim()) {
      onSearch(trades);
      return;
    }

    const lowerTerm = term.toLowerCase();
    const filtered = trades.filter(trade => {
      switch (type) {
        case 'pair':
          return trade.pair?.toLowerCase().includes(lowerTerm);
        case 'strategy':
          return trade.strategy?.toLowerCase().includes(lowerTerm);
        case 'notes':
          return trade.notes?.toLowerCase().includes(lowerTerm);
        case 'all':
        default:
          return (
            (trade.pair?.toLowerCase().includes(lowerTerm) ?? false) ||
            (trade.strategy?.toLowerCase().includes(lowerTerm) ?? false) ||
            (trade.notes?.toLowerCase().includes(lowerTerm) ?? false) ||
            (trade.direction?.toLowerCase().includes(lowerTerm) ?? false) ||
            (trade.account?.toLowerCase().includes(lowerTerm) ?? false)
          );
      }
    });

    onSearch(filtered);
  }, [trades, onSearch]);

  const handleClear = () => {
    setSearchTerm('');
    onSearch(trades);
  };

  return (
    <div style={{ marginBottom: '20px' }}>
      <div
        style={{
          display: 'flex',
          gap: '12px',
          flexWrap: 'wrap',
          alignItems: 'center',
        }}
      >
        {/* Search Input */}
        <div
          style={{
            flex: 1,
            minWidth: '200px',
            display: 'flex',
            alignItems: 'center',
            backgroundColor: 'var(--card-bg)',
            border: '1px solid var(--card-border)',
            borderRadius: '8px',
            padding: '8px 12px',
          }}
        >
          <FiSearch style={{ width: '18px', height: '18px', color: 'var(--neutral-color)' }} />
          <input
            type="text"
            placeholder="Search trades..."
            value={searchTerm}
            onChange={(e) => {
              const term = e.currentTarget.value;
              setSearchTerm(term);
              handleSearch(term, searchType);
            }}
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              color: 'var(--foreground)',
              padding: '8px 12px',
              fontSize: '14px',
              outline: 'none',
            }}
            aria-label="Search trades"
          />
          {searchTerm && (
            <button
              onClick={handleClear}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--neutral-color)',
                cursor: 'pointer',
                padding: '4px',
              }}
              aria-label="Clear search"
            >
              <FiX size={18} />
            </button>
          )}
        </div>

        {/* Search Type Filter */}
        <select
          value={searchType}
          onChange={(e) => {
            const type = e.currentTarget.value as typeof searchType;
            setSearchType(type);
            handleSearch(searchTerm, type);
          }}
          style={{
            backgroundColor: 'var(--card-bg)',
            border: '1px solid var(--card-border)',
            borderRadius: '8px',
            padding: '8px 12px',
            color: 'var(--foreground)',
            cursor: 'pointer',
            fontSize: '14px',
          }}
          aria-label="Filter search by type"
        >
          <option value="all">All Fields</option>
          <option value="pair">Pair</option>
          <option value="strategy">Strategy</option>
          <option value="notes">Notes</option>
        </select>
      </div>
    </div>
  );
}
