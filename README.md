
# 🚀 ShowcaseHub API

**ShowcaseHub API** is a professional-grade, multi-user backend service for managing and showcasing portfolio projects. Authenticated users can create, edit, and delete projects — upload images to Cloudinary, and mark select projects as "featured" for public display.

---

## 🔗 Live API URL

> Coming soon (e.g., Render, Railway, etc.)

---

## 🧰 Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB + Mongoose
- **Auth:** JWT, bcrypt.js
- **File Uploads:** Multer + Cloudinary
- **Environment Management:** dotenv

---

## 🎯 Features

- ✅ User registration and login (JWT auth)
- ✅ Secure access to project CRUD operations
- ✅ Cloudinary image uploads via API
- ✅ Mark/unmark projects as **featured**
- ✅ Fetch only the logged-in user’s projects
- ✅ Public endpoints for portfolio integration
- ✅ Scalable structure with clean code practices

---

## 📂 Folder Structure

```
showcasehub-api/
├── controllers/        # Logic for users and projects
├── models/             # Mongoose schemas (User, Project)
├── routes/             # Express routers
├── middlewares/        # Auth, image uploads, etc.
├── uploads/            # Optional: local file uploads
├── .env                # Secrets and config
├── server.js           # Entry point
```

---

## ⚙️ Getting Started

### 1. Clone the repo
```bash
git clone https://github.com/your-username/showcasehub-api.git
cd showcasehub-api
```

### 2. Install dependencies
```bash
npm install
```

### 3. Add a `.env` file
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### 4. Start the dev server
```bash
npm run dev
```

Server runs at: `http://localhost:5000`

---

## 🔐 Authentication Guide

Use JWT tokens for all protected routes.

After logging in:
- Copy the token from response
- Add this to headers of API requests:

```
Authorization: Bearer <your_token>
```

---

## 📡 API Routes

### 🧾 Auth Routes

| Method | Endpoint         | Description             |
|--------|------------------|-------------------------|
| POST   | `/auth/register` | Register new user       |
| POST   | `/auth/login`    | Login and get JWT token |

---

### 📁 Project Routes (Authenticated)

| Method | Endpoint        | Description                    |
|--------|-----------------|--------------------------------|
| GET    | `/projects`     | Get all projects for a user    |
| POST   | `/projects`     | Create a new project           |
| GET    | `/projects/:id` | Get a specific project         |
| PUT    | `/projects/:id` | Update a project               |
| DELETE | `/projects/:id` | Delete a project               |

> 🔐 All routes require a valid JWT token in the `Authorization` header

---

### 🌐 Public Routes (No Auth Needed)

| Method | Endpoint                             | Description                     |
|--------|--------------------------------------|---------------------------------|
| GET    | `/public/:userId/projects`           | Get all public projects by user |
| GET    | `/public/:userId/featured`           | Get featured projects only      |

---

## 🖼️ Image Uploads

- Endpoint: `POST /projects` (or `PUT /projects/:id`)
- Send `multipart/form-data` request with:
  - Fields: `title`, `description`, etc.
  - File: `image`

Images are automatically uploaded to Cloudinary and the URL is stored in MongoDB.

---

## 🗃 Example Project Schema

```json
{
  "_id": "64db7fae2...",
  "title": "Personal Portfolio Website",
  "description": "Built using React and Tailwind",
  "techStack": ["React", "Tailwind", "Node.js"],
  "githubUrl": "https://github.com/iyke-e/portfolio",
  "liveUrl": "https://iyke.dev",
  "image": "https://res.cloudinary.com/...",
  "isFeatured": true,
  "userId": "64db1234f...",
  "createdAt": "...",
  "updatedAt": "..."
}
```

---

## 🔮 Upcoming Enhancements

- 🔄 Password reset functionality
- 🧾 Project filtering/sorting
- 🛠 Admin dashboard UI (`showcasehub-dashboard`)
- 🌍 Public portfolio site (`showcasehub-portfolio`)
- 🧪 Swagger/OpenAPI docs

---

## 👨‍💻 Author

**Ikechukwu Egwim**  
Backend Developer | Portfolio Engineer  
[GitHub](https://github.com/iyke-e) • [LinkedIn](https://linkedin.com/in/iyke-e)

---

## 📄 License

This project is open-sourced under the [MIT License](LICENSE).

> Feel free to fork and build your own version!
