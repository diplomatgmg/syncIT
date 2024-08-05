FROM nginx AS base

RUN rm /etc/nginx/conf.d/default.conf


# DEVELOPMENT
FROM base AS development

COPY ./development/default.conf /etc/nginx/conf.d


# PRODUCTION
FROM base AS production

COPY ./production/default.conf /etc/nginx/conf.d
