# Deploying to the DigitalOcean VPS

The site runs as three Docker containers on one droplet:

| Container | What it does |
| --- | --- |
| `db` | PostgreSQL 16. Data is stored in `deploy/data/postgres`, and it is not reachable from the internet. |
| `migrate` | Runs at every deploy: applies database migrations and syncs content from `/data` (content edited on the website is never overwritten). Then it stops. |
| `web` | The Next.js website, on `127.0.0.1:3000`. Uploaded images go to `deploy/data/uploads`. |

Nginx on the host handles the domain and HTTPS, and proxies requests to the `web` container.

**Droplet size:** at least **2 GB RAM**, because the image is built on the server. On a 1 GB droplet, add swap first (step 1).

---

## 1. Prepare the server (once)

```bash
# Ubuntu 22.04 / 24.04, as root or with sudo
apt update && apt upgrade -y
apt install -y ca-certificates curl git nginx certbot python3-certbot-nginx

# Docker Engine + Compose plugin
curl -fsSL https://get.docker.com | sh

# Firewall: only SSH and web traffic
ufw allow OpenSSH && ufw allow 'Nginx Full' && ufw --force enable

# (1 GB droplets only) 2 GB swap so the build doesn't run out of memory
fallocate -l 2G /swapfile && chmod 600 /swapfile && mkswap /swapfile && swapon /swapfile
echo '/swapfile none swap sw 0 0' >> /etc/fstab
```

Point your domain's **A record** (and `www`) at the droplet's IP address.

## 2. Get the code

Add a read-only **deploy key** for `fouraxiz/website` (GitHub → Settings → Deploy keys), then:

```bash
mkdir -p /opt && cd /opt
git clone git@github.com:fouraxiz/website.git fouraxiz-website
cd fouraxiz-website
```

## 3. Configure secrets

Create `/opt/fouraxiz-website/.env`. It is never committed.

```bash
cat > .env <<EOF
POSTGRES_PASSWORD=$(openssl rand -base64 32 | tr -d '/+=')
SESSION_SECRET=$(openssl rand -base64 48 | tr -d '\n')
NEXT_PUBLIC_SITE_URL=https://fouraxiz.com
CONTACT_WEBHOOK_URL=
EOF
chmod 600 .env

mkdir -p deploy/data/uploads && chown -R 1001:1001 deploy/data/uploads
```

## 4. Start the site

```bash
docker compose up -d --build
docker compose ps            # web should show "healthy"
curl -s 127.0.0.1:3000/api/health
```

The first start creates the tables and loads the initial content.

## 5. Create the first admin

```bash
docker compose run --rm migrate npm run user:create -- you@4axiz.com 'a-strong-password' "Your Name" admin
```

Sign in at `https://your-domain/login`. Admins add more editors from the **Editors** button in the edit toolbar, so no server access is needed for that.

## 6. Nginx + HTTPS

```bash
cp deploy/nginx/fouraxiz.conf /etc/nginx/sites-available/fouraxiz.conf
# edit server_name if your domain differs
ln -s /etc/nginx/sites-available/fouraxiz.conf /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default
nginx -t && systemctl reload nginx
certbot --nginx -d fouraxiz.com -d www.fouraxiz.com   # free SSL, auto-renews
```

## 7. Nightly backups

```bash
crontab -e
# add:
30 2 * * * /opt/fouraxiz-website/deploy/backup.sh >> /var/log/fouraxiz-backup.log 2>&1
```

Backups go to `/opt/fouraxiz-website/backups` (kept for 14 days). To also copy them off the server, configure `s3cmd` for DigitalOcean Spaces and set `SPACES_BUCKET=s3://your-bucket/fouraxiz` in the cron line.

**Restore**

```bash
docker compose exec -T db pg_restore -U fouraxiz -d fouraxiz --clean < backups/db_YYYY-MM-DD_HHMM.dump
tar -xzf backups/uploads_YYYY-MM-DD_HHMM.tar.gz -C deploy/data
```

## 8. Automatic deploys from GitHub

Every push to `main` runs lint, type-check and build in GitHub Actions, then deploys over SSH. Add these repository secrets (GitHub → Settings → Secrets and variables → Actions):

| Secret | Value |
| --- | --- |
| `VPS_HOST` | Droplet IP or hostname |
| `VPS_USER` | SSH user that can run `docker` (e.g. `root` or a user in the `docker` group) |
| `VPS_SSH_KEY` | Private key whose public key is in that user's `~/.ssh/authorized_keys` |
| `VPS_PORT` | Optional, defaults to 22 |

Until `VPS_HOST` is set, the deploy step is skipped and the checks still run.

**Manual update:** `cd /opt/fouraxiz-website && git pull && docker compose up -d --build`

## Useful commands

```bash
docker compose logs -f web          # website logs
docker compose logs migrate         # migration output from the last deploy
docker compose exec db psql -U fouraxiz fouraxiz   # database shell
docker compose restart web
```
