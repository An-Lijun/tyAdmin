// vite.config.ts
import { defineConfig } from "file:///C:/Users/19213/Desktop/openSource/packages/tyAdmin/node_modules/.pnpm/vite@5.4.14_@types+node@22.13.1_sass@1.84.0_terser@5.38.0/node_modules/vite/dist/node/index.js";
import { resolve } from "path";

// config/vitePlugin.ts
import vue from "file:///C:/Users/19213/Desktop/openSource/packages/tyAdmin/node_modules/.pnpm/@vitejs+plugin-vue@5.2.1_vite@5.4.14_@types+node@22.13.1_sass@1.84.0_terser@5.38.0__vue@3.5.13_typescript@5.7.3_/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import { createHtmlPlugin } from "file:///C:/Users/19213/Desktop/openSource/packages/tyAdmin/node_modules/.pnpm/vite-plugin-html@3.2.2_vite@5.4.14_@types+node@22.13.1_sass@1.84.0_terser@5.38.0_/node_modules/vite-plugin-html/dist/index.mjs";
function createPlugins(isBuild, env) {
  const plugins = [vue()];
  plugins.push(
    createHtmlPlugin({
      // 生成html模板
      minify: true,
      entry: "src/main.ts",
      template: "./index.html"
    })
  );
  return plugins;
}

