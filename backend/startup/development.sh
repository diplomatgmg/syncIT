#!/bin/bash

FIXTURES_DIR="__fixtures__"


echo "Migrate database..."
python manage.py migrate
echo "Database migrated"

echo "Create superuser..."
python manage.py createsuperuser --noinput &
echo "Superuser created"

echo "Loading fixtures..."
python manage.py create_hard_skills &
python manage.py loaddata $FIXTURES_DIR/grades.json &
python manage.py loaddata $FIXTURES_DIR/companies.json &
python manage.py loaddata $FIXTURES_DIR/work_formats.json &
python manage.py loaddata $FIXTURES_DIR/professions.json &
python manage.py loaddata $FIXTURES_DIR/parsed_vacancies.json &
python manage.py loaddata $FIXTURES_DIR/vacancies.json &
python manage.py loaddata $FIXTURES_DIR/profiles.json &
python manage.py loaddata $FIXTURES_DIR/user_vacancies.json &
wait
echo "Fixtures loaded"

echo "Starting server..."
python manage.py runserver_plus 0.0.0.0:8000
