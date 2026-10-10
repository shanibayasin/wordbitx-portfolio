<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/8c1f0619-f8ab-4412-a3bc-6e29237e7f12

## Run Locally

**Prerequisites:** Node.js


1. Install dependencies:
   `npm install`
2. Copy [.env.example](.env.example) to `.env.local`.
3. Set `JWT_SECRET` to at least 32 random bytes and configure `PUBLIC_LEAD_ALLOWED_ORIGINS` with the exact origins that should access the API. A random secret is generated only for local development.
4. Set `GEMINI_API_KEY` if using Gemini-powered features.
5. Run the app:
   `npm run dev`

The optional `/api/admin/setup` verification endpoint requires either
`INITIAL_ADMIN_SETUP_TOKEN` or `PLATFORM_SUPER_ADMIN_SETUP_TOKEN` to be set
explicitly. It has no built-in token and only verifies the supplied token; it
does not verify database, cloud-storage, or other provider configuration.

The development server is available at `http://localhost:3000`. If port `3000`
is already in use, the server reports the conflict instead of silently switching
to another port; stop the existing WordbitX dev server before starting another.

This repository currently uses Vite, React, TypeScript, Tailwind CSS, and an Express API; it is not a Next.js application.
