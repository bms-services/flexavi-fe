import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import i18n from "@/lib/i18n";
// import { useUser } from "./use-user";

export function useLocalization() {
  // const { user } = useUser();
  const [currentLocal, setCurrentLocal] = useState<string>(i18n.language);

  const localFromCookie = Cookies.get("local");
  const defaultLocal = import.meta.env.VITE_LOCAL as string;
  // const userLocal = user?.language;

  useEffect(() => {
    if (localFromCookie) {
      i18n.changeLanguage(localFromCookie);
      setCurrentLocal(localFromCookie);
    }
    // else if (userLocal) {
    //   i18n.changeLanguage(userLocal);
    //   setCurrentLocal(userLocal);
    // }
    else {
      i18n.changeLanguage(defaultLocal);
      setCurrentLocal(defaultLocal);
    }

    if (!localFromCookie) {
      Cookies.set("local", currentLocal, { expires: 365 });
    }
  }, [localFromCookie, defaultLocal]);

  const onChangeLocal = () => {
    const newLang = currentLocal === "en" ? "nl" : "en";
    i18n.changeLanguage(newLang);
    Cookies.set("local", newLang, { expires: 365 });
    setCurrentLocal(newLang);
  };

  return { currentLocal, onChangeLocal };
}
