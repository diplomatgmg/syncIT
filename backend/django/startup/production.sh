#!/bin/bash

FIXTURES_DIR="__fixtures__"

echo "Migrate database..."
uv run manage.py migrate
echo "Database migrated"

echo "Collecting static files..."
uv run manage.py collectstatic --no-input
echo "Static files collected"

echo "Loading fixtures..."
uv run manage.py create_hard_skills &
uv run manage.py loaddata $FIXTURES_DIR/grades.json &
uv run manage.py loaddata $FIXTURES_DIR/professions.json &
uv run manage.py loaddata $FIXTURES_DIR/work_formats.json &
echo "Fixtures loaded"

echo "Checking deployment readiness..."
uv run manage.py check --deploy
echo "Deployment readiness checked"

echo "Starting server..."
gunicorn core.wsgi --bind 0.0.0.0:8000
