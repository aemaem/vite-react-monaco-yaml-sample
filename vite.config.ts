import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react(),
    ],
    build: {
        outDir: 'out',
        emptyOutDir: true,
        sourcemap: false,
        rollupOptions: {
            output: {
                manualChunks: (id) => {
                    if (id.match(/node_modules\//)) {
                        return 'libs'
                    }
                    return null
                },
            },
        },
    },
})
