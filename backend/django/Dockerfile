FROM python:3.12-alpine AS base

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

WORKDIR /project/backend/django

RUN apk add --no-cache curl gcc musl-dev postgresql-dev

RUN pip install --upgrade pip setuptools

COPY ./requirements/base.txt ./requirements/base.txt
RUN --mount=type=cache,target=/root/.cache/pip pip install -r requirements/base.txt

# ================================= #
#           DEVELOPMENT             #
# ================================= #
FROM base AS development

COPY ./requirements/development.txt ./requirements/development.txt
RUN --mount=type=cache,target=/root/.cache/pip pip install -r requirements/development.txt

COPY . .

ENV DJANGO_SETTINGS_MODULE=core.settings.development

CMD ["sh", "startup/development.sh"]


# ================================= #
#           PRODUCTION              #
# ================================= #
FROM base AS production

COPY ./requirements/production.txt ./requirements/production.txt
RUN --mount=type=cache,target=/root/.cache/pip pip install -r requirements/production.txt

COPY . .

ENV DJANGO_SETTINGS_MODULE=core.settings.production

CMD ["sh", "startup/production.sh"]
