'use client';
import { useState, useEffect } from 'react';

function useThemeColors() {
  const [colors, setColors] = useState(getColorsFromCSS());

  useEffect(() => {
    const handleThemeChange = () => {
      setColors(getColorsFromCSS());
    };

    const observer = new MutationObserver(handleThemeChange);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    });

    return () => observer.disconnect();
  }, []);

  return colors;
}

function getColorsFromCSS() {
  const rootStyles = getComputedStyle(document.documentElement);

  return {
    background: rootStyles.getPropertyValue('--background').trim(),
    backgroundAccent: rootStyles.getPropertyValue('--background-accent').trim(),
    foreground: rootStyles.getPropertyValue('--foreground').trim(),
    foregroundAccent: rootStyles.getPropertyValue('--foreground-accent').trim(),
    primary: rootStyles.getPropertyValue('--primary').trim(),
    primarySaturated: rootStyles.getPropertyValue('--primary-saturated').trim(),
    secondary: rootStyles.getPropertyValue('--secondary').trim()
  };
}

export default useThemeColors;
