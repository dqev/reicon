import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vitest/config';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@docs': path.resolve(__dirname, '../../docs'),
      '@data': path.resolve(__dirname, '../../data'),
      '@scripts': path.resolve(__dirname, '../../scripts'),
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    environment: 'jsdom',
    setupFiles: path.resolve(__dirname, './src/test/setup.ts'),
    include: ['apps/web/src/**/*.test.{ts,tsx}', 'src/**/*.test.{ts,tsx}'],
  },
});
