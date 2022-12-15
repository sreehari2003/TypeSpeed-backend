# base image
FROM golang:1.16

WORKDIR /
COPY / .

RUN go get -d -u
RUN GO BUILD -V

CMD ["./TYPESPEED"]