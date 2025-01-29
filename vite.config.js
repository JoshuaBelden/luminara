import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      src: '/src',
      components: '/src/components',
      modules: '/src/modules',
      assets: '/src/assets',
      lib: '/src/lib',
      data: '/src/data',
    },
  },
});
