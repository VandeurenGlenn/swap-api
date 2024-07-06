import typescript from '@rollup/plugin-typescript'
export default [
  {
    input: ['src/api.ts'],
    output: {
      format: 'es',
      dir: 'dist'
    },
    plugins: [typescript()]
  }
]
