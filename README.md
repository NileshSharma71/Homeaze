# Homeaze 🏠

**Homeaze** is a full-stack home-services booking platform built on the MERN stack. It connects users with skilled service workers (plumbers, electricians, cleaners, etc.) and provides dedicated dashboards for users, service workers, and platform admins — all in one cohesive system.

---

## 🗂️ Project Structure

```
formal-homie-frontend/
├── backend/          # Express.js REST API
├── frontend/         # User-facing React app (Vite)
├── admin/            # Admin & Worker panel React app (Vite)
├── docker-compose.yml  # Orchestrates all 3 services for local Docker setup
└── README.md           # Project documentation
```

---

## ✨ Features

### 👤 User Panel (`/frontend`)
| Feature | Description |
|---|---|
| **Authentication** | Register / Login with email-password or Google OAuth |
| **Browse Workers** | View available service workers with speciality & availability |
| **Book Appointment** | Book a time slot with a worker |
| **My Bookings** | View, track, and cancel appointments |
| **Online Payment** | Pay for bookings via Razorpay |
| **Profile Management** | Update name, phone, address, gender, DOB, and profile photo |

### 🛠️ Worker Panel (`/admin` — Worker role)
| Feature | Description |
|---|---|
| **Worker Login** | Secure login with email-password or Google OAuth |
| **Dashboard** | Overview of earnings, appointments, and ratings |
| **Manage Appointments** | View, complete, or cancel assigned appointments |
| **Profile** | Update personal info and professional bio |

### 🔐 Admin Panel (`/admin` — Admin role)
| Feature | Description |
|---|---|
| **Admin Login** | Secure admin-only login |
| **Dashboard** | Platform-wide stats (total workers, bookings, revenue) |
| **Add Worker** | Register new service workers with profile image upload |
| **Workers List** | View all registered workers & toggle availability |
| **All Bookings** | View and cancel any booking across the platform |

### 🤖 AI Feature
- **AI-Powered Bio Generation** — Uses **Groq LLM** to auto-generate professional bios for workers via the `/api/ai/generate-bio` endpoint.

---

## 🧰 Tech Stack

### Backend
| Technology | Purpose |
|---|---|
| **Node.js + Express.js v5** | REST API server |
| **MongoDB + Mongoose** | Database & ODM |
| **JWT** | Authentication tokens |
| **bcrypt** | Password hashing |
| **Cloudinary** | Profile image storage |
| **Multer** | Image upload middleware |
| **Razorpay** | Payment gateway integration |
| **Nodemailer** | Email notifications |
| **Google Auth Library** | Google OAuth verification |
| **Groq SDK** | AI bio generation (LLM) |
| **dotenv** | Environment variable management |

### Frontend & Admin
| Technology | Purpose |
|---|---|
| **React 19 + Vite** | UI framework & build tool |
| **React Router DOM v7** | Client-side routing |
| **Tailwind CSS v3** | Utility-first styling |
| **Axios** | HTTP client for API calls |
| **React Toastify** | Toast notifications |
| **@react-oauth/google** | Google One Tap login |

---

## 🚀 Getting Started

### Prerequisites
- Node.js >= 18
- MongoDB (local or Atlas)
- Cloudinary account
- Razorpay account
- Groq API key
- Google OAuth Client ID

---

### 1. Clone the Repository

```bash
git clone https://github.com/NileshSharma71/Homeaze.git
cd Homeaze
```

---

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` directory:

```env
PORT=4000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_SECRET_KEY=your_cloudinary_secret

RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret

ADMIN_EMAIL=your_admin_email
ADMIN_PASSWORD=your_admin_password

GOOGLE_CLIENT_ID=your_google_client_id

GROQ_API_KEY=your_groq_api_key
```

Start the backend dev server:

```bash
npm run server     # with nodemon (hot reload)
# or
npm start          # without hot reload
```

> Backend runs at `http://localhost:4000`

---

### 3. Frontend Setup (User Panel)

```bash
cd frontend
npm install
```

Create a `.env` file in the `frontend/` directory:

```env
VITE_BACKEND_URL=http://localhost:4000
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
VITE_GOOGLE_CLIENT_ID=your_google_client_id
```

