FROM node:20-alpine AS builder
# Allow build-time API URL so CRA inlines the value during `yarn build`
ARG REACT_APP_API_URL
ENV REACT_APP_API_URL=${REACT_APP_API_URL}
WORKDIR /app
# copy package manifest and yarn lock for deterministic installs
COPY package.json yarn.lock ./
# install all dependencies (dev deps needed for build)
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn build

FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/build ./build
RUN npm i -g serve
EXPOSE 80
CMD ["serve", "-s", "build", "-l", "80"]
