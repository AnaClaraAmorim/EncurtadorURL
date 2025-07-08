# URL Shortener

This project is a URL shortener API built with Node.js and Express. It allows users to generate short links that redirect to original long URLs. It also supports authentication and access logging.

## Features

- URL shortening
- Redirection to original URLs
- Request authentication
- Access logging
- Docker and Docker Compose support

## Technologies Used

- Node.js
- Express
- MongoDB (with Mongoose)
- Redis (with ioredis)
- JSON Web Tokens (JWT)
- Docker and Docker Compose

## Project Structure

```
src/
├── factories/           # Object factories (e.g., link generation)
├── middlewares/         # Authentication and request handling
├── models/              # Mongoose schemas (Link, Log)
├── routes/              # API and redirection routes
├── utils/               # Utility functions and custom error classes
└── server.js            # Application entry point
```

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- Docker and Docker Compose (optional)

### Clone the Repository

```bash
git clone https://github.com/your-username/url-shortener.git
cd url-shortener
```

### Running with Docker

```bash
docker-compose up --build
```

The application will be available at: http://localhost:3000

### Running Locally Without Docker

1. Install dependencies:

```bash
npm install
```

2. Make sure you have a MongoDB instance running locally (default: `mongodb://localhost:27017/mydb`).

3. Start the application:

```bash
npm start
```

## Authentication

Some routes are protected and require authentication via middleware. The project supports basic authentication and JWT. You can review the authentication logic in `src/middlewares/authentication.js`.

## Scripts

Available npm scripts:

- `npm start`: Runs the server
- `npm test`: Placeholder test script
