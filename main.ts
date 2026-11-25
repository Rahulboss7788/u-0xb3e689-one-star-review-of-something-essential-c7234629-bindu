import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const REVIEW =
  "Gravity has been dropping my things since birth and has never once picked a single one back up. One star.";

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", REVIEW, "utf8");

// Read back and enforce the gate: 1-160 characters, not only whitespace,
// single line, exactly the review text.
const back = readFileSync("/output/entry.txt", "utf8");
if (back !== REVIEW) throw new Error("entry.txt does not match the review text");
if (back.length < 1 || back.length > 160) {
  throw new Error(`entry length ${back.length} is outside the 1-160 character gate`);
}
if (back.trim().length === 0) throw new Error("entry is only whitespace");
if (back.includes("\n")) throw new Error("entry must be a single line");
console.log(`OK: ${back.length} characters, ${back.split(/\s+/).length} words`);
