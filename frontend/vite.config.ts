import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
    // Load env file based on `mode` [development or production] from main directory
    const env = loadEnv(mode, process.cwd(), 'VITE_');

    return {
        plugins: [tailwindcss(), react()],
        define: {
            __APP_ENV__: JSON.stringify(env.APP_ENV),
        },
        envDir: process.cwd(),
    };
  }
)
