# ---------- build stage ----------
FROM node:18-alpine AS builder
WORKDIR /app
COPY . .
RUN yarn install --frozen-lockfile \
 && yarn workspace server build \
 && yarn workspace client build

# ---------- runtime stage ----------
FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app ./
RUN yarn install --production --frozen-lockfile --ignore-scripts
EXPOSE 3000
ENTRYPOINT ["sh", "./docker/entrypoint.sh"]
