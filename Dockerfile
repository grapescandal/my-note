FROM node:20-alpine AS builder
WORKDIR /app
# copy package manifest and yarn lock for deterministic installs
COPY package.json yarn.lock ./
# install all dependencies (dev deps needed for build)
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn build

FROM nginx:alpine
COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
