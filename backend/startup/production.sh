FIXTURES_DIR="__fixtures__"


echo "Migrate database..."
python manage.py migrate
echo "Database migrated"

echo "Collecting static files..."
python manage.py collectstatic --no-input
echo "Static files collected"

echo "Loading fixtures..."
python manage.py create_hard_skills
python manage.py loaddata $FIXTURES_DIR/grades.json
python manage.py loaddata $FIXTURES_DIR/professions.json
python manage.py loaddata $FIXTURES_DIR/work_formats.json
echo "Fixtures loaded"


echo "Checking deployment readiness..."
python manage.py check --deploy
echo "Deployment readiness checked"

echo "Starting server..."
gunicorn core.wsgi:application --bind 0.0.0.0:8000

