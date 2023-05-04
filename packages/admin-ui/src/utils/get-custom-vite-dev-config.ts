import react from "@vitejs/plugin-react"
import { resolve } from "path"
import { InlineConfig } from "vite"
import { AdminDevConfig } from "../types/dev"
import { esbuildCommonjs } from "@originjs/vite-plugin-commonjs"

export const getCustomViteDevConfig = ({
  backend = "http://localhost:9000",
  port = 7001,
}: AdminDevConfig): InlineConfig => {
  const uiPath = resolve(__dirname, "..", "..", "ui")

  return {
    plugins: [
      react({
        jsxRuntime: "classic",
      }),
    ],
    define: {
      __BASE__: JSON.stringify("/"),
      __MEDUSA_BACKEND_URL__: JSON.stringify(backend),
    },
    root: uiPath,
    server: {
      port,
    },
    build: {
      commonjsOptions: {
        include: [/node_modules/],
      },
    },
    resolve: {
      alias: {
        "@tanstack/react-query": resolve(
          require.resolve("@tanstack/react-query")
        ),
        react: resolve(require.resolve("react")),
      },
    },
    optimizeDeps: {
      esbuildOptions: {
        plugins: [
          esbuildCommonjs([
            "react-dom",
            "invariant",
            "react-fast-compare",
            "shallowequal",
            "prop-types",
            "axios",
            "qs",
            "react",
          ]),
        ],
      },
      include: [
        "react-dom",
        "invariant",
        "react-fast-compare",
        "shallowequal",
        "prop-types",
        "axios",
        "qs",
        "react",
      ],
      force: true,
    },
  }
}
