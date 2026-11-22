import { useState, useEffect } from 'react';

/**
 * Custom hook for synchronizing React state with browser localStorage.
 * Ensures initial fallback to default value if storage is empty or invalid.
 * 
 * @param {string} key - localStorage key
 * @param {any} initialValue - Fallback value if no valid data is stored
 * @returns {[any, Function, Function]} [value, setValue, resetValue]
 */
export function useLocalStorage(key, initialValue) {
  // Read initial state from localStorage or fallback
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }
    try {
      const item = window.localStorage.getItem(key);
      if (item !== null) {
        const parsed = JSON.parse(item);
        // Ensure non-empty array for initial tasks if expected
        if (Array.isArray(initialValue) && (!Array.isArray(parsed) || parsed.length === 0)) {
          return initialValue;
        }
        return parsed;
      }
      return initialValue;
    } catch (error) {
      console.warn(`[useLocalStorage] Error reading key "${key}":`, error);
      return initialValue;
    }
  });

  // Synchronize with localStorage whenever storedValue changes
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error(`[useLocalStorage] Error saving key "${key}":`, error);
    }
  }, [key, storedValue]);

  // Helper function to reset to initial value (useful for demo/testing)
  const resetValue = () => {
    try {
      window.localStorage.removeItem(key);
      setStoredValue(initialValue);
    } catch (error) {
      console.error(`[useLocalStorage] Error resetting key "${key}":`, error);
    }
  };

  return [storedValue, setStoredValue, resetValue];
}
