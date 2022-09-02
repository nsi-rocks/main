// docs/.vuepress/config.ts
import { defineUserConfig } from "vuepress";

// docs/.vuepress/configs/navbar.ts
var navbar = [
  {
    text: "Guide",
    link: "/snt/"
  }
];

// docs/.vuepress/configs/sidebar.ts
var sidebar = {
  "/": [
    {
      text: "SNT",
      children: ["/snt/README.md"]
    }
  ],
  "/snt/": [
    {
      text: "FICHES MEMO",
      children: ["/snt/rsociaux.md"]
    },
    {
      text: "ACTIVIT\xC9S",
      children: ["/snt/rsociaux-acti.md"]
    }
  ],
  "/nsi-1ere": [
    {
      text: "NSI",
      children: [
        "/nsi-1ere/mdrrrr.md",
        "/nsi-1ere/youyou.md",
        "/nsi-1ere/README.md"
      ]
    }
  ]
};

// docs/.vuepress/config.ts
import { defaultTheme } from "@vuepress/theme-default";
import { path } from "@vuepress/utils";
import { registerComponentsPlugin } from "@vuepress/plugin-register-components";
import vue from "@vitejs/plugin-vue";
import anchor from "vuepress-plugin-anchor-toc";
var __vite_injected_original_dirname = "/home/mathieu/nsi/docs/.vuepress";
var config_default = defineUserConfig({
  lang: "fr-FR",
  title: "Hello VuePress",
  description: "Just playing around",
  locales: {
    "/": {
      lang: "fr-FR",
      title: "Glouglou",
      description: "Gloubiboulga"
    }
  },
  theme: defaultTheme({
    docsDir: "docs",
    locales: {
      "/": {
        navbar,
        sidebar,
        sidebarDepth: 4
      }
    }
  }),
  plugins: [
    [
      registerComponentsPlugin({
        componentsDir: path.resolve(__vite_injected_original_dirname, "./components")
      }),
      vue(),
      anchor
    ]
  ]
});
export {
  config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZG9jcy8udnVlcHJlc3MvY29uZmlnLnRzIiwgImRvY3MvLnZ1ZXByZXNzL2NvbmZpZ3MvbmF2YmFyLnRzIiwgImRvY3MvLnZ1ZXByZXNzL2NvbmZpZ3Mvc2lkZWJhci50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9ob21lL21hdGhpZXUvbnNpL2RvY3MvLnZ1ZXByZXNzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvaG9tZS9tYXRoaWV1L25zaS9kb2NzLy52dWVwcmVzcy9jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL2hvbWUvbWF0aGlldS9uc2kvZG9jcy8udnVlcHJlc3MvY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lVXNlckNvbmZpZyB9IGZyb20gJ3Z1ZXByZXNzJztcbmltcG9ydCB7IGhlYWQsIHNpZGViYXIsIG5hdmJhciB9IGZyb20gJy4vY29uZmlncy9pbmRleCc7XG5pbXBvcnQgeyBkZWZhdWx0VGhlbWUgfSBmcm9tICdAdnVlcHJlc3MvdGhlbWUtZGVmYXVsdCc7XG5pbXBvcnQgeyBwYXRoIH0gZnJvbSAnQHZ1ZXByZXNzL3V0aWxzJztcbmltcG9ydCB7IHJlZ2lzdGVyQ29tcG9uZW50c1BsdWdpbiB9IGZyb20gJ0B2dWVwcmVzcy9wbHVnaW4tcmVnaXN0ZXItY29tcG9uZW50cyc7XG5pbXBvcnQgdnVlIGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZSc7XG5pbXBvcnQgYW5jaG9yIGZyb20gJ3Z1ZXByZXNzLXBsdWdpbi1hbmNob3ItdG9jJztcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lVXNlckNvbmZpZyh7XG4gIGxhbmc6ICdmci1GUicsXG4gIHRpdGxlOiAnSGVsbG8gVnVlUHJlc3MnLFxuICBkZXNjcmlwdGlvbjogJ0p1c3QgcGxheWluZyBhcm91bmQnLFxuICBsb2NhbGVzOiB7XG4gICAgJy8nOiB7XG4gICAgICBsYW5nOiAnZnItRlInLFxuICAgICAgdGl0bGU6ICdHbG91Z2xvdScsXG4gICAgICBkZXNjcmlwdGlvbjogJ0dsb3ViaWJvdWxnYScsXG4gICAgfSxcbiAgfSxcbiAgdGhlbWU6IGRlZmF1bHRUaGVtZSh7XG4gICAgZG9jc0RpcjogJ2RvY3MnLFxuICAgIGxvY2FsZXM6IHtcbiAgICAgICcvJzoge1xuICAgICAgICBuYXZiYXI6IG5hdmJhcixcbiAgICAgICAgc2lkZWJhcjogc2lkZWJhcixcbiAgICAgICAgc2lkZWJhckRlcHRoOiA0LFxuICAgICAgfSxcbiAgICB9LFxuICB9KSxcbiAgcGx1Z2luczogW1xuICAgIFtcbiAgICAgIHJlZ2lzdGVyQ29tcG9uZW50c1BsdWdpbih7XG4gICAgICAgIGNvbXBvbmVudHNEaXI6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuL2NvbXBvbmVudHMnKSxcbiAgICAgIH0pLFxuICAgICAgdnVlKCksXG4gICAgICBhbmNob3IsXG4gICAgXSxcbiAgXSxcbn0pO1xuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9tYXRoaWV1L25zaS9kb2NzLy52dWVwcmVzcy9jb25maWdzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvaG9tZS9tYXRoaWV1L25zaS9kb2NzLy52dWVwcmVzcy9jb25maWdzL25hdmJhci50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vaG9tZS9tYXRoaWV1L25zaS9kb2NzLy52dWVwcmVzcy9jb25maWdzL25hdmJhci50c1wiO2ltcG9ydCB0eXBlIHsgTmF2YmFyQ29uZmlnIH0gZnJvbSBcIkB2dWVwcmVzcy90aGVtZS1kZWZhdWx0XCI7XG5cbi8vIGNmIGdpdGh1YiA6IGh0dHBzOi8vZ2l0aHViLmNvbS92dWVwcmVzcy92dWVwcmVzcy1uZXh0L2Jsb2IvbWFpbi9kb2NzLy52dWVwcmVzcy9jb25maWdzL25hdmJhci9lbi50c1xuXG5leHBvcnQgY29uc3QgbmF2YmFyOiBOYXZiYXJDb25maWcgPSBbXG4gIHtcbiAgICB0ZXh0OiBcIkd1aWRlXCIsXG4gICAgbGluazogXCIvc250L1wiLFxuICB9LFxuXTtcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL2hvbWUvbWF0aGlldS9uc2kvZG9jcy8udnVlcHJlc3MvY29uZmlnc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL2hvbWUvbWF0aGlldS9uc2kvZG9jcy8udnVlcHJlc3MvY29uZmlncy9zaWRlYmFyLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9ob21lL21hdGhpZXUvbnNpL2RvY3MvLnZ1ZXByZXNzL2NvbmZpZ3Mvc2lkZWJhci50c1wiO2ltcG9ydCB0eXBlIHsgU2lkZWJhckNvbmZpZyB9IGZyb20gJ0B2dWVwcmVzcy90aGVtZS1kZWZhdWx0JztcblxuLy9jZiBnaXRodWIgOiBodHRwczovL2dpdGh1Yi5jb20vdnVlcHJlc3MvdnVlcHJlc3MtbmV4dC9ibG9iL21haW4vZG9jcy8udnVlcHJlc3MvY29uZmlncy9zaWRlYmFyL2VuLnRzXG5cbmV4cG9ydCBjb25zdCBzaWRlYmFyOiBTaWRlYmFyQ29uZmlnID0ge1xuICAnLyc6IFtcbiAgICB7XG4gICAgICB0ZXh0OiAnU05UJyxcbiAgICAgIGNoaWxkcmVuOiBbJy9zbnQvUkVBRE1FLm1kJ10sXG4gICAgfSxcbiAgXSxcbiAgJy9zbnQvJzogW1xuICAgIHtcbiAgICAgIHRleHQ6ICdGSUNIRVMgTUVNTycsXG4gICAgICBjaGlsZHJlbjogWycvc250L3Jzb2NpYXV4Lm1kJ10sXG4gICAgfSxcbiAgICB7XG4gICAgICB0ZXh0OiAnQUNUSVZJVFx1MDBDOVMnLFxuICAgICAgY2hpbGRyZW46IFsnL3NudC9yc29jaWF1eC1hY3RpLm1kJ10sXG4gICAgfSxcbiAgXSxcbiAgJy9uc2ktMWVyZSc6IFtcbiAgICB7XG4gICAgICB0ZXh0OiAnTlNJJyxcbiAgICAgIGNoaWxkcmVuOiBbXG4gICAgICAgICcvbnNpLTFlcmUvbWRycnJyLm1kJyxcbiAgICAgICAgJy9uc2ktMWVyZS95b3V5b3UubWQnLFxuICAgICAgICAnL25zaS0xZXJlL1JFQURNRS5tZCcsXG4gICAgICBdLFxuICAgIH0sXG4gIF0sXG59O1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUF3USxTQUFTLHdCQUF3Qjs7O0FDSWxTLElBQU0sU0FBdUI7QUFBQSxFQUNsQztBQUFBLElBQ0UsTUFBTTtBQUFBLElBQ04sTUFBTTtBQUFBLEVBQ1I7QUFDRjs7O0FDTE8sSUFBTSxVQUF5QjtBQUFBLEVBQ3BDLEtBQUs7QUFBQSxJQUNIO0FBQUEsTUFDRSxNQUFNO0FBQUEsTUFDTixVQUFVLENBQUMsZ0JBQWdCO0FBQUEsSUFDN0I7QUFBQSxFQUNGO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUDtBQUFBLE1BQ0UsTUFBTTtBQUFBLE1BQ04sVUFBVSxDQUFDLGtCQUFrQjtBQUFBLElBQy9CO0FBQUEsSUFDQTtBQUFBLE1BQ0UsTUFBTTtBQUFBLE1BQ04sVUFBVSxDQUFDLHVCQUF1QjtBQUFBLElBQ3BDO0FBQUEsRUFDRjtBQUFBLEVBQ0EsYUFBYTtBQUFBLElBQ1g7QUFBQSxNQUNFLE1BQU07QUFBQSxNQUNOLFVBQVU7QUFBQSxRQUNSO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRjs7O0FGN0JBLFNBQVMsb0JBQW9CO0FBQzdCLFNBQVMsWUFBWTtBQUNyQixTQUFTLGdDQUFnQztBQUN6QyxPQUFPLFNBQVM7QUFDaEIsT0FBTyxZQUFZO0FBTm5CLElBQU0sbUNBQW1DO0FBUXpDLElBQU8saUJBQVEsaUJBQWlCO0FBQUEsRUFDOUIsTUFBTTtBQUFBLEVBQ04sT0FBTztBQUFBLEVBQ1AsYUFBYTtBQUFBLEVBQ2IsU0FBUztBQUFBLElBQ1AsS0FBSztBQUFBLE1BQ0gsTUFBTTtBQUFBLE1BQ04sT0FBTztBQUFBLE1BQ1AsYUFBYTtBQUFBLElBQ2Y7QUFBQSxFQUNGO0FBQUEsRUFDQSxPQUFPLGFBQWE7QUFBQSxJQUNsQixTQUFTO0FBQUEsSUFDVCxTQUFTO0FBQUEsTUFDUCxLQUFLO0FBQUEsUUFDSDtBQUFBLFFBQ0E7QUFBQSxRQUNBLGNBQWM7QUFBQSxNQUNoQjtBQUFBLElBQ0Y7QUFBQSxFQUNGLENBQUM7QUFBQSxFQUNELFNBQVM7QUFBQSxJQUNQO0FBQUEsTUFDRSx5QkFBeUI7QUFBQSxRQUN2QixlQUFlLEtBQUssUUFBUSxrQ0FBVyxjQUFjO0FBQUEsTUFDdkQsQ0FBQztBQUFBLE1BQ0QsSUFBSTtBQUFBLE1BQ0o7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
