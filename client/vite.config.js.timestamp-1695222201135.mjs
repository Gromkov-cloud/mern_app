// vite.config.js
import { defineConfig } from "file:///C:/Personal_Data/WEB/mern_app/client/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Personal_Data/WEB/mern_app/client/node_modules/@vitejs/plugin-react/dist/index.mjs";
var vite_config_default = defineConfig((command, mode) => {
  if (mode === "production") {
    return {
      plugins: [react()]
    };
  } else {
    return {
      plugins: [react()],
      server: {
        proxy: {
          "^/api/.*": {
            target: "http://localhost:5000",
            changeOrigin: true,
            rewrite: false
          }
        }
      }
    };
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxQZXJzb25hbF9EYXRhXFxcXFdFQlxcXFxtZXJuX2FwcFxcXFxjbGllbnRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFBlcnNvbmFsX0RhdGFcXFxcV0VCXFxcXG1lcm5fYXBwXFxcXGNsaWVudFxcXFx2aXRlLmNvbmZpZy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovUGVyc29uYWxfRGF0YS9XRUIvbWVybl9hcHAvY2xpZW50L3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCdcblxuXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKChjb21tYW5kLCBtb2RlKSA9PiB7XG4gIGlmIChtb2RlID09PSBcInByb2R1Y3Rpb25cIikge1xuICAgIHJldHVybiB7XG4gICAgICBwbHVnaW5zOiBbcmVhY3QoKV1cbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHBsdWdpbnM6IFtyZWFjdCgpXSxcbiAgICAgIHNlcnZlcjoge1xuICAgICAgICBwcm94eToge1xuICAgICAgICAgICdeL2FwaS8uKic6IHtcbiAgICAgICAgICAgIHRhcmdldDogXCJodHRwOi8vbG9jYWxob3N0OjUwMDBcIixcbiAgICAgICAgICAgIGNoYW5nZU9yaWdpbjogdHJ1ZSxcbiAgICAgICAgICAgIHJld3JpdGU6IGZhbHNlLFxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxufSlcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBd1MsU0FBUyxvQkFBb0I7QUFDclUsT0FBTyxXQUFXO0FBSWxCLElBQU8sc0JBQVEsYUFBYSxDQUFDLFNBQVMsU0FBUztBQUM3QyxNQUFJLFNBQVMsY0FBYztBQUN6QixXQUFPO0FBQUEsTUFDTCxTQUFTLENBQUMsTUFBTSxDQUFDO0FBQUEsSUFDbkI7QUFBQSxFQUNGLE9BQU87QUFDTCxXQUFPO0FBQUEsTUFDTCxTQUFTLENBQUMsTUFBTSxDQUFDO0FBQUEsTUFDakIsUUFBUTtBQUFBLFFBQ04sT0FBTztBQUFBLFVBQ0wsWUFBWTtBQUFBLFlBQ1YsUUFBUTtBQUFBLFlBQ1IsY0FBYztBQUFBLFlBQ2QsU0FBUztBQUFBLFVBQ1g7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
