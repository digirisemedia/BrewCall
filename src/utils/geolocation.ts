// ==========================================
// IP Geolocation Service
// ==========================================

import { CurrencyCode, getCurrencyByCountry } from './currency';

interface GeolocationResult {
  country: string;
  countryCode: string;
  city: string;
  currency: CurrencyCode;
}

// Free IP geolocation APIs (fallback chain)
const GEOLOCATION_APIS = [
  {
    url: 'https://ipapi.co/json/',
    parse: (data: any) => ({
      country: data.country_name,
      countryCode: data.country_code,
      city: data.city,
    }),
  },
  {
    url: 'https://ip-api.com/json/?fields=country,countryCode,city',
    parse: (data: any) => ({
      country: data.country,
      countryCode: data.countryCode,
      city: data.city,
    }),
  },
  {
    url: 'https://freeipapi.com/api/json/',
    parse: (data: any) => ({
      country: data.country_name,
      countryCode: data.country_code,
      city: data.city_name,
    }),
  },
];

const STORAGE_KEY = 'brewcall_geolocation';
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

interface CachedLocation {
  result: GeolocationResult;
  timestamp: number;
}

// Detect user location via IP
export async function detectLocation(): Promise<GeolocationResult> {
  // Check cache first
  const cached = getCachedLocation();
  if (cached) {
    return cached;
  }

  // Try each API in order
  for (const api of GEOLOCATION_APIS) {
    try {
      const response = await fetch(api.url);
      if (!response.ok) continue;
      
      const data = await response.json();
      const parsed = api.parse(data);
      
      if (parsed.countryCode) {
        const result: GeolocationResult = {
          ...parsed,
          currency: getCurrencyByCountry(parsed.countryCode),
        };
        
        // Cache the result
        cacheLocation(result);
        
        return result;
      }
    } catch (error) {
      console.warn(`Geolocation API failed:`, error);
      continue;
    }
  }

  // Fallback to default (USD)
  return {
    country: 'United States',
    countryCode: 'US',
    city: 'Unknown',
    currency: 'USD',
  };
}

// Get cached location
function getCachedLocation(): GeolocationResult | null {
  try {
    const cached = localStorage.getItem(STORAGE_KEY);
    if (!cached) return null;

    const { result, timestamp }: CachedLocation = JSON.parse(cached);
    
    // Check if cache is still valid
    if (Date.now() - timestamp < CACHE_DURATION) {
      return result;
    }
  } catch (error) {
    console.warn('Failed to read cached location:', error);
  }
  
  return null;
}

// Cache location result
function cacheLocation(result: GeolocationResult): void {
  try {
    const cached: CachedLocation = {
      result,
      timestamp: Date.now(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cached));
  } catch (error) {
    console.warn('Failed to cache location:', error);
  }
}

// Clear cached location
export function clearLocationCache(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.warn('Failed to clear location cache:', error);
  }
}

// Get browser language as fallback for currency detection
export function getBrowserCurrency(): CurrencyCode {
  const browserLang = navigator.language || 'en-US';
  
  // Extract country code from language (e.g., 'en-US' -> 'US')
  const parts = browserLang.split('-');
  if (parts.length >= 2) {
    const countryCode = parts[1].toUpperCase();
    return getCurrencyByCountry(countryCode);
  }
  
  return 'USD';
}
