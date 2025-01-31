# Facebook Video Platform

*A full-stack application for fetching Facebook video details, comments, and playback URLs.*

## Project Structure
```
facebook-video
 ├── backend/       # Express backend (API)
 ├── frontend/      # Vite + React frontend
 ├── .gitignore     # Global Git ignore rules
 ├── README.md      # Project documentation
```

## Setup & Installation

### 1. Install Dependencies
```sh
cd backend && npm install
cd frontend && npm install
```

### 2. Configure Environment Variables
Create a `.env` file in both `backend/` and `frontend/`.

#### Backend (`backend/.env`)
```
FACEBOOK_ACCESS_TOKEN=your_access_token
NODE_ENV=development
PORT=3000
```
#### Frontend (`frontend/.env`)
```
VITE_API_BASE_URL=http://localhost:3000
VITE_VIDEO_ID=your_video_id

```

### 3. Start the Project
```sh
cd backend && nodemon Server.js  # Start backend server
cd frontend && npm run dev  # Start frontend server
```

## API Endpoints

| ***Method*** | ***Endpoint***                  | ***Description***                   |
|-------------|--------------------------------|----------------------------------|
| **GET**    | `/video/details/:id`        | Fetch video details          |
| **GET**    | `/video/comments/:id`       | Fetch video comments         |
| **GET**    | `/video/playback/:id`       | Fetch video playback URL     |

## License
MIT License

