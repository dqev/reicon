import 'react';

interface ReIconElementProps extends React.HTMLAttributes<HTMLElement> {
  icon?: string;
  weight?: string;
  size?: number | string;
  color?: string;
  class?: string;
}

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      're-icon': React.DetailedHTMLProps<ReIconElementProps, HTMLElement>;
    }
  }
}

declare module 'react/jsx-runtime' {
  namespace JSX {
    interface IntrinsicElements {
      're-icon': React.DetailedHTMLProps<ReIconElementProps, HTMLElement>;
    }
  }
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      're-icon': React.DetailedHTMLProps<ReIconElementProps, HTMLElement>;
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
    };
  }
}

export {};