// vite.config.ts
var __vite_injected_original_dirname = "C:\\Users\\19213\\Desktop\\openSource\\packages\\tyAdmin";
var vite_config_default = defineConfig(({ command, mode, ssrBuild }) => {
  return {
    build: {
      rollupOptions: {
        input: {
          index: resolve(__vite_injected_original_dirname, "src/i.html")
        }
      }
    },
    resolve: {
      // 路径别名
      alias: [
        // @/xxxx => src/xxxx
        {
          find: "@",
          replacement: resolve(__vite_injected_original_dirname, "src")
        }
      ]
    },
    css: {
      // postcss 配置
      postcss: {
        plugins: [
          // autoprefixer,//自动加浏览器前缀
        ]
      }
    },
    server: {
      // host:'0.0.0.0' ,//ip地址
      port: 80,
      // 设置服务启动端口号
      open: true,
      // 设置服务启动时是否自动打开浏览器
      proxy: {
        // 本地开发环境通过代理access接口
        "/api": {
          target: "http://127.0.0.1:3661",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, "")
        }
      }
    },
    plugins: createPlugins(true, {})
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAiY29uZmlnL3ZpdGVQbHVnaW4udHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFwxOTIxM1xcXFxEZXNrdG9wXFxcXG9wZW5Tb3VyY2VcXFxccGFja2FnZXNcXFxcdHlBZG1pblwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcMTkyMTNcXFxcRGVza3RvcFxcXFxvcGVuU291cmNlXFxcXHBhY2thZ2VzXFxcXHR5QWRtaW5cXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzLzE5MjEzL0Rlc2t0b3Avb3BlblNvdXJjZS9wYWNrYWdlcy90eUFkbWluL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcbmltcG9ydCB7IHJlc29sdmUgfSBmcm9tICdwYXRoJ1xuIGltcG9ydCBjcmVhdGVQbHVnaW5zIGZyb20gJy4vY29uZmlnL3ZpdGVQbHVnaW4nO1xuXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKCh7IGNvbW1hbmQsIG1vZGUsIHNzckJ1aWxkIH0pPT57XG4gIHJldHVybntcbiAgICBidWlsZDp7XG4gICAgICByb2xsdXBPcHRpb25zOntcbiAgICAgICAgaW5wdXQ6e1xuICAgICAgICAgIGluZGV4OnJlc29sdmUoX19kaXJuYW1lLCdzcmMvaS5odG1sJylcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICB9LFxuICAgIHJlc29sdmU6IHtcbiAgICAgIC8vIFx1OERFRlx1NUY4NFx1NTIyQlx1NTQwRFxuICAgICAgYWxpYXM6IFtcbiAgICAgICAgLy8gQC94eHh4ID0+IHNyYy94eHh4XG4gICAgICAgIHtcbiAgICAgICAgICBmaW5kOiAnQCcsXG4gICAgICAgICAgcmVwbGFjZW1lbnQ6IHJlc29sdmUoX19kaXJuYW1lLCAnc3JjJyksXG4gICAgICAgIH0sXG4gICAgICBdLFxuICAgIH0sXG4gICAgY3NzOiB7XG4gICAgICAvLyBwb3N0Y3NzIFx1OTE0RFx1N0Y2RVxuICAgICAgcG9zdGNzczoge1xuICAgICAgICBwbHVnaW5zOiBbXG4gICAgICAgICAgLy8gYXV0b3ByZWZpeGVyLC8vXHU4MUVBXHU1MkE4XHU1MkEwXHU2RDRGXHU4OUM4XHU1NjY4XHU1MjREXHU3RjAwXG4gICAgICAgIF1cbiAgICAgIH1cbiAgICB9LFxuICAgIHNlcnZlcjp7XG4gICAgICAvLyBob3N0OicwLjAuMC4wJyAsLy9pcFx1NTczMFx1NTc0MFxuICAgICAgcG9ydDogODAsIC8vIFx1OEJCRVx1N0Y2RVx1NjcwRFx1NTJBMVx1NTQyRlx1NTJBOFx1N0FFRlx1NTNFM1x1NTNGN1xuICAgICAgb3BlbjogdHJ1ZSwgLy8gXHU4QkJFXHU3RjZFXHU2NzBEXHU1MkExXHU1NDJGXHU1MkE4XHU2NUY2XHU2NjJGXHU1NDI2XHU4MUVBXHU1MkE4XHU2MjUzXHU1RjAwXHU2RDRGXHU4OUM4XHU1NjY4XG4gICAgICBwcm94eTp7XG4gICAgICAgIC8vIFx1NjcyQ1x1NTczMFx1NUYwMFx1NTNEMVx1NzNBRlx1NTg4M1x1OTAxQVx1OEZDN1x1NEVFM1x1NzQwNmFjY2Vzc1x1NjNBNVx1NTNFM1xuICAgICAgICAnL2FwaSc6IHtcbiAgICAgICAgICB0YXJnZXQ6ICdodHRwOi8vMTI3LjAuMC4xOjM2NjEnLFxuICAgICAgICAgIGNoYW5nZU9yaWdpbjogdHJ1ZSxcbiAgICAgICAgICByZXdyaXRlOiAocGF0aCkgPT4gcGF0aC5yZXBsYWNlKC9eXFwvYXBpLywgJycpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIHBsdWdpbnM6IGNyZWF0ZVBsdWdpbnModHJ1ZSx7fSlcbiAgfVxufSlcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcMTkyMTNcXFxcRGVza3RvcFxcXFxvcGVuU291cmNlXFxcXHBhY2thZ2VzXFxcXHR5QWRtaW5cXFxcY29uZmlnXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFwxOTIxM1xcXFxEZXNrdG9wXFxcXG9wZW5Tb3VyY2VcXFxccGFja2FnZXNcXFxcdHlBZG1pblxcXFxjb25maWdcXFxcdml0ZVBsdWdpbi50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvMTkyMTMvRGVza3RvcC9vcGVuU291cmNlL3BhY2thZ2VzL3R5QWRtaW4vY29uZmlnL3ZpdGVQbHVnaW4udHNcIjtpbXBvcnQgdnVlIGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZSdcclxuaW1wb3J0IHsgY3JlYXRlSHRtbFBsdWdpbiB9IGZyb20gJ3ZpdGUtcGx1Z2luLWh0bWwnXHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjcmVhdGVQbHVnaW5zKGlzQnVpbGQ6IGJvb2xlYW4sIGVudjogYW55KTpBcnJheTxhbnk+e1xyXG4gIFxyXG4gIGNvbnN0IHBsdWdpbnM6IGFueVtdID0gW3Z1ZSgpXVxyXG5cclxuICBwbHVnaW5zLnB1c2goXHJcbiAgICBjcmVhdGVIdG1sUGx1Z2luKHtcclxuICAgICAgLy8gXHU3NTFGXHU2MjEwaHRtbFx1NkEyMVx1Njc3RlxyXG4gICAgICBtaW5pZnk6IHRydWUsXHJcbiAgICAgIGVudHJ5OiAnc3JjL21haW4udHMnLFxyXG4gICAgICB0ZW1wbGF0ZTogJy4vaW5kZXguaHRtbCcsXHJcbiAgICB9KVxyXG4gIClcclxuXHJcbiAgcmV0dXJuIHBsdWdpbnM7XHJcbn0iXSwKICAibWFwcGluZ3MiOiAiO0FBQXNWLFNBQVMsb0JBQW9CO0FBQ25YLFNBQVMsZUFBZTs7O0FDRG1WLE9BQU8sU0FBUztBQUMzWCxTQUFTLHdCQUF3QjtBQUVsQixTQUFSLGNBQStCLFNBQWtCLEtBQW9CO0FBRTFFLFFBQU0sVUFBaUIsQ0FBQyxJQUFJLENBQUM7QUFFN0IsVUFBUTtBQUFBLElBQ04saUJBQWlCO0FBQUE7QUFBQSxNQUVmLFFBQVE7QUFBQSxNQUNSLE9BQU87QUFBQSxNQUNQLFVBQVU7QUFBQSxJQUNaLENBQUM7QUFBQSxFQUNIO0FBRUEsU0FBTztBQUNUOzs7QURqQkEsSUFBTSxtQ0FBbUM7QUFLekMsSUFBTyxzQkFBUSxhQUFhLENBQUMsRUFBRSxTQUFTLE1BQU0sU0FBUyxNQUFJO0FBQ3pELFNBQU07QUFBQSxJQUNKLE9BQU07QUFBQSxNQUNKLGVBQWM7QUFBQSxRQUNaLE9BQU07QUFBQSxVQUNKLE9BQU0sUUFBUSxrQ0FBVSxZQUFZO0FBQUEsUUFDdEM7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLElBQ0EsU0FBUztBQUFBO0FBQUEsTUFFUCxPQUFPO0FBQUE7QUFBQSxRQUVMO0FBQUEsVUFDRSxNQUFNO0FBQUEsVUFDTixhQUFhLFFBQVEsa0NBQVcsS0FBSztBQUFBLFFBQ3ZDO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxJQUNBLEtBQUs7QUFBQTtBQUFBLE1BRUgsU0FBUztBQUFBLFFBQ1AsU0FBUztBQUFBO0FBQUEsUUFFVDtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsSUFDQSxRQUFPO0FBQUE7QUFBQSxNQUVMLE1BQU07QUFBQTtBQUFBLE1BQ04sTUFBTTtBQUFBO0FBQUEsTUFDTixPQUFNO0FBQUE7QUFBQSxRQUVKLFFBQVE7QUFBQSxVQUNOLFFBQVE7QUFBQSxVQUNSLGNBQWM7QUFBQSxVQUNkLFNBQVMsQ0FBQyxTQUFTLEtBQUssUUFBUSxVQUFVLEVBQUU7QUFBQSxRQUM5QztBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsSUFDQSxTQUFTLGNBQWMsTUFBSyxDQUFDLENBQUM7QUFBQSxFQUNoQztBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
