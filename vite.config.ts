import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import commonjs from 'vite-plugin-commonjs'

// https://vitejs.dev/config/
export default defineConfig({
  root: './test',
  plugins: [commonjs(), vue()],
})
