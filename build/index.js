import typescriptPlugin from "rollup-plugin-typescript";
import { terser } from "rollup-plugin-terser";
import { rollup } from "rollup";

const isDev = process.env.NODE_ENV === "development";

let config = {
  treeshake: false,
  input: "./src/index.ts",
  
  plugins: [
    typescriptPlugin()
  ].concat(
    isDev
      ? []
      : [terser({
          ie8: true,
          output: {
            comments: false
          },
          compress: {
            unused: false
          },
          mangle: {
            reserved: ["Horses"]
          },
        })
      ]
  ),
  output: {
    file: "lib/index.js",
    format: "es",
    indent: false
  }
};

async function build() {
  const bundle = await rollup({
    ...config
  });

  const { code, map } = await bundle.generate({
    ...config.output
  });
  await bundle.write({
    ...config.output
  });
}

if (!isDev) build();

export default config;