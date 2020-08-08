FROM alpine
LABEL maintainer='workingxue@gmail.com'
RUN apk add --update nodejs nodejs-npm
COPY . /src
WORKDIR /src
RUN npm install
EXPOSE 1234
ENTRYPOINT ["parcel","./index.js"]