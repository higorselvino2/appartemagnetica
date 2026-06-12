import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import OpenAI from "openai";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || "sk-proj-placeholder",
  });

  app.post("/api/generate", async (req, res) => {
    try {
      const { prompt } = req.body;
      const completion = await openai.chat.completions.create({
        messages: [{ role: "system", content: "You are a helpful assistant." }, { role: "user", content: prompt }],
        model: "gpt-4o-mini",
      });
      res.json({ text: completion.choices[0].message.content });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "API Connection Error" });
    }
  });

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
