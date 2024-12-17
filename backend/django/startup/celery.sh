#!/bin/bash

if [ -z "$1" ]; then
  echo "Ошибка: Не указан аргумент для команды (worker, beat, flower)"
  exit 1
fi

command=$1

if [ "$BUILD_TARGET" == "development" ]; then
  uv run manage.py celery_autoreload "$command"
else
  celery -A core.celery.app "$command" -l "${CELERY_LOG_LEVEL}"
fi
