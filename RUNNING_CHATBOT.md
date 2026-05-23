# Running the Shakespearasmus Chatbot with a Hosted Ollama API

This version uses an **Ollama-compatible API endpoint** instead of running Ollama locally on your computer.

The flow is:

```txt
Website frontend
  ↓
Node backend: http://localhost:3000/api/chat
  ↓
Your hosted Ollama API endpoint
  ↓
AI response back to the website
```

You still need the Node backend because the browser frontend should not store API URLs/tokens directly.

## 1. Open the backend server folder

In Command Prompt:

```bash
cd C:\Users\USER\Desktop\shakespearasmus-characters\server
```

If your project is somewhere else, adjust the path.

## 2. Install backend dependencies

From inside the `server` folder:

```bash
npm install
```

## 3. Create the `.env` file

Still inside the `server` folder, run:

```bash
copy .env.example .env
```

Then open:

```txt
server/.env
```

## 4. Add your hosted Ollama API endpoint

Your `.env` should look like this:

```env
PORT=3000
OLLAMA_API_URL=https://your-ollama-api-domain.com/api/chat
OLLAMA_API_KEY=
OLLAMA_MODEL=llama3.2:3b
OLLAMA_HEALTH_URL=
```

Replace this:

```env
OLLAMA_API_URL=https://your-ollama-api-domain.com/api/chat
```

with your real API endpoint.

### If your hosted API requires a token

Add it here:

```env
OLLAMA_API_KEY=your_api_key_here
```

The backend will send it as:

```txt
Authorization: Bearer your_api_key_here
```

If your API does not need authentication, leave it empty:

```env
OLLAMA_API_KEY=
```

### If your hosted API uses a different model

Change:

```env
OLLAMA_MODEL=llama3.2:3b
```

to the model name supported by your API.

Examples:

```env
OLLAMA_MODEL=llama3.1:8b
```

```env
OLLAMA_MODEL=mistral
```

```env
OLLAMA_MODEL=qwen2.5:7b
```

## 5. Start the backend

From inside the `server` folder:

```bash
npm run dev
```

You should see something like:

```txt
Shakespearasmus hosted Ollama API backend running at http://localhost:3000
Using hosted Ollama API endpoint: https://your-ollama-api-domain.com/api/chat
Using model: llama3.2:3b
API key configured: yes/no
```

Keep this terminal open.

## 6. Start the frontend

Open a second Command Prompt window.

Go to the main project folder, not the `server` folder:

```bash
cd C:\Users\USER\Desktop\shakespearasmus-characters
```

Start the frontend:

```bash
python -m http.server 5500
```

Open your browser here:

```txt
http://localhost:5500
```

## 7. Test the chatbot

1. Choose a country from the welcome modal.
2. Ask something like:

```txt
Tell me about this character's costume.
```

The website sends the message to:

```txt
http://localhost:3000/api/chat
```

Your Node backend then sends it to the hosted Ollama API URL in your `.env`.

## Optional: test backend health

Open this in your browser:

```txt
http://localhost:3000/api/health
```

If you set `OLLAMA_HEALTH_URL`, the backend will also try to check the hosted `/api/tags` endpoint.

## Important notes

- You do **not** need `ollama pull`.
- You do **not** need `ollama run`.
- You do **not** need Ollama installed on your computer for this hosted API version.
- You only need the hosted Ollama-compatible API endpoint, model name, and API key if required.

## Troubleshooting

### Problem: `OLLAMA_API_URL is missing`

Open `server/.env` and add your real hosted endpoint:

```env
OLLAMA_API_URL=https://your-ollama-api-domain.com/api/chat
```

Restart the backend:

```bash
npm run dev
```

### Problem: `401 Unauthorized` or `403 Forbidden`

Your hosted API probably requires a token.

Add it to:

```env
OLLAMA_API_KEY=your_api_key_here
```

Restart the backend.

### Problem: `404 Not Found`

Your API URL is probably wrong.

For Ollama-compatible chat, the endpoint usually ends with:

```txt
/api/chat
```

### Problem: Model not found

Your `OLLAMA_MODEL` does not exist on the hosted API.

Change it to a model that your hosted provider supports, then restart the backend.

### Problem: Browser shows directory listing

You started the frontend server inside the wrong folder.

Stop it with `CTRL + C`, then run it from the main project folder:

```bash
cd C:\Users\USER\Desktop\shakespearasmus-characters
python -m http.server 5500
```
