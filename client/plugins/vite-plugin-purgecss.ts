import type { Plugin, Rollup } from "vite";
import { PurgeCSS } from "purgecss";

interface PurgeCSSPluginOptions {
  safelist?: (string | RegExp)[];
}

export function purgeCSSPlugin(options: PurgeCSSPluginOptions = {}): Plugin {
  return {
    name: "vite-plugin-purgecss",
    apply: "build",
    enforce: "post",

    async generateBundle(_, bundle) {
      const jsContent = Object.values(bundle)
        .filter((asset): asset is Rollup.OutputChunk => asset.type === "chunk")
        .map((chunk) => chunk.code)
        .join("\n");

      const htmlContent = Object.values(bundle)
        .filter(
          (asset): asset is Rollup.OutputAsset =>
            asset.type === "asset" && typeof asset.source === "string",
        )
        .filter((asset) => asset.fileName.endsWith(".html"))
        .map((asset) => asset.source as string)
        .join("\n");

      const rawContent = jsContent + "\n" + htmlContent;

      const cssAssets = Object.entries(bundle).filter(
        ([key, asset]) =>
          key.endsWith(".css") &&
          asset.type === "asset" &&
          typeof asset.source === "string",
      ) as [string, Rollup.OutputAsset][];

      for (const [, asset] of cssAssets) {
        const purged = await new PurgeCSS().purge({
          content: [{ raw: rawContent, extension: "js" }],
          css: [{ raw: asset.source as string }],
          safelist: {
            standard: options.safelist ?? [],
            deep: [/^pf-t--/],
          },
        });

        if (purged.length > 0) {
          asset.source = purged[0].css;
        }
      }
    },
  };
}
