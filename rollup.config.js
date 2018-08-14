import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';
import {uglify} from 'rollup-plugin-uglify';

export default {
    entry: 'lib/index.js',
    output: {
        name: 'gwm',
        file: 'dist/gwm.js',
        format: 'umd',
        sourcemap: false
    },
    plugins: [
        resolve(),
        commonjs(),
        babel(),
        replace({
            ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
        }),
        (process.env.NODE_ENV === 'production' && uglify()),
    ],
};
