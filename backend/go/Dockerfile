FROM golang:1.23-alpine AS base

WORKDIR /project/backend/go

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

RUN go build -o main .

CMD ["./main"]
