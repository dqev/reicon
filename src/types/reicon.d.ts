import 'react';

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      're-icon': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          icon?: string;
          weight?: string;
          size?: number | string;
          color?: string;
        },
        HTMLElement
      >;
    }
  }
}

declare global {
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
