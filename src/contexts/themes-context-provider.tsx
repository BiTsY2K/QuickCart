"use client";
import * as React from "react";

interface ValueObject { [themeName: string]: string }
type DataAttribute = `data-${string}`;

interface ScriptProps extends React.DetailedHTMLProps<
  React.ScriptHTMLAttributes<HTMLScriptElement>,
  HTMLScriptElement
> { [dataAttribute: DataAttribute]: any }

type Attribute = DataAttribute | 'class';


interface UseThemeProps {
  theme?: string | undefined; /** Active theme name */
  setTheme: React.Dispatch<React.SetStateAction<string>>; /** Update the theme */
  themes: string[]; /** List of all available theme names */
  forcedTheme?: string | undefined; /** Forced theme name for the current page */

  // If `enableSystem` is true and the active theme is "system", 
  // this returns whether the system preference resolved to "dark" or "light". 
  // Otherwise, identical to `theme` 
  resolvedTheme?: string | undefined;

  // If enableSystem is true, returns the System theme preference ("dark" or "light"), 
  // regardless what the active theme is
  systemTheme?: 'dark' | 'light' | undefined;
}

interface ThemeProviderProps extends React.PropsWithChildren {
  themes?: string[] | undefined; /** List of all available theme names */
  forcedTheme?: string | undefined; /** Forced theme name for the current page */
  enableSystem?: boolean | undefined; /** Whether to switch between dark and light themes based on prefers-color-scheme */
  disableTransitionOnChange?: boolean | undefined;  /** Disable all CSS transitions when switching themes */
  storageKey?: string | undefined;  /** Key used to store theme setting in localStorage */

  // Whether to indicate to browsers which color scheme is used (dark or light) 
  // for built-in UI like inputs and buttons
  enableColorScheme?: boolean | undefined;

  // Default theme name (for v0.0.12 and lower the default was light).
  defaultTheme?: string | undefined;  // If `enableSystem` is false, the default theme is light

  // HTML attribute modified based on the active theme.
  // Accepts `class`, `data-*` (meaning any data attribute, `data-mode`, `data-color`, etc.), 
  // or an array which could include both */
  attribute?: Attribute | Attribute[] | undefined;

  // Mapping of theme name to HTML attribute value. 
  // Object where key is the theme name and value is the attribute value 
  value?: ValueObject | undefined;

  nonce?: string; /** Nonce string to pass to the inline script and style elements for CSP headers */
  scriptProps?: ScriptProps;  /** Props to pass the inline script */
}


const DEFAULT_THEMES = ["light", "dark"];
const DARK_MODE_QUERY = "(prefers-color-scheme: dark)";
const IS_SERVER = (typeof window === "undefined");

// Function to disable CSS transitions temporarily
const createTransitionDisabler = (nonce: string) => {
  let style = document.createElement("style");
  if (nonce) style.setAttribute("nonce", nonce);

  style.appendChild(document.createTextNode(
    `*, *::before, *::after {
      -webkit-transition: none !important; -moz-transition: none !important; -o-transition: none !important; 
      -ms-transition: none !important; transition: none!important
    }`
  ));

  document.head.appendChild(style);
  return () => {
    window?.getComputedStyle(document.body);
    setTimeout(() => { document.head.contains(style) && document.head.removeChild(style) }, 1);
  };
};

// Function to get stored theme...
const getStoredTheme = (storageKey: string, defaultTheme: string): string => {
  if (typeof window === "undefined") return defaultTheme;
  const storedTheme = localStorage.getItem(storageKey);
  return storedTheme || defaultTheme;
};

// Function to Get system theme preference...
const getSystemTheme = (mediaQuery?: MediaQueryList): 'dark' | 'light' => {
  if (typeof window === "undefined") return 'light';
  if (!mediaQuery) mediaQuery = window.matchMedia(DARK_MODE_QUERY);
  return mediaQuery.matches ? "dark" : "light";
};


