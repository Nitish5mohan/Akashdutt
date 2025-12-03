# Antigravity Website - Master Planning & Architecture

## 1. Project Overview
**Name:** Antigravity (AkashDutt)
**Goal:** Create a modern, multi-vertical drone startup website.
**Verticals:**
1.  **R&D & Custom Drones:** Innovation showcase & inquiry system.
2.  **Buy Our Tech:** E-commerce for drones & components.
3.  **Drone-as-a-Service (DaaS):** Real-time rental & pilot booking.
4.  **HR Development:** Training courses & certification.

---

## 2. Technology Stack

| Layer | Technology | Reasoning |
| :--- | :--- | :--- |
| **Frontend** | **Next.js (React)** | SEO, Server-Side Rendering (SSR), Scalability. |
| **Styling** | **TailwindCSS** | Rapid, modern UI development. |
| **State** | **Redux / Context** | Complex state management (Cart, Auth). |
| **Backend** | **Node.js + Express** | Non-blocking I/O, unified JS ecosystem. |
| **Database** | **MongoDB** | Flexible schema for diverse verticals. |
| **Real-time** | **Socket.io** | Live DaaS booking updates. |
| **Payments** | **Stripe / PayPal** | Secure global transactions. |
| **DevOps** | **Docker, GitHub Actions** | Containerization & CI/CD. |

---

## 3. Master Folder Structure
*Optimized for Scalability & Modularity. Adapted for Next.js (using `.js` instead of `.html`).*

```
antigravity-website/
│
├── frontend/                            # NEXT.JS FRONTEND
│   ├── public/                          # Static assets (images, robots.txt)
│   ├── src/
│   │   ├── pages/                       # ROUTING
│   │   │   ├── index.js                 # Landing Page
│   │   │   ├── rnd.js                   # R&D Vertical
│   │   │   ├── products/                # Buy Our Tech Vertical
│   │   │   │   ├── index.js             # Catalog
│   │   │   │   ├── [id].js              # Product Details
│   │   │   │   └── cart.js
│   │   │   ├── daas.js                  # DaaS Booking
│   │   │   └── hr.js                    # HR / Courses
│   │   │
│   │   ├── components/                  # REUSABLE UI
│   │   │   ├── common/                  # Navbar, Footer
│   │   │   ├── rnd/                     # InquiryForm
│   │   │   ├── shop/                    # ProductCard, CartWidget
│   │   │   ├── daas/                    # BookingWidget (Real-time)
│   │   │   └── hr/                      # CourseCard
│   │   │
│   │   ├── hooks/                       # Custom Hooks (useAuth, useSocket)
│   │   ├── store/                       # Redux/Context
│   │   ├── styles/                      # Tailwind/Global CSS
│   │   └── utils/                       # API helpers
│   │
│   └── package.json
│
├── backend/                             # EXPRESS BACKEND
│   ├── src/
│   │   ├── config/                      # DB, Env, Stripe
│   │   ├── controllers/                 # Business Logic
│   │   │   ├── rndController.js
│   │   │   ├── productController.js
│   │   │   ├── bookingController.js
│   │   │   └── hrController.js
│   │   ├── models/                      # DB Schemas
│   │   │   ├── Inquiry.js
│   │   │   ├── Product.js
│   │   │   ├── Booking.js
│   │   │   └── Course.js
│   │   ├── routes/                      # API Endpoints
│   │   │   ├── rndRoutes.js
│   │   │   ├── productRoutes.js
│   │   │   ├── bookingRoutes.js
│   │   │   └── hrRoutes.js
│   │   ├── services/                    # Integrations
│   │   │   ├── paymentService.js
│   │   │   ├── bookingService.js
│   │   │   └── emailService.js
│   │   ├── middleware/                  # Auth, Validation
│   │   └── server.js                    # Entry Point
│   │
│   └── package.json
│
├── database/                            # DB MIGRATIONS & SEEDS
├── docs/                                # DOCUMENTATION
│   ├── requirements.md
│   ├── api-docs.md
│   └── planning_and_architecture.md
├── deployment/                          # DOCKER & CI/CD
└── README.md
```

---

## 4. Implementation Roadmap

### Step 1: Planning & Architecture (✅ Completed)
- Defined requirements for all 4 verticals.
- Selected Tech Stack.
- Finalized Folder Structure.

### Step 2: Frontend Implementation
1.  **Setup:** `npx create-next-app`
2.  **Pages:** Create `index.js`, `rnd.js`, `products.js`, `daas.js`, `hr.js`.
3.  **Components:** Build Navbar, Footer, ProductCard, BookingWidget.
4.  **Integration:** Connect to Backend APIs using Axios.

### Step 3: Backend Implementation
1.  **Setup:** Initialize Node.js + Express.
2.  **Models:** Define Mongoose schemas for Products, Bookings, etc.
3.  **Controllers:** Implement logic for CRUD and specific features.
4.  **Routes:** Expose API endpoints.
5.  **Security:** Implement JWT Auth and Middleware.

### Step 4: Real-Time DaaS
1.  **Socket.io:** Install and configure on Server and Client.
2.  **Logic:** Emit availability updates; handle booking concurrency.

### Step 5: Database & Payments
1.  **DB:** Setup MongoDB Atlas or local instance.
2.  **Payments:** Integrate Stripe SDK in `paymentService.js`.

### Step 6: Testing & Deployment
1.  **Testing:** Jest for Unit Tests; Manual testing for flows.
2.  **Docker:** Containerize apps.
3.  **Deploy:** Vercel (Frontend) + Cloud Provider (Backend).

---

## 5. Validation Checklist
- [x] **Modular?** Yes, verticals are separated in pages/controllers.
- [x] **Scalable?** Yes, Service layer and separate backend allow growth.
- [x] **Real-time?** Yes, Socket.io included for DaaS.
- [x] **Secure?** Yes, Middleware and JWT auth included.
