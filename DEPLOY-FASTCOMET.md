# AI Gateway — FastComet Deployment Guide

Reference for deploying this Next.js 16 site on **FastComet** shared hosting (CloudLinux, Node.js 22, cPanel).

---

## Server paths (your account)

| Item | Path |
|------|------|
| App code | `/home/oxydatam/aigateway` |
| Domain entry (`.htaccess`) | `/home/oxydatam/aigateway.my` |
| Node virtualenv | `/home/oxydatam/nodevenv/aigateway/22/bin/activate` |
| GitHub repo | `https://github.com/oxysub/aigateway` |
| Live URL | `https://aigateway.my` |

---

## Important rule

**Do not run `npm run build` on FastComet** for routine deploys.

Shared hosting limits CPU threads and RAM. Server builds fail with:

- `Symlink node_modules is invalid` (Turbopack)
- `Cannot find module '@tailwindcss/postcss'`
- `Cannot find namespace 'React'`
- `spawn node EAGAIN` / `SIGABRT`

**Standard workflow:** build on Mac → upload `.next` → `git pull` for source → restart cPanel app.

---

## cPanel Node.js app settings

In **cPanel → Setup Node.js App**:

| Setting | Value |
|---------|--------|
| Node.js version | `22.22.3` |
| Application mode | `Production` |
| Application root | `aigateway` |
| Application URL | `aigateway.my` |
| Application startup file | `app.js` |

Use **RESTART** in cPanel to start/stop the app. Avoid `npm run start` in SSH unless debugging (port 3000 may already be in use).

---

## Project fixes already in the repo

These were added so Linux/shared hosting builds work when attempted:

### `package.json`

- `build` → `next build --webpack` (not Turbopack)
- `build:local` → production build on Mac
- Build-time packages in **`dependencies`** (not devDependencies):
  - `@tailwindcss/postcss`, `tailwindcss`, `typescript`
  - `@types/react`, `@types/react-dom`, `@types/node`, `@types/nodemailer`

### `next.config.ts`

- `experimental.cpus: 1` — one worker (CloudLinux process limit)
- `experimental.workerThreads: false`
- `experimental.webpackMemoryOptimizations: true`
- Webpack `@` path alias for Linux
- `webpack.parallelism: 1`

### `tsconfig.json`

- `"baseUrl": "."` — required for `@/` imports on Webpack/Linux

### `.npmrc`

```
production=false
```

Keeps devDependencies available if the panel sets `NODE_ENV=production` during install.

### `app.js`

cPanel/Passenger startup file. Starts Next.js HTTP server (required because panel expects `app.js`, not `npm run start`).

### Do not delete

- `/home/oxydatam/aigateway.my/` — domain routing folder
- `/home/oxydatam/aigateway.my/.htaccess` — recreated by cPanel on restart

If deleted by accident:

```bash
mkdir -p /home/oxydatam/aigateway.my
touch /home/oxydatam/aigateway.my/.htaccess
```

Then **Restart** the Node.js app in cPanel (regenerates full `.htaccess`).

---

## Routine deploy (code or UI changes)

### 1. On Mac — commit, push, build

```bash
cd /Users/subrasuppiah/Desktop/oxysub/aigateway

# Stop local dev server first (otherwise .next may be incomplete)
pkill -f "next dev" 2>/dev/null

git add .
git commit -m "Your change description"
git push origin main

# Production build
npm run build:local

# Package for Linux (no macOS xattr warnings)
COPYFILE_DISABLE=1 tar --no-xattrs -czf aigateway-build.tar.gz .next
```

Or use the helper script:

```bash
./scripts/deploy-build-artifact.sh
```

### 2. Upload to FastComet

Upload `aigateway-build.tar.gz` to `/home/oxydatam/aigateway/` via **SFTP** or **cPanel File Manager**.

### 3. On FastComet — pull source + extract build

