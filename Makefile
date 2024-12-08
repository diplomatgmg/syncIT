DJANGO_CMD=docker compose exec django python manage.py

%: # make shell, make test, make makemigrations, etc...
	$(DJANGO_CMD) $@
