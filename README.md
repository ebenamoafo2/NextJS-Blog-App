# byteBlog

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](./LICENSE) [![Deploy to Vercel](https://img.shields.io/badge/deploy-Vercel-black?logo=vercel)](https://vercel.com/new)

A modern full-stack blogging platform built with Next.js and Prisma. byteBlog provides a type-safe developer experience and production-ready features for creating, reading, updating, and deleting blog posts with SEO-first pages, server-side rendering, and performant image handling.

## Key highlights

- CRUD for posts with author profiles and optional remote images
- Server-Side Rendering (SSR) and Incremental Static Regeneration (ISR)
- Responsive UI with Tailwind CSS and loading skeletons
- Prisma ORM for a type-safe PostgreSQL schema
- SEO-friendly routing and metadata

---

## Features

Core

- Create, read, update, delete (CRUD) blog posts
- Author profiles and post attribution
- Remote image integration via next/image
- Rich post content with markdown or structured blocks

Advanced

- SSR for dynamic pages and ISR for cached static pages
- Responsive design and accessible UI components
- Prisma schema with migrations and seeding
- Loading skeletons and submit/button states for UX feedback
- API routes for secured server-side operations

---

# ByteBlog

A professional, extensible blog application built with Next.js, TypeScript, and Prisma. This repository contains the full source for a modern blog with authentication, a dashboard for managing posts, PostgreSQL (via Prisma), modular UI components, and a seed script to populate sample data.

**Tech stack:** Next.js (App Router), TypeScript, Prisma ORM, PostCSS, Kinde Auth (server route), and React components.

**Quick links:** [app](app), [components](components), [lib](lib), [prisma](prisma)

**Status:** Active development — core features implemented.

**Table of contents**

- **Features**
- **Local setup**
- **Environment**
- **Project layout**
- **Developer notes**
- **Contributing**

**Features**

- **Authentication:** Server-side auth route implemented under [app/api/auth](app/api/auth) (Kinde integration).
- **Dashboard:** Authenticated dashboard and post creation flow at [app/dashboard](app/dashboard).
- **Create / Edit Posts:** Create posts from the dashboard; pages under [app/post/[id]](app/post/[id]).
- **Reusable UI:** Shared UI and form controls in [components/ui](components/ui) and reusable components in [components/general](components/general).
- **Prisma + Database:** Prisma schema and generated client live in [prisma](prisma). Includes a seed script to populate initial data.
- **Composable layout:** App-level layout and global CSS in [app/layout.tsx](app/layout.tsx) and [app/globals.css](app/globals.css).

**Local setup (quick start)**

1. Install dependencies

```bash
npm install
```

2. Set environment variables (see below).

3. Generate Prisma client & run migrations (if using migrations) and seed the DB

```bash
npx prisma generate
npx prisma db push # or `prisma migrate dev` if you use migrations
npx prisma db seed
```

4. Run the development server

```bash
npm run dev
# Open http://localhost:3000
```

**Environment variables**
Create a `.env` file with values appropriate to your environment. Typical variables used by this repo:

- **DATABASE_URL**: Your PostgreSQL (or other supported) connection string.
- **KINDE_CLIENT_ID**, **KINDE_CLIENT_SECRET**, **KINDE_ISSUER**: If using Kinde authentication — placeholders shown here; the auth route is implemented under [app/api/auth](app/api/auth).

Do not commit secrets to source control.

**Project layout (high level)**

- **[app](app)**: Next.js App Router pages and API routes. Key files:
  - [app/page.tsx](app/page.tsx) — public home page / blog listing.
  - [app/layout.tsx](app/layout.tsx) — global layout and providers.
  - [app/dashboard/page.tsx](app/dashboard/page.tsx) — user dashboard.
  - [app/post/[id]/page.tsx](app/post/[id]/page.tsx) — single post view.
  - [app/api/auth](app/api/auth) — authentication route(s).
- **[components](components)**: UI primitives and app-specific components.
  - [components/ui](components/ui) — small, reusable UI primitives (button, input, label, card, textarea, skeleton).
  - [components/general](components/general) — app-specific components (Navbar, AuthProvider, BlogPostCard, Submitbutton).
- **[lib](lib)**: Utility helpers used across the app.
- **[prisma](prisma)**: Prisma schema, seed script, and generated client under [prisma/generated](prisma/generated).

**Notable files**

- [components/general/AuthProvider.tsx](components/general/AuthProvider.tsx) — authentication provider used by the app.
- [components/general/BlogPostCard.tsx](components/general/BlogPostCard.tsx) — post preview card used on lists.
- [utils/db.ts](app/utils/db.ts) — database helper / Prisma client wrapper.
- [prisma/seed.ts](prisma/seed.ts) — seed script to populate example posts and users.

**Development notes**

- The app uses PostCSS for styling; global styles are in [app/globals.css](app/globals.css).
- Prisma client is generated into [prisma/generated](prisma/generated). If you change `schema.prisma`, run `npx prisma generate`.
- Authentication is wired using an API route and an `AuthProvider` component — customize the provider to match your auth provider configuration.

**Deployment**

- This project is compatible with Vercel and other platforms that support Next.js App Router. Ensure environment variables are set in your deployment target (DATABASE*URL, KINDE*\*). For serverless databases, prefer the Prisma Data Proxy or a serverless-friendly DB.

**Testing & scripts**

- `npm run dev` — start development server
- `npm run build` — build for production
- `npm run start` — start the built app
- `npx prisma db seed` — run the seed script

**How to extend**

- Add new UI components under [components/ui](components/ui) and share them via the `components` folder.
- Add new API routes under [app/api](app/api).
- Add Prisma models to [prisma/schema.prisma](prisma/schema.prisma) and run `npx prisma generate`.

**Contributing**
Contributions are welcome. Please open issues or pull requests with a clear description of changes and motivation. Add tests where practical and keep changes focused.

**License**
This repository does not include an explicit license file. Add a license (for example, MIT) in `LICENSE` if you want to permit reuse.

---

If you want, I can also:

- add a `CONTRIBUTING.md` with guidelines
- create a small deployment checklist for Vercel
- run the seed script and verify sample posts are present

Updated: README to reflect current project structure and capabilities.

- Copy .env.example to .env and set values:
  - DATABASE_URL="postgresql://user:pass@host:port/dbname"
  - NEXT_PUBLIC_SITE_URL="http://localhost:3000"
  - NEXTAUTH_SECRET="a-very-secret-value"
  - (other envs used by the project)

```bash
cp .env.example .env
# Edit .env with your credentials
```

4. Prisma: generate, migrate, seed

```bash
npx prisma generate
npx prisma migrate dev --name init
# If a seed script is configured:
npx prisma db seed
```

5. Run dev server

```bash
npm run dev
# or
pnpm dev
# or
yarn dev
```

Open http://localhost:3000

---

## Project structure

- prisma/ — Prisma schema, migrations, seed script
- app/ — Next.js App Router pages and layout (SSR/ISR routes)
- components/ — UI components (cards, forms, skeletons)
- lib/ or utils/ — helpers, API clients, prisma client wrapper
- public/ — static assets
- prisma/ — schema.prisma, migrations, seed scripts
- scripts/ — deployment or maintenance scripts
- README.md, package.json, next.config.js

Example tree:

```
app/
  layout.tsx
  page.tsx
  posts/
    [slug]/page.tsx
components/
  PostCard.tsx
  Editor.tsx
  LoadingSkeleton.tsx
prisma/
  schema.prisma
  migrations/
public/
utils/
  prisma.ts
  seo.ts
```

---

## Usage

Creating a post

- Use the "New Post" UI in the admin/dashboard.
- Fill title, excerpt, content, optional cover image URL, and author.
- Submit — client shows a loading state; API will persist to DB.

Reading posts

- The home page lists recent posts (ISR).
- Individual posts are SSR or statically generated with ISR for updates.

Editing a post

- Open post in the dashboard, modify fields, save.
- The save button shows submitting state; updates are applied via API route.

Deleting a post

- Use delete action in dashboard/post view and confirm.
- Deletion happens via API route and updates UI after server confirmation.

Programmatic examples

- Fetch posts (server-side):

```ts
// Example server function
import prisma from "@/utils/prisma";
export async function getPosts() {
  return prisma.post.findMany({ orderBy: { publishedAt: "desc" } });
}
```

---

## Deployment (Vercel)

1. Push your repo to GitHub/GitLab/Bitbucket.
2. Create a new Vercel project and import the repository.
3. Set Environment Variables in Vercel Dashboard:
   - DATABASE_URL
   - NEXT_PUBLIC_SITE_URL
   - KINDAUTH SECRET
   - Any other project-specific envs
4. Build settings (default Next.js build works):
   - Build command: npm run build
   - Output directory: .next
5. Deploy. Vercel will run Prisma migrations if configured in build or via a separate migration job; alternatively run migrations manually before first deploy.

Tip: Use Vercel Environment Variables for production DB credentials and enable Preview Deployments for PRs.

---

## Seeded Authors

- Alex Morgan — Lead Developer (features, architecture)
- Priya Kapoor — Frontend & UX (design, accessibility)
- Daniel Kim — Backend & DevOps (Prisma schema, deployment)

(Authors rotate responsibilities and contribute to design, implementation, and reviews.)

---

## Contributing

Contributions are welcome.

1. Fork the repository
2. Create a feature branch: git checkout -b feat/your-feature
3. Commit changes with clear messages
4. Push branch and open a Pull Request
5. Ensure tests pass and include brief PR description and screenshots if UI changes

Follow the repo's code style and run linters/tests before submitting.

---

## License

byteBlog is licensed under the MIT License. See LICENSE file for details.

---

## Acknowledgements

Built with Next.js, Prisma, Tailwind CSS. Image assets and photography examples courtesy of Pexels. Deployed on Vercel.