// Main ThemeProvider implementation..
const InternalThemeProvider = ({
  value,
  nonce,
  children,
  scriptProps,
  forcedTheme,
  storageKey = "theme",
  attribute = "data-theme",
  enableSystem = true,
  disableTransitionOnChange = false,
  enableColorScheme = true,
  themes = DEFAULT_THEMES,
  defaultTheme = enableSystem ? "system" : "light",
}: ThemeProviderProps) => {
  const [theme, setThemeState] = React.useState(() => getStoredTheme(storageKey, defaultTheme));  // State for current theme
  const [resolvedTheme, setResolvedTheme] = React.useState(() => theme === "system" ? getSystemTheme() : theme);  // State for resolved theme (system resolved to actual theme)

  const themeValues = value ? Object.values(value) : themes;
  // let themeValues = isClass && value ? themes?.map(theme => value[theme] || theme) : themes;

  // Function to apply theme changes
  const applyThemeChange = React.useCallback((newTheme: string | undefined) => {
    const resolvedTheme = (newTheme === "system" && enableSystem) ? getSystemTheme() : newTheme;
    if (!resolvedTheme) return;

    const themeValue = value ? value[resolvedTheme] : resolvedTheme;
    const documentElement = document.documentElement;

    // Apply theme to Document Object Model...
    (Array.isArray(attribute) ? attribute : [attribute]).forEach((attr: Attribute | undefined) => {
      const isAttributeAClass = attr === "class";
      const themeValues = isAttributeAClass && value ? Object.values(value) : themes;

      if (isAttributeAClass) {
        // class-based theming... //
        documentElement.classList.remove(...themeValues);
        documentElement.classList.add(themeValue);
      } else { documentElement.setAttribute(attr as string, themeValue); /* data attribute theming */ }
    });

    // Set CSS color-scheme property...
    if (enableColorScheme) {
      const colorScheme = DEFAULT_THEMES.includes(defaultTheme) ? defaultTheme : '';
      documentElement.style.colorScheme = DEFAULT_THEMES.includes(resolvedTheme) ? resolvedTheme : colorScheme;
    }

    // Re-enable transitions...
    const disableTransitions = nonce && (disableTransitionOnChange ? createTransitionDisabler(nonce) : null);
    if (disableTransitions) disableTransitions();
  }, [nonce]);

  // Function to update theme...
  const setTheme = React.useCallback((newTheme: string | ((prevTheme: string) => string)): void => {
    const themeValue = typeof newTheme === "function" ? newTheme(theme || defaultTheme) : newTheme;
    setThemeState(themeValue);
    try {
      localStorage.setItem(storageKey, themeValue);
    } catch (error) {
      // Handle localStorage errors...
      console.warn("Failed to save theme to localStorage:", error);
    }
  }, [theme, storageKey, defaultTheme]);

  // Handle system theme changes...
  const handleSystemThemeChange = React.useCallback((mediaQuery: any) => {
    const systemTheme = getSystemTheme(mediaQuery);
    setResolvedTheme(systemTheme);
    if (theme === 'system' && enableSystem && !forcedTheme) applyThemeChange('system');
  }, [theme, enableSystem, forcedTheme]);

  // Listen for system theme changes...
  React.useEffect(() => {
    const mediaQuery = window.matchMedia(DARK_MODE_QUERY);
    handleSystemThemeChange(mediaQuery);

    mediaQuery.addEventListener('change', handleSystemThemeChange);
    return () => mediaQuery.removeEventListener('change', handleSystemThemeChange);
  }, [handleSystemThemeChange]);

  // Listen for localStorage changes (sync across tabs)
  React.useEffect(() => {
    if (IS_SERVER) return;
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === storageKey) {
        if (event.newValue) {
          setThemeState(event.newValue);
        } else { setTheme(defaultTheme) }
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [setTheme]);

  // Apply theme when it changes
  React.useEffect(() => {
    applyThemeChange((forcedTheme != null) ? forcedTheme : theme);
  }, [forcedTheme, theme]);

  // Context value
  const contextValue = React.useMemo(() => ({
    theme, setTheme, forcedTheme,
    resolvedTheme: (theme === "system") ? resolvedTheme : theme,
    themes: enableSystem ? [...themes, "system"] : themes,
    systemTheme: enableSystem ? (resolvedTheme as 'dark' | 'light') : undefined
  }), [theme, setTheme, forcedTheme, resolvedTheme, enableSystem, themes]);

  return (
    React.createElement(
      ThemeContext.Provider, { value: contextValue },
      React.createElement(ThemeScript, {
        forcedTheme, storageKey, attribute, enableSystem, enableColorScheme,
        defaultTheme, value, themes, nonce, scriptProps
      }),
      children
    )
  );
};


// Script component that prevents flash of wrong theme...
const ThemeScript = React.memo(({
  forcedTheme, storageKey, attribute, enableSystem, enableColorScheme,
  defaultTheme, value, themes, nonce, scriptProps
}: ThemeProviderProps) => {
  // Serialize props for the inline script
  let serializedProps = JSON.stringify([
    forcedTheme, storageKey, attribute, enableSystem, enableColorScheme,
    defaultTheme, value, themes
  ]).slice(1, -1); // Remove outer brackets

  return (
    React.createElement("script", {
      ...scriptProps,
      suppressHydrationWarning: true,
      nonce: (typeof window === "undefined") ? nonce : "",
      dangerouslySetInnerHTML: {
        __html: `(${InternalThemeProvider.toString()})(${serializedProps})`
      }
    })
  );
});
ThemeScript.displayName = 'ThemeScript';

// React Context for theme state..
const ThemeContext = React.createContext<UseThemeProps | undefined>(undefined);
ThemeContext.displayName = 'ThemeContext';

const useTheme = (): UseThemeProps => {
  const context = React.useContext(ThemeContext);
  if (context === undefined)
    throw new Error('useTheme_context must be used within a ThemeProvider');
  return context;
}

const ThemeProvider = (props: (React.Attributes & ThemeProviderProps) | null | undefined) => {
  return (
    React.useContext(ThemeContext)
      ? React.createElement(React.Fragment, null, props?.children)
      : React.createElement(InternalThemeProvider, { ...props })
  );
}


export {
  ThemeProvider, useTheme,
  type Attribute, type ThemeProviderProps, type UseThemeProps,
};