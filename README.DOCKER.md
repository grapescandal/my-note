Docker Compose for my-note

Quick commands:

Build and start (builds image from local `Dockerfile`):

```bash
docker-compose up --build -d
```

Stop and remove:

```bash
docker-compose down
```

Logs:

```bash
docker-compose logs -f
```

Notes:

- The service maps host port `8080` to container port `80`.
- The `Dockerfile` in the repo currently runs `npm ci` which expects a `package-lock.json`. If you use Yarn, edit the `Dockerfile` to use `yarn install` and `yarn build`, or generate a `package-lock.json` locally.
- For development you can mount `./build` into the container by uncommenting the `volumes` section in `docker-compose.yml` (but ensure you've run `yarn build`/`npm run build` locally first).
