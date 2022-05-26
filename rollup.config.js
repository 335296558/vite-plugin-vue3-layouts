import pkg from './package.json';
import { terser } from "rollup-plugin-terser";
import { babel } from '@rollup/plugin-babel';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import copy from 'rollup-plugin-copy'
const plugins = [
    nodeResolve({
        browser: false
    }),
    commonjs(),
    babel({ 
        babelHelpers: 'bundled',
        exclude: 'node_modules/**',
    }),
    copy({
        targets: [
            {
                src: 'src/App.vue',
                dest: 'dist'
            }
        ]
    }),
    process.env.ENV === 'prod' && terser()
] 
const name = 'vitePluginVueLayouts'
export default [
	{
		input: './src/index.js',
		output: {
			name: name,
			file: pkg.main,
			format: 'cjs',
            exports: 'default',
		},
		plugins
	}
];