```bash
cd /home/oxydatam/aigateway
source /home/oxydatam/nodevenv/aigateway/22/bin/activate

git fetch origin main
git reset --hard origin/main    # use if local server edits block pull

git pull origin main

rm -rf .next
tar -xzf aigateway-build.tar.gz
rm aigateway-build.tar.gz
```

`tar: Ignoring unknown extended header keyword LIBARCHIVE.xattr...` warnings are **harmless** (Mac metadata).

### 4. Restart app

**cPanel → Node.js App → RESTART**

### 5. Verify

```bash
ls .next/BUILD_ID .next/server .next/static
git log -1 --oneline
```

Open `https://aigateway.my`.

---

## SSH: npm not found

Plain SSH does not include `npm`. Activate the Node virtualenv first:

```bash
source /home/oxydatam/nodevenv/aigateway/22/bin/activate
which npm
```

Or use full path:

```bash
~/nodevenv/aigateway/22/bin/npm install
```

---

## Contact form (optional)

The `/api/contact` route uses nodemailer. Add in **cPanel → Node.js App → Environment variables** (or `.env` if supported):

| Variable | Example |
|----------|---------|
| `SMTP_HOST` | your mail server |
| `SMTP_PORT` | `587` |
| `SMTP_USER` | mailbox user |
| `SMTP_PASS` | mailbox password |
| `CONTACT_TO` | `subra@aigateway.my` |

Restart the app after changing env vars.

---

## Common errors and fixes

| Error | Cause | Fix |
|-------|--------|-----|
| `git pull` blocked on `package.json` | Edits made on server | `git reset --hard origin/main` then pull |
| `npm: command not found` | Node env not activated | `source ~/nodevenv/aigateway/22/bin/activate` |
| `FileNotFoundError: .../aigateway.my/.htaccess` | Domain folder deleted | Recreate folder + empty `.htaccess`, restart cPanel app |
| `EADDRINUSE :::3000` | App already running | Restart from cPanel; don't run `npm start` in SSH |
| `Cannot find namespace 'React'` | Types not installed | Ensure `@types/*` in `dependencies`; `npm install` |
| `spawn node EAGAIN` / `SIGABRT` | Process/RAM limits | **Build on Mac**, upload `.next` |
| Only 54 packages after `npm install` | Production-only install | Types/Tailwind must be in `dependencies` |
| Site shows old UI after `git pull` | Source updated but not `.next` | Rebuild on Mac and upload new `aigateway-build.tar.gz` |
| Logo looks wrong on dark header | Logo needs white background | Header/footer use white (`components/layout/Header.tsx`, `Footer.tsx`) |

---

## What lives where

```
/home/oxydatam/
├── aigateway/              ← Git repo, package.json, app.js, .next build
│   ├── app/
│   ├── components/
│   ├── public/
│   ├── .next/              ← Upload from Mac (do not build on server)
│   └── app.js              ← cPanel startup file
├── aigateway.my/           ← Domain web root (do NOT delete)
│   └── .htaccess           ← Passenger/proxy config (cPanel manages)
└── nodevenv/aigateway/22/  ← Node 22 + npm
```

---

## Quick checklist

- [ ] Changes committed and pushed from Mac
- [ ] Local dev server stopped before `npm run build:local`
- [ ] `.next/server` and `.next/static` exist after Mac build
- [ ] `aigateway-build.tar.gz` uploaded to server
- [ ] `git pull` on FastComet (no merge conflicts)
- [ ] `.next` extracted on server
- [ ] `aigateway.my/.htaccess` exists
- [ ] cPanel Node.js app **Restarted**
- [ ] Site loads at `https://aigateway.my`

---

## Company details in site

Configured in `lib/constants.ts`:

- `COMPANY.name` — display brand: `AI Gateway`
- `COMPANY.legalName` — footer/contact: `AI Gateway Sdn Bhd`
- Phone: `+60 3-7628 5496`
- Address: Oasis Square, Ara Damansara, Petaling Jaya

---

*Last updated: June 2026 — FastComet Node.js 22, Next.js 16.2.9*
