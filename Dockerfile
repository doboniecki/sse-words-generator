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

COPY --from=build /prod/client /prod/client

WORKDIR /prod/client

EXPOSE 3001

CMD ["pnpm", "preview"]

FROM base AS server

COPY --from=build /prod/server /prod/server

WORKDIR /prod/server

EXPOSE 3000

CMD ["pnpm", "start"]