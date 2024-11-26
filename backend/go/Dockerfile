FROM golang:1.23-alpine

WORKDIR /project/go

COPY go.mod go.sum ./
RUN go mod tidy

COPY . .

RUN go build -o main .

CMD ["./main"]