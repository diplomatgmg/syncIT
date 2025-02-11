#!/bin/bash

FIXTURES_DIR="__fixtures__"

echo "Migrate database..."
uv run manage.py migrate
echo "Database migrated"

load_fixtures() {
    echo "Waiting for server to be ready..."
    until curl -s http://0.0.0.0:8000/health-check/ > /dev/null; do
        sleep 1
    done

    echo "Loading fixtures..."
    uv run manage.py create_skills &
    for fixture in $FIXTURES_DIR/*.json; do
        uv run manage.py loaddata "$fixture" &
    done
    echo "Fixtures loaded"
    wait
}

echo "Starting server..."
uv run manage.py runserver_plus 0.0.0.0:8000 &
echo "Server started"

echo "Create superuser..."
uv run manage.py createsuperuser --noinput &
echo "Superuser created"

load_fixtures
