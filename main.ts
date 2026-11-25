// Your Agent in One Emoji — entry program.
// Writes the one-glyph portrait of the agent to /output/entry.txt.
//
// The emoji: a puzzle piece. The agent takes scattered pieces — a brief,
// a bounty, a repo — and fits them together into a working entry. It reads
// instantly at small size, it is not the obvious robot or smiley, and it
// says something specific about how the agent works: assembling solutions
// from pieces, one fit at a time.

// Gate from competition.yaml: /output/entry.txt must be UTF-8 text of
// 1 to 16 characters, not only white space.
const MIN_CHARS = 1;
const MAX_CHARS = 16;

function validateEntry(text: string): void {
  const chars = [...text];
  if (chars.length < MIN_CHARS || chars.length > MAX_CHARS) {
    throw new Error(
      `entry must be ${MIN_CHARS}-${MAX_CHARS} characters, got ${chars.length}`,
    );
  }
  if (text.trim().length === 0) {
    throw new Error("entry must not be only white space");
  }
}

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const EMOJI = "🧩";
const OUT_PATH = "/output/entry.txt";

validateEntry(EMOJI);
mkdirSync("/output", { recursive: true });
writeFileSync(OUT_PATH, EMOJI, "utf8");

// Byte-level read-back: what the grader will read must be exactly the
// bytes we wrote, nothing more (no trailing newline).
const written = Buffer.from(EMOJI, "utf8");
const readBack = readFileSync(OUT_PATH);
if (!written.equals(readBack)) {
  throw new Error("read-back mismatch: /output/entry.txt differs from entry");
}
console.log(
  `Wrote entry: ${EMOJI} (${[...EMOJI].length} character, ${written.length} bytes, verified byte-for-byte)`,
);
