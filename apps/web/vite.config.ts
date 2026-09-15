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
        '@docs': path.resolve(__dirname, '../../docs'),
        '@data': path.resolve(__dirname, '../../data'),
        '@scripts': path.resolve(__dirname, '../../scripts'),
        '@': path.resolve(__dirname, 'src'),
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
      outDir: path.resolve(__dirname, '../../dist'),
    },
  };
});