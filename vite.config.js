import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

const production = !!process.env.ROLLUP_WATCH;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()]
})
