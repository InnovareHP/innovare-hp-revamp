# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Innovare HP is a healthcare marketing and growth strategy company website built with Next.js 16, React 19, and TypeScript. The application features a public-facing marketing site, event management system, admin dashboard, and LinkedIn integration for social media content.

## Development Commands

### Core Development
```bash
# Start development server (http://localhost:3000)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint codebase
npm run lint
```

### Database (Prisma)
```bash
# Generate Prisma client (required after schema changes)
npx prisma generate

# Run database migrations
npx prisma migrate dev

# Open Prisma Studio (database GUI)
npx prisma studio

# Create a new migration
npx prisma migrate dev --name <migration_name>

# Reset database (WARNING: destroys all data)
npx prisma migrate reset
```

### Deployment
The application is deployed on Netlify. The build command in `netlify.toml`:
```bash
pnpm install --no-frozen-lockfile && pnpm prisma generate && pnpm build
```

## Architecture

### Tech Stack
- **Framework**: Next.js 16 (App Router)
- **React**: Version 19.2.1
- **Database**: PostgreSQL with Prisma ORM (using Prisma-pg adapter)
- **Authentication**: better-auth with email/password
- **UI**: Radix UI components + Tailwind CSS v4
- **Forms**: react-hook-form + zod validation
- **Notifications**: Sonner (toast notifications)
- **Email**: Resend API with @react-email/render
- **File Storage**: AWS S3 (via Supabase endpoint)
- **State Management**: @tanstack/react-query
- **Animations**: Framer Motion

### Project Structure

```
app/
├── (auth)/              # Auth route group (sign-in, register)
├── admin/               # Protected admin routes
│   ├── dashboard/       # Admin dashboard with contact submissions
│   ├── events/          # Event management (list, create, edit)
│   └── layout.tsx       # Admin sidebar layout
├── events/              # Public events listing and detail pages
├── field-notes/         # Field notes page
├── privacy-policy/      # Privacy policy page
├── api/                 # API routes
│   ├── auth/[...all]/   # better-auth catch-all route
│   ├── contact/         # Contact form submission
│   ├── posts/           # LinkedIn posts integration
│   ├── cron/            # Scheduled jobs (LinkedIn sync)
│   └── seo/             # SEO dashboard API endpoints
└── layout.tsx           # Root layout with metadata

components/
├── LandingPage/         # Landing page sections (Hero, About, Services, etc.)
├── AdminEventsPage/     # Admin event management components
├── EventsPage/          # Public events page components
├── EventDetail/         # Event detail and registration modal
├── Auth/                # Sign-in and registration forms
├── ui/                  # Radix UI components (button, dialog, form, etc.)
└── Provider.tsx         # React Query provider wrapper

lib/
├── auth.ts              # better-auth configuration
├── auth-client.ts       # Client-side auth utilities
├── prisma.ts            # Prisma client with pg adapter
├── storage.ts           # AWS S3 file upload utilities
├── integration.ts       # LinkedIn API integration
├── schema.ts            # Zod validation schemas
├── types.ts             # TypeScript type definitions
└── utils.ts             # Utility functions (cn, etc.)

prisma/
└── schema.prisma        # Database schema
```

### Key Features & Data Models

**Event Management System:**
- Events with status (DRAFT, PUBLISHED, CANCELLED, COMPLETED)
- Event registration with max guest limits
- QR code generation for events
- Guest and EventAttendee tracking
- Media attachments via S3

**Authentication:**
- better-auth with Prisma adapter
- Email/password authentication (no email verification required)
- Session management with IP and User-Agent tracking
- Protected admin routes under `/app/admin`

**LinkedIn Integration:**
- Automated LinkedIn post fetching (via cron job)
- Post images downloaded and stored
- Models: `LinkedInPost` and `LinkedInPostImage`
- Displayed in "What We're Talking About" section

**Contact Form:**
- Cloudflare Turnstile CAPTCHA integration
- Submissions stored in `ContactFormSubmission` model
- Email notifications via Resend API

**File Upload:**
- AWS S3 via Supabase endpoint
- Public read access configured
- 10MB body size limit for server actions

### Database Connection

- Uses Prisma with PostgreSQL adapter (`@prisma/adapter-pg`)
- Connection string from `DATABASE_URL` environment variable
- Prisma client initialized with adapter in `lib/prisma.ts`

### Authentication Flow

1. better-auth configured in `lib/auth.ts` with Prisma adapter
2. Auth API routes at `/api/auth/[...all]/route.ts` (catch-all)
3. Client-side utilities in `lib/auth-client.ts`
4. Trusted origins include production domain and localhost variants
5. Admin routes protected by layout-level auth checks

### Routing Patterns

- **Public routes**: `/`, `/events`, `/events/[event]`, `/field-notes`, `/privacy-policy`
- **Auth routes**: Group `(auth)` contains `/sign-in` and `/register`
- **Admin routes**: All under `/admin/*` with shared sidebar layout
- **API routes**: RESTful endpoints under `/api/*`

### Environment Variables

Required variables (stored in `.env`):
- `DATABASE_URL` - PostgreSQL connection string
- `AWS_REGION_LOC`, `AWS_ENDPOINT`, `AWS_ACCESS_ID`, `AWS_SECRET`, `AWS_BUCKET_NAME` - S3 configuration
- `LINKEDIN_ACCESS_TOKEN` - LinkedIn API token for post fetching
- `RESEND_API_KEY` - Email service
- `CLOUDFLARE_TURNSTILE_SECRET_KEY` - CAPTCHA verification
- `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` - Google Maps API key for event location maps (optional but recommended)
- better-auth configuration (auto-generated)

**Note:** To enable Google Maps on event detail pages, obtain an API key from [Google Cloud Console](https://console.cloud.google.com/google/maps-apis) and enable the Maps Embed API.

### Component Patterns

- UI components use Radix UI primitives with Tailwind styling
- Forms use `react-hook-form` with `@hookform/resolvers` and zod schemas
- Client components marked with `"use client"` directive
- Server actions marked with `"use server"` directive (e.g., in `lib/storage.ts`)
- Layouts use compound pattern (page sections composed in main page component)

### Styling

- Tailwind CSS v4 with custom configuration
- Custom fonts: Work Sans (body) and Signika (headings)
- CSS variables in `globals.css` for theming
- Component classes merged with `cn()` utility (clsx + tailwind-merge)

### Data Fetching

- Server components fetch data directly in pages
- React Query (`@tanstack/react-query`) for client-side data
- API routes return JSON responses
- LinkedIn posts synced via cron endpoint

### Deployment Notes

- Deployed on Netlify with custom build command
- Functions directory: `netlify/functions`
- Prisma client must be generated during build
- Next.js static export disabled (using server features)
