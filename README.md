# Blog App

A modern full-stack blogging platform built with Next.js 15, Prisma, and Kinde Auth. This application provides a seamless experience for creating, reading, updating, and deleting blog posts with a focus on performance and developer experience.

## Tech Stack

- **Framework:** [Next.js 15+](https://nextjs.org/) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Database & ORM:** [Prisma](https://www.prisma.io/) with [Neon](https://neon.tech/) (PostgreSQL)
- **Authentication:** [Kinde Auth](https://kinde.com/)
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/)
- **Forms & Validation:** [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/)
- **Icons:** [Lucide React](https://lucide.dev/)

## Features

- **Authentication:** Secure login and registration using Kinde.
- **Dashboard:** Private area for users to manage their posts.
- **CRUD Operations:** Create, edit, and delete blog posts with ease.
- **Image Support:** Integration for remote images from Pexels, Unsplash, and more.
- **Responsive Design:** Fully optimized for all device sizes.
- **Type-Safe:** End-to-end type safety using TypeScript and Zod.
- **Seeded Data:** Includes a seed script to populate the database with sample posts.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v20 or higher)
- [npm](https://www.npmjs.com/) or [pnpm](https://pnpm.io/)
- A [Neon](https://neon.tech/) database (or any PostgreSQL instance)
- A [Kinde](https://kinde.com/) account for authentication

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/NextJS-Blog-App.git
   cd NextJS-Blog-App
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the root directory and add the following:
   ```env
   # Database
   DATABASE_URL="your_postgresql_connection_string"

   # Kinde Auth
   KINDE_CLIENT_ID="your_kinde_client_id"
   KINDE_CLIENT_SECRET="your_kinde_client_secret"
   KINDE_ISSUER_URL="https://your_kinde_subdomain.kinde.com"
   KINDE_SITE_URL="http://localhost:3000"
   KINDE_POST_LOGOUT_REDIRECT_URL="http://localhost:3000"
   KINDE_POST_LOGIN_REDIRECT_URL="http://localhost:3000/dashboard"
   ```

4. **Initialize the database:**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **(Optional) Seed the database:**
   ```bash
   npx prisma db seed
   ```

### Running the App

```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

- `app/`: Next.js App Router (pages, layouts, and API routes).
- `components/`: Reusable UI components.
  - `ui/`: Core UI primitives (shadcn-like).
  - `general/`: App-specific components (Navbar, BlogPostCard, etc.).
- `lib/`: Shared utilities and schemas (Zod).
- `prisma/`: Database schema and seed scripts.
- `public/`: Static assets.

## Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the application for production.
- `npm run start`: Starts the production server.
- `npm run lint`: Runs ESLint for code quality checks.
- `npm run postinstall`: Generates the Prisma client.

## Environment Variables

| Variable | Description |
| :--- | :--- |
| `DATABASE_URL` | PostgreSQL connection string. |
| `KINDE_CLIENT_ID` | Kinde application client ID. |
| `KINDE_CLIENT_SECRET` | Kinde application client secret. |
| `KINDE_ISSUER_URL` | Kinde domain URL. |
| `KINDE_SITE_URL` | The URL of your site (e.g., http://localhost:3000). |
| `KINDE_POST_LOGOUT_REDIRECT_URL` | Where to redirect after logout. |
| `KINDE_POST_LOGIN_REDIRECT_URL` | Where to redirect after login. |

## Tests

- TODO: Add automated tests (Unit, Integration, E2E).

## License

This project is licensed under the MIT License - see the [LICENSE]file for details (or add one if missing).

## Acknowledgements

Built with Next.js, Prisma, Kinde Auth, and Tailwind CSS. Image assets and photography examples courtesy of Pexels.

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


- Copy .env.example to .env and set values:
  - DATABASE_URL="postgresql://user:pass@host:port/dbname"
  - NEXT_PUBLIC_SITE_URL="http://localhost:3000"
  - NEXTAUTH_SECRET="a-very-secret-value"
  - (other envs used by the project)

```bash
cp .env.example .env
# Edit .env with your credentials

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
