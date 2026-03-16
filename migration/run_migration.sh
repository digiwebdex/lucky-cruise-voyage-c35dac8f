#!/bin/bash
# ============================================
# Lucky Cruise Voyage — Run Migration Script
# Imports schema and seed data into PostgreSQL
# ============================================

set -e

echo "🚀 Lucky Cruise Voyage — Running Migration"
echo "============================================"

# Load environment variables
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

echo ""
echo "📋 Connection: $DB_USER@$DB_HOST:$DB_PORT/$DB_NAME"
echo ""

# Step 1: Import schema
echo "1️⃣  Importing schema..."
psql -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -d "$DB_NAME" -f "$DB_DIR/schema.sql"
echo "   ✅ Schema imported"

# Step 2: Import seed data
echo "2️⃣  Importing seed data..."
psql -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -d "$DB_NAME" -f "$DB_DIR/seed.sql"
echo "   ✅ Seed data imported"

# Step 3: Verify
echo "3️⃣  Verifying tables..."
TABLE_COUNT=$(psql -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -d "$DB_NAME" -t -c "SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = 'public' AND table_type = 'BASE TABLE';")
echo "   📊 Total tables: $TABLE_COUNT"

echo ""
echo "✅ Migration complete!"
echo ""
echo "Tables created:"
psql -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -d "$DB_NAME" -c "\dt public.*"

unset PGPASSWORD
