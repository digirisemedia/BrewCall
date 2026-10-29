// ==========================================
// Multi-Currency System
// ==========================================

export type CurrencyCode = 
  | 'MAD' // Moroccan Dirham
  | 'USD' // US Dollar
  | 'EUR' // Euro
  | 'GBP' // British Pound
  | 'JPY' // Japanese Yen
  | 'CNY' // Chinese Yuan
  | 'INR' // Indian Rupee
  | 'BRL' // Brazilian Real
  | 'CAD' // Canadian Dollar
  | 'AUD' // Australian Dollar
  | 'CHF' // Swiss Franc
  | 'KRW' // South Korean Won
  | 'MXN' // Mexican Peso
  | 'SGD' // Singapore Dollar
  | 'HKD' // Hong Kong Dollar
  | 'NOK' // Norwegian Krone
  | 'SEK' // Swedish Krona
  | 'DKK' // Danish Krone
  | 'NZD' // New Zealand Dollar
  | 'ZAR' // South African Rand
  | 'AED' // UAE Dirham
  | 'SAR' // Saudi Riyal
  | 'QAR' // Qatari Riyal
  | 'KWD' // Kuwaiti Dinar
  | 'BHD' // Bahraini Dinar
  | 'OMR' // Omani Rial
  | 'EGP' // Egyptian Pound
  | 'TRY' // Turkish Lira
  | 'RUB' // Russian Ruble
  | 'PLN' // Polish Zloty
  | 'CZK' // Czech Koruna
  | 'HUF' // Hungarian Forint
  | 'RON' // Romanian Leu
  | 'BGN' // Bulgarian Lev
  | 'HRK' // Croatian Kuna
  | 'RSD' // Serbian Dinar
  | 'THB' // Thai Baht
  | 'VND' // Vietnamese Dong
  | 'IDR' // Indonesian Rupiah
  | 'MYR' // Malaysian Ringgit
  | 'PHP' // Philippine Peso
  | 'PKR' // Pakistani Rupee
  | 'BDT' // Bangladeshi Taka
  | 'LKR' // Sri Lankan Rupee
  | 'NGN' // Nigerian Naira
  | 'KES' // Kenyan Shilling
  | 'GHS' // Ghanaian Cedi
  | 'TND' // Tunisian Dinar
  | 'DZD' // Algerian Dinar
  | 'XOF' // West African CFA Franc
  | 'XAF'; // Central African CFA Franc

export interface Currency {
  code: CurrencyCode;
  symbol: string;
  name: string;
  flag: string;
  rate: number; // Rate relative to USD (1 USD = X currency)
  locale: string;
  decimals: number;
}

