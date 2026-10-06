// /api/diagnose — Vercel serverless function (Node.js runtime).
//
// This is the ONLY place the Anthropic API key is used. It never reaches
// the browser. Set ANTHROPIC_API_KEY in your hosting provider's
// environment variables (Vercel: Project Settings -> Environment Variables).
//
// If you're deploying to Netlify or Cloudflare Workers instead of Vercel,
// the request/response shapes differ slightly — see the notes at the
// bottom of this file.

const CONDITION_KEYS = [
  'healthy', 'earlyBlight', 'lateBlight', 'bacterialSpot',
  'powderyMildew', 'rust', 'chlorosis', 'mosaicVirus'
];

const MAX_IMAGE_BYTES = 8 * 1024 * 1024; // ~8MB raw, generous for a base64 leaf photo

function buildSystemPrompt() {
  return `You are assisting a plant-leaf field guide app used by non-experts, possibly on real crops they depend on.
First decide whether the photo actually shows a plant leaf as its main subject. A leaf held in a hand, or lying on soil or a table, counts. Be strict: flowers, fruit, bare stems, bark, soil, lawns or fields of grass, whole plants or trees seen from far away, plastic or artificial leaves, leaf drawings, paintings, leaf patterns on fabric or objects, photos of screens, people, animals, food, objects, and blank or unreadable images do NOT count. Only say it is a leaf when you are highly certain.

If it IS a leaf, classify it into exactly ONE of these categories: ${CONDITION_KEYS.join(', ')}.

Respond with ONLY a raw JSON object — no markdown fences, no commentary before or after.
If the photo is NOT a leaf, respond with exactly: {"isLeaf": false}
If it IS a leaf, respond in exactly this shape:
{"isLeaf": true, "leafConfidence": <integer 0-100, how sure you are this is a real plant leaf>, "conditionKey": "<one of the categories above>", "confidence": <integer 0-100>, "explanation": "<2-3 sentence plain-language description in the requested language of what you actually see in THIS photo and why it points to that category>", "alternates": [{"key": "<category>", "confidence": <integer 0-100>}, {"key": "<category>", "confidence": <integer 0-100>}]}

Rules:
- "confidence" must reflect how clearly the visual evidence in this specific photo matches the category. Do not default to a high number out of habit — a blurry, poorly lit, or ambiguous photo should get a LOW confidence score.
- Never force a leaf classification onto a non-leaf photo. If it isn't clearly a leaf, return {"isLeaf": false}.
- If it is a leaf but blurry or poorly lit, still return isLeaf true, but keep confidence low and say so plainly in the explanation.
- Never claim certainty that a single photo can't actually support. This tool is a field aid, not a lab diagnosis, and people may act on what you say.
- Do not invent treatment advice — only classify and describe what you see. Treatment steps are handled separately by the app.
- "alternates" should be the next most plausible categories, if any are reasonably plausible. It's fine to return an empty array.`;
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    console.error('ANTHROPIC_API_KEY is not set');
    res.status(500).json({ error: 'Server not configured', ref: 'nokey' });
    return;
  }

  try {
    const { imageBase64, mediaType, lang } = req.body || {};

    if (!imageBase64 || typeof imageBase64 !== 'string') {
      res.status(400).json({ error: 'Missing image data' });
      return;
    }
    if (imageBase64.length > MAX_IMAGE_BYTES * 1.4) { // base64 is ~1.37x raw size
      res.status(413).json({ error: 'Image too large' });
      return;
    }
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (!allowedTypes.includes(mediaType)) {
      res.status(400).json({ error: 'Unsupported image type' });
      return;
    }

    const languageName = lang === 'tl' ? 'Tagalog' : 'English';

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-5-5',
        max_tokens: 1000,
        system: buildSystemPrompt(),
        messages: [
          {
            role: 'user',
            content: [
              { type: 'image', source: { type: 'base64', media_type: mediaType, data: imageBase64 } },
              { type: 'text', text: `Classify this leaf photo. Write the "explanation" field in ${languageName}.` }
            ]
          }
        ]
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('Anthropic API error:', response.status, errText);
      res.status(502).json({ error: 'AI service unavailable', ref: String(response.status) });
      return;
    }

    const data = await response.json();
    const textBlock = (data.content || []).find(b => b.type === 'text');
    if (!textBlock) {
      res.status(502).json({ error: 'No response from AI', ref: 'empty' });
      return;
    }

    let parsed;
    try {
      // Take everything from the first { to the last } so stray words or
      // code fences around the JSON can't break parsing.
      const raw = textBlock.text;
      const first = raw.indexOf('{');
      const last = raw.lastIndexOf('}');
      parsed = JSON.parse(raw.slice(first, last + 1));
    } catch (e) {
      console.error('Failed to parse AI response:', textBlock.text);
      res.status(502).json({ error: 'Could not parse AI response', ref: 'parse' });
      return;
    }

    const leafConfidence = parsed.leafConfidence === undefined ? 100 : (Number(parsed.leafConfidence) || 0);
    if (parsed.isLeaf !== true || leafConfidence < 75) {
      res.status(200).json({ isLeaf: false });
      return;
    }

    if (!CONDITION_KEYS.includes(parsed.conditionKey)) {
      res.status(502).json({ error: 'Invalid classification', ref: 'invalid' });
      return;
    }

    const safeResult = {
      isLeaf: true,
      conditionKey: parsed.conditionKey,
      confidence: Math.max(0, Math.min(100, Math.round(Number(parsed.confidence) || 0))),
      explanation: typeof parsed.explanation === 'string' ? parsed.explanation.slice(0, 600) : '',
      alternates: Array.isArray(parsed.alternates)
        ? parsed.alternates
            .filter(a => a && CONDITION_KEYS.includes(a.key))
            .slice(0, 4)
            .map(a => ({
              key: a.key,
              confidence: Math.max(0, Math.min(100, Math.round(Number(a.confidence) || 0)))
            }))
        : []
    };

    res.status(200).json(safeResult);
  } catch (e) {
    console.error('diagnose handler error:', e);
    res.status(500).json({ error: 'Server error', ref: 'server' });
  }
};

// --- Notes for other hosts ---
//
// Netlify Functions: rename this file's export to
//   exports.handler = async (event) => { ... return { statusCode, body: JSON.stringify(...) }; }
// and parse JSON.parse(event.body) instead of req.body.
//
// Cloudflare Workers: use
//   export default { async fetch(request, env) { ... } }
// and read the key from `env.ANTHROPIC_API_KEY` (bound as a Worker secret),
// since Workers don't use `process.env`.
