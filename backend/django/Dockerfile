FROM python:3.12-alpine AS base

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    UV_COMPILE_BYTECODE=1 \
    UV_LINK_MODE=copy

COPY --from=ghcr.io/astral-sh/uv:0.5.9 /uv /uvx /bin/

WORKDIR /project/backend/django

RUN apk update &&  \
    apk upgrade && \
    apk add --no-cache curl

# ================================= #
#           DEVELOPMENT             #
# ================================= #
FROM base AS development

ENV DJANGO_SETTINGS_MODULE=core.settings.development

COPY ./requirements/base.txt ./requirements/development.txt ./requirements/
RUN --mount=type=cache,target=/root/.cache/uv uv pip install --system -r requirements/development.txt

COPY . .

# ipython hotreload
RUN ipython profile create && \
    echo "c.InteractiveShellApp.extensions = ['autoreload']" >> ~/.ipython/profile_default/ipython_config.py && \
    echo "c.InteractiveShellApp.exec_lines = ['%autoreload 2']" >> ~/.ipython/profile_default/ipython_config.py

CMD ["sh", "startup/development.sh"]

# ================================= #
#           PRODUCTION              #
# ================================= #
FROM base AS production

ENV DJANGO_SETTINGS_MODULE=core.settings.production

COPY ./requirements/base.txt ./requirements/production.txt ./requirements/
RUN --mount=type=cache,target=/root/.cache/uv uv pip install --system -r requirements/production.txt

COPY . .

CMD ["sh", "startup/production.sh"]