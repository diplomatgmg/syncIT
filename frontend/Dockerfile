FROM oven/bun:latest AS base

WORKDIR /project/frontend


COPY ./package.json ./bun.lockb ./
RUN bun install --frozen-lockfilezz
COPY . .


# DEVELOPMENT
FROM base AS development

ENV NODE_ENV=development

CMD ["bun", "run", "dev"]


# PRODUCTION
FROM base AS build

ENV NODE_ENV=production

RUN bun run build


FROM nginx:latest AS production

RUN rm /etc/nginx/conf.d/default.conf
COPY ./nginx.conf /etc/nginx/conf.d
COPY --from=build /project/frontend/dist /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]

