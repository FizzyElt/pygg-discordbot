FROM node:18

WORKDIR /app

COPY . .

RUN npm install -g pnpm && pnpm install

RUN pnpm run create

CMD ["pnpm", "run", "start"]