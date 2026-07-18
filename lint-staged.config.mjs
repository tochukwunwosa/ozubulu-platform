import path from "node:path";

const buildEslintCommand = (filenames) => {
  const relative = filenames
    .map((f) => path.relative(path.join(process.cwd(), "apps/web"), f))
    .filter((f) => !f.startsWith(".."));

  if (relative.length === 0) return [];

  return [`pnpm --filter web exec eslint --fix ${relative.join(" ")}`];
};

export default {
  "apps/web/**/*.{js,jsx,ts,tsx}": [buildEslintCommand, "prettier --write"],
  "apps/web/**/*.{json,css}": "prettier --write",
  "*.{json,yml,yaml}": "prettier --write",
};
