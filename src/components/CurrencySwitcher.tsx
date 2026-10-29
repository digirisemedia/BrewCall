import { useState } from 'react';
import { useCurrency } from '../context/CurrencyContext';
import { currencyList, CurrencyCode } from '../utils/currency';

interface CurrencySwitcherProps {
  variant?: 'dark' | 'light';
}

export function CurrencySwitcher({ variant = 'dark' }: CurrencySwitcherProps) {
  const { currency, setCurrency, isLoading } = useCurrency();
  const [isOpen, setIsOpen] = useState(false);

  const currentCurrency = currencyList.find(c => c.code === currency);

  if (isLoading) {
    return (
      <div className={`flex items-center justify-center w-10 h-10 rounded-xl ${
        variant === 'dark' ? 'bg-white/5 border border-white/10' : 'bg-gray-100 border border-gray-200'
      }`}>
        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-center w-10 h-10 rounded-xl text-lg transition-all ${
          variant === 'dark'
            ? 'bg-white/5 border border-white/10 hover:bg-white/10'
            : 'bg-gray-100 border border-gray-200 hover:bg-gray-200'
        }`}
        title={currentCurrency?.name}
      >
        {currentCurrency?.flag}
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)}></div>
          <div className={`absolute top-full mt-2 right-0 z-50 w-64 max-h-96 overflow-y-auto rounded-xl shadow-2xl border animate-scale-in ${
            variant === 'dark' ? 'bg-gray-900 border-white/10' : 'bg-white border-gray-200'
          }`}>
            <div className="p-2">
              <p className={`text-xs font-medium px-2 py-1 ${
                variant === 'dark' ? 'text-gray-500' : 'text-gray-400'
              }`}>
                Select Currency
              </p>
              {currencyList.map((curr) => (
                <button
                  key={curr.code}
                  onClick={() => {
                    setCurrency(curr.code);
                    setIsOpen(false);
                  }}
                  className={`flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm transition-colors ${
                    currency === curr.code
                      ? variant === 'dark' ? 'bg-violet-600/20 text-violet-300' : 'bg-violet-50 text-violet-700'
                      : variant === 'dark' ? 'text-gray-300 hover:bg-white/5' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <span className="text-xl">{curr.flag}</span>
                  <div className="flex-1 text-left">
                    <div className="font-medium">{curr.code}</div>
                    <div className={`text-xs ${variant === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>
                      {curr.name}
                    </div>
                  </div>
                  <span className={`text-xs font-medium ${variant === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                    {curr.symbol}
                  </span>
                  {currency === curr.code && (
                    <span className="text-xs">✓</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
