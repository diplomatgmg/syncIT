FROM python:3.12-slim AS base

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /project/django

COPY ./requirements/base.txt ./requirements/base.txt

RUN apt update && \
    apt upgrade && \
    apt install curl -y && \
    pip install --upgrade pip && \
    pip install setuptools


# =============================== #
#           DEVELOPMENT           #
# =============================== #
FROM base AS development

COPY ./requirements/development.txt ./requirements/development.txt
RUN --mount=type=cache,target=/root/.cache/pip pip install -r requirements/development.txt
COPY . .

ENV DJANGO_SETTINGS_MODULE=core.settings.development

CMD ["sh", "startup/development.sh"]


# =============================== #
#            PRODUCTION           #
# =============================== #
FROM base AS production

COPY ./requirements/production.txt ./requirements/production.txt
RUN --mount=type=cache,target=/root/.cache/pip pip install -r requirements/production.txt
COPY . .

ENV DJANGO_SETTINGS_MODULE=core.settings.production

CMD ["sh", "startup/production.sh"]
