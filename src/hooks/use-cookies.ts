import Cookies from "js-cookie";
import { useState } from "react";

export const useCookies = (
  keyName: string,
  defaultValue: string | null
): [string | null, (val: string | null) => void] => {
  const [storedValue, setStoredValue] = useState<string | null>(() => {
    try {
      const cookie = Cookies.get(keyName);
      return cookie ?? defaultValue;
    } catch (err) {
      console.error("Failed to read cookie:", err);
      return defaultValue;
    }
  });

  const setValue = (newValue: string | null) => {
    try {
      if (newValue === null) {
        Cookies.remove(keyName);
      } else {
        Cookies.set(keyName, newValue, { expires: 7 });
      }
      setStoredValue(newValue);
    } catch (err) {
      console.error("Failed to set cookie:", err);
    }
  };

  return [storedValue, setValue];
};

