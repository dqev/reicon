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
