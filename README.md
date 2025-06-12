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

# Part 2: Scalability & Extension Notes
[Link here to see gist](https://gist.github.com/mrjobosco/039e3c62bf94d1ffad229c1fb5de4772)

# Part 2: Scalability & Extension Notes

## Large file uploads
There are several ways we can improve latency and memory efficiency for large files:
 - Sending the file directly to a cloud storage like AWS S3 using pre-seigned URLs, this bypasses the node server for file upload, this way we will not have to depend on the server's in-momory storage.
 - Alternatively, we have break up the large file into smaller chucks and upload these chucks gradually. This way, the server can keep track of what chuck it has recieved, making it easy to pause and resume the file upload.

## Multiple Companies (100+) Uploading Simultaneously
 - After the files has been uploaded to a cloud storage provider, like AWS S3, we can use queues to process each of these files in a managable fashion. A worker service picks up the file's identifier from the queue, and processes the file that identifier maps to.

## Potential Partial Data (e.g., Incomplete Addresses)
 - When parsing each entry, we can add logic to identify imcomplete data, and have it added to a different queue, and asynchronously have it processed/ geocoded.