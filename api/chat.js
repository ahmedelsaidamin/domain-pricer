module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const API_KEY = process.env.ANTHROPIC_API_KEY;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify(req.body),
    });

    const text = await response.text();
    console.log('Anthropic response:', response.status, text);
    res.status(response.status).setHeader('Content-Type', 'application/json').send(text);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
