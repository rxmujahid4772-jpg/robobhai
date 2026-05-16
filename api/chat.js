export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { messages } = req.body;

  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        max_tokens: 1000,
        messages: [
          {
            role: 'system',
            content: `তুমি RoboBhai — একটি বন্ধুসুলভ বাংলা AI সহকারী।
নিয়ম:
- সবসময় বাংলায় কথা বলবে
- সহজ ও বন্ধুসুলভ ভাষা ব্যবহার করবে
- উত্তর ছোট ও কার্যকর রাখবে
- মাঝে মাঝে ইমোজি ব্যবহার করবে`
          },
          ...messages
        ]
      })
    });

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
}
