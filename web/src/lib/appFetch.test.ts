import { afterEach, expect, it, vi } from 'vitest'
import { appFetch } from './appFetch'

afterEach(() => vi.unstubAllGlobals())
it('keeps native API requests in the portal and preserves external data URLs', async () => {
  const nativeFetch = vi.fn().mockResolvedValue(new Response('{}'))
  vi.stubGlobal('fetch', nativeFetch)
  await appFetch('/api/config')
  expect(nativeFetch).toHaveBeenLastCalledWith(import.meta.env.BASE_URL.replace(/\/$/, '') + '/api/config', undefined)
  await appFetch('https://api.hyperliquid.xyz/info', { method: 'POST' })
  expect(nativeFetch).toHaveBeenLastCalledWith('https://api.hyperliquid.xyz/info', { method: 'POST' })
})
