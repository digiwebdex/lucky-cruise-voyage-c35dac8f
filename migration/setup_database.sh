#!/bin/bash
# ============================================
# Lucky Cruise Voyage — Database Setup Script
# Run as root or postgres user on VPS
# ============================================

set -e

echo "🔧 Lucky Cruise Voyage — Database Setup"
echo "========================================"

# Load environment variables
if [ -f .env ]; then
    export $(grep -v '^#' .env | xargs)
fi

DB_NAME="${DB_NAME:-lucky_cruise_db}"
DB_USER="${DB_USER:-lucky_user}"
DB_PASSWORD="${DB_PASSWORD:-changeme}"

echo "📦 Creating database: $DB_NAME"
echo "👤 Creating user: $DB_USER"

# Create user and database
sudo -u postgres psql <<EOF
-- Create user if not exists
DO \$\$
BEGIN
    IF NOT EXISTS (SELECT FROM pg_catalog.pg_roles WHERE rolname = '${DB_USER}') THEN
        CREATE ROLE ${DB_USER} WITH LOGIN PASSWORD '${DB_PASSWORD}';
    END IF;
END
\$\$;

-- Create database if not exists
SELECT 'CREATE DATABASE ${DB_NAME} OWNER ${DB_USER}'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = '${DB_NAME}')\gexec

-- Grant privileges
GRANT ALL PRIVILEGES ON DATABASE ${DB_NAME} TO ${DB_USER};
EOF

echo "✅ Database and user created successfully"
echo ""
echo "Next: Run ./run_migration.sh to import schema"
