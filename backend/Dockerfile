FROM python:3.12-slim AS base

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /project/backend

RUN apt-get update && apt-get install -y curl && pip install --upgrade pip


# DEVELOPMENT
FROM base AS development

COPY ./requirements/base.txt ./requirements/base.txt
COPY ./requirements/development.txt ./requirements/development.txt
RUN pip install -r requirements/development.txt
COPY . .

ENV DJANGO_SETTINGS_MODULE=core.settings.development

CMD ["sh", "startup/development.sh"]


# PRODUCTION
FROM base AS production

COPY ./requirements/base.txt ./requirements/base.txt
COPY ./requirements/production.txt ./requirements/production.txt
RUN pip install -r requirements/production.txt
COPY . .

ENV DJANGO_SETTINGS_MODULE=core.settings.production

CMD ["sh", "startup/production.sh"]
