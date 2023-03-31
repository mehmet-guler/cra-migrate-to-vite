import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import fs from "fs/promises";
import * as fs1 from "fs";

import tsconfigPaths from "vite-tsconfig-paths";
import path, { resolve, parse } from "path";
import envCompatible from "vite-plugin-env-compatible";

const rootPaths = fs1.readdirSync("src").reduce((out, item) => {
  const parsed = parse(item);
  return { ...out, [parsed.name]: resolve("src", item) };
}, {});

export default defineConfig(() => ({
  envPrefix: "REACT_",
  resolve: {
    alias: rootPaths,
  },

  plugins: [react(), tsconfigPaths(), envCompatible()],

  // Server Settings
  // Automatically open the app on server start and port
  server: {
    open: true,
    port: 3000,
  },

  // custom env folder
  envDir: "./src/configs/env",

  // load-js-files-as-jsx
  esbuild: {
    loader: "jsx",
    include: /src\/.*\.jsx?$/,
    exclude: [],
  },
  optimizeDeps: {
    esbuildOptions: {
      plugins: [
        {
          name: "load-js-files-as-jsx",
          setup(build) {
            build.onLoad({ filter: /src\/.*\.js$/ }, async (args) => ({
              loader: "jsx",
              contents: await fs.readFile(args.path, "utf8"),
            }));
          },
        },
      ],
    },
  },
}));

// resolve: {
//   alias: [
//     {
//       find: "./src/",
//       replacement: path.resolve(__dirname, "src/test"),
//     },
//   ],
// },

// resolve: {
//   // alias: [
//   //   {
//   //     find: "@",
//   //     replacement: path.resolve(__dirname, "src"),
//   //   },
//   // ],
//   alias: {
//     "@": path.resolve(__dirname, "src"),
//     // "./src/*": path.resolve(__dirname, "src", "/"),
//     // "@/*": path.resolve(__dirname, "src/"),
//     // "./src/*": path.resolve(__dirname, "src/"),
//     // "~": path.resolve(__dirname, "src"),
//   },
// },

// resolve: {
//   alias: {
//     src: "/",
//   },
//   // alias: {
//   //   src: path.resolve("src/"),

//   // },

//   // alias: [{ find: "@", replacement: "/src" }],
// },
