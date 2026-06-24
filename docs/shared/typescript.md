# TypeScript

Reicon packages ship with full TypeScript support and auto-generated declaration files out of the box. All icon components are typed with the following interface structure:

```typescript
interface ReIconProps {
  size?: number | string;
  color?: string;
  weight?: 'Outline' | 'Filled';
  strokeWidth?: number | string;
  secondaryColor?: string;
  className?: string;
}
```
If auto-complete is not showing, restart your editor's TypeScript language server.
