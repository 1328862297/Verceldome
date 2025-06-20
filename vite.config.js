import {
  defineConfig
} from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

import {
  resolve
} from 'path'
// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), tailwindcss()],
  assetsInclude: ['**/*.docx', '**/*.pdf', '**/*.doc'],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src') // 将@映射到src目录  
      // 你还可以添加其他别名，例如：'@components': resolve(__dirname, './src/components')  
    }
  },
  server:{
    host: "0.0.0.0",   // 解决控制台： NextWork：use --host to expose
    port: 8081,
    hmr: true,  // 开启热更新
    open: true,  // 启动在浏览器打开
 
  },
})