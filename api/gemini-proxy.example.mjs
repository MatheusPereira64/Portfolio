/**
 * Example Cloudflare Worker — keeps GEMINI_API_KEY server-side.
 * Deploy separately; set VITE_GEMINI_PROXY_URL to the worker URL in .env
 *
 * Wrangler secret: wrangler secret put GEMINI_API_KEY
 */
export default {
  async fetch(request, env) {
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: corsHeaders(request.headers.get('Origin')),
      })
    }

    if (request.method !== 'POST') {
      return new Response('Method not allowed', { status: 405 })
    }

    const origin = request.headers.get('Origin') || ''
    const allowed = (env.ALLOWED_ORIGINS || '').split(',').map((o) => o.trim())
    if (allowed.length && !allowed.includes(origin)) {
      return new Response('Forbidden', { status: 403 })
    }

    let body
    try {
      body = await request.json()
    } catch {
      return json({ error: 'Invalid JSON' }, 400, origin)
    }

    const prompt = body.prompt || ''
    if (!prompt || prompt.length > 8000) {
      return json({ error: 'Invalid prompt' }, 400, origin)
    }

    const key = env.GEMINI_API_KEY
    if (!key) {
      return json({ error: 'Server misconfigured' }, 500, origin)
    }

    const geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${key}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      }
    )

    if (!geminiRes.ok) {
      return json({ error: 'Gemini request failed' }, 502, origin)
    }

    const data = await geminiRes.json()
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || ''
    return json({ text }, 200, origin)
  },
}

function json(data, status, origin) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      ...corsHeaders(origin),
    },
  })
}

function corsHeaders(origin) {
  return {
    'Access-Control-Allow-Origin': origin || '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  }
}
