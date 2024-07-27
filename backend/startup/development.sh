FIXTURES_DIR="__fixtures__"


echo "Creating migrations..."
python manage.py makemigrations
echo "Migrations created"

echo "Migrate database..."
python manage.py migrate
echo "Database migrated"

echo "Loading fixtures..."
#python manage.py create_hard_skills
#python manage.py loaddata $FIXTURES_DIR/grades.json
#python manage.py loaddata $FIXTURES_DIR/work_formats.json
#python manage.py loaddata $FIXTURES_DIR/professions.json
echo "Fixtures loaded"

echo "Create superuser..."
python manage.py createsuperuser --noinput
echo "Superuser created"

echo "Starting server..."
python manage.py runserver_plus 0.0.0.0:8000
