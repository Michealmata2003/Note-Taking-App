# 📝 NotePlus — Full Stack Note Taking App

A full stack note-taking application built with React and Node.js. NotePlus allows users to create, organize, and manage notes with features like notebooks, tags, reminders, image uploads, and note sharing.

---

## 🚀 Live Demo

- **Backend API:** https://note-taking-app-y130.onrender.com
- **Frontend:** Coming soon

---

## 🛠️ Tech Stack

### Backend
- **Node.js** + **Express** — server framework
- **MongoDB** + **Mongoose** — database
- **JWT** — authentication
- **Cloudinary** — image uploads
- **bcryptjs** — password hashing
- **Render** — hosting

### Frontend
- **React.js** — UI framework
- **Coming soon**

---

## ✨ Features

- 🔐 User authentication (register, login, JWT protected routes)
- 📝 Create notes in 4 types — Blank, To-do, Essay, Daily Reflection
- 📁 Organize notes into Notebooks
- 🏷️ Tag notes with custom labels
- ⏰ Set reminders on notes
- 📌 Pin and favourite notes
- 🗑️ Trash and restore notes (soft delete)
- 🖼️ Upload images to notes via Cloudinary
- 👥 Share notes with other users
- 🔍 Search notes by title or content

---

## 📁 Project Structure

```
note-taking-app/
├── frontend/               # React frontend
└── noteplus_backend/       # Node.js backend
    ├── src/
    │   ├── config/
    │   │   ├── db.js           # MongoDB connection
    │   │   └── cloudinary.js   # Cloudinary + Multer setup
    │   ├── controllers/
    │   │   ├── authController.js
    │   │   ├── noteController.js
    │   │   ├── notebookController.js
    │   │   └── tagController.js
    │   ├── middleware/
    │   │   ├── auth.js           # JWT protect middleware
    │   │   └── errorHandler.js   # Global error handler
    │   ├── models/
    │   │   ├── User.js
    │   │   ├── Note.js
    │   │   ├── Notebook.js
    │   │   └── Tag.js
    │   ├── routes/
    │   │   ├── authRoutes.js
    │   │   ├── noteRoutes.js
    │   │   ├── notebookRoutes.js
    │   │   └── tagRoutes.js
    │   ├── utils/
    │   │   └── token.js
    │   ├── app.js
    │   └── server.js
    ├── .env.example
    └── package.json
```

---

## ⚙️ Backend Setup

### Prerequisites
- Node.js v18+
- MongoDB Atlas account
- Cloudinary account

### Installation

```bash
# Clone the repo
git clone https://github.com/Michealmata2003/Note-Taking-App.git
cd Note-Taking-App/noteplus_backend

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Fill in your values in .env

# Run in development
npm run dev
```

### Environment Variables

Create a `.env` file in the `noteplus_backend` folder:

```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/noteplus
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRES_IN=7d
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
CLIENT_URL=http://localhost:3000
```

---

## 🔐 Authentication

All protected routes require a Bearer token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

---

## 📮 API Endpoints

See [API_DOCS.md](./API_DOCS.md) for full documentation of all endpoints.

---

## 🗄️ Database Models

### User
| Field | Type | Description |
|-------|------|-------------|
| name | String | User's full name |
| email | String | Unique email address |
| password | String | Hashed password |
| avatar | String | Profile image URL |

### Note
| Field | Type | Description |
|-------|------|-------------|
| title | String | Note title |
| content | String | Note content |
| type | String | blank, todo, essay, daily |
| todoItems | Array | Checklist items for todo notes |
| images | Array | Cloudinary image URLs |
| notebook | ObjectId | Reference to Notebook |
| tags | Array | References to Tags |
| sharedWith | Array | References to Users |
| reminderAt | Date | Reminder datetime |
| isPinned | Boolean | Pin status |
| isFavourite | Boolean | Favourite status |
| isTrashed | Boolean | Trash status |

### Notebook
| Field | Type | Description |
|-------|------|-------------|
| name | String | Notebook name |
| user | ObjectId | Owner reference |

### Tag
| Field | Type | Description |
|-------|------|-------------|
| name | String | Tag name |
| user | ObjectId | Owner reference |

---

## 👨‍💻 Author

**Michael Mata**
- GitHub: [@Michealmata2003](https://github.com/Michealmata2003)

---

## 📄 License

This project is licensed under the MIT License.
