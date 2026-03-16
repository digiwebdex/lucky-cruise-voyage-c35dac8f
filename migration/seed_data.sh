#!/bin/bash
# ============================================
# Lucky Cruise Voyage — Seed Data Script
# Seeds additional data (categories, settings)
# ============================================

set -e

echo "🌱 Lucky Cruise Voyage — Seeding Data"
echo "======================================"

if [ -f ../backend/.env ]; then
    export $(grep -v '^#' ../backend/.env | xargs)
elif [ -f .env ]; then
    export $(grep -v '^#' .env | xargs)
fi

DB_HOST="${DB_HOST:-localhost}"
DB_PORT="${DB_PORT:-5432}"
DB_NAME="${DB_NAME:-lucky_cruise_db}"
DB_USER="${DB_USER:-lucky_user}"
DB_PASSWORD="${DB_PASSWORD:-changeme}"

export PGPASSWORD="$DB_PASSWORD"

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
DB_DIR="$SCRIPT_DIR/../database"

echo "Seeding database..."
psql -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -d "$DB_NAME" -f "$DB_DIR/seed.sql"

echo ""
echo "✅ Data seeded successfully!"

# Verify row counts
echo ""
echo "📊 Row counts:"
for table in site_settings cms_pages seo_entries package_categories admin_users; do
    count=$(psql -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -d "$DB_NAME" -t -c "SELECT COUNT(*) FROM $table;")
    echo "   $table: $count"
done

unset PGPASSWORD
