FROM node:18-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

RUN npm i -g serve

COPY . .

RUN npm run build

ENV NODE_ENV=production
ENV VITE_ENV=production

EXPOSE 3000

CMD [ "serve", "-s", "dist" ]
