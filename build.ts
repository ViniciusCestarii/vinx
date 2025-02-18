import * as esbuild from 'esbuild';
import { promises as fs } from 'fs';
import path from 'path';
import pkg from './package.json';

async function build() {
  esbuild.buildSync({
    entryPoints: ['./src/index.ts'],
    bundle: true,
    outfile: 'dist/bin.cjs',
    format: 'cjs',
    target: 'node16',
    platform: 'node',
    define: {
      'process.env.VINX_VERSION': `"${pkg.version}"`,
    },
    external: [
      'esbuild',
    ],
    banner: {
      js: `#!/usr/bin/env node`,
    },
  });

  const readmeSource = path.resolve(__dirname, 'README.md');
  const readmeDest = path.resolve(__dirname, 'dist', 'README.md');
  
  await fs.copyFile(readmeSource, readmeDest);
}

build().catch((error) => {
  console.error(error);
  process.exit(1);
});
