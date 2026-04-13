# Postly 📝

**Postly** is a modern social blogging application where users can share their thoughts, follow other creators, and customize their profiles. Built with a stunning SaaS-style user interface, Postly focuses on beautiful aesthetics and raw performance.

## 🌟 Features

- **Premium UI/UX:** Built with Tailwind CSS, featuring glassmorphism elements, Indigo/Violet gradients, fluid micro-animations, and clean typography (Inter & Outfit fonts).
- **Authentication:** Secure user registration and login endpoints protected with JWT-based authentication.
- **Social Feed Architecture:**
  - **All Posts:** A global feed displaying the latest posts from everyone on the platform.
  - **Following Feed:** A curated feed exclusively showing posts from content creators you follow.
- **Dynamic Profiles:**
  - View user profiles to see their posts, followers, and following count.
  - Add and update your own custom **Profile Bio**.
  - Smart buttons that dynamically detect if you are viewing your own profile (hiding the "Follow" button and showing "Edit Bio").
- **Post Engine:** A snappy editor to draft and instantly publish fully responsive blog posts.

## 🚀 Tech Stack

### Frontend
- **React (Vite)**: Lightning-fast development environment and optimized production builds.
- **Tailwind CSS v3**: For highly customizable utility-first styling and custom keyframe animations.
- **React Router DOM**: Client-side routing for seamless page transitions.
- **Axios**: Promised-based HTTP client for the browser.

### Backend
- **Hono.js**: An ultrafast, lightweight web framework running on **Cloudflare Workers**.
- **Prisma ORM**: Modern database toolkit explicitly configured for edge runtimes with **Prisma Accelerate**.
- **PostgreSQL**: Cloud-hosted SQL database (Neon) for robust and scalable data management.
- **hono/jwt**: High-performance JSON Web Token encoding and verification.

---

## 🛠️ Getting Started

### Prerequisites
- Node.js (v18+)
- Postgres Database connection URL
- Prisma Accelerate URL

### 1. Backend Setup

1. Open the `backend` directory.
   ```bash
   cd backend
   ```
2. Install dependencies.
   ```bash
   npm install
   ```
3. Establish your environment variables. Create a `.env` file in the root of the `backend` folder:
   ```env
   DATABASE_URL="prisma://accelerate.prisma-data.net/?api_key=YOUR_API_KEY"
   DIRECT_DATABASE_URL="postgres://user:password@aws.neon.tech/neondb"
   JWTSEC="secure"
   ```
4. Push the schema to your database and generate the Prisma Edge Client:
   ```bash
   npx prisma db push --accept-data-loss
   npx prisma generate
   ```
5. Start the Wrangler edge development server:
   ```bash
   npm run dev
   ```

### 2. Frontend Setup

1. Open the `frontend` directory.
   ```bash
   cd frontend
   ```
2. Install dependencies.
   ```bash
   npm install
   ```
3. Set your backend API key in `src/apikeys.tsx`:
   *(Ensure it points to your local Wrangler port during development)*
   ```tsx
   export const backend: string = "http://127.0.0.1:8787"
   ```
4. Start the Vite development server:
   ```bash
   npm run dev
   ```

---

## 🏗️ Project Structure

- **/backend/src/index.ts**: The main entry point for the Hono worker.
- **/backend/src/userRouter.ts**: Endpoints controlling User logic, Followers, and Bios.
- **/backend/src/blogRouting.ts**: Endpoints managing Posts creation and retrieval logic.
- **/frontend/src/components/**: Reusable React fragments (Navbar, BlogCards, Inputs).
- **/frontend/src/pages/**: Core route entries (Signup, Dashboard, Posts View, Profile View).