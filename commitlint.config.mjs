export default {
  extends: ["@commitlint/config-conventional"],
  rules: {
    // Dependabot generates commit bodies with long URLs that exceed the default 100-char limit
    "body-max-line-length": [0, "always", Infinity],
  },
};
