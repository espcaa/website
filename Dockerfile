FROM oven/bun:1 AS build
WORKDIR /app
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile
COPY . .
ARG GIT_COMMIT_SHA
ARG GIT_COMMIT_MSG
ENV GIT_COMMIT_SHA=${GIT_COMMIT_SHA}
ENV GIT_COMMIT_MSG=${GIT_COMMIT_MSG}
RUN bun run build

FROM node:22-slim
WORKDIR /app
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
ENV HOST=0.0.0.0
ENV PORT=4321
EXPOSE 4321
CMD ["node", "dist/server/entry.mjs"]