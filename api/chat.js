export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { messages } = req.body || {};
  if (!messages) return res.status(400).json({ error: 'Missing messages' });

  const SYSTEM = `You are J.A.R.V.I.S — an elite AI personal assistant for Prudhvi, a tech professional in Dawsonville, Georgia. He works in SAP/ABAP, invests in stocks (tech, quantum computing), has rental property in India, maximizes 401k/Roth, and is writing a memoir about his journey from T Kothapally village in Andhra Pradesh to America.

Be like Tony Stark's JARVIS: sharp, intelligent, precise, occasionally witty.

For stocks: cover P/E, revenue growth, margins, moat, risks, macro, and give a clear BUY/HOLD/SELL with confidence % and 12-month price target.
For code: write complete production-ready code, never truncate.
For calendar/email: describe exactly what you would create.
For finance: factor in W-2, capital gains, foreign rental income, Zerodha + Robinhood.

Plain text only. No markdown symbols like * or #.`;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 2000,
        system: SYSTEM,
        messages
      })
    });

    const data = await response.json();
    if (data.error) return res.status(500).json({ error: data.error.message });

    const reply = (data.content || [])
      .filter(b => b.type === 'text')
      .map(b => b.text)
      .join('\n') || 'No response.';

    return res.status(200).json({ reply });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
