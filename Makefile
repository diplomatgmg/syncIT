DJANGO_CMD=docker compose exec django uv run manage.py

%: # make shell, make test, make makemigrations, etc...
	$(DJANGO_CMD) $@

up:
	docker compose down && docker compose up --build -d && docker system prune -f

bash:
	docker compose exec django sh
