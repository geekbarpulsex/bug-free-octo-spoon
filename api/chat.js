// api/chat.js
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST allowed' });
  }

  const { message, user } = req.body;

  try {
    const response = await fetch('https://copilot-api.microsoft.com/chat', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.COPILOT_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message, user })
    });

    const data = await response.json();
    res.status(200).json({ reply: data.reply || "No response." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Copilot API failed' });
  }
}
