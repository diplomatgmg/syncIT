FROM python:3.12-alpine AS base

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /project/backend

COPY ./requirements/base.txt ./requirements/base.txt
RUN pip install --upgrade pip && \
    pip install --no-cache-dir -r requirements/base.txt && \
    pip install setuptools


# DEVELOPMENT
FROM base AS development

COPY ./requirements/development.txt ./requirements/development.txt
RUN pip install --no-cache-dir -r requirements/development.txt
COPY . .

ENV DJANGO_SETTINGS_MODULE=core.settings.development

CMD ["sh", "startup/development.sh"]


# PRODUCTION
FROM base AS production

COPY ./requirements/production.txt ./requirements/production.txt
RUN pip install --no-cache-dir -r requirements/production.txt
COPY . .

ENV DJANGO_SETTINGS_MODULE=core.settings.production

CMD ["sh", "startup/production.sh"]