Start the dev server:

```bash
npm run dev
```

> Frontend runs at `http://localhost:5173`

---

### 4. Admin Panel Setup

```bash
cd admin
npm install
```

Create a `.env` file in the `admin/` directory:

```env
VITE_BACKEND_URL=http://localhost:4000
VITE_GOOGLE_CLIENT_ID=your_google_client_id
```

Start the dev server:

```bash
npm run dev
```

> Admin panel runs at `http://localhost:5174`

---

## 🐳 Docker (All Services)

Run the entire stack with Docker Compose:

```bash
docker-compose up --build
```

| Service | URL |
|---|---|
| Backend API | `http://localhost:4000` |
| Frontend (User) | `http://localhost:5173` |
| Admin Panel | `http://localhost:5174` |

---

## 📡 API Reference

### Auth — User (`/api/user`)
| Method | Endpoint | Auth Required | Description |
|---|---|---|---|
| `POST` | `/register` | No | Register a new user |
| `POST` | `/login` | No | Login with email/password |
| `POST` | `/google-login` | No | Login with Google OAuth |
| `GET` | `/get-profile` | Yes (JWT) | Get user profile |
| `POST` | `/update-profile` | Yes (JWT) | Update user profile & photo |
| `POST` | `/book-appointment` | Yes (JWT) | Book a worker appointment |
| `GET` | `/appointments` | Yes (JWT) | List user's bookings |
| `POST` | `/cancel-appointment` | Yes (JWT) | Cancel an appointment |
| `POST` | `/payment-razorpay` | Yes (JWT) | Initiate Razorpay payment |
| `POST` | `/verifyRazorpay` | Yes (JWT) | Verify payment signature |

### Worker (`/api/worker`)
| Method | Endpoint | Auth Required | Description |
|---|---|---|---|
| `GET` | `/list` | No | Get all available workers |
| `POST` | `/login` | No | Worker login |
| `POST` | `/google-login` | No | Worker Google login |
| `GET` | `/appointments` | Yes (JWT) | Worker's appointments |
| `POST` | `/cancel-appointment` | Yes (JWT) | Cancel appointment |
| `POST` | `/complete-appointment` | Yes (JWT) | Mark appointment complete |
| `GET` | `/dashboard` | Yes (JWT) | Worker dashboard stats |
| `GET` | `/profile` | Yes (JWT) | Get worker profile |
| `POST` | `/update-profile` | Yes (JWT) | Update worker profile |

### Admin (`/api/admin`)
| Method | Endpoint | Auth Required | Description |
|---|---|---|---|
| `POST` | `/login` | No | Admin login |
| `POST` | `/add-worker` | Yes (JWT) | Add a new worker (with image) |
| `GET` | `/all-workers` | Yes (JWT) | Get all workers |
| `POST` | `/change-availability` | Yes (JWT) | Toggle worker availability |
| `GET` | `/appointments` | Yes (JWT) | Get all bookings |
| `POST` | `/cancel-appointment` | Yes (JWT) | Cancel any booking |
| `GET` | `/dashboard` | Yes (JWT) | Admin dashboard stats |

### AI (`/api/ai`)
| Method | Endpoint | Auth Required | Description |
|---|---|---|---|
| `POST` | `/generate-bio` | No | Generate AI bio for a worker |

---

## 🗄️ Database Models

### User
- `name`, `email`, `password` (hashed), `image`
- `phone`, `address`, `gender`, `dob`
- `googleId`, `authProvider` (`local` | `google`)

### Worker
- Personal info + speciality, fees, availability
- Profile image (Cloudinary URL)

### Booking
- References user + worker, appointment slot
- Payment status, cancellation status, completion status

---

## 🌐 Deployment

- **Backend** is deployed on **[Render](https://homeaze.onrender.com)**
- **Frontend** is deployed on **[Vercel](https://homeaze-frontend.onrender.com)**
- **Admin** is deployed on **[Vercel](https://homeaze-admin.onrender.com)**

---

## 📄 License

This project is for academic(minor) purposes — **JKLU Minor Project**.

---

> Built with ❤️ by Nilesh Sharma and Prateek Yadav
