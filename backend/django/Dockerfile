FROM python:3.12-alpine AS base

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

WORKDIR /project/backend/django

RUN apk update &&  \
    apk upgrade && \
    apk add --no-cache curl

COPY ./requirements/base.txt ./requirements/base.txt
RUN --mount=type=cache,target=/root/.cache/pip pip install --upgrade pip && \
    pip install --prefer-binary -r requirements/base.txt

# ================================= #
#           DEVELOPMENT             #
# ================================= #
FROM base AS development

ENV DJANGO_SETTINGS_MODULE=core.settings.development

COPY ./requirements/development.txt ./requirements/development.txt
RUN --mount=type=cache,target=/root/.cache/pip pip install --prefer-binary -r requirements/development.txt

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

COPY ./requirements/production.txt ./requirements/production.txt
RUN --mount=type=cache,target=/root/.cache/pip pip install --prefer-binary -r requirements/production.txt

COPY . .

CMD ["sh", "startup/production.sh"]
