# Idea-Engne

## Architecture

Idea-Engne is a static frontend served by Vercel. Authenticated requests to `/api/generate` are handled by a Vercel serverless function, which verifies the Supabase Auth session before calling the configured AI provider.

## Environment variables

Set these in Vercel project settings or your local environment:

- `AI_PROVIDER`
- `AI_FALLBACK_PROVIDER`
- `GROQ_API_KEY`
- `GEMINI_API_KEY`
- `GROQ_MODEL`
- `GEMINI_MODEL`
- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`

The Supabase variables and the API key for the selected primary provider are required. Fallback and model settings are optional.

## Run locally

Configure the required environment variables locally, then start the Vercel development server:

```sh
vercel dev
```

## AI provider selection

`AI_PROVIDER` selects `groq` or `gemini` and defaults to `groq`. `AI_FALLBACK_PROVIDER` accepts `groq`, `gemini`, or `none` and defaults to `none`. A fallback is used only when it differs from the primary provider and its API key is configured. `GROQ_MODEL` and `GEMINI_MODEL` can override the model IDs used by each provider.

## Security notes

- Provider API keys are used only by the serverless function and are never sent to the browser.
- The server verifies each Supabase access token before generation.
- The server decides the output count and always requests 15 ideas.
- The in-memory rate limit is best-effort and per function instance.
- The free quota is still tracked client-side and must move to Supabase before charging users.
- Free AI tiers may use prompts to improve provider products. Do not rely on free tiers for production or paid use.
