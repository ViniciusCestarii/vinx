import * as esbuild from 'esbuild';
import pkg from './package.json';

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
	minify: true,
	banner: {
		js: `#!/usr/bin/env node`,
	},
});