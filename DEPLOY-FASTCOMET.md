# AI Gateway — FastComet Deployment Guide

Reference for deploying this Next.js 16 site on **FastComet** shared hosting (CloudLinux, Node.js 22, cPanel).

---

## FastComet account reference

| Item | Value |
|------|--------|
| Plan | FastCloud Extra (shared hosting) |
| cPanel user | `oxydatam` |
| Primary domain (account) | `oxydata.my` |
| Site domain | `aigateway.my` |
| SSH hostname | `s11748.sgp1.stableserver.net` |
| SSH port | **22** (confirmed working — see note below) |
| Server IP | `209.42.27.130` |
| Mac public IP (deploy machine) | `115.134.157.177` |
| Client Area | [my.fastcomet.com](https://my.fastcomet.com) |
| Cloud portal (support) | [cloud.fastcomet.com](https://cloud.fastcomet.com/login) |

**Do not use `s11748` alone** as hostname — it will not resolve from your Mac. Use the full FQDN above.

**Port note:** FastComet docs often cite port **17177**, but on this account **17177 times out** and **port 22 works** (confirmed by support and successful `make deploy-fast` on 14 Jun 2026). Keep `SSH_PORT=22` in `.env.deploy`.

---

## Mac SSH access (verified working)

### Mac identity

| Item | Value |
|------|--------|
| Private key | `~/.ssh/id_ed25519` |
| Public key file | `~/Downloads/subra-mac.pub` (same key) |
| cPanel key name | `subra-mac` (authorized) |
| Fingerprint | `SHA256:WRfqL26UtbIHU6gZ3IFTm3yKkUZPsogKZw1qXMp/X2M` |

```bash
cat ~/.ssh/id_ed25519.pub
# ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIMDBQkCKDSE9SRfG63C1o9jZrRLFpLzlyeN2dFmKlspF datosubra@gmail.com
```

### `.env.deploy` on Mac

```bash
cp .env.deploy.example .env.deploy
```

```env
SSH_USER=oxydatam
SSH_HOST=s11748.sgp1.stableserver.net
SSH_PORT=22
REMOTE_TAR=/home/oxydatam/aigateway-build.tar.gz
```

### Test SSH

```bash
cd ~/Desktop/oxysub/aigateway
make check-ssh
```

Expected output:

```
Testing SSH to oxydatam@s11748.sgp1.stableserver.net (port 22)...
SSH OK — s11748.sgp1.stableserver.net
```

Direct SSH (no Makefile):

```bash
ssh -p 22 oxydatam@s11748.sgp1.stableserver.net
# or by IP (support-provided):
ssh -p 22 oxydatam@209.42.27.130
```

SSH uses the `subra-mac` / `id_ed25519` key automatically — no password needed when the key is authorized.

### cPanel SSH keys

**cPanel → Security → SSH Access → Manage SSH Keys**

| Key name | Status |
|----------|--------|
| `subra-mac` | authorized (Mac deploy key) |
| `id_rsa` | authorized (legacy) |

---

## SSH incident resolution (Jun 2026)

What happened and how it was fixed. Reference if SSH breaks again.

### Symptoms we saw

| Symptom | When |
|---------|------|
| `ssh: Could not resolve hostname s11748` | Used short internal hostname |
| `Connection reset by peer` (port 22) | Process limit hit + IP blocked |
| `Operation timed out` (port 17177) | Port not open / not routed on this account |
| Key auth succeeds then disconnects | 80/80 processes + firewall block |
| `CL_VIRTUAL_ENV: unbound variable` | `deploy-remote.sh` sourced nodevenv under `set -u` |

### Root causes (confirmed by FastComet support)

1. **80 concurrent process limit reached** — `lsnode` processes at **80/80 (100%)**
2. **Mac IP firewall-blocked** — `115.134.157.177` blocked after repeated failed SSH attempts
3. **Wrong hostname** — `s11748` is internal-only; need full FQDN
4. **Wrong port in docs** — 17177 times out; port **22** works on this account

### What support did (Sourabh P., FastComet)

- Killed runaway `lsnode` processes → **2/80 (2.5%)**
- Unblocked IP `115.134.157.177`
- Confirmed SSH credentials: host `209.42.27.130`, port **22**, user `oxydatam`

### What we fixed in the repo

| Fix | File |
|-----|------|
| Default SSH port **22**; `.env.deploy` loaded after defaults | `Makefile` |
| `scp` uses `-P` (port), `ssh` uses `-p` | `Makefile` |
| Removed nodevenv `source` (only `git` + `tar` needed) | `scripts/deploy-remote.sh` |
| Documented account, Mac key, incident | `DEPLOY-FASTCOMET.md` |
| Verified `.env.deploy` values | `.env.deploy.example` |

### Successful deploy (14 Jun 2026)

```bash
make check-ssh    # SSH OK
make deploy-fast  # build → scp → git reset → tar extract → Remote deploy OK
# cPanel → Node.js App → RESTART
```

---

## Server paths

| Item | Path |
|------|------|
| App code | `/home/oxydatam/aigateway` |
| Build tar (upload target) | `/home/oxydatam/aigateway-build.tar.gz` |
| Domain entry (`.htaccess`) | `/home/oxydatam/aigateway.my` |
| Node virtualenv | `/home/oxydatam/nodevenv/aigateway/22/bin/activate` |
| GitHub repo | `https://github.com/oxysub/aigateway` |
| Live URL | `https://aigateway.my` |

---

## Important rules

### 1. Never build on the server

**Do not run `npm run build` on FastComet** for routine deploys.

Shared hosting limits CPU threads and RAM. Server builds fail with:

- `Symlink node_modules is invalid` (Turbopack)
- `Cannot find module '@tailwindcss/postcss'`
- `Cannot find namespace 'React'`
- `spawn node EAGAIN` / `SIGABRT`

**Standard workflow:** build on Mac → upload `.next` → `git reset` for source → restart cPanel app.

### 2. Never start Node manually on the server

- Do **not** run `npm run dev` or `npm run start` in SSH/cPanel Terminal
- Use **cPanel → Node.js App → RESTART** only
- Leftover `lsnode`/Node processes hit the **80 concurrent process limit** and break SSH

### 3. Kill local dev server before Mac build

```bash
pkill -f "next dev" 2>/dev/null
```

Otherwise `.next` may be incomplete (missing `server/` or `static/`).

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

Use **RESTART** in cPanel to start/stop the app.

---

## SSH troubleshooting

| Symptom | Likely cause | Fix |
|---------|--------------|-----|
| `Could not resolve hostname s11748` | Internal hostname only | Use `s11748.sgp1.stableserver.net` |
| `Connection reset by peer` | 80/80 processes or IP blocked | FastComet chat: clear `lsnode` processes + unblock IP; stop retrying SSH |
| `Operation timed out` (port 17177) | Port not available on this account | Use **port 22** in `.env.deploy` |
| `Host key verification failed` | First connection | Type `yes`, or `ssh-keyscan -p 22 s11748.sgp1.stableserver.net >> ~/.ssh/known_hosts` |
| `CL_VIRTUAL_ENV: unbound variable` | Old `deploy-remote.sh` sourced nodevenv | Fixed in repo — pull latest `scripts/deploy-remote.sh` |
| Repeated SSH failures | Firewall auto-blocks IP | Stop retrying; contact support |

**Port reference (this account):**

| Port | Behavior |
|------|----------|
| **22** | Works — use for `make deploy` |
| 17177 | Times out — do not use |

### IP whitelist

FastComet may require your public IP on the SSH Access List. The Client Area (`my.fastcomet.com`) often has **no UI** for this — use **live chat**.

```bash
curl -s ifconfig.me && echo   # Mac public IP
```

**Support message template:**

> Please add **115.134.157.177** to the SSH Access List for cPanel user **oxydatam** on server **s11748.sgp1.stableserver.net**. SSH on port **22**. Key **subra-mac** is authorized in cPanel. If processes are at 80/80, please clear lsnode processes and unblock my IP.

---

## Process limit (80 concurrent processes)

FastComet shared hosting enforces **80 concurrent processes** per account.

When exceeded:

- SSH fails with `Connection reset by peer`
- IP may be **auto-blocked** by firewall
- cPanel Terminal may still work

**Check processes** (cPanel Terminal):

```bash
ps aux | grep -E 'lsnode|node|next' | grep -v grep | wc -l
```

**Recovery:**

1. **FastComet live chat** — ask to kill `lsnode` processes and unblock your IP
2. **cPanel → Node.js App → RESTART** (after processes cleared)
3. Do **not** hammer SSH while blocked

---

## Routine deploy

### Option A — Makefile + SSH (primary — verified working)

**One-time setup:**

```bash
cp .env.deploy.example .env.deploy
make check-ssh
```

**Full deploy (git + build + upload + extract):**

```bash
make deploy MSG="Describe your change"
```

**Deploy without git** (code already pushed):

```bash
make deploy-fast
```

**Individual steps:**

```bash
make build-tar          # production build → aigateway-build.tar.gz
make git-push MSG="..." # commit + push to GitHub
make upload             # build-tar + scp to server
make remote-deploy      # git reset + extract .next (tar must already be uploaded)
```

Then **cPanel → Node.js App → RESTART** → https://aigateway.my

**Makefile targets:**

| Target | What it does |
|--------|----------------|
| `check-ssh` | Test SSH to FastComet |
| `build-tar` | Mac production build + tar |
| `upload` | `build-tar` + SCP to `/home/oxydatam/aigateway-build.tar.gz` |
| `remote-deploy` | SSH: `git reset --hard` + extract tar |
| `deploy` | `git-push` + `upload` + `remote-deploy` |
| `deploy-fast` | `upload` + `remote-deploy` (no git) |

---

### Option B — cPanel File Manager + Terminal (fallback)

Use when SSH is blocked or process limit hit.

#### 1. Build on Mac

```bash
cd ~/Desktop/oxysub/aigateway
make build-tar
```

#### 2. Upload

**cPanel → File Manager** → `/home/oxydatam/` → upload `aigateway-build.tar.gz`

#### 3. Extract in cPanel Terminal

```bash
cd /home/oxydatam/aigateway
git fetch origin main
git reset --hard origin/main
rm -rf .next
tar -xzf /home/oxydatam/aigateway-build.tar.gz
ls .next/BUILD_ID .next/server .next/static
```

#### 4. Restart

**cPanel → Node.js App → RESTART**

---

## Project fixes in the repo

### `package.json`

- `build` → `next build --webpack` (not Turbopack)
- `build:local` → production build on Mac
- Build-time packages in **`dependencies`**: Tailwind, TypeScript, `@types/*`

### `next.config.ts`

- `experimental.cpus: 1`, `workerThreads: false` — CloudLinux limits
- Webpack `@` alias, `parallelism: 1`

### `scripts/deploy-remote.sh`

- Runs on server via `make remote-deploy`
- Uses `git fetch` + `git reset --hard` + `tar -xzf`
- Does **not** source nodevenv (avoids `CL_VIRTUAL_ENV` error under strict bash)

### `Makefile` + `.env.deploy`

- Defaults: `SSH_HOST=s11748.sgp1.stableserver.net`, `SSH_PORT=22`
- `.env.deploy` included **after** defaults (overrides work correctly)
- `SCP_OPTS` uses `-P` (capital); `SSH_OPTS` uses `-p` (lowercase)

### `app.js`

cPanel/Passenger startup file for Next.js.

### Do not delete

- `/home/oxydatam/aigateway.my/` and its `.htaccess`

---

## SSH on server: npm not found

Activate nodevenv only when you need `npm` in cPanel Terminal:

```bash
set +u
source /home/oxydatam/nodevenv/aigateway/22/bin/activate
set -u
which npm
```

(`set +u` avoids `CL_VIRTUAL_ENV: unbound variable` on CloudLinux activate scripts.)

---

## Contact form

Add in **cPanel → Node.js App → Environment variables**:

| Variable | Value | Notes |
|----------|--------|--------|
| `SMTP_HOST` | `mail.oxydata.my` | From cPanel → Email → Connect Devices |
| `SMTP_PORT` | `587` | TLS |
| `SMTP_USER` | `subra@oxydata.my` | **Real mailbox** — forwarders cannot send SMTP |
| `SMTP_PASS` | mailbox password | Password for `subra@oxydata.my` |
| `CONTACT_TO` | `subra@aigateway.my` | Enquiries go here → forwards to `subra@oxydata.my` |

**How it works:** The app authenticates with the real mailbox (`subra@oxydata.my`) and sends enquiries **to** `subra@aigateway.my`. Your cPanel forwarder delivers them to `subra@oxydata.my`.

Restart the app after changing env vars.

| Error | Cause | Fix |
|-------|--------|-----|
| Email service is not configured | Missing env vars on server | Add `SMTP_*` in cPanel Node.js app |
| Failed to send message | Wrong SMTP user/password | Use `subra@oxydata.my` (not forwarder address) for `SMTP_USER` |
| 535 Incorrect authentication | Forwarder used as SMTP_USER | Forwarders have no password — use real mailbox |

---

## Common errors and fixes

| Error | Cause | Fix |
|-------|--------|-----|
| `Could not resolve hostname s11748` | Short internal name | `s11748.sgp1.stableserver.net` |
| `Connection reset by peer` | 80/80 processes / IP blocked | FastComet chat: clear lsnode + unblock IP |
| `Operation timed out` (17177) | Wrong port for this account | `SSH_PORT=22` |
| `CL_VIRTUAL_ENV: unbound variable` | nodevenv source under `set -u` | Use updated `deploy-remote.sh` |
| `git pull` conflicts | Server-side edits | `git reset --hard origin/main` |
| `npm: command not found` | Node env not activated | `source` nodevenv with `set +u` first |
| Site shows old UI | Source updated, `.next` stale | Rebuild on Mac + redeploy tar |
| `.next` missing `server/` | Dev server overwrote build | `pkill -f "next dev"` then rebuild |

---

## What lives where

```
/home/oxydatam/
├── aigateway-build.tar.gz  ← Upload from Mac (outside git repo)
├── aigateway/              ← Git repo, app.js, .next
│   ├── .next/              ← Extracted from tar (do not build on server)
│   └── app.js
├── aigateway.my/           ← Domain web root (do NOT delete)
│   └── .htaccess
└── nodevenv/aigateway/22/  ← Node 22 + npm
```

---

## Quick checklist

- [ ] `make check-ssh` passes on Mac
- [ ] Local dev server stopped before build
- [ ] `make deploy-fast` or `make deploy MSG="..."` completes
- [ ] `Remote deploy OK` in output
- [ ] cPanel Node.js app **Restarted**
- [ ] https://aigateway.my loads

---

## Decision guide

```
make check-ssh succeeds?
├── YES → make deploy-fast (or make deploy MSG="...")
└── NO  → Option B: File Manager + cPanel Terminal
         └── FastComet chat: unblock IP + clear lsnode processes
```

---

*Last updated: 14 June 2026 — SSH port 22 verified, `make deploy-fast` successful, server s11748.sgp1.stableserver.net*