// Exchange rates relative to USD (approximate rates for demo)
export const currencies: Record<CurrencyCode, Currency> = {
  MAD: { code: 'MAD', symbol: 'د.م', name: 'Moroccan Dirham', flag: '🇲🇦', rate: 10.0, locale: 'ar-MA', decimals: 2 },
  USD: { code: 'USD', symbol: '$', name: 'US Dollar', flag: '🇺🇸', rate: 1.0, locale: 'en-US', decimals: 2 },
  EUR: { code: 'EUR', symbol: '€', name: 'Euro', flag: '🇪🇺', rate: 0.92, locale: 'de-DE', decimals: 2 },
  GBP: { code: 'GBP', symbol: '£', name: 'British Pound', flag: '🇬🇧', rate: 0.79, locale: 'en-GB', decimals: 2 },
  JPY: { code: 'JPY', symbol: '¥', name: 'Japanese Yen', flag: '🇯🇵', rate: 149.5, locale: 'ja-JP', decimals: 0 },
  CNY: { code: 'CNY', symbol: '¥', name: 'Chinese Yuan', flag: '🇨🇳', rate: 7.24, locale: 'zh-CN', decimals: 2 },
  INR: { code: 'INR', symbol: '₹', name: 'Indian Rupee', flag: '🇮🇳', rate: 83.12, locale: 'hi-IN', decimals: 2 },
  BRL: { code: 'BRL', symbol: 'R$', name: 'Brazilian Real', flag: '🇧🇷', rate: 4.97, locale: 'pt-BR', decimals: 2 },
  CAD: { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar', flag: '🇨🇦', rate: 1.36, locale: 'en-CA', decimals: 2 },
  AUD: { code: 'AUD', symbol: 'A$', name: 'Australian Dollar', flag: '🇦🇺', rate: 1.53, locale: 'en-AU', decimals: 2 },
  CHF: { code: 'CHF', symbol: 'CHF', name: 'Swiss Franc', flag: '🇨🇭', rate: 0.88, locale: 'de-CH', decimals: 2 },
  KRW: { code: 'KRW', symbol: '₩', name: 'South Korean Won', flag: '🇰🇷', rate: 1325.5, locale: 'ko-KR', decimals: 0 },
  MXN: { code: 'MXN', symbol: 'MX$', name: 'Mexican Peso', flag: '🇲🇽', rate: 17.15, locale: 'es-MX', decimals: 2 },
  SGD: { code: 'SGD', symbol: 'S$', name: 'Singapore Dollar', flag: '🇸🇬', rate: 1.34, locale: 'en-SG', decimals: 2 },
  HKD: { code: 'HKD', symbol: 'HK$', name: 'Hong Kong Dollar', flag: '🇭🇰', rate: 7.82, locale: 'zh-HK', decimals: 2 },
  NOK: { code: 'NOK', symbol: 'kr', name: 'Norwegian Krone', flag: '🇳🇴', rate: 10.65, locale: 'nb-NO', decimals: 2 },
  SEK: { code: 'SEK', symbol: 'kr', name: 'Swedish Krona', flag: '🇸🇪', rate: 10.45, locale: 'sv-SE', decimals: 2 },
  DKK: { code: 'DKK', symbol: 'kr', name: 'Danish Krone', flag: '🇩🇰', rate: 6.87, locale: 'da-DK', decimals: 2 },
  NZD: { code: 'NZD', symbol: 'NZ$', name: 'New Zealand Dollar', flag: '🇳🇿', rate: 1.63, locale: 'en-NZ', decimals: 2 },
  ZAR: { code: 'ZAR', symbol: 'R', name: 'South African Rand', flag: '🇿🇦', rate: 18.65, locale: 'en-ZA', decimals: 2 },
  AED: { code: 'AED', symbol: 'د.إ', name: 'UAE Dirham', flag: '🇦🇪', rate: 3.67, locale: 'ar-AE', decimals: 2 },
  SAR: { code: 'SAR', symbol: '﷼', name: 'Saudi Riyal', flag: '🇸🇦', rate: 3.75, locale: 'ar-SA', decimals: 2 },
  QAR: { code: 'QAR', symbol: '﷼', name: 'Qatari Riyal', flag: '🇶🇦', rate: 3.64, locale: 'ar-QA', decimals: 2 },
  KWD: { code: 'KWD', symbol: 'د.ك', name: 'Kuwaiti Dinar', flag: '🇰🇼', rate: 0.31, locale: 'ar-KW', decimals: 3 },
  BHD: { code: 'BHD', symbol: '.د.ب', name: 'Bahraini Dinar', flag: '🇧🇭', rate: 0.38, locale: 'ar-BH', decimals: 3 },
  OMR: { code: 'OMR', symbol: '﷼', name: 'Omani Rial', flag: '🇴🇲', rate: 0.38, locale: 'ar-OM', decimals: 3 },
  EGP: { code: 'EGP', symbol: 'E£', name: 'Egyptian Pound', flag: '🇪🇬', rate: 30.90, locale: 'ar-EG', decimals: 2 },
  TRY: { code: 'TRY', symbol: '₺', name: 'Turkish Lira', flag: '🇹🇷', rate: 27.20, locale: 'tr-TR', decimals: 2 },
  RUB: { code: 'RUB', symbol: '₽', name: 'Russian Ruble', flag: '🇷🇺', rate: 92.50, locale: 'ru-RU', decimals: 2 },
  PLN: { code: 'PLN', symbol: 'zł', name: 'Polish Zloty', flag: '🇵🇱', rate: 4.02, locale: 'pl-PL', decimals: 2 },
  CZK: { code: 'CZK', symbol: 'Kč', name: 'Czech Koruna', flag: '🇨🇿', rate: 22.65, locale: 'cs-CZ', decimals: 2 },
  HUF: { code: 'HUF', symbol: 'Ft', name: 'Hungarian Forint', flag: '🇭🇺', rate: 355.20, locale: 'hu-HU', decimals: 0 },
  RON: { code: 'RON', symbol: 'lei', name: 'Romanian Leu', flag: '🇷🇴', rate: 4.57, locale: 'ro-RO', decimals: 2 },
  BGN: { code: 'BGN', symbol: 'лв', name: 'Bulgarian Lev', flag: '🇧🇬', rate: 1.80, locale: 'bg-BG', decimals: 2 },
  HRK: { code: 'HRK', symbol: 'kn', name: 'Croatian Kuna', flag: '🇭🇷', rate: 6.93, locale: 'hr-HR', decimals: 2 },
  RSD: { code: 'RSD', symbol: 'дин.', name: 'Serbian Dinar', flag: '🇷🇸', rate: 108.50, locale: 'sr-RS', decimals: 2 },
  THB: { code: 'THB', symbol: '฿', name: 'Thai Baht', flag: '🇹🇭', rate: 35.25, locale: 'th-TH', decimals: 2 },
  VND: { code: 'VND', symbol: '₫', name: 'Vietnamese Dong', flag: '🇻🇳', rate: 24350, locale: 'vi-VN', decimals: 0 },
  IDR: { code: 'IDR', symbol: 'Rp', name: 'Indonesian Rupiah', flag: '🇮🇩', rate: 15450, locale: 'id-ID', decimals: 0 },
  MYR: { code: 'MYR', symbol: 'RM', name: 'Malaysian Ringgit', flag: '🇲🇾', rate: 4.68, locale: 'ms-MY', decimals: 2 },
  PHP: { code: 'PHP', symbol: '₱', name: 'Philippine Peso', flag: '🇵🇭', rate: 55.85, locale: 'en-PH', decimals: 2 },
  PKR: { code: 'PKR', symbol: '₨', name: 'Pakistani Rupee', flag: '🇵🇰', rate: 281.50, locale: 'ur-PK', decimals: 2 },
  BDT: { code: 'BDT', symbol: '৳', name: 'Bangladeshi Taka', flag: '🇧🇩', rate: 110.25, locale: 'bn-BD', decimals: 2 },
  LKR: { code: 'LKR', symbol: '₨', name: 'Sri Lankan Rupee', flag: '🇱🇰', rate: 323.50, locale: 'si-LK', decimals: 2 },
  NGN: { code: 'NGN', symbol: '₦', name: 'Nigerian Naira', flag: '🇳🇬', rate: 770.50, locale: 'en-NG', decimals: 2 },
  KES: { code: 'KES', symbol: 'KSh', name: 'Kenyan Shilling', flag: '🇰🇪', rate: 153.25, locale: 'en-KE', decimals: 2 },
  GHS: { code: 'GHS', symbol: '₵', name: 'Ghanaian Cedi', flag: '🇬🇭', rate: 11.85, locale: 'en-GH', decimals: 2 },
  TND: { code: 'TND', symbol: 'د.ت', name: 'Tunisian Dinar', flag: '🇹🇳', rate: 3.12, locale: 'ar-TN', decimals: 3 },
  DZD: { code: 'DZD', symbol: 'د.ج', name: 'Algerian Dinar', flag: '🇩🇿', rate: 134.50, locale: 'ar-DZ', decimals: 2 },
  XOF: { code: 'XOF', symbol: 'CFA', name: 'West African CFA Franc', flag: '🇸🇳', rate: 603.50, locale: 'fr-SN', decimals: 0 },
  XAF: { code: 'XAF', symbol: 'FCFA', name: 'Central African CFA Franc', flag: '🇨🇲', rate: 603.50, locale: 'fr-CM', decimals: 0 },
};

// Country to currency mapping
export const countryToCurrency: Record<string, CurrencyCode> = {
  // North America
  US: 'USD', CA: 'CAD', MX: 'MXN',
  
  // Europe
  DE: 'EUR', FR: 'EUR', IT: 'EUR', ES: 'EUR', PT: 'EUR', NL: 'EUR', BE: 'EUR', AT: 'EUR', IE: 'EUR', FI: 'EUR', GR: 'EUR', LU: 'EUR',
  GB: 'GBP',
  CH: 'CHF',
  NO: 'NOK', SE: 'SEK', DK: 'DKK',
  PL: 'PLN', CZ: 'CZK', HU: 'HUF', RO: 'RON', BG: 'BGN', HR: 'HRK', RS: 'RSD',
  
  // Asia
  JP: 'JPY', CN: 'CNY', IN: 'INR', KR: 'KRW', SG: 'SGD', HK: 'HKD',
  TH: 'THB', VN: 'VND', ID: 'IDR', MY: 'MYR', PH: 'PHP',
  PK: 'PKR', BD: 'BDT', LK: 'LKR',
  
  // Middle East
  AE: 'AED', SA: 'SAR', QA: 'QAR', KW: 'KWD', BH: 'BHD', OM: 'OMR',
  EG: 'EGP', TR: 'TRY',
  
  // Africa
  MA: 'MAD', ZA: 'ZAR', NG: 'NGN', KE: 'KES', GH: 'GHS',
  TN: 'TND', DZ: 'DZD', SN: 'XOF', CM: 'XAF',
  
  // Oceania
  AU: 'AUD', NZ: 'NZD',
  
  // South America
  BR: 'BRL',
  
  // Russia & CIS
  RU: 'RUB',
};

// Convert amount from one currency to another
export function convertCurrency(amount: number, fromCurrency: CurrencyCode, toCurrency: CurrencyCode): number {
  if (fromCurrency === toCurrency) return amount;
  
  // Convert to USD first
  const amountInUSD = amount / currencies[fromCurrency].rate;
  
  // Convert from USD to target currency
  return amountInUSD * currencies[toCurrency].rate;
}

// Format price with currency symbol
export function formatPrice(amount: number, currencyCode: CurrencyCode): string {
  const currency = currencies[currencyCode];
  const formatted = amount.toFixed(currency.decimals);
  
  // For currencies where symbol comes after
  const symbolAfter = ['EUR', 'RUB', 'TRY', 'PLN', 'CZK', 'HUF', 'RON', 'BGN', 'HRK', 'RSD'].includes(currencyCode);
  
  if (symbolAfter) {
    return `${formatted} ${currency.symbol}`;
  }
  
  return `${currency.symbol} ${formatted}`;
}

// Get currency by country code
export function getCurrencyByCountry(countryCode: string): CurrencyCode {
  return countryToCurrency[countryCode] || 'USD';
}

// List of all currencies for dropdown
export const currencyList = Object.values(currencies).sort((a, b) => a.name.localeCompare(b.name));
