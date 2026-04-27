import { useEffect, useState } from 'react';

function readFromStorage<TValue>(key: string, initialValue: TValue) {
  if (typeof window === 'undefined') {
    return initialValue;
  }

  const rawValue = window.localStorage.getItem(key);

  if (!rawValue) {
    return initialValue;
  }

  try {
    return JSON.parse(rawValue) as TValue;
  } catch {
    return initialValue;
  }
}

export function useLocalStorageState<TValue>(
  key: string,
  initialValue: TValue,
) {
  const [value, setValue] = useState<TValue>(() =>
    readFromStorage(key, initialValue),
  );

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as const;
}
