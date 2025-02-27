#!/bin/bash


echo "Migrate database..."
uv run manage.py migrate

echo "Creating skills..."
uv run manage.py create_skills &

echo "Collecting static files..."
uv run manage.py collectstatic --no-input &

echo "Checking deployment readiness..."
uv run manage.py check --deploy &

echo "Starting server..."
gunicorn core.wsgi --bind 0.0.0.0:8000
