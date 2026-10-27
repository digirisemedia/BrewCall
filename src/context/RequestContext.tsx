import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';

export type RequestType = 'waiter' | 'water' | 'bill';
export type RequestStatus = 'pending' | 'resolved';

export interface ServiceRequest {
  id: string;
  table_id: number;
  request_type: RequestType;
  status: RequestStatus;
  created_at: number;
}

interface RequestContextType {
  requests: ServiceRequest[];
  activeRequest: ServiceRequest | null;
  createRequest: (tableId: number, type: RequestType) => void;
  cancelRequest: (tableId: number) => void;
  resolveRequest: (requestId: string) => void;
  getActiveRequestForTable: (tableId: number) => ServiceRequest | null;
  pendingRequests: ServiceRequest[];
}

const STORAGE_KEY = 'waitercall_requests';

const RequestContext = createContext<RequestContextType | undefined>(undefined);

function getStoredRequests(): ServiceRequest[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function storeRequests(requests: ServiceRequest[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(requests));
}

export function RequestProvider({ children }: { children: React.ReactNode }) {
  const [requests, setRequests] = useState<ServiceRequest[]>(getStoredRequests);
  const storageListenerRef = useRef<((e: StorageEvent) => void) | null>(null);

  // Listen for localStorage changes from other tabs (simulates real-time)
  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        try {
          const newRequests: ServiceRequest[] = JSON.parse(e.newValue);
          setRequests(newRequests);
        } catch {
          // ignore parse errors
        }
      }
    };

    storageListenerRef.current = handleStorage;
    window.addEventListener('storage', handleStorage);

    // Also poll every 500ms for same-tab updates
    const interval = setInterval(() => {
      const stored = getStoredRequests();
      setRequests((prev) => {
        if (JSON.stringify(prev) !== JSON.stringify(stored)) {
          return stored;
        }
        return prev;
      });
    }, 500);

    return () => {
      window.removeEventListener('storage', handleStorage);
      clearInterval(interval);
    };
  }, []);

  const createRequest = useCallback((tableId: number, type: RequestType) => {
    const newRequest: ServiceRequest = {
      id: `req_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
      table_id: tableId,
      request_type: type,
      status: 'pending',
      created_at: Date.now(),
    };

    const updated = [...getStoredRequests(), newRequest];
    storeRequests(updated);
    setRequests(updated);
  }, []);

  const cancelRequest = useCallback((tableId: number) => {
    const current = getStoredRequests();
    const updated = current.filter(
      (r) => !(r.table_id === tableId && r.status === 'pending')
    );
    storeRequests(updated);
    setRequests(updated);
  }, []);

  const resolveRequest = useCallback((requestId: string) => {
    const current = getStoredRequests();
    const updated = current.map((r) =>
      r.id === requestId ? { ...r, status: 'resolved' as RequestStatus } : r
    );
    storeRequests(updated);
    setRequests(updated);
  }, []);

  const getActiveRequestForTable = useCallback(
    (tableId: number): ServiceRequest | null => {
      return (
        requests.find(
          (r) => r.table_id === tableId && r.status === 'pending'
        ) || null
      );
    },
    [requests]
  );

  const pendingRequests = requests.filter((r) => r.status === 'pending');

  return (
    <RequestContext.Provider
      value={{
        requests,
        activeRequest: null,
        createRequest,
        cancelRequest,
        resolveRequest,
        getActiveRequestForTable,
        pendingRequests,
      }}
    >
      {children}
    </RequestContext.Provider>
  );
}

export function useRequests() {
  const context = useContext(RequestContext);
  if (!context) {
    throw new Error('useRequests must be used within a RequestProvider');
  }
  return context;
}
