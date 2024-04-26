FROM node:alpine

WORKDIR /app

COPY package*.json ./

COPY prisma ./prisma

COPY tsconfig.json ./

COPY .env ./

COPY . .

RUN npm install

RUN npx prisma generate

EXPOSE 8080

CMD [ "npm", "start" ]