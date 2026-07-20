# Afrimen — E-Commerce Platform

A full-stack e-commerce storefront for **Afrimen**, a menswear brand cut for African men. Built with React + Vite (frontend) and Node.js + Express + PostgreSQL (backend).

## Tech Stack

| Layer    | Technology                   |
| -------- | ---------------------------- |
| Frontend | React 19, Vite, react-router |
| Backend  | Node.js, Express             |
| Database | PostgreSQL 18                |
| Images   | Unsplash (product shots)     |

## Project Structure

```
afrimen/
├── backend/           # Express API (port 4000)
│   ├── src/
│   │   ├── server.js         # Entry point
│   │   ├── db.js             # PostgreSQL pool
│   │   ├── schema.sql        # Table definitions
│   │   ├── db-init.js        # Run schema
│   │   ├── seed.js           # Seed 24 products + reviews
│   │   └── routes/
│   │       ├── products.js   # GET /api/products, GET /api/products/:id
│   │       ├── cart.js       # CRUD /api/cart (session-based)
│   │       ├── wishlist.js   # CRUD /api/wishlist (session-based)
│   │       └── contact.js    # POST /api/contact
│   └── package.json
├── frontend/          # Vite + React SPA (port 5173)
│   └── src/
│       ├── components/      # Shared UI (Header, Footer, ProductCard, etc.)
│       ├── pages/           # Route pages (Home, Shop, ProductDetail, Cart, etc.)
│       ├── hooks/           # AppContext (global state), session ID
│       ├── services/        # api.js — all backend API calls
│       └── data/            # Fallback product data, reviews, colors, icons
├── .gitignore
├── package.json       # Root convenience scripts
└── README.md
```

## Setup

### Prerequisites

- **Node.js** 20+
- **PostgreSQL** 18 (running on localhost:5432)
- **npm**

### 1. Install Dependencies

```bash
npm run install:all
```

### 2. Configure Database

Edit `backend/.env` with your PostgreSQL credentials:

```env
PORT=4000
PGHOST=localhost
PGPORT=5432
PGDATABASE=afrimen
PGUSER=postgres
PGPASSWORD=<your-password>
CORS_ORIGIN=http://localhost:5173
```

### 3. Create & Seed Database

```bash
npm run db:init
npm run db:seed
```

### 4. Start Development

```bash
# Terminal 1 — backend
npm run dev:backend

# Terminal 2 — frontend
npm run dev:frontend
```

Open **http://localhost:5173**

## API Endpoints

| Method | Endpoint              | Description              |
| ------ | --------------------- | ------------------------ |
| GET    | `/api/health`         | Health check             |
| GET    | `/api/products`       | List products (filtered) |
| GET    | `/api/products/:id`   | Product + reviews        |
| POST   | `/api/cart`           | Add to cart              |
| GET    | `/api/cart`           | Get cart (session_id)    |
| PUT    | `/api/cart/:id`       | Update quantity          |
| DELETE | `/api/cart/:id`       | Remove from cart         |
| POST   | `/api/wishlist`       | Add to wishlist          |
| GET    | `/api/wishlist`       | Get wishlist (session_id)|
| DELETE | `/api/wishlist/:id`   | Remove from wishlist     |
| POST   | `/api/contact`        | Submit contact form      |
