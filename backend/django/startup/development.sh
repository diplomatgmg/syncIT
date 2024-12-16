#!/bin/bash

FIXTURES_DIR="__fixtures__"

echo "Migrate database..."
python manage.py migrate
echo "Database migrated"

load_fixtures() {
    echo "Waiting for server to be ready..."
    until curl -s http://0.0.0.0:8000/health-check/ > /dev/null; do
        sleep 1
    done

    echo "Server is ready. Loading fixtures..."
    python manage.py create_hard_skills &
    for fixture in $FIXTURES_DIR/*.json; do
        python manage.py loaddata "$fixture" &
    done
    echo "Fixtures loaded"
    wait
}

echo "Starting server..."
python manage.py runserver_plus 0.0.0.0:8000 &

echo "Create superuser..."
python manage.py createsuperuser --noinput &
echo "Superuser created"

load_fixtures
