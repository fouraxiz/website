#!/usr/bin/env bash
# Nightly backup of the database and uploaded images.
# Install:  sudo crontab -e  →  30 2 * * * /opt/fouraxiz-website/deploy/backup.sh >> /var/log/fouraxiz-backup.log 2>&1
# Optional off-site copy: set SPACES_BUCKET (e.g. s3://my-bucket/fouraxiz) and configure `s3cmd` for DigitalOcean Spaces.
set -euo pipefail

APP_DIR="${APP_DIR:-/opt/fouraxiz-website}"
BACKUP_DIR="${BACKUP_DIR:-$APP_DIR/backups}"
KEEP_DAYS="${KEEP_DAYS:-14}"
STAMP="$(date +%Y-%m-%d_%H%M)"

mkdir -p "$BACKUP_DIR"
cd "$APP_DIR"

docker compose exec -T db pg_dump -U fouraxiz -d fouraxiz --format=custom > "$BACKUP_DIR/db_$STAMP.dump"
tar -czf "$BACKUP_DIR/uploads_$STAMP.tar.gz" -C deploy/data uploads

find "$BACKUP_DIR" -type f -mtime +"$KEEP_DAYS" -delete

if [[ -n "${SPACES_BUCKET:-}" ]] && command -v s3cmd >/dev/null; then
  s3cmd put "$BACKUP_DIR/db_$STAMP.dump" "$BACKUP_DIR/uploads_$STAMP.tar.gz" "$SPACES_BUCKET/" --quiet
fi

echo "$(date -Is) backup ok: db_$STAMP.dump uploads_$STAMP.tar.gz"
