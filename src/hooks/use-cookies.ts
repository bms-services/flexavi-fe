import Cookies from "js-cookie";
import { useState } from "react";

export const useCookies = <T>(
  keyName: string,
  defaultValue: T
): [T, (val: T) => void] => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const cookie = Cookies.get(keyName);
      if (cookie && cookie !== "null") {
        return JSON.parse(cookie);
      } else {
        Cookies.set(keyName, JSON.stringify(defaultValue));
        return defaultValue;
      }
    } catch (err) {
      console.error("Failed to parse cookie:", err);
      return defaultValue;
    }
  });

  const setValue = (newValue: T) => {
    try {
      Cookies.set(keyName, JSON.stringify(newValue), { expires: 7 });
      setStoredValue(newValue);
    } catch (err) {
      console.error("Failed to set cookie:", err);
    }
  };

  return [storedValue, setValue];
};

export const tokenName = import.meta.env.VITE_TOKEN_NAME;
