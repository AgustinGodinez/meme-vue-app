import { defineConfig } from 'vite'
import {resolve} from 'path';
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base:'/meme-vue-app/',
  resolve:{
    alias:{
      '@': resolve(__dirname, '/src')
    }
  }
})
