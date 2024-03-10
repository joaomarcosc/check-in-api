import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [
    // Plugin to vitest understand absolute imports in tsconfig file
    tsconfigPaths(),
  ],

  test: {
    coverage: {
      include: ['src/**/*'],
      exclude: [
        'src/http/routes.ts',
        'src/env',
        'src/app.ts',
        'src/server.ts',
        'src/lib',
      ],
    },
  },
})
