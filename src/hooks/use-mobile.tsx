
import * as React from "react"

const MOBILE_BREAKPOINT = 640; // sm breakpoint in Tailwind
const TABLET_BREAKPOINT = 768; // md breakpoint in Tailwind

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined);

  React.useEffect(() => {
    // Initial check
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    
    // Check on mount
    checkIfMobile();
    
    // Listen for resize events
    window.addEventListener("resize", checkIfMobile);
    
    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, []);

  return isMobile;
}

export function useIsTablet() {
  const [isTablet, setIsTablet] = React.useState<boolean | undefined>(undefined);

  React.useEffect(() => {
    const checkIfTablet = () => {
      const width = window.innerWidth;
      setIsTablet(width >= MOBILE_BREAKPOINT && width < TABLET_BREAKPOINT);
    };
    
    checkIfTablet();
    window.addEventListener("resize", checkIfTablet);
    
    return () => {
      window.removeEventListener("resize", checkIfTablet);
    };
  }, []);

  return isTablet;
}

export function useDeviceType() {
  const [deviceType, setDeviceType] = React.useState<"mobile" | "tablet" | "desktop" | undefined>(undefined);

  React.useEffect(() => {
    const checkDeviceType = () => {
      const width = window.innerWidth;
      if (width < MOBILE_BREAKPOINT) {
        setDeviceType("mobile");
      } else if (width < TABLET_BREAKPOINT) {
        setDeviceType("tablet");
      } else {
        setDeviceType("desktop");
      }
    };
    
    checkDeviceType();
    window.addEventListener("resize", checkDeviceType);
    
    return () => {
      window.removeEventListener("resize", checkDeviceType);
    };
  }, []);

  return deviceType;
}
