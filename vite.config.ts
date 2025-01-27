import { defineConfig } from 'vite'
import { dirname, join } from 'node:path'
import react from '@vitejs/plugin-react'
import glsl from 'vite-plugin-glsl'

const rootFolder = dirname(import.meta.url)
const srcFolder = join(rootFolder, 'src')

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), glsl({
    include: '**/*.glsl', // Match your shader files
  })],
  resolve: {
    alias: {
      '@/': srcFolder
    }
  },
  assetsInclude: ['**/*.glb', '**/*.fbx'],
})
