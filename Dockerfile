# server-om/Dockerfile
FROM node:14

WORKDIR /app

COPY package*.json ./
COPY . .

RUN npm install
RUN npm install webpack --save-dev
RUN npm run build

EXPOSE 4000
CMD npx prisma migrate deploy && npm start
