# BATUTA CRM SaaS - Complete Application

BATUTA is a comprehensive CRM SaaS application designed for service professionals and artisans. It provides a complete solution for managing clients, quotes, invoices, and more.

## Features

- User management with role-based access control
- Client management with subscription tracking
- Product catalog
- Quote and invoice generation
- Personalization options
- Data export capabilities
- Mobile-responsive design
- Equipment and installation tracking
- Intervention management
- Messaging system

## Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS, Lucide Icons
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Authentication**: JWT

## Project Structure

```
/
├── src/                  # Frontend React application
│   ├── api/              # API client and service functions
│   ├── components/       # React components
│   ├── hooks/            # Custom React hooks
│   ├── pages/            # Page components
│   ├── services/         # Service layer for API calls
│   ├── store/            # State management (Zustand)
│   ├── types/            # TypeScript type definitions
│   └── App.tsx           # Main application component
│
├── server/               # Backend Node.js application
│   ├── config/           # Server configuration
│   ├── controllers/      # Route controllers
│   ├── middleware/       # Express middleware
│   ├── models/           # Mongoose models
│   ├── routes/           # Express routes
│   └── utils/            # Utility functions
│
├── public/               # Static assets
├── .env                  # Environment variables (not in repo)
├── .env.example          # Example environment variables
├── server.js             # Main server entry point
└── package.json          # Project dependencies and scripts
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MongoDB (optional for development)

### Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file based on `.env.example`
4. Start the development server:
   ```
   npm run dev
   ```

### Development Modes

- **Full Stack**: `npm run dev` - Starts both frontend and backend
- **Frontend Only**: `npm run dev:frontend` - Starts only the Vite dev server
- **Backend Only**: `npm run server` - Starts only the Express server

### Demo Mode

The application can run in demo mode without a database connection. In this mode, all data is temporary and stored in memory.

To run in demo mode, set `NODE_ENV=development` in your `.env` file and don't provide a `MONGODB_URI`.

### Demo Accounts

The application comes with pre-configured demo accounts:

- **Admin**: admin@batuta.fr / admin123
- **Technician**: tech@batuta.fr / tech123
- **Client**: client@batuta.fr / client123
- **Supplier**: fournisseur@batuta.fr / fournisseur123

When using these demo accounts, the frontend still performs a real
`/auth/login` request. The backend (even in demo mode) responds with a
signed JWT token which is required for authenticated API routes such as
`/messages/unread` or `/personalization`.


## Deployment

The application is ready for deployment to platforms like Netlify, Vercel, or Heroku.

## License

This project is licensed under the MIT License.