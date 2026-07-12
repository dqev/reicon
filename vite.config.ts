import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // DISABLE_HMR: set to 'true' when running in AI Studio / headless environments
      // where file-watching triggers unnecessary re-renders. Leave unset (or 'false')
      // during local dev so hot reload works normally.
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});
