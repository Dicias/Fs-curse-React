import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { createProxyMiddleware } from 'http-proxy-middleware';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/notes': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        secure: false,
        ws: true,
        onProxyReq: (proxyReq) => {
        
          proxyReq.setHeader('X-Special-Proxy-Header', 'Proxy-Value');
        },
        onProxyRes: (proxyRes) => {
        
        }
      }
    }
  }
});