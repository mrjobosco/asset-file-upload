# Asset File Upload

This project contains both backend and frontend applications for asset file uploading.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (version 14 or higher recommended)
- [npm](https://www.npmjs.com/)

### Installation & Running

You can start both the backend and frontend apps together or individually.

#### Start Both Apps

From the project root directory, run:

```
npm run start
```

This will:

- Install dependencies for both backend and frontend
- Build both apps
- Start both servers concurrently

#### Start Backend Only

```
cd backend
npm install
npm run build
npm run start
```

#### Start Frontend Only

```
cd frontend
npm install
npm run build
npm run start
```

## Project Structure

```
backend/   # Backend application (API server)
frontend/  # Frontend application (Next.js)
```

## Environment Variables

The frontend uses environment variables defined in `.env.local`.  
See `.env.sample` for reference.

# 