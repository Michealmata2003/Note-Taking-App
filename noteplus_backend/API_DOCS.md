# 📮 NotePlus API Documentation

**Base URL (Production):** `https://note-taking-app-y130.onrender.com`  
**Base URL (Development):** `http://localhost:5000`

---

## 🔐 Authentication

All protected routes require a Bearer token in the `Authorization` header:

```
Authorization: Bearer <your_jwt_token>
```

You get this token when you register or login.

---

## 👤 Auth Endpoints

### Register
**POST** `/api/auth/register`  
**Access:** Public

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@gmail.com",
  "password": "123456"
}
```

**Success Response (201):**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "_id": "64f3a2b1c9e77...",
    "name": "John Doe",
    "email": "john@gmail.com",
    "avatar": ""
  }
}
```

**Error Response (400):**
```json
{
  "success": false,
  "message": "Email already registered"
}
```

---

### Login
**POST** `/api/auth/login`  
**Access:** Public

**Request Body:**
```json
{
  "email": "john@gmail.com",
  "password": "123456"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "_id": "64f3a2b1c9e77...",
    "name": "John Doe",
    "email": "john@gmail.com",
    "avatar": ""
  }
}
```

**Error Response (401):**
```json
{
  "success": false,
  "message": "Invalid credentials"
}
```

---

### Get Current User
**GET** `/api/auth/me`  
**Access:** Private 🔒

**Success Response (200):**
```json
{
  "success": true,
  "user": {
    "_id": "64f3a2b1c9e77...",
    "name": "John Doe",
    "email": "john@gmail.com",
    "avatar": ""
  }
}
```

---

### Update Profile
**PUT** `/api/auth/me`  
**Access:** Private 🔒

**Request Body:**
```json
{
  "name": "John Updated",
  "avatar": "https://cloudinary.com/image.jpg"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "user": {
    "_id": "64f3a2b1c9e77...",
    "name": "John Updated",
    "email": "john@gmail.com",
    "avatar": "https://cloudinary.com/image.jpg"
  }
}
```

---

### Change Password
**PUT** `/api/auth/change-password`  
**Access:** Private 🔒

**Request Body:**
```json
{
  "currentPassword": "123456",
  "newPassword": "newpassword123"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": { ... }
}
```

---

## 📝 Notes Endpoints

### Get All Notes
**GET** `/api/notes`  
**Access:** Private 🔒

**Query Parameters (all optional):**

| Parameter | Type | Description |
|-----------|------|-------------|
| notebook | String | Filter by notebook ID |
| tag | String | Filter by tag ID |
| pinned | Boolean | Get pinned notes only |
| favourite | Boolean | Get favourite notes only |
| reminder | Boolean | Get notes with reminders only |
| search | String | Search by title or content |

**Examples:**
```
GET /api/notes
GET /api/notes?pinned=true
GET /api/notes?search=birthday
GET /api/notes?notebook=64f3a2b1c9e77
GET /api/notes?tag=64f3a2b1c9e77
GET /api/notes?favourite=true
GET /api/notes?reminder=true
```

**Success Response (200):**
```json
{
  "success": true,
  "count": 2,
  "notes": [
    {
      "_id": "64f3a2b1c9e77...",
      "title": "My First Note",
      "content": "This is a test note",
      "type": "blank",
      "todoItems": [],
      "images": [],
      "notebook": { "_id": "...", "name": "Project Plans" },
      "tags": [{ "_id": "...", "name": "Important" }],
      "sharedWith": [],
      "reminderAt": null,
      "isPinned": false,
      "isFavourite": false,
      "isTrashed": false,
      "user": "64f3a2b1c9e77...",
      "createdAt": "2024-01-10T10:00:00.000Z",
      "updatedAt": "2024-01-10T10:00:00.000Z"
    }
  ]
}
```

---

### Get Single Note
**GET** `/api/notes/:id`  
**Access:** Private 🔒 (owner or shared users)

**Success Response (200):**
```json
{
  "success": true,
  "note": { ... }
}
```

**Error Response (404):**
```json
{
  "success": false,
  "message": "Note not found"
}
```

---

### Create Note
**POST** `/api/notes`  
**Access:** Private 🔒

**Request Body:**
```json
{
  "title": "My Note",
  "content": "Note content here",
  "type": "blank",
  "notebook": "64f3a2b1c9e77...",
  "tags": ["64f3a2b1c9e77..."],
  "reminderAt": "2024-02-01T10:00:00.000Z"
}
```

**Note types:** `blank` | `todo` | `essay` | `daily`

**For todo type:**
```json
{
  "title": "Shopping List",
  "type": "todo",
  "todoItems": [
    { "text": "Buy cake", "completed": false },
    { "text": "Buy balloons", "completed": false }
  ]
}
```

**Success Response (201):**
```json
{
  "success": true,
  "note": { ... }
}
```

---

### Update Note
**PUT** `/api/notes/:id`  
**Access:** Private 🔒 (owner only)

**Request Body (any fields to update):**
```json
{
  "title": "Updated Title",
  "content": "Updated content"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "note": { ... }
}
```

