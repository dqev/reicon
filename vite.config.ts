import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig(() => {
  return {
    base: '/',
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      proxy: {
        '/cdn-proxy': {
          target: 'https://cdn.reicon.dev',
          changeOrigin: true,
          rewrite: (p) => p.replace(/^\/cdn-proxy/, ''),
        },
      },
    },
    build: {
      outDir: 'dist',
    },
  };
});