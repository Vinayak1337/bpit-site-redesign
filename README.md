# BPIT Site Redesign

The official BPIT college website redesign, built from scratch by the BPIT tech team.

**Live site:** [bpit-site-redesign.vercel.app](https://bpit-site-redesign.vercel.app/)

Built by the BPIT tech team — a team of 3 led by Vinayak — from June to December 2025. This was an institutional college tech team project, not company employment.

## Screenshot

![BPIT website homepage](docs/homepage.png)

## Features

- Responsive public pages for admissions, academics, departments, placements, student life, statutory committees, the library, and institutional information
- Inline click-to-edit CMS views that let authenticated editors update content in the context of the rendered page
- MongoDB-backed content persistence with authenticated admin actions and audit logging
- Editable homepage modules for hero slides, notices, events, testimonials, placement partners, and student outcomes
- PostHog page and product analytics
- SEO metadata, sitemap generation, and structured data
- Cloudinary-backed media upload flows
- Vercel deployments and preview workflow for reviewing changes before release

## Architecture notes

- **App Router structure:** public and private route groups live under `src/app`. Public routes render the college site; matching `/admin` routes provide authenticated editing surfaces for the same content domains.
- **CMS persistence:** editor components submit validated server actions. Content is stored in MongoDB and the affected public and admin paths are revalidated after a write, so editors work against the page structure visitors see.
- **Admin access:** admin sessions and roles protect CMS actions, while audit records track content changes.
- **Analytics:** `PostHogProvider` initializes PostHog and `PageTracker` records client-side navigation using the public PostHog configuration.

## Stack

- Next.js 15 App Router, React 19, TypeScript
- Tailwind CSS 4, Radix UI, Framer Motion
- MongoDB, Mongoose, Prisma
- PostHog
- Cloudinary
- Vercel, `next-sitemap`

## Run locally

### Prerequisites

- Node.js 20+
- npm
- MongoDB database

### Setup

```bash
git clone https://github.com/Vinayak1337/bpit-site-redesign.git
cd bpit-site-redesign
npm install
```

Create `.env.local` and provide the variables needed by the flows you intend to run:

```dotenv
MONGODB_URI
MONGO_URI
SITE_URL
NEXT_PUBLIC_SITE_URL
NEXT_PUBLIC_POSTHOG_KEY
NEXT_PUBLIC_POSTHOG_HOST
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
NEXT_PUBLIC_CLOUDINARY_UPLOAD_FOLDER
CLOUDINARY_CLOUD_NAME
CLOUDINARY_API_KEY
CLOUDINARY_API_SECRET
SMTP_HOST
SMTP_PORT
SMTP_SECURE
SMTP_USER
SMTP_PASSWORD
SMTP_FROM
SMTP_TO
SEED_ADMIN_EMAIL
SEED_ADMIN_PASSWORD
```

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).
