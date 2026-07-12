# Glamour Launchpad - AI Agent Guide

## Project Overview

**Glamour Launchpad** is a fintech/lifestyle platform built with React and TypeScript. It's a Lovable-generated project designed for user subscription management, payment processing via Flutterwave, and WhatsApp group integration.

**Key Features:**
- Multi-tiered pricing plans (Starter, Plus)
- Flutterwave payment gateway integration
- WhatsApp group onboarding workflow
- User registration and authentication
- Real-time payment status tracking

## Tech Stack

| Technology | Purpose |
|-----------|---------|
| **Vite** | Build tool & dev server |
| **React** | UI framework |
| **TypeScript** | Type safety |
| **shadcn/ui** | Component library (Radix UI + Tailwind) |
| **Tailwind CSS** | Styling |
| **React Router** | Client-side routing |
| **React Query** | Server state management |
| **Supabase** | Backend (PostgreSQL + Auth) |
| **Flutterwave** | Payment processing |
| **Sonner** | Toast notifications |

## Project Structure

```
src/
├── pages/          # Route components (Index, Pricing, Payment, Register, etc.)
├── components/     # Reusable UI components
│   ├── ui/         # shadcn/ui components (auto-generated, don't modify)
│   └── *.tsx       # Custom components (HeroCarousel, PricingCard, VideoModal, etc.)
├── config/         # Configuration (glamour.ts for constants & pricing)
├── integrations/   # External service clients
│   └── supabase/   # Supabase client setup
├── hooks/          # Custom React hooks
├── lib/            # Utilities
├── assets/         # Images and media
└── App.tsx         # Main router setup
```

## Development Workflow

```bash
npm run dev         # Start dev server (port 8080)
npm run build       # Build for production (generates dist/)
npm run lint        # Run ESLint
npm run preview     # Preview production build locally
```

**Key Build Notes:**
- Build copies `_redirects` file to dist/ for SPA routing on Netlify
- Deployed to both Netlify and Vercel (both support SPA redirects)
- Lovable component tagger plugin runs in development mode

## Environment Variables & Configuration

All configuration is centralized. **Edit `src/config/glamour.ts`** for:
- Pricing tiers (`PLANS` object)
- WhatsApp integration (`ADMIN_WHATSAPP`, `WHATSAPP_GROUP_LINK`)
- Flutterwave settings (keys in `.env`)
- Promo deadline timer

**Critical env vars** (in `.env`):
```
VITE_SUPABASE_PROJECT_ID    # Supabase project
VITE_SUPABASE_PUBLISHABLE_KEY
VITE_SUPABASE_URL
VITE_FLW_PUBLIC_KEY         # Flutterwave public key
VITE_FLW_SECRET_KEY         # Flutterwave secret key
VITE_ADMIN_WHATSAPP         # Admin WhatsApp number (for group invites)
VITE_WHATSAPP_GROUP_LINK    # Group invite link
VITE_STARTER_PRICE          # In Nigerian Naira (₦)
VITE_PLUS_PRICE
VITE_PLUS_ORIGINAL_PRICE
VITE_PROMO_ENDS_AT          # ISO 8601 timestamp
```

**Import pattern:** `import.meta.env.VITE_*` — never use `process.env`

## Routing & Pages

Routes are defined in [src/App.tsx](src/App.tsx):

| Route | Component | Purpose |
|-------|-----------|---------|
| `/` | `Index` | Landing page, hero section, pricing preview |
| `/pricing` | `Pricing` | Full pricing table with plan details |
| `/register` | `Register` | User registration form |
| `/payment` | `Payment` | Flutterwave payment initialization |
| `/success` | `PaymentSuccess` | Post-payment confirmation, WhatsApp join link |
| `/failed` | `PaymentFailed` | Payment failure handling |
| `*` | `NotFound` | Catch-all 404 page |

**Add new routes:** Update `<Routes>` in [src/App.tsx](src/App.tsx), then create page component in `src/pages/`.

## Common Development Tasks

### Adding a New Pricing Plan
1. Add plan object to `PLANS` in [src/config/glamour.ts](src/config/glamour.ts)
2. Update `<PricingCard>` props in [src/pages/Pricing.tsx](src/pages/Pricing.tsx) if needed
3. Add corresponding env var for price if dynamic: `VITE_NEW_PLAN_PRICE`

### Modifying Payment Flow
1. Integration point: [src/components/FlutterwaveButton.tsx](src/components/FlutterwaveButton.tsx)
2. Success callback: [src/pages/PaymentSuccess.tsx](src/pages/PaymentSuccess.tsx)
3. Failure callback: [src/pages/PaymentFailed.tsx](src/pages/PaymentFailed.tsx)

### Working with Supabase
- Client setup: [src/integrations/supabase/client.ts](src/integrations/supabase/client.ts)
- Type definitions: [src/integrations/supabase/types.ts](src/integrations/supabase/types.ts)
- Use React Query hooks for data fetching (not direct client calls)

### Adding UI Components
- Use existing shadcn/ui components from `src/components/ui/`
- New custom components: Create in `src/components/`
- Style with Tailwind classes or CSS modules
- Use `cn()` utility from `@/lib/utils` to merge Tailwind classes

## Code Conventions

- **Imports:** Use `@/` path alias (configured in [vite.config.ts](vite.config.ts))
- **Components:** Functional components with hooks
- **Styling:** Tailwind classes (no inline styles unless absolutely necessary)
- **Naming:** PascalCase for components, camelCase for utilities/hooks
- **TypeScript:** Strict mode enabled; always add explicit types

## Linting & Standards

- **Linter:** ESLint (config in [eslint.config.js](eslint.config.js))
- **Run:** `npm run lint`
- **Auto-fix:** `npm run lint -- --fix`

## Known Quirks & Gotchas

1. **Lovable-generated code:** This project was built with Lovable. The `vite.config.ts` includes `componentTagger` plugin for development — don't remove it.
2. **_redirects file:** Critical for SPA routing on Netlify. Build script copies it automatically; verify after deployments.
3. **Environment variables:** Must be prefixed with `VITE_` to be accessible in the browser at build time.
4. **Flutterwave keys:** Stored in `.env`. Never commit secrets; ensure they're in `.env.local` for local development.
5. **Carousel component:** Uses Embla Carousel. Configuration is in [src/components/HeroCarousel.tsx](src/components/HeroCarousel.tsx).

## Deployment

Both Netlify and Vercel are configured:
- **Netlify:** [netlify.toml](netlify.toml) — publishes `dist/` folder
- **Vercel:** [vercel.json](vercel.json) — rewrites SPA routes to `index.html`
- Build command: `npm run build`

## Quick Tips for AI Agents

- Always check `src/config/glamour.ts` before modifying pricing, WhatsApp links, or timers
- Use `@/` alias for all local imports
- Test payment flow locally with Flutterwave's test keys (already in `.env`)
- Query client is pre-configured in App.tsx — use it for async operations
- Mobile-first design: check `md:` breakpoints in Tailwind classes
- Dark mode support: Components respect `dark` class on `<html>` element
