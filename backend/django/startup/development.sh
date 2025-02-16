#!/bin/bash


echo "Migrate database..."
uv run manage.py migrate
echo "Database migrated"

echo "Clear cache..."
uv run manage.py clear_cache

echo "Create superuser..."
uv run manage.py createsuperuser --noinput &

echo "Creating skills..."
uv run manage.py create_skills &

echo "Starting server..."
uv run manage.py runserver_plus 0.0.0.0:8000
echo "Server started"