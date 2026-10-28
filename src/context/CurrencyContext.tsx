import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { CurrencyCode, currencies, formatPrice as formatPriceUtil, convertCurrency } from '../utils/currency';
import { detectLocation, getBrowserCurrency, clearLocationCache } from '../utils/geolocation';

interface CurrencyContextType {
  currency: CurrencyCode;
  setCurrency: (currency: CurrencyCode) => void;
  formatPrice: (amount: number) => string;
  convertPrice: (amount: number, fromCurrency?: CurrencyCode) => number;
  isLoading: boolean;
  detectedCountry: string;
  detectedCity: string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

const CURRENCY_STORAGE_KEY = 'brewcall_currency';
const LOCATION_STORAGE_KEY = 'brewcall_detected_location';

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrencyState] = useState<CurrencyCode>('USD');
  const [isLoading, setIsLoading] = useState(true);
  const [detectedCountry, setDetectedCountry] = useState('');
  const [detectedCity, setDetectedCity] = useState('');

  // Initialize currency on mount
  useEffect(() => {
    const initializeCurrency = async () => {
      try {
        // Check if user has manually set a currency preference
        const savedCurrency = localStorage.getItem(CURRENCY_STORAGE_KEY);
        if (savedCurrency && savedCurrency in currencies) {
          setCurrencyState(savedCurrency as CurrencyCode);
          setIsLoading(false);
          return;
        }

        // Try to detect location via IP
        const location = await detectLocation();
        setDetectedCountry(location.country);
        setDetectedCity(location.city);
        setCurrencyState(location.currency);
        
        // Cache detected location
        localStorage.setItem(LOCATION_STORAGE_KEY, JSON.stringify({
          country: location.country,
          city: location.city,
          currency: location.currency,
        }));
      } catch (error) {
        console.warn('Failed to detect location, using browser language fallback');
        // Fallback to browser language
        const browserCurrency = getBrowserCurrency();
        setCurrencyState(browserCurrency);
      } finally {
        setIsLoading(false);
      }
    };

    initializeCurrency();
  }, []);

  // Update currency and save preference
  const setCurrency = useCallback((newCurrency: CurrencyCode) => {
    setCurrencyState(newCurrency);
    localStorage.setItem(CURRENCY_STORAGE_KEY, newCurrency);
  }, []);

  // Format price with current currency
  const formatPrice = useCallback((amount: number): string => {
    return formatPriceUtil(amount, currency);
  }, [currency]);

  // Convert price from base currency (USD) to current currency
  const convertPrice = useCallback((amount: number, fromCurrency: CurrencyCode = 'USD'): number => {
    return convertCurrency(amount, fromCurrency, currency);
  }, [currency]);

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        setCurrency,
        formatPrice,
        convertPrice,
        isLoading,
        detectedCountry,
        detectedCity,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
}

// Helper function to reset location detection
export function resetLocationDetection() {
  clearLocationCache();
  localStorage.removeItem(CURRENCY_STORAGE_KEY);
  localStorage.removeItem(LOCATION_STORAGE_KEY);
  window.location.reload();
}
