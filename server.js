// FinSearch Ollama Bridge Server (minimal)
// Provides a simple endpoint for proposal generation.

const http = require("http");

const PORT = 3001;

function readJson(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", chunk => body += chunk);
    req.on("end", () => {
      try { resolve(JSON.parse(body || "{}")); }
      catch (e) { reject(e); }
    });
  });
}

function send(res, status, data, type = "application/json") {
  res.writeHead(status, {
    "Content-Type": type,
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type"
  });
  res.end(type === "application/json" ? JSON.stringify(data) : data);
}

const server = http.createServer(async (req, res) => {
  // CORS preflight
  if (req.method === "OPTIONS") return send(res, 200, { ok: true });

  if (req.method === "POST" && req.url === "/proposal") {
    try {
      const { name, role, company, pay, time } = await readJson(req);

      const prompt =
`Write a short professional job proposal (120-170 words).
Tone: confident, polite, reliable. No slang.
Include:
- greeting
- who you are (name)
- role you are applying for
- why you're a good fit (1-2 lines)
- timeline/communication commitment
- closing + name

Candidate name: ${name || "Candidate"}
Role: ${role || "Role"}
Company: ${company || "Company"}
Pay: ${pay || "—"}
Expected time: ${time || "—"}`;

      const r = await fetch("http://localhost:11434/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "mistral",
          prompt,
          stream: false
        })
      });

      if (!r.ok) {
        const msg = await r.text();
        return send(res, 500, msg, "text/plain");
      }

      const out = await r.json();
      return send(res, 200, { text: (out.response || "").trim() });

    } catch (e) {
      return send(res, 400, "Bad request", "text/plain");
    }
  }

  return send(res, 404, "Not found", "text/plain");
});

server.listen(PORT, () => {
  console.log(`✅ FinSearch Ollama server running: http://localhost:${PORT}`);
  console.log("Endpoint: POST /proposal");
});