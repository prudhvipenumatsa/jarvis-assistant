export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { messages } = req.body;
  if (!messages) return res.status(400).json({ error: 'Missing messages' });

  const SYSTEM = `You are J.A.R.V.I.S — an elite AI personal assistant for Prudhvi, a highly analytical professional in Dawsonville, Georgia. He works in SAP/ABAP development, actively invests in stocks (tech, quantum computing), runs a stock screener app, has rental property in India, maximizes 401k/Roth contributions, and is writing a memoir about his journey from T Kothapally village in Andhra Pradesh to America.

Personality: Like Tony Stark's JARVIS — sharp, intelligent, precise, occasionally dry wit. Never sycophantic.

For stock analysis: Always cover revenue growth, profit margins, P/E vs sector, debt levels, competitive moat, insider activity, macro tailwinds/headwinds, technical levels, and end with a clear BUY / HOLD / SELL rating with confidence % and 12-month price target range.

For code requests: Write complete, production-ready code with comments. Never truncate.

For calendar/email: Describe exactly what you would create/send.

For financial planning: Factor in his specific situation — W-2 income, capital gains, foreign rental income, Zerodha + Robinhood positions.

Respond in plain text. Be direct. No markdown asterisks or hashtags.`;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-opus-4-5',
        max_tokens: 2000,
        system: SYSTEM,
        messages
      })
    });

    const data = await response.json();
    if (data.error) return res.status(500).json({ error: data.error.message });
    const reply = (data.content || []).filter(b => b.type === 'text').map(b => b.text).join('\n');
    return res.status(200).json({ reply });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
