# BATUTA CRM SaaS - Complete Application

BATUTA is a comprehensive CRM SaaS application designed for service professionals and artisans. It provides a complete solution for managing clients, quotes, invoices, and more.

## Features

- User management with role-based access control
- Client management
- Product catalog
- Quote and invoice generation
- Personalization options
- Data export capabilities
- Mobile-responsive design

## Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS, Lucide Icons
- **Backend**: Node.js, Express
- **Database**: SQLite (via better-sqlite3)
- **Authentication**: JWT

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

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
5. Start the backend server:
   ```
   npm run server
   ```

### Demo Accounts

The application comes with pre-configured demo accounts:

- **Admin**: admin@batuta.fr / admin123
- **Technician**: tech@batuta.fr / tech123
- **Client**: client@batuta.fr / client123
- **Supplier**: fournisseur@batuta.fr / fournisseur123

## Deployment

The application is ready for deployment to platforms like Netlify, Vercel, or Heroku.

## License

This project is licensed under the MIT License.