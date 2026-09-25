// Explicitly route native relative API requests through this application's
// portal. External market-data requests keep their original destination.
export function appFetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
  const prefix = import.meta.env.BASE_URL.replace(/\/$/, '')
  const target = typeof input === 'string' && input.startsWith('/') && !input.startsWith('//') ? prefix + input : input
  return globalThis.fetch(target, init)
}
