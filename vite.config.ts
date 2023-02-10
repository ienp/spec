import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import electron from 'vite-plugin-electron'
import renderer from 'vite-plugin-electron-renderer'
import pkg from './package.json'
import { rmSync } from 'node:fs'

export default defineConfig(({ command }) => {
  rmSync('dist-electron', { recursive: true, force: true })
  const isServe = command === 'serve'
  const isBuild = command === 'build'
  const sourcemap = isServe

  return {
    plugins: [
      vue(),
      electron([
        {
          entry: 'electron/main/index.ts',
          onstart(options) {
            options.startup()
          },
          vite: {
            build: {
              sourcemap,
              minify: isBuild,
              outDir: 'dist-electron/main',
              rollupOptions: {
                external: Object.keys('dependencies' in pkg ? pkg.dependencies : {}),
              },
            }
          }
        },
        {
          entry: 'electron/preload/index.ts',
          onstart(options) {
            options.reload()
          },
          vite: {
            build: {
              sourcemap: sourcemap ? 'inline' : undefined,
              minify: isBuild,
              outDir: 'dist-electron/preload',
              rollupOptions: {
                external: Object.keys('dependencies' in pkg ? pkg.dependencies : {}),
              },
            }
          }
        }
      ]),
      renderer({
        nodeIntegration: true,
      }),
    ],
    server: (() => {
      const url = new URL(pkg.env.VITE_SERVER_URL)
      return {
        host: url.hostname,
        port: +url.port,
      }
    })(),
    clearScreen: false,
  }
})