---

### Move Note to Trash
**DELETE** `/api/notes/:id`  
**Access:** Private 🔒 (owner only)

**Success Response (200):**
```json
{
  "success": true,
  "message": "Note moved to trash"
}
```

---

### Restore Note from Trash
**PUT** `/api/notes/:id/restore`  
**Access:** Private 🔒 (owner only)

**Success Response (200):**
```json
{
  "success": true,
  "message": "Note restored"
}
```

---

### Permanently Delete Note
**DELETE** `/api/notes/:id/permanent`  
**Access:** Private 🔒 (owner only)

**Success Response (200):**
```json
{
  "success": true,
  "message": "Note permanently deleted"
}
```

---

### Get Trashed Notes
**GET** `/api/notes/bin`  
**Access:** Private 🔒

**Success Response (200):**
```json
{
  "success": true,
  "count": 1,
  "notes": [ ... ]
}
```

---

### Get Reminder Notes
**GET** `/api/notes/reminders`  
**Access:** Private 🔒

**Success Response (200):**
```json
{
  "success": true,
  "count": 1,
  "notes": [ ... ]
}
```

---

### Toggle Pin
**PUT** `/api/notes/:id/pin`  
**Access:** Private 🔒 (owner only)

**Success Response (200):**
```json
{
  "success": true,
  "isPinned": true
}
```

---

### Toggle Favourite
**PUT** `/api/notes/:id/favourite`  
**Access:** Private 🔒 (owner only)

**Success Response (200):**
```json
{
  "success": true,
  "isFavourite": true
}
```

---

### Share Note
**POST** `/api/notes/:id/share`  
**Access:** Private 🔒 (owner only)

**Request Body:**
```json
{
  "userId": "64f3a2b1c9e77..."
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Note shared successfully"
}
```

---

### Upload Images to Note
**POST** `/api/notes/:id/images`  
**Access:** Private 🔒 (owner only)  
**Content-Type:** `multipart/form-data`

**Form Data:**
```
images: [file1, file2, ...]  (max 5 images)
```

**Success Response (200):**
```json
{
  "success": true,
  "images": [
    {
      "url": "https://res.cloudinary.com/...",
      "publicId": "noteplus/abc123"
    }
  ]
}
```

---

## 📁 Notebooks Endpoints

### Get All Notebooks
**GET** `/api/notebooks`  
**Access:** Private 🔒

**Success Response (200):**
```json
{
  "success": true,
  "notebooks": [
    {
      "_id": "64f3a2b1c9e77...",
      "name": "Project Plans",
      "user": "64f3a2b1c9e77...",
      "createdAt": "2024-01-10T10:00:00.000Z"
    }
  ]
}
```

---

### Create Notebook
**POST** `/api/notebooks`  
**Access:** Private 🔒

**Request Body:**
```json
{
  "name": "Project Plans"
}
```

**Success Response (201):**
```json
{
  "success": true,
  "notebook": {
    "_id": "64f3a2b1c9e77...",
    "name": "Project Plans",
    "user": "64f3a2b1c9e77..."
  }
}
```

---

### Update Notebook
**PUT** `/api/notebooks/:id`  
**Access:** Private 🔒 (owner only)

**Request Body:**
```json
{
  "name": "Updated Notebook Name"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "notebook": { ... }
}
```

---

### Delete Notebook
**DELETE** `/api/notebooks/:id`  
**Access:** Private 🔒 (owner only)

**Success Response (200):**
```json
{
  "success": true,
  "message": "Notebook deleted"
}
```

---

## 🏷️ Tags Endpoints

### Get All Tags
**GET** `/api/tags`  
**Access:** Private 🔒

**Success Response (200):**
```json
{
  "success": true,
  "tags": [
    {
      "_id": "64f3a2b1c9e77...",
      "name": "Important",
      "user": "64f3a2b1c9e77..."
    }
  ]
}
```

---

### Create Tag
**POST** `/api/tags`  
**Access:** Private 🔒

**Request Body:**
```json
{
  "name": "Important"
}
```

**Success Response (201):**
```json
{
  "success": true,
  "tag": {
    "_id": "64f3a2b1c9e77...",
    "name": "Important",
    "user": "64f3a2b1c9e77..."
  }
}
```

---

### Rename Tag
**PUT** `/api/tags/:id`  
**Access:** Private 🔒 (owner only)

**Request Body:**
```json
{
  "name": "Very Important"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "tag": { ... }
}
```

---

### Delete Tag
**DELETE** `/api/tags/:id`  
**Access:** Private 🔒 (owner only)

**Success Response (200):**
```json
{
  "success": true,
  "message": "Tag deleted"
}
```

---

## ❌ Error Responses

All endpoints return errors in this format:

```json
{
  "success": false,
  "message": "Error description here"
}
```

### HTTP Status Codes

| Code | Meaning |
|------|---------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request (validation error, duplicate etc.) |
| 401 | Unauthorized (no token or invalid token) |
| 404 | Not Found |
| 500 | Internal Server Error |
