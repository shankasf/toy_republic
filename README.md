# Toy Republic

Website for Toy Republic — five toy stores across New Jersey & New York. Built with Next.js 15, Postgres, and Hostinger SMTP.

## What's in here

- **Public site** — home, locations, our story, careers, news, product pages, portfolio
- **Careers form** — job application with resume + optional video upload, 18+ age gate (NJ & NY)
- **Email pipeline** — every submission auto-emails all addresses in `admin_users` with the resume attached, via Hostinger SMTP
- **Admin panel** (`/admin/login`) — view applications, download resumes/videos, create/edit/delete news articles
- **Postgres-backed** — products, categories, brands, reviews, jobs, job_applications, news_articles, admin_users, locations

## Stack

- Next.js 15 (App Router, Server Components, Server Actions)
- TypeScript, Tailwind CSS
- Postgres (via `pg`)
- `nodemailer` for SMTP
- `bcryptjs` + HMAC-signed cookies for admin auth
- PM2 for production process management

## Prerequisites

- Node 20+
- Postgres 14+ (the dev setup uses a Dockerised Postgres on port 5433)
- A mailbox on a domain with SMTP access (the project is wired for Hostinger; any SMTP provider works)

## Setup

```bash
# 1. clone
git clone https://github.com/shankasf/toy_republic.git
cd toy_republic/nextjs-app

# 2. install deps
npm install

# 3. configure env
cp .env.example .env.local
# ...then fill in real values (see "Environment variables" below)

# 4. create the database schema (see "Database schema" below)

# 5. dev
npm run dev              # runs on :3000

# 6. prod
npm run build
npm start                # respects $PORT (defaults to 3001)
```

## Environment variables

All live in `nextjs-app/.env.local` (gitignored). See `.env.example` for the template.

| Var | Purpose |
| --- | --- |
| `DATABASE_URL` | Postgres connection string |
| `SMTP_HOST` / `SMTP_PORT` / `SMTP_SECURE` | SMTP server (e.g. `smtp.hostinger.com` / `465` / `true`) |
| `SMTP_USER` / `SMTP_PASS` | Mailbox credentials |
| `SMTP_FROM` | Display From header, e.g. `"Toy Republic Careers <info@toyrepublicusa.com>"` |
| `SESSION_SECRET` | HMAC key for admin session cookie. Generate with `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"` |

If `SMTP_*` are empty, application emails silently no-op (DB write still succeeds).

## Database schema

The app expects these tables in Postgres. There is no migration runner yet — create them manually, or point `DATABASE_URL` at a DB where they already exist.

Core tables:

- `locations` — id, slug, name, city, state, address, phone, hours, …
- `categories`, `brands`, `reviews` — homepage content
- `products` / `news_articles` — catalogue and blog
- `jobs` — open positions, linked to a location
- `job_applications` — careers-form submissions (see below)
- `admin_users` — `id`, `email UNIQUE`, `password_hash`, `created_at`

`job_applications` columns include:
`full_name, first_name, last_name, email, phone, preferred_loc, position, date_of_birth, available_start_date, gender, pronouns, retail_experience, schedule_preference, hear_about_us, why_work_here, video_link, video_filename, video_mime, video_data, emergency_contact_name, emergency_contact_phone, resume_filename, resume_data, resume_mime, job_id, created_at`.

Resume and video are stored as `bytea`.

## Admin access

- Log in at `/admin/login`
- Recipients for application emails and admin login are pulled live from the `admin_users` table — add an email to grant access

To add a new admin:

```sql
-- then use a hashed password, not plaintext:
-- node -e "console.log(require('bcryptjs').hashSync('the-password', 10))"
INSERT INTO admin_users (email, password_hash)
VALUES ('new.admin@example.com', '<bcrypt hash>');
```

To remove:

```sql
DELETE FROM admin_users WHERE email = 'old.admin@example.com';
```

## Project layout

```
nextjs-app/
  app/
    (public pages)       # page.tsx, careers/, locations/, news/, our-story/, …
    admin/               # admin panel (protected routes)
    api/                 # API routes (/api/applications, /api/products, …)
  components/            # Header, Footer, ApplicationForm, StaffMemberPosting, …
  lib/
    auth.ts              # session cookie + bcrypt verify
    db.ts                # pg pool
    email.ts             # nodemailer + admin-recipient lookup
    content.ts, locations.ts, products.ts
  public/images/         # site imagery
```

## Deploying

The production setup uses **PM2**. Typical flow after a change:

```bash
cd nextjs-app
npm run build
pm2 reload toy-republic --update-env
```

`--update-env` is only needed when `.env.local` changed.

## Email & DNS notes

For Hostinger-hosted email on `toyrepublicusa.com`, four DNS records should exist:

- **MX** → `mx1.hostinger.com` / `mx2.hostinger.com`
- **SPF** (TXT at apex) → `v=spf1 include:_spf.mail.hostinger.com ~all`
- **DKIM** (TXT at `hostingermail1._domainkey`) → generated when DKIM is enabled in hPanel
- **DMARC** (TXT at `_dmarc`) → at minimum `v=DMARC1; p=none`

Once DKIM propagates, send a test message and verify `dkim=pass` in Gmail's *Show Original*.

## Security notes

- `.env.local` is gitignored — do not commit it.
- Admin passwords are bcrypt-hashed in DB. Default bootstrap password = email address (guessable); rotate in production.
- `SESSION_SECRET` must be a cryptographically random value; changing it invalidates all current admin sessions.
