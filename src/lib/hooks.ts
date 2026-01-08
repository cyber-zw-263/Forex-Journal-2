import { useState, useCallback, useEffect } from 'react';
import toast from 'react-hot-toast';

interface UseAsyncOptions {
  onSuccess?: (data: unknown) => void;
  onError?: (error: Error) => void;
  showToast?: boolean;
}

export function useAsync<T>(
  asyncFunction: () => Promise<T>,
  immediate = true,
  options: UseAsyncOptions = {}
) {
  const [status, setStatus] = useState<'idle' | 'pending' | 'success' | 'error'>('idle');
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const execute = useCallback(async () => {
    setStatus('pending');
    setData(null);
    setError(null);
    try {
      const response = await asyncFunction();
      setData(response);
      setStatus('success');
      options.onSuccess?.(response);
      return response;
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      setError(error);
      setStatus('error');
      if (options.showToast) {
        toast.error(error.message);
      }
      options.onError?.(error);
      throw error;
    }
  }, [asyncFunction, options]);

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);

  return { execute, status, data, error, isLoading: status === 'pending' };
}

interface UseFetchOptions<T> extends UseAsyncOptions {
  headers?: Record<string, string>;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  body?: Record<string, unknown>;
}

export function useFetch<T = unknown>(url: string, options: UseFetchOptions<T> & { immediate?: boolean } = {}) {
  const { headers = {}, method = 'GET', body, immediate = true, ...rest } = options;

  const fetchData = useCallback(async () => {
    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'x-user-id': 'demo-user',
        ...headers,
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || 'API request failed');
    }

    return response.json();
  }, [url, headers, method, body]);

  return useAsync(fetchData, immediate, rest);
}

interface UsePaginationOptions {
  pageSize?: number;
}

export function usePagination<T extends { id?: string }>(
  items: T[] = [],
  options: UsePaginationOptions = {}
) {
  const { pageSize = 20 } = options;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(items.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentItems = items.slice(startIndex, endIndex);

  const goToPage = useCallback((page: number) => {
    const validPage = Math.max(1, Math.min(page, totalPages));
    setCurrentPage(validPage);
  }, [totalPages]);

  const nextPage = useCallback(() => goToPage(currentPage + 1), [currentPage, goToPage]);
  const prevPage = useCallback(() => goToPage(currentPage - 1), [currentPage, goToPage]);

  return {
    currentPage,
    totalPages,
    currentItems,
    goToPage,
    nextPage,
    prevPage,
    hasNextPage: currentPage < totalPages,
    hasPrevPage: currentPage > 1,
  };
}

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') return initialValue;
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = useCallback(
    (value: T | ((val: T) => T)) => {
      try {
        const valueToStore = value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);
        if (typeof window !== 'undefined') {
          window.localStorage.setItem(key, JSON.stringify(valueToStore));
        }
      } catch (error) {
        console.error('localStorage error:', error);
      }
    },
    [key, storedValue]
  );

  return [storedValue, setValue] as const;
}

export function useDebounce<T>(value: T, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}
