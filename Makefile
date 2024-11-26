test:
	docker compose exec django python manage.py test

parse_vacancies:
	docker compose exec django python manage.py parse_vacancies

find_suitable:
	docker compose exec django python manage.py find_suitable_vacancies
