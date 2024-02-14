FROM node:20.11-slim

WORKDIR /app

COPY . .

RUN npm install -g pnpm && pnpm install

RUN pnpm run create

CMD ["pnpm", "run", "start"]