// news-image-20261117 — "The World Today", a newspaper front page summing
// up world news of Tuesday, 17 November 2026 in one 1024x1024 image.
//
// The image itself (entry.png, beside this file) is the entry: a masthead
// with the date, a globe illustration, and six story panels (Ukraine,
// Hormuz, the Shenzhen summit, the Rwanda return hub, Gaza, Deutsche Bank).
// This program only places that image where the grader expects it:
// $MAKEFUN_OUTPUT_DIR/entry.png (default /output), creating the output
// directory first. Node 22, standard library only, no network.
//
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, statSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const source = join(here, 'entry.png');
const target = join(outDir, 'entry.png');

// Fail loudly instead of shipping a bad entry: the gate allows at most
// 1 MiB and 1024x1024 pixels, and a truncated copy would fail it too.
const sourceSize = statSync(source).size;
if (sourceSize > 1024 * 1024) {
  throw new Error(`entry.png is ${sourceSize} bytes, over the 1 MiB gate limit`);
}

mkdirSync(outDir, { recursive: true });
copyFileSync(source, target);

if (statSync(target).size !== sourceSize) {
  throw new Error('copied entry.png does not match the source byte count');
}
