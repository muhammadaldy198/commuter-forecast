// Charm the Commuter: Forecast a City That Isn't — one line of weather
// for Hailmere, a city that does not exist.
import { mkdirSync, writeFileSync, readFileSync } from "node:fs";

const LINE =
  "Today in Hailmere: hail the size of regrets, falling gently, as if it feels bad about it. The bus shelter is closed for repairs.";

function countCodePoints(text: string): number {
  return [...text].length;
}

function assertGate(text: string): void {
  const chars = countCodePoints(text);
  if (chars < 1 || chars > 140) {
    throw new Error(`entry must be 1-140 characters, got ${chars}`);
  }
  if (text.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  if (/[\u00a0\u200b]/.test(text)) {
    throw new Error("entry must not contain invisible whitespace");
  }
}

function verifyWritten(path: string, expected: string): void {
  const back = readFileSync(path, "utf8");
  if (back !== expected) {
    throw new Error("read-back mismatch: entry.txt differs from LINE");
  }
}

const outDir = "/output";
mkdirSync(outDir, { recursive: true });
assertGate(LINE);
writeFileSync(`${outDir}/entry.txt`, LINE, "utf8");
verifyWritten(`${outDir}/entry.txt`, LINE);
