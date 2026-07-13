import { copyFileSync, existsSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const distDir = join(process.cwd(), "dist");
const indexFile = join(distDir, "index.html");
const routes = ["pricing", "register", "payment", "success", "failed"];

if (!existsSync(indexFile)) {
  throw new Error("dist/index.html was not found. Run this after vite build.");
}

for (const route of routes) {
  const routeDir = join(distDir, route);
  mkdirSync(routeDir, { recursive: true });
  copyFileSync(indexFile, join(routeDir, "index.html"));
}

