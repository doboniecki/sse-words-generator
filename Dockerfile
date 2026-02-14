ARG NODE_VERSION=node:24-alpine

FROM node:24-alpine AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable

FROM base AS build

COPY . /app
WORKDIR /app

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm run -r build

RUN pnpm deploy --filter=client --prod /prod/client
RUN pnpm deploy --filter=server --prod /prod/server

FROM base AS client

ARG VITE_SSE_API_BASE_URL
ENV VITE_SSE_API_BASE_URL=$VITE_SSE_API_BASE_URL

COPY --from=build /prod/client /prod/client

WORKDIR /prod/client

EXPOSE 3001

FROM base AS server

COPY --from=build /prod/server /prod/server

WORKDIR /prod/server

EXPOSE 4000

CMD ["node", "dist/index.js"]