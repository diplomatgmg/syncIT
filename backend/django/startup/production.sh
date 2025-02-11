#!/bin/bash

FIXTURES_DIR="__fixtures__"

echo "Migrate database..."
uv run manage.py migrate
echo "Database migrated"

echo "Collecting static files..."
uv run manage.py collectstatic --no-input &

echo "Creating skills..."
uv run manage.py create_skills &

echo "Loading fixtures..."
uv run manage.py create_skills &
uv run manage.py loaddata $FIXTURES_DIR/grades.json &
uv run manage.py loaddata $FIXTURES_DIR/professions.json &
uv run manage.py loaddata $FIXTURES_DIR/work_formats.json &

echo "Checking deployment readiness..."
uv run manage.py check --deploy &

echo "Starting server..."
gunicorn core.wsgi --bind 0.0.0.0:8000
