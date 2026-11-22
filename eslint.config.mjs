import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'
import prettier from 'eslint-plugin-prettier/recommended'

const config = [
  { ignores: ['.next/**', 'out/**', 'storybook-static/**', 'next-env.d.ts'] },
  ...nextVitals,
  ...nextTs,
  prettier,
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      'prettier/prettier': 'warn',
      'import/no-anonymous-default-export': 'off',
    },
  },
]
export default config
