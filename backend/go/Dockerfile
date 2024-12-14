FROM golang:1.23-alpine AS base

WORKDIR /project/backend/go

RUN apk add --no-cache curl

COPY go.mod go.sum ./
RUN go mod tidy

COPY . .


# =============================== #
#           DEVELOPMENT           #
# =============================== #
FROM base AS development

RUN go install github.com/air-verse/air@latest

CMD ["air"]


# =============================== #
#            PRODUCTION           #
# =============================== #
FROM base AS production

CMD go build -o main . && ./main
