/** @type {import("prettier").Config} */
const config = {
  trailingComma: "all",
  semi: true,
  singleQuote: false,
  printWidth: 80,

  // Values used from .editorconfig:
  //   - printWidth == max_line_length
  //   - tabWidth == indent_size
  //   - useTabs == indent_style
  //   - endOfLine == end_of_line
};

export default config;