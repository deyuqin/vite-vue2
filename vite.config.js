import { createVuePlugin } from "vite-plugin-vue2";
import { defineConfig, loadEnv } from "vite";
import { resolve } from "path";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  return {
    plugins: [createVuePlugin()],
    resolve: {
      alias: {
        "@": resolve(__dirname, "src"),
        cpns: resolve(__dirname, "src/components"),
        view: resolve(__dirname, "src/view"),
        style: resolve(__dirname, "src/assets/style"),
        assets: resolve(__dirname, "src/assets"),
      },
      extensions: [".js", ".json", ".ts", ".vue"], // 使用路径别名时想要省略的后缀名，可以自己 增减
      server: {
        proxy: {
          "/api": {
            target: env.VITE_APP_API_BASE_URL,
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/api/, ""),
          },
        },
      },
    },
    // css: {
    //   // css预处理器
    //   preprocessorOptions: {
    //     scss: {
    //       // 引入 var.scss 这样就可以在全局中使用 var.scss中预定义的变量了
    //       // 给导入的路径最后加上 ;
    //       additionalData: '@import "./src/assets/scss/var.scss";',
    //     },
    //   },
    // },
  };
});
