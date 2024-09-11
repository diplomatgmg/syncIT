test:
	docker compose exec backend python manage.py test

parse_vacancies:
	docker compose exec backend python manage.py parse_vacancies

find_suitable:
	docker compose exec backend python manage.py find_suitable_vacancies
