# Spik-X - Modern Movie Streaming Platform with Watch Party

![Spik-X](https://img.shields.io/badge/Spik--X-Movie%20Platform-green?style=for-the-badge)
![React](https://img.shields.io/badge/React-18.x-blue?style=flat-square)
![Node.js](https://img.shields.io/badge/Node.js-Express-green?style=flat-square)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-blue?style=flat-square)
![Socket.io](https://img.shields.io/badge/Socket.io-Real--time-orange?style=flat-square)

A modern, full-stack movie streaming platform that allows users to watch movies solo or together with friends in real-time watch parties. Built with React, Node.js, PostgreSQL, and Socket.io.

## ✨ Features

### 🎬 Core Features

- **Movie Streaming**: Watch high-quality movies with adaptive streaming
- **Watch Party**: Create or join rooms to watch movies together with friends
- **Real-time Chat**: Chat with friends while watching movies
- **User Authentication**: Secure login/register system with JWT tokens
- **Movie Discovery**: Browse trending and top-rated movies
- **Search & Filter**: Find movies by title, genre, and other criteria

### 🎯 Watch Party Features

- **Room Creation**: Create public or private watch parties
- **Password Protection**: Secure private rooms with passwords
- **Synchronized Playback**: Host controls ensure everyone watches together
- **Real-time Communication**: Chat with participants during the movie
- **Room Management**: View room details, members, and join/leave functionality

### 🎨 User Experience

- **Modern UI**: Dark theme with smooth transitions and animations
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Hero Banners**: Featured movie showcases with trailers and details
- **Movie Information**: Detailed pages with cast, crew, and metadata
- **Interactive Elements**: Hover effects, loading states, and smooth navigation

## 🛠️ Tech Stack

### Frontend

- **React 19.1.1** - Modern UI library with hooks
- **Vite** - Fast build tool and development server
- **React Router DOM** - Client-side routing
- **Tailwind CSS 4.x** - Utility-first CSS framework
- **Heroicons** - Beautiful SVG icons
- **Axios** - HTTP client for API requests
- **Socket.io Client** - Real-time communication

### Backend

- **Node.js** - JavaScript runtime
- **Express 5.x** - Web application framework
- **Socket.io** - Real-time bidirectional communication
- **Prisma** - Modern database toolkit and ORM
- **PostgreSQL** - Relational database
- **JWT** - JSON Web Tokens for authentication
- **bcrypt** - Password hashing
- **Cookie Parser** - HTTP cookie parsing
- **CORS** - Cross-origin resource sharing

### External Services

- **TMDB API** - Movie metadata and images
- **Jellyfin** - Media server for movie files

## 📁 Project Structure

```
Spikx/
├── Backend/
│   ├── prisma/
│   │   ├── schema.prisma          # Database schema
│   │   └── migrations/            # Database migrations
│   ├── src/
│   │   ├── chat/
│   │   │   └── socketHandler.js   # Socket.io event handlers
│   │   ├── config/
│   │   │   ├── dbconfig.js        # Database configuration
│   │   │   └── ipconfig.js        # IP configuration
│   │   ├── controllers/           # Route controllers
│   │   ├── middleware/            # Express middleware
│   │   ├── routes/                # API routes
│   │   ├── services/              # Business logic
│   │   └── utils/                 # Utility functions
│   ├── package.json
│   └── server.js                  # Main server file
└── Frontend/
    └── frontend/
        ├── src/
        │   ├── api/               # API service functions
        │   ├── components/        # Reusable React components
        │   ├── context/           # React context providers
        │   ├── hooks/             # Custom React hooks
        │   ├── interceptors/      # Axios interceptors
        │   ├── pages/             # Page components
        │   └── routes/            # Routing configuration
        ├── package.json
        └── vite.config.js
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- PostgreSQL database
- TMDB API key
- Jellyfin media server (optional, for movie streaming)

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd Spikx
   ```

2. **Backend Setup**

   ```bash
   cd Backend
   npm install
   ```

3. **Frontend Setup**
   ```bash
   cd Frontend/frontend
   npm install
   ```

### Environment Configuration

Create `.env` files in the Backend directory:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/spikx"

# JWT Secrets
ACCESS_TOKEN_SECRET_KEY="your-access-token-secret"
REFRESH_TOKEN_SECRET_KEY="your-refresh-token-secret"

# TMDB API
TMDB_API_KEY="your-tmdb-api-key"
TMDB_BASE_URL="https://api.themoviedb.org/3"

# Jellyfin (Optional)
JELLYFIN_PORT=8096
JELLYFIN_API_KEY="your-jellyfin-api-key"

# Server
PORT=3000
```

Create `.env` file in the Frontend/frontend directory:

```env
VITE_NODE_BASE_URL="http://localhost:3000/api"
VITE_SOCKET_BASE_URL="http://localhost:3000"
VITE_TMDB_IMAGE_BASE_URL="https://image.tmdb.org/t/p/w500"
VITE_TMDB_ORIGINAL_IMAGE_BASE_URL="https://image.tmdb.org/t/p/original"
```

### Database Setup

1. **Initialize Prisma**

   ```bash
   cd Backend
   npx prisma generate
   npx prisma db push
   ```

2. **Run migrations**
   ```bash
   npx prisma migrate deploy
   ```

### Running the Application

1. **Start the Backend**

   ```bash
   cd Backend
   npm run dev
   ```

2. **Start the Frontend**

   ```bash
   cd Frontend/frontend
   npm run dev
   ```

3. **Access the application**
   - Frontend: `http://localhost:5173`
   - Backend API: `http://localhost:3000`

## 📊 Database Schema

### Core Models

- **User**: User accounts and authentication
- **Room**: Watch party rooms with settings
- **Movies**: Movie metadata and file references
- **Sessions**: User session management for authentication

### Key Relationships

- Users can create multiple rooms
- Rooms have one current movie
- Movies can be used in multiple rooms
- Users can have multiple active sessions

## 🎯 API Endpoints

### Authentication

- `POST /api/auth/login` - User login
- `POST /api/auth/refresh` - Refresh access token
- `POST /api/auth/logout` - User logout

### Users

- `POST /api/users/register` - User registration
- `GET /api/users/getUserDetails` - Get user profile

### Movies

- `GET /api/movies/getAllMovies` - Get all available movies
- `GET /api/movies/getMovieByTmdb/:id` - Get movie by TMDB ID
- `GET /api/movies/getSignedUrl/:id` - Get signed streaming URL

### Rooms

- `POST /api/rooms/createRoom` - Create a new watch party room
- `GET /api/rooms/getRooms` - Get all active rooms
- `POST /api/rooms/joinRoom` - Join a room (with password if private)
- `GET /api/rooms/getRoom/:id` - Get room details

### TMDB Integration

- `GET /api/tmdb/trending` - Get trending movies
- `GET /api/tmdb/top-rated` - Get top-rated movies
- `GET /api/tmdb/logo/:movieId/:mediaType` - Get movie logos/images
- `GET /api/tmdb/genres/:mediaType` - Get movie genres
- `GET /api/tmdb/cast-crew/:movieId` - Get cast and crew information

## 🔌 Socket.io Events

### Client to Server

- `join-room` - Join a watch party room
- `send-message` - Send chat message
- `host-play` - Host starts/resumes playback
- `host-pause` - Host pauses playback
- `host-seek` - Host seeks to specific time

### Server to Client

- `receive-message` - Receive chat message
- `user-joined` - User joined the room
- `user-left` - User left the room
- `sync-playback` - Synchronize video playback

## 🎨 Key Components

### Frontend Components

- **VideoPlayer**: Main video player with controls and overlay
- **Chat**: Real-time chat interface for watch parties
- **MovieCard**: Movie display cards with hover effects
- **RoomCard**: Watch party room cards
- **CreateRoom**: Room creation modal
- **MovieSelector**: Movie selection interface
- **HeroBanner**: Featured movie showcase
- **Navbar**: Navigation with authentication

### Backend Services

- **authService**: JWT token management and validation
- **roomService**: Watch party room logic
- **movieService**: Movie data management
- **tmdbService**: TMDB API integration
- **userService**: User account management

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt for secure password storage
- **Refresh Tokens**: Automatic token refresh for seamless experience
- **CORS Protection**: Configured cross-origin resource sharing
- **Socket Authentication**: Secure WebSocket connections
- **Signed URLs**: Time-limited movie streaming URLs

## 🌟 Advanced Features

### Real-time Synchronization

- Host controls video playback for all participants
- Automatic synchronization of play, pause, and seek events
- Real-time chat during movie playback

### Room Management

- Public and private room options
- Password protection for private rooms
- Room creator permissions and controls
- Online status tracking

### Movie Integration

- TMDB API for rich movie metadata
- High-quality poster and backdrop images
- Cast and crew information
- Genre categorization and filtering

## 🚀 Deployment

### Production Environment Variables

Ensure all environment variables are properly set for production:

- Use strong, unique secrets for JWT tokens
- Configure proper database connection strings
- Set up CORS for your production domain
- Configure proper Jellyfin server settings

### Recommended Deployment Stack

- **Frontend**: Vercel, Netlify, or similar
- **Backend**: Railway, Heroku, or VPS
- **Database**: PostgreSQL on Railway, Supabase, or dedicated server
- **Media Server**: Self-hosted Jellyfin instance

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📝 License

This project is licensed under the ISC License.

## 🙏 Acknowledgments

- **TMDB** for providing comprehensive movie data
- **Jellyfin** for open-source media server capabilities
- **Socket.io** for real-time communication
- **Prisma** for excellent database tooling
- **Tailwind CSS** for utility-first styling

---

**Spik-X** - Bringing people together through the magic of movies! 🎬✨
