import 'react';

interface ReIconElementProps extends React.HTMLAttributes<HTMLElement> {
  icon?: string;
  weight?: string;
  size?: number | string;
  color?: string;
  class?: string;
  style?: React.CSSProperties;
}

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      're-icon': ReIconElementProps;
    }
  }
}

declare module 'react/jsx-runtime' {
  namespace JSX {
    interface IntrinsicElements {
      're-icon': ReIconElementProps;
    }
  }
}

declare global {
  namespace React {
    namespace JSX {
      interface IntrinsicElements {
        're-icon': ReIconElementProps;
      }
    }
  }
  namespace JSX {
    interface IntrinsicElements {
      're-icon': ReIconElementProps;
    }
  }

  interface Window {
    Reicon?: {
      icons: string[];
      categories: string[];
      ready: Promise<void>;
      preload: (names: string[]) => void;
      categoryOf: (name: string) => string | null;
      categoryMap: Record<string, string>;
      /** Returns the GitHub username of the contributor who designed this icon, or null if it's a core icon. */
      contributorOf: (name: string) => string | null;
    };
  }
}

export {};
