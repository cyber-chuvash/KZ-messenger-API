FROM node:12.14-alpine

COPY . /app
WORKDIR /app

RUN npm install --production
EXPOSE 80

CMD ["node", "app.js"]

