import { defineConfig } from 'vite';
import path from 'path';
import react from '@vitejs/plugin-react';
import simpleHtmlPlugin from 'vite-plugin-simple-html';

export default defineConfig({
    root: '.',
    build: {
        // Relative to the root
        outDir: './dist',
    },
    plugins: [
        react({
            // Use React plugin in all *.jsx and *.tsx files
            include: '**/*.{jsx,tsx}',
            babel: {},
        }),
        simpleHtmlPlugin({}),
    ],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        }
    },
});