import ts from 'rollup-plugin-typescript2';
import pkg from './package.json';

export default [
  {
    input: './src/index.ts',
    output: [
      {
        file: pkg.esnext,
        format: 'es',
        exports: 'named',
      },
    ],
    plugins: [
      ts({
        clean: true,
        useTsconfigDeclarationDir: true,
        tsconfigOverride: {
          compilerOptions: {
            module: 'esnext',
            target: 'esnext',
            declaration: true,
            declarationDir: __dirname + '/lib',
          },
        },
      }),
    ],
  },
  {
    input: './src/index.ts',

    output: [
      {
        file: pkg.main,
        format: 'cjs',
        exports: 'named',
      },
      {
        file: pkg.module,
        format: 'esm',
        exports: 'named',
      },
    ],

    plugins: [
      ts({
        clean: true,
        tsconfigOverride: {
          compilerOptions: {
            module: 'esnext',
            target: 'es5',
            declaration: false,
          },
        },
      }),
    ],
  },
];
