DJANGO_CMD=docker compose exec django uv run manage.py

%: # make shell, make test, make makemigrations, etc...
	$(DJANGO_CMD) $@

up:
	docker compose build && docker compose down && docker compose up -d && docker system prune -f

bash:
	docker compose exec django sh

tree:
	tree . -I .venv -I node_modules -I tests -I __fixtures__ -I migrations -I tmp -I logs -I __init__.py -I __pycache__