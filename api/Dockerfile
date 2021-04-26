FROM golang:alpine

WORKDIR /go/src/dottie

RUN apk add git && go get github.com/codegangsta/gin

COPY . .

RUN go get ./

EXPOSE 42069

CMD ["gin", "run", "main.go"]
