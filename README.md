# UC-FundamentosDevOps-Backend

Repository for a backend project in a DevOps fundamentals course.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode but it will connect to a database of mongodb.\
Open [http://localhost:5000](http://localhost:5000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in a recursive mode with mocha.\

### `npm run dev`

Runs the app in a development mode but the server connects to a localhost mongodb database.\

## Dependencies

You should have a docker-compose file with the following configuration:

```yaml:
version: "3"
services:
  api:
    build:
      dockerfile: Dockerfile
      context: ./backend
    ports:
      - 5000:5000
    volumes:
      - /app/node_modules
      - ./backend:/app
    links:
      - mongodb
  mongodb:
    image: mongo:latest
    ports:
      - 27017:27017
    restart: always
    volumes:
      - data:/data/db
volumes:
  data:
```
