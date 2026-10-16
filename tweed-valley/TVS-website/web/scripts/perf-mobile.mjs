#!/usr/bin/env node
/**
 * Mobile performance simulation using Lighthouse.
 * Run with the dev server or production build already serving the target URL.
 *
 * Examples:
 *   npm run perf:mobile
 *   PERF_URL=https://tweed-valley-senduro.vercel.app npm run perf:mobile
 */

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const url = process.env.PERF_URL || "http://localhost:3000";
const outDir = path.join(__dirname, "..", ".lighthouse");
const reportPath = path.join(outDir, "mobile-home.json");

fs.mkdirSync(outDir, { recursive: true });

const chromePath = process.env.CHROME_PATH || "/usr/bin/chromium-browser";
const chromeArgs = fs.existsSync(chromePath)
  ? ["--chrome-flags=--headless --no-sandbox --disable-dev-shm-usage"]
  : ["--chrome-flags=--headless --no-sandbox --disable-dev-shm-usage"];

console.log(`\nLighthouse mobile simulation → ${url}\n`);

execFileSync(
  "npx",
  [
    "lighthouse",
    url,
    "--only-categories=performance",
    "--form-factor=mobile",
    "--screenEmulation.mobile=true",
    "--throttling-method=simulate",
    "--throttling.cpuSlowdownMultiplier=4",
    "--output=json",
    `--output-path=${reportPath}`,
    "--quiet",
    ...chromeArgs,
  ],
  { encoding: "utf8", stdio: ["ignore", "pipe", "inherit"] },
);

const report = JSON.parse(fs.readFileSync(reportPath, "utf8"));
const { performance } = report.categories;
const audits = report.audits;

const rows = [
  ["Performance score", `${Math.round(performance.score * 100)}`],
  ["First Contentful Paint", audits["first-contentful-paint"]?.displayValue],
  ["Largest Contentful Paint", audits["largest-contentful-paint"]?.displayValue],
  ["Total Blocking Time", audits["total-blocking-time"]?.displayValue],
  ["Speed Index", audits["speed-index"]?.displayValue],
  ["Time to Interactive", audits["interactive"]?.displayValue],
  ["Total byte weight", audits["total-byte-weight"]?.displayValue],
];

console.log("--- Mobile simulation results ---");
for (const [label, value] of rows) {
  console.log(`${label.padEnd(26)} ${value ?? "n/a"}`);
}

const heavy = (audits["network-requests"]?.details?.items || [])
  .filter((item) => item.resourceSize > 100_000)
  .sort((a, b) => b.resourceSize - a.resourceSize)
  .slice(0, 12);

if (heavy.length) {
  console.log("\nLargest requests (>100 KB):");
  for (const item of heavy) {
    const kb = Math.round(item.resourceSize / 1024);
    console.log(`  ${kb} KB  ${item.url}`);
  }
}

console.log(`\nFull report: ${reportPath}\n`);
